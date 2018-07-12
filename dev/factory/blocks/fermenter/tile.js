MachineRegistry.register(BlockID.fermenter, {
    defaultValues: {
        progress: 0,
        progressMax: 1,

        fuel: 0,
        fuelMax: 1,
        fuelFerment: 0,

        resultFluid: null,
        containerFluid: null,
        inputFluid: null
    },

    getTransportSlots: function () {
        return {input: ["slotFuel"], output: []};
    },

    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },

    findWork: function () {
        if (!this.getLiquidModifier())
            return;

        let slot = this.container.getSlot("slotInput");
        let recipe = FermenterManager.getRecipe(slot.id, slot.data);
        if (recipe) {
            if (this.data.containerFluid && this.data.containerFluid !== recipe.liquid)
                return;

            this.data.resultFluid = recipe.liquid;
            this.data.progress = this.data.progressMax = recipe.time || 1200;

            slot.count--;
            this.container.validateSlot("slotInput");
        }
    },

    findFuel: function () {
        if (!this.data.fuel) {
            let slot = this.container.getSlot("slotFuel");
            let fuel = FermenterManager.getFuel(slot.id, slot.data);
            if (fuel) {
                this.data.fuel = this.data.fuelMax = fuel.cycles || 1;
                this.data.fuelFerment = fuel.perCycle || 1;

                slot.count--;
                this.container.validateSlot("slotFuel");
                return true;
            }
            return false;
        }

        return true;
    },

    getLiquidModifier: function () {
        switch (this.data.inputFluid) {
            case "appleJuice":
            case "honey":
                return 1.5;
            case "water":
                return 1;
            default:
                return 0;
        }
    },

    tick: function () {
        if (World.getThreadTime() % 5 !== 0)
            return;

        let inputFluid = ContainerHelper.drainContainer(this.data.inputFluid, this, "slotInputContainer");
        if (inputFluid)
            this.data.inputFluid = inputFluid;

        if (ContainerHelper.fillContainer(this.data.containerFluid, this, "slotContainer", "slotFilledContainer")) {
            if (this.liquidStorage.getAmount(this.data.containerFluid) <= 0) {
                this.data.containerFluid = null;
            }
        }

        if (this.data.energy >= 150) {
            if (this.data.progress) {
                if (this.findFuel()) {
                    let fermented = Math.min(this.data.fuelFerment, this.data.progress) * this.getLiquidModifier();
                    let _fermented = fermented / 1000;

                    let inputFluid = this.data.inputFluid;
                    let resultFluid = this.data.resultFluid;

                    if (this.liquidStorage.getAmount(inputFluid) >= _fermented
                        && this.liquidStorage.getAmount(resultFluid) + _fermented <= 10) {
                        this.data.progress -= fermented;
                        this.data.fuel--;
                        this.data.containerFluid = resultFluid;
                        this.liquidStorage.addLiquid(resultFluid, _fermented);
                        this.liquidStorage.getLiquid(inputFluid, _fermented);
                        this.data.energy -= 150;
                    }
                }
            } else this.findWork();
        }

        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("reagentScale", (this.data.fuel / this.data.fuelMax) || 0);
        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.liquidStorage.updateUiScale("liquidInputScale", inputFluid || this.data.inputFluid);
        this.liquidStorage.updateUiScale("liquidOutputScale", this.data.containerFluid);
    },

    getEnergyStorage: function () {
        return 8000;
    },

    getGuiScreen: function () {
        return fermenterGUI;
    }
});