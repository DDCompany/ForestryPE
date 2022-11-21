MachineRegistry.registerConsumer(BlockID.fermenter, {
    useNetworkItemContainer: true,

    defaultValues: {
        progress: 0,
        progressMax: 1,
        modifier: 1,

        fuelBurnTime: 0,
        fuelBurnMax: 0,
        fuelFerment: 0,

        resultFluid: null,
        containerFluid: null,
        inputFluid: null
    },

    init() {
        this.liquidStorage.setLimit(null, 10);
    },

    findWork() {
        let slot = this.container.getSlot("slotInput");
        let recipe = FermenterManager.getRecipe(slot.id, slot.data, this.data.inputFluid);
        if (recipe) {
            if (this.data.containerFluid && this.data.containerFluid !== recipe.liquid)
                return;

            this.data.modifier = recipe.modifier;
            this.data.resultFluid = recipe.liquid;
            this.data.progress = this.data.progressMax = recipe.liquidAmount * 1000;

            this.container.setSlot("slotInput", slot.id, slot.count - 1, slot.data);
            this.container.validateSlot("slotInput");
        }
    },

    findFuel() {
        if (!this.data.fuelBurnTime) {
            let slot = this.container.getSlot("slotFuel");
            let fuel = FermenterManager.getFuel(slot.id, slot.data);
            if (fuel) {
                this.data.fuelBurnTime = this.data.fuelBurnMax = fuel.cycles || 1;
                this.data.fuelFerment = fuel.perCycle || 1;

                this.container.setSlot("slotFuel", slot.id, slot.count - 1, slot.data);
                this.container.validateSlot("slotFuel");
                return true;
            }
            return false;
        }

        return true;
    },

    tick() {
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
            if (this.data.progress > 0) {
                if (this.findFuel()) {
                    let fermented = Math.min(this.data.fuelFerment, this.data.progress) * this.data.modifier;
                    let _fermented = fermented / 1000;

                    let inputFluid = this.data.inputFluid;
                    let resultFluid = this.data.resultFluid;

                    if (this.liquidStorage.getAmount(inputFluid) >= _fermented
                        && this.liquidStorage.getAmount(resultFluid) + _fermented <= 10) {
                        this.data.progress -= fermented;
                        this.data.fuelBurnTime--;
                        this.data.containerFluid = resultFluid;
                        this.liquidStorage.addLiquid(resultFluid, _fermented);
                        this.liquidStorage.getLiquid(inputFluid, _fermented);
                        this.data.energy -= 150;
                    }
                }
            } else this.findWork();
        }

        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("reagentScale", (this.data.fuelBurnTime / this.data.fuelBurnMax) || 0);
        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.updateLiquidScale("liquidInputScale", inputFluid || this.data.inputFluid);
        this.updateLiquidScale("liquidOutputScale", this.data.containerFluid);
        this.container.sendChanges();
    },

    getEnergyStorage() {
        return 8000;
    },

    getMaxTransfer() {
        return 2000;
    },

    getScreenByName() {
        return fermenterGUI;
    }
});

StorageInterface.createInterface(BlockID.fermenter, {
    slots: {
        "slotInput": {
            input: true,

            isValid(item) {
                return !!FermenterManager.getRecipeByItem(item.id, item.data);
            },
        },
        "slotFuel": {
            input: true,

            isValid(item) {
                return !!FermenterManager.getFuel(item.id, item.data);
            },
        },
        "slotFilledContainer": {
            output: true
        },
        "slotInputContainer": {
            input: true,
            output: true,

            canOutput(item) {
                return LiquidRegistry.getEmptyItem(item.id, item.data) == null;
            },

            isValid(item) {
                return LiquidRegistry.getEmptyItem(item.id, item.data) != null;
            },
        },
        "slotContainer": {
            input: true,

            isValid(item) {
                return !LiquidRegistry.getEmptyItem(item.id, item.data);
            },
        },
    },

    canReceiveLiquid(liquid) {
        if (!this.tileEntity.inputFluid && this.tileEntity.getLiquidModifier(liquid) > 0) {
            this.tileEntity.inputFluid = liquid;
            return true;
        }

        return this.tileEntity.inputFluid === liquid;
    },

    canTransportLiquid(liquid) {
        return this.tileEntity.data.resultFluid === liquid;
    },
});