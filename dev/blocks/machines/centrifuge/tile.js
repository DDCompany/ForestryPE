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

        if (World.getThreadTime() % 5 === 0) {
            if (this.data.progress > 0 && this.data.energy >= 160) {

                if (this.data.progress >= 20) {
                    this.data.progress = 0;
                    ContainerHelper.putInSlotsChance(this.data.outputIDs, this.container, this.OUTPUT_SLOTS)
                } else {
                    this.data.progress++;
                    this.data.energy -= 160;
                }

            } else if (this.data.progress === 0) {
                let slotInput = this.container.getSlot("slotInput");
                let output = RecipeRegistry.getCentrifugeRecipe(slotInput.id, slotInput.data);
                if (output) {
                    this.data.progress = 1;
                    this.data.outputIDs = output.result;
                    slotInput.count--;
                    this.container.validateAll();
                }

            }
        }

        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("progressScale", this.data.progress / 20);
    },

    getEnergyStorage: function () {
        return 5000;
    },


});