MachineRegistry.registerGenerator(BlockID.biogenerator, {
    useNetworkItemContainer: true,

    defaultValues: {
        progress: 0
    },

    init() {
        this.liquidStorage.setLimit(null, 10);
    },

    tick() {
        ContainerHelper.drainContainer(null, this, "slotContainer");

        let stored = this.liquidStorage.getLiquidStored();
        let fuel = BioGeneratorManager.getFuel(stored);
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

        this.updateLiquidScale("liquidScale", stored);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.container.validateAll();
        this.container.sendChanges();
    },

    getEnergyStorage() {
        return 30000;
    },

    getScreenByName() {
        return biogeneratorGUI;
    },
}, EU);

StorageInterface.createInterface(BlockID.biogenerator, {
    slots: {
        "slotContainer": {
            input: true,
            output: true,
            canOutput(item) {
                return LiquidRegistry.getEmptyItem(item.id, item.data) != null;
            }
        },
    },

    canReceiveLiquid(liquid) {
        return !!BioGeneratorManager.getFuel(liquid);
    }
});