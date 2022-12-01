MachineRegistry.registerConsumer(BlockID.alvearyFan, {
    useNetworkItemContainer: true,
    defaultValues: {},

    alvearyTick(tile: TileEntity) {
        if (this.data.energy >= 10 && tile.climate !== undefined) {
            this.data.energy -= 10;
            tile.climate = Math.max(Temperature.ICY, Math.round(tile.climate - (tile.climate * 0.2)));
        }
    },

    getEnergyStorage() {
        return 40;
    },
});