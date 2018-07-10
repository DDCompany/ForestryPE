MachineRegistry.register(BlockID.carpenter, {
    defaultValues: {
        progress: 0,
        progressMax: 0
    },
    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },

    getTransportSlots: function () {
        let inp = [];
        for (let i = 0; i < 18; i++) {
            inp.push("slotResources" + i);
        }
        return {input: inp, output: ["slotOutput"]};
    },

    findWork: function () {
        let pattern = {};

        for (let i = 0; i < 9; i++) {
            let item = this.container.getSlot("slotInput" + i);
            pattern["slot" + i] = item;
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
                // noinspection EqualityComparisonWithCoercionJS
                if (slotSpecial.id !== special.id || slotSpecial.data != (special.data || 0))
                    return;
            }

            let slots = {};

            for (let i = 0; i < 9; i++) {
                let item = this.container.getSlot("slotInput" + i);

                if (!item.id)
                    continue;

                for (let k = 0; k < 18; k++) {
                    let slot = this.container.getSlot("slotResources" + k);

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
                let slot = this.container.getSlot("slotResources" + i);
                slot.count -= slots[i];
            }

            this.liquidStorage.getLiquid(liquid, liquidAmount);

            if (special && special.dec) {
                slotSpecial.count -= 1;
            }

            this.data.progress = 1;
            this.data.progressMax = recipe.time || 50;

            let output = recipe.output;
            let slotRecipe = this.container.getSlot("slotRecipe");

            slotRecipe.id = output.id;
            slotRecipe.data = output.data || 0;
            slotRecipe.count = output.count || 1;

            this.container.validateAll();
        }
    },

    tick: function () {
        if (World.getThreadTime() % 5 !== 0)
            return;

        ContainerHelper.drainContainer(null, this, "slotContainer");


        if(this.data.energy >= 204) {
            if (this.data.progress) {
                if (this.data.progress > this.data.progressMax) {
                    let slot = this.container.getSlot("slotOutput");
                    let item = this.container.getSlot("slotRecipe");

                    if (ContainerHelper.putInSlot(slot, item)) {
                        item.id = 0;
                        item.data = 0;
                        item.count = 0;
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
        this.liquidStorage.updateUiScale("liquidScale", this.liquidStorage.getLiquidStored());

        this.container.validateAll();
    },

    getEnergyStorage: function () {
        return 4000;
    },

    getGuiScreen: function () {
        return carpenterGUI;
    }
});