MachineRegistry.registerConsumer(BlockID.alvearyHeater, {
    defaultValues: {},

    alvearyTick: function (tile) {
        if (this.data.energy >= 10 && tile.climate !== undefined) {
            this.data.energy -= 10;
            tile.climate = Math.max(BiomeHelper.CLIMATE_HELLISH, parseInt(tile.climate + (tile.climate * 0.2)));
        }
    },

    getEnergyStorage: function () {
        return 40;
    }

});