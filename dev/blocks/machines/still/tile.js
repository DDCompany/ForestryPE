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
    addToSlot: function (empty, slot) {

        var slotEmptyContainer = this.container.getSlot(slot);

        if (slotEmptyContainer.id == 0) {
            slotEmptyContainer.id = empty.id;
            slotEmptyContainer.data = empty.data;
            slotEmptyContainer.count = 1;
            return true;
        } else if (slotEmptyContainer.id == empty.id && slotEmptyContainer.data == empty.data && slotEmptyContainer.count + 1 != Item.getMaxStack(slotEmptyContainer.id)) {
            slotEmptyContainer.count++;
            return true;
        }

        return false;
    },
    tick: function () {
        var slotBiomassContainer = this.container.getSlot("slotBiomassContainer");
        var slotEthanolEmptyContainer = this.container.getSlot("slotEthanolEmptyContainer");

        var energyDec = 2;

        if (slotBiomassContainer.id != 0 && this.liquidStorage.getAmount("forestryBiomass") + 1 <= 10) {
            var empty = LiquidRegistry.getEmptyItem(slotBiomassContainer.id, slotBiomassContainer.data);

            if (empty && empty.liquid == "forestryBiomass" && this.addToSlot(empty, "slotBiomassEmptyContainer")) {
                slotBiomassContainer.count--;
                this.liquidStorage.addLiquid("forestryBiomass", 1);
            }
        }

        if (slotEthanolEmptyContainer.id != 0 && this.liquidStorage.getAmount("forestryEthanol") >= 1) {
            var full = LiquidRegistry.getFullItem(slotEthanolEmptyContainer.id, slotEthanolEmptyContainer.data, "forestryEthanol");

            if (full && this.addToSlot(full, "slotEthanolContainer")) {
                slotEthanolEmptyContainer.count--;
                this.liquidStorage.getLiquid("forestryEthanol", 1);
            }
        }

        if (this.data.progress && this.data.energy >= energyDec) {
            this.data.progress++;
            this.data.energy -= energyDec;
            if (this.data.progress >= 10) {
                this.liquidStorage.addLiquid("forestryEthanol", 0.03);
                this.data.progress = 0;
            }
        } else if (this.liquidStorage.getAmount("forestryEthanol") + 0.003 <= 10 && this.liquidStorage.getAmount("forestryBiomass") >= 0.01) {
            this.liquidStorage.getLiquid("forestryBiomass", 0.01);
            this.data.progress = 1;
        }

        this.liquidStorage.updateUiScale("liquidBiomassScale", "forestryBiomass");
        this.liquidStorage.updateUiScale("liquidEthanolScale", "forestryEthanol");
        this.container.setScale("progressScale", this.data.progress / 10);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());

        this.container.validateAll();
    },

    getEnergyStorage: function () {
        return 8000;
    },


});