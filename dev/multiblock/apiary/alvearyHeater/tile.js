MachineRegistry.register(BlockID.alvearyHeater, {

    defaultValues: {},

    tick: function () {

    },

    changeClimate: function () {
        if (this.data.energy >= 10 && tile.climate !== undefined) {
            this.data.energy -= 10;
            return Math.max(BiomeHelper.CLIMATE_HELLISH, parseInt(tile.climate + (tile.climate * 0.2)));
        }
        return tile.climate;
    },

    getEnergyStorage: function () {
        return 40;
    }

});