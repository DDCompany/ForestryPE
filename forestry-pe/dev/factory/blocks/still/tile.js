MachineRegistry.registerConsumer(BlockID.still, {
    defaultValues: {
        progress: 0,
        progressMax: 0,
        outputAmount: 0,

        inputLiquid: null,
        outputLiquid: null
    },

    init() {
        this.liquidStorage.setLimit(null, 10);
    },

    findWork() {
        let liquid = this.data.inputLiquid;
        let recipe = StillManager.getRecipe(liquid);

        if (!recipe)
            return false;

        let required = recipe.inputAmount * recipe.cycles;
        if (this.liquidStorage.getAmount(liquid) < required)
            return false;

        let outputLiquid = this.data.outputLiquid;
        if (!outputLiquid ||
            (outputLiquid === recipe.outputLiquid && this.liquidStorage.getAmount(outputLiquid) + (recipe.outputAmount * recipe.cycles) <= 10)) {
            this.liquidStorage.getLiquid(liquid, required);

            this.data.outputAmount = recipe.outputAmount || 1;
            this.data.outputLiquid = recipe.outputLiquid;
            this.data.progress = this.data.progressMax = recipe.cycles || 100;
            return true;
        }

        return false;
    },

    tick() {
        let threadTime = World.getThreadTime();
        if (threadTime % 20 === 0) {
            let inputLiquid = ContainerHelper.drainContainer(this.data.inputLiquid, this, "slotInputContainer");
            let outputLiquid =
                ContainerHelper.fillContainer(this.data.outputLiquid, this, "slotOutputContainer", "slotOutputContainerFilled");

            if (inputLiquid)
                this.data.inputLiquid = inputLiquid;

            if (outputLiquid)
                this.data.outputLiquid = outputLiquid;

            this.container.validateSlot("slotInputContainer");
            this.container.validateSlot("slotOutputContainer");
        }

        if (threadTime % 5 === 0) {
            if (this.data.progressMax || this.findWork()) {
                if (this.data.progress <= 0) {
                    this.liquidStorage.addLiquid(this.data.outputLiquid, this.data.outputAmount * this.data.progressMax);
                    this.data.progressMax = 0;
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

    getEnergyStorage() {
        return 8000;
    },

    getGuiScreen() {
        return stillGUI;
    }
});

StorageInterface.createInterface(BlockID.still, {
    slots: {
        "slotInputContainer": {
            input: true,
            output: true,

            canOutput(item) {
                return LiquidRegistry.getEmptyItem(item.id, item.data) == null;
            },

            isValid(item) {
                return LiquidRegistry.getEmptyItem(item.id, item.data);
            },
        },

        "slotOutputContainer": {
            input: true
        },

        "slotOutputContainerFilled": {
            output: true
        }
    },

    canTransportLiquid(liquid) {
        return this.tileEntity.data.outputLiquid === liquid;
    },

    canReceiveLiquid(liquid) {
        let inputLiquid = this.tileEntity.data.inputLiquid;
        if (!inputLiquid || inputLiquid === liquid || !this.tileEntity.liquidStorage.getAmount(liquid)) {
            this.tileEntity.data.inputLiquid = liquid;
            return true;
        }

        return false;
    }
});