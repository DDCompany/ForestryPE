Block.setPrototype("oreCopper", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{name: "Copper ore", texture: [["oreCopper", 0]], inCreative: true}];
    },

    getDrop: function () {
        return [[BlockID.oreCopper, 1, 0]];
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
        return [[BlockID.oreTin, 1, 0]];
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

    getDrop: function (a, b, d, g) {
        if (g) {
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

IDRegistry.genItemID("apatite");
Item.createItem("apatite", "Apatite", {name: "apatite", meta: 0}, {});


Callback.addCallback("PostLoaded", function () {

    Recipes.addFurnace(BlockID.oreCopper, ItemID.ingotCopper, 0);
    Recipes.addFurnace(BlockID.oreTin, ItemID.ingotTin, 0);

});

Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ) {
    if (Config.genApatite) {
        for (var i = 0; i < Config.genApatiteInChunk; i++) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 64);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreApatite, 0, Config.genApatiteSize);
        }
    }

    if (Config.genCopper) {
        for (var i = 0; i < Config.genCopperInChunk; i++) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 107);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreCopper, 0, Config.genCopperSize);
        }
    }

    if (Config.genTin) {
        for (var i = 0; i < Config.genTinInChunk; i++) {
            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 16, 91);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreTin, 0, Config.genTinSize);
        }
    }
});

