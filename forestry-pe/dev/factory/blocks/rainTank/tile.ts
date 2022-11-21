if (ForestryConfig.rainTankEnabled) {
    MachineRegistry.registerDefault(BlockID.rainTank, {
        useNetworkItemContainer: true,

        defaultValues: {},

        init() {
            this.liquidStorage.setLimit(null, 15);
        },

        tick() {
            this.updateLiquidScale("liquidScale", "water");

            ContainerHelper.fillContainer("water", this, "slotContainer", "slotFullContainer");

            if (!(World.getThreadTime() % 20) && this.blockSource.canSeeSky(this.x, this.y + 1, this.z) && World.getWeather().rain) {
                this.liquidStorage.addLiquid("water", 0.01);
            }
            this.container.sendChanges();
        },

        getScreenByName() {
            return raintankGUI;
        }
    });

    StorageInterface.createInterface(BlockID.rainTank, {
        slots: {
            "slotContainer": {
                input: true
            },
            "slotFullContainer": {
                output: true
            }
        },

        canTransportLiquid() {
            return true;
        },
    });
}