TileEntity.registerPrototype(BlockID.alvearyHygroregulator, {

    defaultValues: {
        time: 0,
        humidity: 0,
        climate: 0
    },

    init() {
        this.liquidStorage.setLimit(null, 10);
    },

    tick() {
        var slotContainerFull = this.container.getSlot("slotLiquid");
        let liquidStored = this.liquidStorage.getLiquidStored();

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

        if (slotContainerFull.id)
            ContainerHelper.drainContainer2(liquidStored, this, "slotLiquid", "slotContainer");

        this.liquidStorage.updateUiScale("liquidScale", liquidStored);
        this.container.validateAll();
    },

    alvearyTick(tile) {
        if (this.data.time && tile.humidity !== undefined) {
            tile.humidity = Math.min(BiomeHelper.HUMIDITY_DAMP, tile.humidity + this.data.humidity);
        }

        if (this.data.time && tile.climate !== undefined) {
            tile.climate = Math.min(BiomeHelper.CLIMATE_HELLISH, tile.climate + this.data.climate);
        }
    },

    getGuiScreen() {
        return alvearyHygroregulatorGUI;
    }
});