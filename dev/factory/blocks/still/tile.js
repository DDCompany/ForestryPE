MachineRegistry.register(BlockID.still, {
    defaultValues: {
        progress: 0,
        progressMax: 0,
        outputAmount: 0,

        inputLiquid: null,
        outputLiquid: null
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

    drainContainer: function () {
        let slot = this.container.getSlot("slotInputContainer");
        let empty = LiquidRegistry.getEmptyItem(slot.id, slot.data);

        if (!empty)
            return;

        let liquid = empty.liquid;
        if (!this.data.inputLiquid || this.data.inputLiquid === liquid) {
            if (this.liquidStorage.getAmount(liquid) + 1 > 10)
                return;

            if (--slot.count === 0) {
                slot.id = empty.id;
                slot.data = empty.data;
                slot.count = 1;
            }

            this.liquidStorage.addLiquid(liquid, 1);
            this.data.inputLiquid = liquid;
        }
    },

    fillContainer: function () {
        let liquid = this.data.outputLiquid;

        if (!liquid)
            return;

        if (this.liquidStorage.getAmount(liquid) < 1)
            return;

        let slotEmpty = this.container.getSlot("slotOutputContainer");
        let slotFull = this.container.getSlot("slotOutputContainerFilled");
        let full = LiquidRegistry.getFullItem(slotEmpty.id, slotEmpty.data, liquid);

        if (full) {
            if (!ContainerHelper.putInSlot(slotFull, full))
                return;

            slotEmpty.count--;
            this.liquidStorage.getLiquid(liquid, 1);
            this.container.validateSlot("slotOutputContainer");
        }
    },

    findWork: function () {
        let liquid = this.data.inputLiquid;
        let recipe = StillManager.getRecipe(liquid);

        if (!recipe)
            return false;

        let required = recipe.inputAmount * recipe.cycles;
        if (this.liquidStorage.getAmount(liquid) < required)
            return false;

        let outputLiquid = this.data.outputLiquid;
        if (!outputLiquid ||
            (outputLiquid === recipe.outputLiquid && this.liquidStorage.getAmount(outputLiquid) + (recipe.outputAmount * recipe.cycles) <= 10)){
            this.liquidStorage.getLiquid(liquid, required);

            this.data.outputAmount = recipe.outputAmount || 1;
            this.data.outputLiquid = recipe.outputLiquid;
            this.data.progress = this.data.progressMax = recipe.cycles || 100;
            return true;
        }

        return false;
    },

    tick: function () {
        let threadTime = World.getThreadTime();
        if (threadTime % 20 === 0) {
            this.drainContainer();
            this.fillContainer();
        }

        if (threadTime % 5 === 0) {
            if(this.data.progressMax || this.findWork()) {
                if (this.data.progress <= 0) {
                    this.liquidStorage.addLiquid(this.data.outputLiquid, this.data.outputAmount * this.data.progressMax);
                    this.data.progressMax = 1;
                } else if (this.data.energy >= 200) {
                    this.data.energy -= 200;
                    this.data.progress--;
                }
            }
        }

        this.liquidStorage.updateUiScale("liquidInputScale", this.data.inputLiquid);
        this.liquidStorage.updateUiScale("liquidOutputScale", this.data.outputLiquid);
        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
    },

    getEnergyStorage: function () {
        return 8000;
    }
});