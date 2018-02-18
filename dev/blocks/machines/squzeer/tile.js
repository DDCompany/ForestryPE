MachineRegistry.register(BlockID.squeezer, {
    defaultValues: {
        progress: 0,
        recipe: 0
    },

    getTransportSlots: function () {
        return {input: ["slotInput0", "slotInput1"], output: ["slotSpecial"]};
    },

    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },

    getGuiScreen: function () {
        return squeezerGUI;
    },

    tick: function () {

        ContainerHelper.fillContainer(null, this, {empty: "slotContainer", full: "slotContainerFilled"});

        if (this.data.progress > 0) {

            if (this.data.energy >= 20) {

                this.data.energy -= 20;
                this.data.progress++;

                if (this.data.progress >= 160) {

                    this.liquidStorage.addLiquid(this.data.recipe.liquid, this.data.recipe.liquidCount);

                    if (this.data.recipe.special) {
                        let slotSpecial = this.container.getSlot("slotSpecial");
                        let special = this.data.recipe.special;
                        if (Math.random() <= special.chance) {
                            if (slotSpecial.id === 0) {
                                slotSpecial.id = special.id;
                                slotSpecial.data = special.data;
                                slotSpecial.count = special.count;
                            } else if (slotSpecial.id === special.id) {
                                if (slotSpecial.data === special.data) {
                                    slotSpecial.count += special.count;
                                }
                            }
                        }
                    }

                    this.data.progress = 0;
                    this.data.recipe = 0;
                }
            }

        } else {
            let slotInput0 = this.container.getSlot("slotInput0");
            let slotInput1 = this.container.getSlot("slotInput1");
            let recipe = SqueezerManager.getRecipe([slotInput0, slotInput1]);

            if (recipe && (this.liquidStorage.isEmpty() || this.liquidStorage.getLiquidStored() === recipe.liquid )) {

                slotInput0.count -= recipe.input0.count;
                slotInput1.count -= recipe.input1.count;

                this.data.recipe = recipe;
                this.data.progress = 1;
            }

        }

        this.container.setScale("progressScale", this.data.progress / 160);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.liquidStorage.updateUiScale("liquidScale", this.liquidStorage.getLiquidStored());

        this.container.validateAll();
    },

    getEnergyStorage: function () {
        return 5000;
    },


});