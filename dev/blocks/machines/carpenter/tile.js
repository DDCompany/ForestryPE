MachineRegistry.register(BlockID.carpenter, {

    defaultValues: {
        progress: 0,
        progressMax: 0,
        output: 0
    },
    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },

    getGuiScreen: function () {
        return carpenterGUI;
    },

    getTransportSlots: function () {
        let inp = [];
        for (let i = 0; i < 18; i++) {
            inp.push("slotResources" + i);
        }
        return {input: inp, output: ["slotOutput"]};
    },

    tick: function () {
        ContainerHelper.emptyContainer(null, this, "slotContainer");

        if (this.data.progress <= 0) {
            let input = {};

            for (let i = 0; i < 9; i++) {
                input["slot" + i] = this.container.getSlot("slotInput" + i)
            }

            let recipe = RecipeRegistry.getCarpenterRecipe(input);

            if (recipe) {
                let liquidStorage = this.liquidStorage;
                let liquidStored = liquidStorage.getLiquidStored();

                if ((!recipe.liquid && !liquidStored) || (recipe.liquid === liquidStored && recipe.liquidAmount <= liquidStorage.getAmount(liquidStored))) {
                    let slotSpecial = this.container.getSlot("slotSpecial");

                    if ((!recipe.dop && slotSpecial.id === 0) || (recipe.dop && slotSpecial.id === recipe.dop.id && slotSpecial.data === recipe.dop.data)) {
                        this.data.output = recipe.output;
                        if (recipe.liquid) {
                            alert(this.liquidStorage.getAmount(liquidStorage.getLiquidStored()));
                            this.liquidStorage.getLiquid(liquidStorage.getLiquidStored(), recipe.liquidAmount);
                            alert(this.liquidStorage.getAmount(liquidStorage.getLiquidStored()));
                        }
                        this.data.progress = 1;
                        this.data.progressMax = recipe.time || 50;
                        if (recipe.dop && recipe.dop.dec) {
                            let b = true;
                            for (let j = 0; j < 19; j++) {
                                let res_slot = this.container.getSlot("slotResources" + j);
                                if (res_slot && res_slot.id && res_slot.id === recipe.dop.id && res_slot.data === recipe.dop.data) {
                                    res_slot.count--;
                                    b = false;
                                    break;
                                }
                            }
                            if (b) {
                                slotSpecial.count--;
                            }
                        }
                        for (let i = 0; i < 9; i++) {
                            let slot = this.container.getSlot("slotInput" + i);
                            let g = true;
                            for (let j = 0; j < 19; j++) {
                                let res_slot = this.container.getSlot("slotResources" + j);
                                if (res_slot && res_slot.id && res_slot.id === slot.id && res_slot.data === slot.data) {
                                    res_slot.count--;
                                    g = false;
                                    this.container.validateSlot("slotResources" + j);
                                    break;
                                }
                            }
                            if (g) {
                                slot.count--;
                            }
                        }
                    }
                }
            }


        } else if (this.data.energy >= 204) {
            if (this.data.progress > this.data.progressMax) {
                if (ContainerHelper.putInSlot(this.container.getSlot("slotOutput"), this.data.output)) {
                    this.data.progress = 0;
                    this.data.progressMax = 0;
                }
            } else {
                this.data.progress++;
                this.data.energy -= 204;
            }
        }

        this.container.setScale("progressScale", this.data.progress / this.data.progressMax);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.liquidStorage.updateUiScale("liquidScale", this.liquidStorage.getLiquidStored());

        this.container.validateAll();
    },

    getEnergyStorage: function () {
        return 4000;
    }
});