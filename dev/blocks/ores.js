Block.setPrototype("oreCopper", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{name: "Copper ore", texture: [["oreCopper", 0]], inCreative: true}];
    },

    getDrop: function () {
        return [[ItemID.oreCopper, 1, 0]];
    },

    getMaterial: function (a) {
        return "stone";
    },

    getDestroyLevel: function (a) {
        return 1
    }

});

Block.setPrototype("oreTin", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{name: "Tin ore", texture: [["oreTin", 0]], inCreative: true}];
    },

    getDrop: function () {
        return [[ItemID.oreTin, 1, 0]];
    },

    getMaterial: function (a) {
        return "stone";
    },

    getDestroyLevel: function (a) {
        return 1
    }

});

Block.setPrototype("oreApatite", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{name: "Apatite ore", texture: [["oreApatite", 0]], inCreative: true}];
    },

    getDrop: function (a, b, d, g, h) {
        if (g > 1) {
            return [[ItemID.apatite, 1 + Math.random() * 5, 0]];
        }
        return [];
    },

    getMaterial: function (a) {
        return "stone";
    },

    getDestroyLevel: function (a) {
        return 1
    }
});

IDRegistry.genItemID("oreCopper");
Item.createItem("oreCopper", "Copper ore", {name: "oreCopper", meta: 0}, {});

IDRegistry.genItemID("oreTin");
Item.createItem("oreTin", "Tin ore", {name: "oreTin", meta: 0}, {});

Callback.addCallback("PostLoaded", function () {

    Recipes.addFurnace(ItemID.oreCopper, ItemID.ingotCopper, 0);
    Recipes.addFurnace(ItemID.oreTin, ItemID.ingotTin, 0);

});

Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
    if (Config.genApatite) {
        for (var i = 0; i < Config.genApatiteInChunk; i++) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 64);
            GenerationUtils.genMinable(coords.x, coords.y, coords.z, {
                id: BlockID.oreApatite,
                data: 0,
                size: Config.genApatiteSize,
                ratio: .3,
                checkerTile: 1,
                checkerMode: false
            });
        }
    }

    if (Config.genCopper) {
        for (var i = 0; i < Config.genCopperInChunk; i++) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 32, 107);
            GenerationUtils.genMinable(coords.x, coords.y, coords.z, {
                id: BlockID.oreCopper,
                data: 0,
                size: Config.genCopperSize,
                ratio: .3,
                checkerTile: 1,
                checkerMode: false
            });
        }
    }

    if (Config.genTin) {
        for (var i = 0; i < Config.genTinInChunk; i++) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 16, 91);
            GenerationUtils.genMinable(coords.x, coords.y, coords.z, {
                id: BlockID.oreTin,
                data: 0,
                size: Config.genTinSize,
                ratio: .3,
                checkerTile: 1,
                checkerMode: false
            });
        }
    }
});

