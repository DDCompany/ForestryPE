IDRegistry.genBlockID("alveary_misc");
Block.createBlock("alveary_misc", [
    {name: "alveary_misc", texture: [["alveary_misc", 0]], inCreative: false}
]);

IDRegistry.genBlockID("alveary_misc_center");
Block.createBlock("alveary_misc_center", [
    {name: "alveary_misc_center", texture: [["alveary_heater", 0]], inCreative: false}
]);

ToolAPI.registerBlockMaterial(BlockID.alveary_misc, "unbreaking");

ApiaryRegistry.register(BlockID.alveary_misc_center);
ApiaryRegistry.register(BlockID.alveary_misc);

TileEntity.registerPrototype(BlockID.alveary_misc_center, {

    OUTPUT_SLOTS: ["slotProduct0", "slotProduct1", "slotProduct2", "slotProduct3", "slotProduct4", "slotProduct5", "slotProduct6"],

    defaultValues: {
        progress: 0,
        progressMax: 0,
        progressCycle: 0
    },

    tick: function () {
        var content = this.container.getGuiContent();

        if (!this.house) {
            var self = this;

            this.house = new BeeHouse(this, {
                slotPrincess: "slot1",
                slotDrone: "slot2",
                produceSlots: this.OUTPUT_SLOTS,
                slotPrincessOut: this.OUTPUT_SLOTS,
                slotDronesOut: this.OUTPUT_SLOTS
            }, new ModifierList([]));

            this.house.getHumidity = function () {
                return self.humidity;
            };

            this.house.getClimate = function () {
                return self.climate;
            };
        }

        //Каждые 2 сек проверяем структуру на валидность
        if (World.getThreadTime() % 40 === 0 && !ApiaryRegistry.isValidStructure(this.x - 1, this.y - 2, this.z - 1)) {
            World.setBlock(this.x, this.y, this.z, BlockID.alveary);

            if (World.getBlockID(this.x + 1, this.y, this.z) !== 0) World.setBlock(this.x + 1, this.y, this.z, BlockID.alveary);
            if (World.getBlockID(this.x - 1, this.y, this.z) !== 0) World.setBlock(this.x - 1, this.y, this.z, BlockID.alveary);
            if (World.getBlockID(this.x, this.y, this.z + 1) !== 0) World.setBlock(this.x, this.y, this.z + 1, BlockID.alveary);
            if (World.getBlockID(this.x, this.y, this.z - 1) !== 0) World.setBlock(this.x, this.y, this.z - 1, BlockID.alveary);
            return;
        }

        var Modifiers = new ModifierList([]);
        for (var xx = this.x - 1; xx < this.x + 3; xx++) {
            for (var yy = this.y - 2; yy < this.y + 3; yy++) {
                for (var zz = this.z - 1; zz < this.z + 3; zz++) {
                    var block = World.getBlockID(xx, yy, zz);
                    if (ApiaryRegistry.isApiaryComponent(block) && block !== BlockID.alveary_misc_center) {
                        var tile = World.getTileEntity(xx, yy, zz);
                        if (tile) {
                            if (tile.changeHumidity) this.humidity = tile.changeHumidity(this);
                            if (tile.changeClimate) this.climate = tile.changeClimate(this);
                            if (tile.getModifiers) Modifiers.modifiers.push(tile.getModifiers(this));
                            if (tile.alvearyTick) tile.alvearyTick(this);
                        }
                    }
                }
            }
        }

        if (this.humidity !== undefined && this.climate !== undefined) this.house.tick(Modifiers);

        this.humidity = BiomeHelper.getBiomeHumidity(World.getBiome(this.x, this.z));
        this.climate = BiomeHelper.getBiomeClimate(World.getBiome(this.x, this.z));

        if (content) {
            var healthScale = content.elements["progressScale"];
            if (this.data.progress <= (this.data.progressMax * 0.8) && this.data.progress >= (this.data.progressMax * 0.5)) {
                healthScale.bitmap = "apiary_scale_yellow";
            } else if (this.data.progress <= (this.data.progressMax * 0.5) && this.data.progress >= (this.data.progressMax * 0.3)) {
                healthScale.bitmap = "apiary_scale_orange";
            } else if (this.data.progress <= (this.data.progressMax * 0.3)) {
                healthScale.bitmap = "apiary_scale_red";
            } else {
                healthScale.bitmap = "apiary_scale_green";
            }
        }

        if (this.house.error && content && (!content.elements["error"] || content.elements["error"].text !== this.house.error)) {
            content.elements["error"] = {type: "text", x: 345, y: 320, width: 500, height: 30, text: this.house.error};
        } else if (!this.house.error && content && content.elements["error"]) {
            content.elements["error"] = null;
        }

        this.container.setScale("progressScale", this.data.progress / this.data.progressMax);
        this.container.validateAll();
    },

    created: function () {
        World.setBlock(this.x + 1, this.y, this.z, BlockID.alveary_misc);
        World.setBlock(this.x - 1, this.y, this.z, BlockID.alveary_misc);
        World.setBlock(this.x, this.y, this.z + 1, BlockID.alveary_misc);
        World.setBlock(this.x, this.y, this.z - 1, BlockID.alveary_misc);
    },

    getGuiScreen: function () {
        return alvearyGUI;
    }

});

TileEntity.registerPrototype(BlockID.alveary_misc, {

    click: function () {
        //При нажатии на блок открываем интерфейс центрального блока огромного улья
        if (World.getBlockID(this.x + 1, this.y, this.z) === BlockID.alveary_misc_center) {
            var tile = World.getTileEntity(this.x + 1, this.y, this.z);
            if (tile) {
                tile.container.openAs(tile.getGuiScreen());
            }
        } else if (World.getBlockID(this.x - 1, this.y, this.z) === BlockID.alveary_misc_center) {
            var tile = World.getTileEntity(this.x - 1, this.y, this.z);
            if (tile) {
                tile.container.openAs(tile.getGuiScreen());
            }
        } else if (World.getBlockID(this.x, this.y, this.z + 1) === BlockID.alveary_misc_center) {
            var tile = World.getTileEntity(this.x, this.y, this.z + 1);
            if (tile) {
                tile.container.openAs(tile.getGuiScreen());
            }
        } else if (World.getBlockID(this.x, this.y, this.z - 1) === BlockID.alveary_misc_center) {
            var tile = World.getTileEntity(this.x, this.y, this.z - 1);
            if (tile) {
                tile.container.openAs(tile.getGuiScreen());
            }
        }
    }

});