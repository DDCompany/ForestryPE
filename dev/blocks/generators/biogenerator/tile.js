MachineRegistry.register(BlockID.biogenerator, {
        defaultValues: {
            progress: 0
        },

        getTransportSlots: function () {
            return {input: ["slotContainer"], output: ["slotEmptyContainer"]};
        },

        init: function () {
            this.liquidStorage.setLimit(null, 10);
        },

        getGuiScreen: function () {
            return biogeneratorGUI;
        },

        tick: function () {
            ContainerHelper.emptyContainer(null, this, "slotContainer");

            let stored = this.liquidStorage.getLiquidStored();
            let fuel = RecipeRegistry.getBiogeneratorFuel(stored);
            if (fuel && this.liquidStorage.getAmount(stored) >= 0.001) {

                if (this.data.energy + fuel.energy <= this.getEnergyStorage()) {
                    this.data.energy += fuel.energy;
                    this.data.progress++;
                    if (this.data.progress > fuel.ticks) {
                        this.data.progress = 0;
                        this.liquidStorage.getLiquid(stored, 0.001);
                    }
                }
            }

            this.liquidStorage.updateUiScale("liquidScale", stored);
            this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());

            this.container.validateAll();

        },

        isGenerator: function () {
            return true;
        },

        getEnergyStorage: function () {
            return 30000;
        },

        energyTick: function (type, src) {
            let out = Math.min(32, this.data.energy);
            this.data.energy += src.add(out) - out;
        }
}, true);