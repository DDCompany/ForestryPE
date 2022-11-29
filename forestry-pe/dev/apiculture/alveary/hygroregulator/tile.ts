MachineRegistry.registerDefault(BlockID.alvearyHygroregulator, {
    useNetworkItemContainer: true,
    defaultValues: {
        time: 0,
        humidity: 0,
        climate: 0
    },

    init() {
        this.liquidStorage.setLimit(null, 10);
    },

    tick() {
        const liquidStored = this.liquidStorage.getLiquidStored();

        if (this.data.time <= 0) {
            if (this.liquidStorage.getAmount(liquidStored)) {
                this.liquidStorage.getLiquid(liquidStored, 0.001);
                if (liquidStored === "water") {
                    this.data.time = 1;
                    this.data.humidity = 2;
                    this.data.climate = -1;
                } else {
                    this.data.time = 10;
                    this.data.humidity = -1;
                    this.data.climate = 2;
                }
            }
        } else {
            this.data.time--;
        }

        const slotContainerFull = this.container.getSlot("slotLiquid");
        if (slotContainerFull.id) {
            ContainerHelper.drainContainer2(liquidStored, this, "slotLiquid", "slotContainer");
        }

        this.updateLiquidScale("liquidScale", liquidStored);
        this.container.validateAll();
        this.container.sendChanges();
    },

    alvearyTick(tile: TileEntity) {
        if (this.data.time && tile.humidity !== undefined) {
            tile.humidity = Math.min(BiomeHelper.HUMIDITY_DAMP, tile.humidity + this.data.humidity);
        }

        if (this.data.time && tile.climate !== undefined) {
            tile.climate = Math.min(BiomeHelper.CLIMATE_HELLISH, tile.climate + this.data.climate);
        }
    },

    getScreenByName() {
        return alvearyHygroregulatorGUI;
    },
});