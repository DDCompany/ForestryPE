/*TileEntity.registerPrototype(BlockID.alveary, {

    defaultValues: {
        center: false,
        dhumidity: 0,
        dclimate: 0,
        humidity: 0,
        climate: 0,
        mutate: true,
        structureID: 0
    },

    rebuildStructure: function () {
        if(World.getBlock(this.x - 1, this.y, this.z).id === BlockID.alveary_misc) World.setBlock(this.x - 1, this.y, this.z, BlockID.alveary);
        if(World.getBlock(this.x + 1, this.y, this.z).id === BlockID.alveary_misc) World.setBlock(this.x + 1, this.y, this.z, BlockID.alveary);
        if(World.getBlock(this.x, this.y, this.z - 1).id === BlockID.alveary_misc) World.setBlock(this.x, this.y, this.z - 1, BlockID.alveary);
        if(World.getBlock(this.x, this.y, this.z + 1).id === BlockID.alveary_misc) World.setBlock(this.x, this.y, this.z + 1, BlockID.alveary);

        this.data.center = false;
        this.data.structureID = 0;
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
        if (World.getThreadTime() % 40 === 0) {
            if (this.isCenter()) {
                if (this.checkStructure()) {
                    if (!this.data.center) {
                        this.data.center = true;
                        World.setBlock(this.x - 1, this.y, this.z, BlockID.alveary_misc);
                        World.setBlock(this.x + 1, this.y, this.z, BlockID.alveary_misc);
                        World.setBlock(this.x, this.y, this.z - 1, BlockID.alveary_misc);
                        World.setBlock(this.x, this.y, this.z + 1, BlockID.alveary_misc);

                        World.addTileEntity(this.x - 1, this.y, this.z);
                        World.addTileEntity(this.x + 1, this.y, this.z);
                        World.addTileEntity(this.x, this.y, this.z - 1);
                        World.addTileEntity(this.x, this.y, this.z + 1);

                        World.getTileEntity(this.x - 1, this.y, this.z).data.center = {x: this.x, y: this.y, z: this.z};
                        World.getTileEntity(this.x + 1, this.y, this.z).data.center = {x: this.x, y: this.y, z: this.z};
                        World.getTileEntity(this.x, this.y, this.z - 1).data.center = {x: this.x, y: this.y, z: this.z};
                        World.getTileEntity(this.x, this.y, this.z + 1).data.center = {x: this.x, y: this.y, z: this.z};
                    }

                    if(!this.data.structureID){
                        this.data.structureID = ApiaryRegistry.getNextUnique();
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

        if (this.isStructureBlock(World.getBlock(this.x + 2, this.y - 2, this.z).id)) return false;
        if (this.isStructureBlock(World.getBlock(this.x - 2, this.y - 2, this.z).id)) return false;
        if (this.isStructureBlock(World.getBlock(this.x, this.y - 2, this.z + 2).id)) return false;
        if (this.isStructureBlock(World.getBlock(this.x, this.y - 2, this.z - 2).id)) return false;

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
        return ApiaryRegistry.isApiaryComponent() || id === BlockID.alveary || id === BlockID.alveary_misc
    }
});*/