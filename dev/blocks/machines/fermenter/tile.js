MachineRegistry.register(BlockID.fermenter, {
    defaultValues: {
        liquidAmount: 0,
        progress: 0,
        reagentMax: 0,
        reagentRemain: 0,
        liquidUsed: 0
    },

    getTransportSlots: function () {
        var inp = ["slotPlant"];
        return {input: inp, output: []};
    },

    getGuiScreen: function () {
        return fermenterGUI;
    },

    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },
    tick: function () {

        var slotLiquidInput = this.container.getSlot("slotLiquidInput");
        var slotPlant = this.container.getSlot("slotPlant");
        var slotReagent = this.container.getSlot("slotReagent");
        var slotContainer = this.container.getSlot("slotContainer");
        var slotFilledContainer = this.container.getSlot("slotFilledContainer");
        var slotLiquidInputEmpty = this.container.getSlot("slotLiquidInputEmpty");
        var energyDec = 5;

        if (this.liquidStorage.hasDataFor("water") && this.liquidStorage.getAmount("water") > 0) {
            this.liquidStorage.updateUiScale("liquidInputScale", "water");
        } else if (this.liquidStorage.hasDataFor("forestryHoney") && this.liquidStorage.getAmount("forestryHoney") > 0) {
            this.liquidStorage.updateUiScale("liquidInputScale", "forestryHoney");
        } else if (this.liquidStorage.hasDataFor("forestryJuice") && this.liquidStorage.getAmount("forestryJuice") > 0) {
            this.liquidStorage.updateUiScale("liquidInputScale", "forestryJuice");
        }

        if (this.liquidStorage.hasDataFor("forestryBiomass") && this.liquidStorage.getAmount("forestryBiomass") > 0) {
            this.liquidStorage.updateUiScale("liquidOutputScale", "forestryBiomass");
        }

        if (slotLiquidInput.id > 0) {
            var liquid = LiquidRegistry.getItemLiquid(slotLiquidInput.id, slotLiquidInput.data);
            var empty = LiquidRegistry.getEmptyItem(slotLiquidInput.id, slotLiquidInput.data);
            var f = false;

            if (liquid === "water") {
                if ((this.liquidStorage.getAmount("water") > 0 && this.liquidStorage.getAmount("water") + 1 <= 10) || (this.liquidStorage.getAmount("forestryHoney") === 0 && this.liquidStorage.getAmount("forestryJuice") === 0 && this.liquidStorage.getAmount("water") + 1 <= 10)) {
                    f = true;
                }

            }

            if (liquid === "forestryHoney") {
                if ((this.liquidStorage.getAmount("forestryHoney") > 0 && this.liquidStorage.getAmount("forestryHoney") + 1 <= 10) || (this.liquidStorage.getAmount("water") === 0 && this.liquidStorage.getAmount("forestryJuice") === 0 && this.liquidStorage.getAmount("forestryHoney") + 1 <= 10)) {
                    f = true;
                }
            }

            if (liquid === "forestryJuice") {
                if ((this.liquidStorage.getAmount("forestryJuice") > 0 && this.liquidStorage.getAmount("forestryJuice") + 1 <= 10) || (this.liquidStorage.getAmount("water") === 0 && this.liquidStorage.getAmount("forestryHoney") === 0 && this.liquidStorage.getAmount("forestryJuice") + 1 <= 10)) {
                    f = true;
                }
            }

            if (f) {
                if (slotLiquidInputEmpty.id === 0) {
                    this.liquidStorage.addLiquid(liquid, 1);
                    this.container.setSlot("slotLiquidInputEmpty", empty.id, 1, empty.data);
                    slotLiquidInput.count--;
                } else if (slotLiquidInputEmpty.id === empty.id) {
                    if (slotLiquidInputEmpty.count < Item.getMaxStack(slotLiquidInputEmpty.id)) {
                        slotLiquidInputEmpty.count++;
                        slotLiquidInput.count--;
                        this.liquidStorage.addLiquid(liquid, 1);
                    }
                }

            }

        }

        if (slotContainer.id > 0 && this.liquidStorage.getAmount("forestryBiomass") >= 1) {

            var full = LiquidRegistry.getFullItem(slotContainer.id, slotContainer.data, "forestryBiomass");

            if (slotFilledContainer.id === 0) {
                this.container.setSlot("slotFilledContainer", full.id, 1, full.data);
                this.liquidStorage.getLiquid("forestryBiomass", 1);
                slotContainer.count--;
            } else if (slotFilledContainer.id === full.id) {
                if (slotFilledContainer.count < Item.getMaxStack(slotFilledContainer.id)) {
                    this.liquidStorage.getLiquid("forestryBiomass", 1);
                    slotContainer.count--;
                    slotFilledContainer.count++;
                }

            }
            this.liquidStorage.updateUiScale("liquidOutputScale", "forestryBiomass");

        }

        if (this.data.reagentRemain === 0) {

            if (slotReagent.id === ItemID.mulch) {

                this.data.reagentRemain = 250;
                this.data.reagentMax = 250;
                slotReagent.count--;

            } else if (slotReagent.id === ItemID.fertilizerCompound) {

                this.data.reagentRemain = 200;
                this.data.reagentMax = 200;
                slotReagent.count--;

            }

        }

        if (this.data.progress > 0 && this.data.energy >= energyDec && this.liquidStorage.getAmount("forestryBiomass") + 1 <= 10) {
            this.data.progress++;
            this.data.energy -= energyDec;

            if (this.data.progress >= 160) {

                if (this.data.liquidUsed === "forestryHoney" || this.data.liquidUsed === "forestryJuice") {
                    this.liquidStorage.addLiquid("forestryBiomass", this.data.liquidAmount / 1.5);
                } else {
                    this.liquidStorage.addLiquid("forestryBiomass", this.data.liquidAmount);
                }
                this.data.progress = 0;
                this.data.reagentRemain--;

            }

        } else if (this.data.reagentRemain > 0) {
            var recipe = RecipeRegistry.getBioItem(slotPlant.id);

            if (recipe) {
                var liquid = false;

                if (this.liquidStorage.getAmount("water") >= recipe.liquidAmount) {
                    liquid = "water";
                } else if (this.liquidStorage.getAmount("forestryHoney") >= recipe.liquidAmount) {
                    liquid = "forestryHoney";
                } else if (this.liquidStorage.getAmount("forestryJuice") >= recipe.liquidAmount) {
                    liquid = "forestryJuice";
                }

                if (liquid) {
                    this.data.liquidAmount = recipe.liquidAmount;
                    slotPlant.count--;
                    this.data.liquidUsed = liquid;
                    this.data.progress = 1;
                    this.liquidStorage.getLiquid(liquid, recipe.liquidAmount);
                    this.liquidStorage.updateUiScale("liquidInputScale", liquid);
                }
            }
        }

        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("reagentScale", this.data.reagentRemain / this.data.reagentMax);
        this.container.setScale("progressScale", this.data.progress / 160);

        this.container.validateAll();
    },

    getEnergyStorage: function () {
        return 8000;
    },


});