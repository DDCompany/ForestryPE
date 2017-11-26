MachineRegistry.register(BlockID.still, {
    defaultValues: {
        progress: 0
    },

    getTransportSlots: function () {
        return {input: ["slotBiomassContainer"], output: ["slotBiomassEmptyContainer", "slotEthanolContainer"]};
    },

    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },

    getGuiScreen: function () {
        return stillGUI;
    },

    tick: function () {
        ContainerHelper.emptyContainer("biomass", this, "slotBiomassContainer");
        ContainerHelper.fillContainer(["ethanol"], this, {
            empty: "slotEthanolContainer",
            full: "slotEthanolContainerFilled"
        });

        if (this.data.progress && this.data.energy >= 2) {
            this.data.progress++;
            this.data.energy -= 2;
            if (this.data.progress >= 10) {
                this.liquidStorage.addLiquid("ethanol", 0.03);
                this.data.progress = 0;
            }
        } else if (this.liquidStorage.getAmount("ethanol") + 0.003 <= 10 && this.liquidStorage.getAmount("biomass") >= 0.01) {
            this.liquidStorage.getLiquid("biomass", 0.01);
            this.data.progress = 1;
        }

        this.liquidStorage.updateUiScale("liquidBiomassScale", "biomass");
        this.liquidStorage.updateUiScale("liquidEthanolScale", "ethanol");
        this.container.setScale("progressScale", this.data.progress / 10);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());

        this.container.validateAll();
    },

    getEnergyStorage: function () {
        return 8000;
    },


});