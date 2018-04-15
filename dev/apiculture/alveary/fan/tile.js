MachineRegistry.register(BlockID.alvearyFan, {

    defaultValues: {},

    alvearyTick: function (tile) {
        if (this.data.energy >= 10 && tile.climate !== undefined) {
            this.data.energy -= 10;
            tile.climate = Math.max(BiomeHelper.CLIMATE_ICY, parseInt(tile.climate - (tile.climate * 0.2)));
        }

    },

    getEnergyStorage: function () {
        return 40;
    }
});