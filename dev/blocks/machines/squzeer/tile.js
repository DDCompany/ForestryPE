MachineRegistry.register(BlockID.squeezer, {
    defaultValues: {
        progress: 0,
        recipe: 0
    },

    getTransportSlots: function () {
        var out = ["slotSpecial"];
        var inp = ["slotInput0", "slotInput1"];
        return {input: inp, output: out};
    },

    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },

    getGuiScreen: function () {
        return squeezerGUI;
    },

    tick: function () {
        if (this.liquidStorage.getLiquidStored()) {
            this.liquidStorage.updateUiScale("liquidScale", this.liquidStorage.getLiquidStored());
        }

        var slotInput0 = this.container.getSlot("slotInput0");
        var slotInput1 = this.container.getSlot("slotInput1");
        var slotSpecial = this.container.getSlot("slotSpecial");
        var slotContainer = this.container.getSlot("slotContainer");
        var slotContainerFilled = this.container.getSlot("slotContainerFilled");
        var energyDec = 5;

        if (slotContainer.id !== 0 && this.liquidStorage.getLiquidStored()) {

            var full = LiquidRegistry.getFullItem(slotContainer.id, slotContainer.data, this.liquidStorage.getLiquidStored());

            if (full && this.liquidStorage.getAmount(this.liquidStorage.getLiquidStored()) >= 1) {

                if (slotContainerFilled.id === 0) {
                    slotContainer.count--;
                    slotContainerFilled.id = full.id;
                    slotContainerFilled.data = full.data;
                    slotContainerFilled.count = 1;
                    this.liquidStorage.getLiquid(this.liquidStorage.getLiquidStored(), 1);
                } else if (slotContainerFilled.id === full.id && slotContainerFilled.data === full.data && slotContainerFilled.count < Item.getMaxStack(slotContainerFilled.id)) {
                    slotContainer.count--;
                    slotContainerFilled.count++;
                    this.liquidStorage.getLiquid(this.liquidStorage.getLiquidStored(), 1);
                }

                this.container.validateAll();
            }

        }

        if (this.data.progress > 0) {

            if (this.data.energy >= energyDec) {

                this.data.energy -= energyDec;
                this.data.progress++;

                if (this.data.progress >= 160) {

                    this.liquidStorage.addLiquid(this.data.recipe.liquid, this.data.recipe.liquidCount);

                    if (this.data.recipe.special) {
                        if (Math.random() <= this.data.recipe.special.chance) {
                            if (slotSpecial.id === 0) {
                                slotSpecial.id = this.data.recipe.special.id;
                                slotSpecial.data = this.data.recipe.special.data;
                                slotSpecial.count = this.data.recipe.special.count;
                            } else if (slotSpecial.id === this.data.recipe.special.id) {
                                if (slotSpecial.data === this.data.recipe.special.data) {
                                    slotSpecial.count += this.data.recipe.special.count;
                                }
                            }
                        }
                    }

                    this.data.progress = 0;
                    this.data.recipe = 0;

                    this.container.validateAll();
                }
            }

            this.container.setScale("progressScale", this.data.progress / 160);
        } else {
            var input = [slotInput0, slotInput1];
            var recipe = RecipeRegistry.getSqueezerRecipe(input);

            if (recipe && (this.liquidStorage.isEmpty() || this.liquidStorage.getLiquidStored() === recipe.liquid )) {

                slotInput0.count -= recipe.input0.count;
                slotInput1.count -= recipe.input1.count;

                this.data.recipe = recipe;
                this.data.progress = 1;

                this.container.validateAll();
            }

        }

        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());

    },

    getEnergyStorage: function () {
        return 5000;
    },


});