MachineRegistry.register(BlockID.alvearyFan, {

    defaultValues: {},

    tick: function () {
    },

    changeClimate: function (tile) {
        if (this.data.energy >= 10 && tile.climate !== undefined) {
            this.data.energy -= 10;
            return Math.max(BiomeHelper.CLIMATE_ICY, parseInt(tile.climate - (tile.climate * 0.2)));
        }
        return tile.climate;
    },

    getEnergyStorage: function () {
        return 40;
    },

    getGuiScreen: function () {
        return null;
    }

});