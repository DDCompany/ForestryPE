TileEntity.registerPrototype(BlockID.apiary, {
    useNetworkItemContainer: true,
    OUTPUT_SLOTS: ["slotProduct0", "slotProduct1", "slotProduct2", "slotProduct3", "slotProduct4", "slotProduct5", "slotProduct6"],

    defaultValues: {
        progress: 0,
        progressMax: 0,
        progressCycle: 0
    },

    init() {
        ContainerHelper.setMaxStackPolicy(this.container, "slot1", 1);
    },

    tick() {
        if (!this.house) {
            this.house = new BeeHouse(this, {
                slotPrincess: "slot1",
                slotDrone: "slot2",
                produceSlots: this.OUTPUT_SLOTS,
                slotPrincessOut: this.OUTPUT_SLOTS,
                slotDronesOut: this.OUTPUT_SLOTS
            }, new ModifierList([{
                getProductionModifier() {
                    return 0.1;
                }
            }]));
        }

        const modifiers = new ModifierList([]);
        if (this.house.queen && !this.house.error) {
            for (let i = 0; i < 3; i++) {
                const slotName = `slotFrame${i}`;
                const slot = this.container.getSlot(slotName);
                if (slot.id && BeeFrame.isFrame(slot.id)) {
                    const frame = BeeFrame.frames[slot.id];
                    modifiers.modifiers.push(frame.modifier);

                    if (this.data.progressCycle === 0) {
                        slot.data++;

                        if (slot.data > frame.durability) {
                            this.container.setSlot(slotName, 0, 0, 0);
                        } else {
                            this.container.setSlot(slotName, slot.id, slot.count, slot.data);
                        }
                    }
                }
            }
        }

        this.house.tick(modifiers);

        let progressTexture: string;
        if (this.data.progress > this.data.progressMax * .8) {
            progressTexture = "forestry.for.apiary.scale_green";
        } else if (this.data.progress > this.data.progressMax * .5) {
            progressTexture = "forestry.for.apiary.scale_yellow";
        } else if (this.data.progress > this.data.progressMax * .3) {
            progressTexture = "forestry.for.apiary.scale_orange";
        } else {
            progressTexture = "forestry.for.apiary.scale_red";
        }
        this.container.setBinding("progressScale", "texture", progressTexture);
        this.container.setBinding("error", "text", this.house.error || "");

        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.container.validateAll();
        this.container.sendChanges();
    },

    getScreenName() {
        return "main";
    },

    getScreenByName() {
        return apiaryGUI;
    },
});

{
    const slots: Record<string, SlotData> = {
        "slot1": {
            input: true,
            isValid(item) {
                const type = BeeRegistry.getBeeTypeByID(item.id);
                return type === BeeRegistry.BEETYPE_PRINCESS || type === BeeRegistry.BEETYPE_QUEEN;
            }
        },
        "slot2": {
            input: true,
            isValid(item) {
                return BeeRegistry.getBeeTypeByID(item.id) === BeeRegistry.BEETYPE_DRONE;
            }
        },
    };

    for (let i = 0; i < 7; i++) {
        slots[`slotProduct${i}`] = {
            output: true
        };
    }

    StorageInterface.createInterface(BlockID.apiary, {slots});
}