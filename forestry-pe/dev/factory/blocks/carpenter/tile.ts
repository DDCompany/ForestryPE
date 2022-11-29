MachineRegistry.registerConsumer(BlockID.carpenter, {
    useNetworkItemContainer: true,

    defaultValues: {
        progress: 0,
        progressMax: 0
    },

    init() {
        this.liquidStorage.setLimit(null, 10);

        const container: ItemContainer = this.container;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const slotName = "slotInput" + (i * 3 + j);
                container.setSlotAddTransferPolicy(slotName, (name, slotName, id, count, data, extra) => {
                    container.setSlot(slotName, id, count, data, extra);
                    return 0;
                });

                container.setSlotGetTransferPolicy(slotName, (name, slotName) => {
                    container.clearSlot(slotName);
                    return 0;
                });
            }
        }
    },

    findWork() {
        let pattern: ItemInstance[] = [];

        for (let i = 0; i < 9; i++) {
            pattern[i] = this.container.getSlot(`slotInput${i}`);
        }

        let recipe = CarpenterManager.getRecipe(pattern);

        if (recipe) {
            let liquid = recipe.liquid;
            let liquidAmount = recipe.liquidAmount || 1;
            if (liquid && this.liquidStorage.getAmount(liquid) < liquidAmount) {
                return;
            }

            let slotSpecial = this.container.getSlot("slotSpecial");
            let special = recipe.special;
            if (special) {
                if (slotSpecial.id !== special.id || slotSpecial.data != (special.data || 0))
                    return;
            }

            let slots: Record<number, number> = {};

            for (let i = 0; i < 9; i++) {
                let item = this.container.getSlot(`slotInput${i}`);

                if (!item.id)
                    continue;

                for (let k = 0; k < 18; k++) {
                    let slot = this.container.getSlot(`slotResources${k}`);

                    if (slot.id && ContainerHelper.equals(slot, item)) {
                        let count = slots[k];

                        if (!count) {
                            slots[k] = 1;
                        } else {
                            if (slot.count < count + 1) {
                                if (k === 17)
                                    return;

                                continue
                            }

                            slots[k] = count + 1;
                        }
                        break;
                    } else if (k === 17) {
                        return;
                    }
                }
            }

            for (let i in slots) {
                let slot = this.container.getSlot(`slotResources${i}`);
                this.container.setSlot(`slotResources${i}`, slot.id, slot.count - slots[i], slot.data);
            }

            this.liquidStorage.getLiquid(liquid, liquidAmount);

            if (special && special.dec) {
                this.container.setSlot("slotSpecial", special.id, slotSpecial.count - 1, special.data);
            }

            this.data.progress = 1;
            this.data.progressMax = recipe.time || 50;

            let output = recipe.result;
            this.container.setSlot("slotRecipe", output.id, output.count || 1, output.data || 0);
            this.container.validateAll();
        }
    },

    tick() {
        if (World.getThreadTime() % 5 !== 0)
            return;

        ContainerHelper.drainContainer(null, this, "slotContainer");

        if (this.data.energy >= 204) {
            if (this.data.progress) {
                if (this.data.progress > this.data.progressMax) {
                    let item = this.container.getSlot("slotRecipe");

                    if (ContainerHelper.putInSlot(this.container, "slotOutput", item)) {
                        this.container.clearSlot("slotRecipe");
                        this.data.progress = 0;
                    }
                } else {
                    this.data.progress++;
                    this.data.energy -= 204;
                }
            } else this.findWork();
        }

        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.updateLiquidScale("liquidScale", this.liquidStorage.getLiquidStored());
        this.container.validateAll();
        this.container.sendChanges();
    },

    getEnergyStorage() {
        return 4000;
    },

    destroy() {
        for (let i = 0; i < 9; i++) {
            this.container.clearSlot(`slotInput${i}`);
        }
    },

    getScreenByName() {
        return carpenterGUI;
    }
});

{
    let slots: Record<string, SlotData> = {
        "slotSpecial": {
            input: true,
            isValid(item, side) {
                return side === EBlockSide.UP;
            }
        },
        "slotOutput": {
            output: true
        },
    };

    for (let i = 0; i < 18; i++) {
        slots[`slotResources${i}`] = {
            input: true
        };
    }

    StorageInterface.createInterface(BlockID.carpenter, {
        slots,

        canReceiveLiquid(liquid) {
            let liquidStored = this.tileEntity.liquidStorage.getLiquidStored();
            return !liquidStored || liquidStored === liquid;
        }
    });
}