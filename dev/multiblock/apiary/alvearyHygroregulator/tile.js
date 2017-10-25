TileEntity.registerPrototype(BlockID.alvearyHygroregulator, {

    defaultValues: {
        time: 0,
        humidity: 0,
        climate: 0
    },

    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },

    getTransportSlots: function () {
        return {input: ["slotLiquid"], output: ["slotContainer"]};
    },

    tick: function () {
        var slotContainerFull = this.container.getSlot("slotLiquid");

        if (this.data.time <= 0) {
            var liquid = this.liquidStorage.getAmount("water") ? "water" : "lava";
            if (this.liquidStorage.getAmount(liquid)) {
                this.liquidStorage.getLiquid(liquid, 0.001);
                if (liquid === "water") {
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

        if (this.liquidStorage.getAmount("water")) {
            ContainerHelper.fluidContainerEmpty(["water"], this, {full: "slotLiquid", empty: "slotContainer"});
        } else if (this.liquidStorage.getAmount("lava")) {
            ContainerHelper.fluidContainerEmpty(["lava"], this, {full: "slotLiquid", empty: "slotContainer"});
        } else if (slotContainerFull.id) {
            ContainerHelper.fluidContainerEmpty(["lava", "water"], this, {full: "slotLiquid", empty: "slotContainer"});
        }

        this.liquidStorage.updateUiScale("liquidScale", this.liquidStorage.getAmount("water") ? "water" : "lava");

        this.container.validateAll();
    },

    alvearyTick: function (tile) {
        if (this.data.time && tile.humidity !== undefined) {
            tile.humidity = Math.min(BiomeHelper.HUMIDITY_DAMP, tile.humidity + this.data.humidity);
        }

        if (this.data.time && tile.climate !== undefined) {
            tile.climate = Math.min(BiomeHelper.CLIMATE_HELLISH, tile.climate + this.data.climate);
        }
    },

    getGuiScreen: function () {
        return alvearyHygroregulatorGUI;
    }
});