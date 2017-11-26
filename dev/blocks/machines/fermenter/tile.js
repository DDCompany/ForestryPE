MachineRegistry.register(BlockID.fermenter, {
    defaultValues: {
        liquidAmount: 0,
        progress: 0,
        reagentMax: 0,
        reagentRemain: 0,
        liquidUsed: 0
    },

    getTransportSlots: function () {
        return {input: ["slotPlant"], output: []};
    },

    getGuiScreen: function () {
        return fermenterGUI;
    },

    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },
    tick: function () {

        if (this.liquidStorage.getAmount("water") > 0) {
            this.liquidStorage.updateUiScale("liquidInputScale", "water");
        } else if (this.liquidStorage.getAmount("honey") > 0) {
            this.liquidStorage.updateUiScale("liquidInputScale", "honey");
        } else if (this.liquidStorage.getAmount("appleJuice") > 0) {
            this.liquidStorage.updateUiScale("liquidInputScale", "appleJuice");
        } else {
            this.liquidStorage.updateUiScale("liquidInputScale", null);
        }

        ContainerHelper.emptyContainer(["water", "honey", "appleJuice"], this, "slotInputContainer");
        ContainerHelper.fillContainer(["biomass"], this, {empty: "slotContainer", full: "slotFilledContainer"});

        if (this.data.reagentRemain === 0) {

            let slotReagent = this.container.getSlot("slotReagent");
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

        if (this.data.progress > 0) {

            if (this.data.energy >= 40 && this.liquidStorage.getAmount("biomass") + 1 <= 10) {
                this.data.progress++;
                this.data.energy -= 40;

                if (this.data.progress >= 160) {

                    if (this.data.liquidUsed === "honey" || this.data.liquidUsed === "appleJuice") {
                        this.liquidStorage.addLiquid("biomass", this.data.liquidAmount / 1.5);
                    } else {
                        this.liquidStorage.addLiquid("biomass", this.data.liquidAmount);
                    }
                    this.data.progress = 0;
                    this.data.reagentRemain--;

                }
            }

        } else if (this.data.reagentRemain > 0) {
            let slotPlant = this.container.getSlot("slotPlant");
            let recipe = RecipeRegistry.getBioItem(slotPlant.id);

            if (recipe) {
                let liquid = false;

                if (this.liquidStorage.getAmount("water") >= recipe.liquidAmount) {
                    liquid = "water";
                } else if (this.liquidStorage.getAmount("honey") >= recipe.liquidAmount) {
                    liquid = "honey";
                } else if (this.liquidStorage.getAmount("appleJuice") >= recipe.liquidAmount) {
                    liquid = "appleJuice";
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

        this.liquidStorage.updateUiScale("liquidOutputScale", "biomass");
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("reagentScale", this.data.reagentRemain / this.data.reagentMax);
        this.container.setScale("progressScale", this.data.progress / 160);

        this.container.validateAll();
    },

    getEnergyStorage: function () {
        return 8000;
    },


});