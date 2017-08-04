TileEntity.registerPrototype(BlockID.alvearyHygroregulator, {

    defaultValues: {
        time: 0,
        humidity: 0,
        climate: 0
    },

    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },

    tick: function () {
        var slotContainerFull = this.container.getSlot("slotLiquid");
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

    structureTick: function (tile) {
        if (this.data.time <= 0) {
            var liquid = this.liquidStorage.getAmount("water") ? "water" : "lava";
            if (this.liquidStorage.getAmount(liquid)) {
                this.liquidStorage.getLiquid(liquid, 0.001);
                alert("hi");
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
            tile.data.humidity = Math.min(BiomeHelper.HUMIDITY_DAMP, tile.data.humidity + this.data.humidity);
            tile.data.climate = Math.min(BiomeHelper.CLIMATE_HELLISH, tile.data.climate + this.data.climate);
            this.data.time--;
        }
    },

    getGuiScreen: function () {
        return alvearyHygroregulatorGUI;
    }
});
TileEntity.registerPrototype(BlockID.alveary, {

    defaultValues: {
        center: false,
        dhumidity: 0,
        dclimate: 0,
        humidity: 0,
        climate: 0,
        mutate: true
    },

    rebuildStructure: function () {
        World.setBlock(this.x - 1, this.y, this.z, BlockID.alveary);
        World.setBlock(this.x + 1, this.y, this.z, BlockID.alveary);
        World.setBlock(this.x, this.y, this.z - 1, BlockID.alveary);
        World.setBlock(this.x, this.y, this.z + 1, BlockID.alveary);

        this.data.center = false;
    },

    blockTick: function () {
        var x = this.x - 1;
        var y = this.y - 2;
        var z = this.z - 1;
        for (var xx = 0; xx < 3; xx++) {
            for (var yy = 0; yy < 3; yy++) {
                for (var zz = 0; zz < 3; zz++) {
                    var block = World.getBlock(x + xx, y + yy, z + zz);
                    if (block !== BlockID.alveary && block !== BlockID.alveary_misc) {
                        var tile = World.getTileEntity(x + xx, y + yy, z + zz);
                        if (tile && tile.structureTick) {
                            tile.structureTick(this);
                        }
                    }
                }
            }
        }
    },
    tick: function () {
        if (World.getThreadTime() % 20 === 0) {
            if (this.isCenter()) {
                if (this.checkStructure()) {
                    if (!this.data.center) {
                        this.data.center = true;
                        World.setBlock(this.x - 1, this.y, this.z, BlockID.alveary_misc);
                        World.setBlock(this.x + 1, this.y, this.z, BlockID.alveary_misc);
                        World.setBlock(this.x, this.y, this.z - 1, BlockID.alveary_misc);
                        World.setBlock(this.x, this.y, this.z + 1, BlockID.alveary_misc);
                    }
                } else if (this.data.center) {
                    this.rebuildStructure();
                    alert("2");
                }
            } else if (this.data.center) {
                this.rebuildStructure();
                alert("1");
            }
        }

        if (this.data.center) {
            this.blockTick();
            this.data.humidity = this.data.dhumidity;
            this.data.climate = this.data.dclimate;
            this.data.mutate = true;
        }
    },

    checkStructure: function () {
        var x = this.x - 1;
        var y = this.y - 2;
        var z = this.z - 1;
        for (var xx = 0; xx < 3; xx++) {
            for (var yy = 0; yy < 3; yy++) {
                for (var zz = 0; zz < 3; zz++) {
                    if (!this.isStructureBlock(World.getBlock(x + xx, y + yy, z + zz).id)) {
                        return false;
                    }
                }
            }
        }

        if (this.isStructureBlock(World.getBlock(this.x + 2, this.y, this.z))) return false;
        if (this.isStructureBlock(World.getBlock(this.x - 2, this.y, this.z))) return false;
        if (this.isStructureBlock(World.getBlock(this.x, this.y, this.z + 2))) return false;
        if (this.isStructureBlock(World.getBlock(this.x, this.y, this.z - 2))) return false;

        return true;
    },

    isSlab: function (id) {
        switch (id) {
            case 44:
            case 158:
            case 182:
                return true;
        }
        return false;
    },

    isCenter: function () {
        for (var xx = 0; xx < 3; xx++) {
            for (var zz = 0; zz < 3; zz++) {
                if ((World.getBlock(this.x - 1 + xx, this.y, this.z - 1 + zz).id === BlockID.alveary || World.getBlock(this.x - 1 + xx, this.y, this.z - 1 + zz).id === BlockID.alveary_misc)) {
                    if (!this.isSlab(World.getBlock(this.x - 1 + xx, this.y + 1, this.z - 1 + zz).id)) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
        return true;
    },

    isStructureBlock: function (id) {
        for (var key in multiblock_apiary) {
            if (multiblock_apiary[key] === id) {
                return true;
            }
        }
        return false
    }
});