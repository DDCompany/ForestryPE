MachineRegistry.register(BlockID.centrifuge, {

    OUTPUT_SLOTS: ["slotOutput0", "slotOutput1", "slotOutput2", "slotOutput3", "slotOutput4", "slotOutput5", "slotOutput6", "slotOutput7", "slotOutput8"],

    defaultValues: {
        progress: 0,
        outputIDs: []
    },

    getTransportSlots: function () {
        return {input: ["slotInput"], output: this.OUTPUT_SLOTS};
    },

    getGuiScreen: function () {
        return centrifugeGUI;
    },

    tick: function () {
        var slotInput = this.container.getSlot("slotInput");
        var energyDec = 5;

        if (this.data.progress > 0 && this.data.energy >= energyDec) {

            this.data.progress++;
            this.data.energy -= energyDec;

            if (this.data.progress >= 100) {

                this.data.progress = 0;
                ContainerHelper.putInSlotsChance(this.data.outputIDs, this.container, this.OUTPUT_SLOTS)

            }

        } else if (this.data.progress === 0 && this.data.energy >= energyDec) {
            var output = RecipeRegistry.getCentrifugeRecipe(slotInput.id, slotInput.data);
            if (output) {

                this.data.progress = 1;
                this.data.outputIDs = output.result;
                this.data.energy -= energyDec;
                slotInput.count--;
                this.container.validateAll();
            }

        }

        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("progressScale", this.data.progress / 100);
    },

    getEnergyStorage: function () {
        return 5000;
    },


});