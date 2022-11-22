if (ForestryConfig.rainTankEnabled) {
    TileEntity.registerPrototype(BlockID.rainTank, {
        defaultValues: {},

        init: function () {
            this.liquidStorage.setLimit(null, 15);
        },

        tick: function () {
            this.liquidStorage.updateUiScale("liquidScale", "water");

            ContainerHelper.fillContainer("water", this, "slotContainer", "slotFullContainer");

            if (!(World.getThreadTime() % 20) && GenerationUtils.canSeeSky(this.x, this.y + 1, this.z) && World.getWeather().rain) {
                this.liquidStorage.addLiquid("water", 0.01);
            }
        },

        getGuiScreen: function () {
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

        canTransportLiquid: function () {
            return true;
        },
    });
}