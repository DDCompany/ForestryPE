IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper", [
    {name: "Copper Ore", texture: [["oreCopper", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone");
Block.setDestroyLevel("oreCopper", 2);


Block.registerDropFunction("oreCopper", function (coords, id, data, diggingLevel) {
    if (diggingLevel > 1) {
        return [[id, 1, data]];
    }

    return [];
});

IDRegistry.genBlockID("oreTin");
Block.createBlock("oreTin", [
    {name: "Tin Ore", texture: [["oreTin", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreTin, "stone");
Block.setDestroyLevel("oreTin", 2);

Block.registerDropFunction("oreTin", function (coords, id, data, diggingLevel) {
    if (diggingLevel > 1) {
        return [[id, 1, data]];
    }

    return [];
});

IDRegistry.genBlockID("oreApatite");
Block.createBlock("oreApatite", [
    {name: "Apatite Ore", texture: [["oreApatite", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreApatite, "stone");
Block.setDestroyLevel("oreApatite", 2);

Block.registerDropFunction("oreApatite", function (coords, id, data, diggingLevel) {
    if (diggingLevel > 1) {
        return [[ItemID.apatite, 1 + Math.random() * 5, 0]];
    }

    return [];
});

Callback.addCallback("PostLoaded", function () {

    Recipes.addFurnace(BlockID.oreCopper, ItemID.ingotCopper, 0);
    Recipes.addFurnace(BlockID.oreTin, ItemID.ingotTin, 0);

});

if (ForestryConfig.genCopper) {
    Flags.addUniqueAction("oreGenCopper", function () {
        Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
            for (let i = 0; i < ForestryConfig.genCopperInChunk; i++) {
                let coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 107);
                GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreCopper, 0, ForestryConfig.genCopperSize);
            }
        });
    });
}

if (ForestryConfig.genTin) {
    Flags.addUniqueAction("oreGenTin", function () {
        Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
            for (let i = 0; i < ForestryConfig.genTinInChunk; i++) {
                let coords = GenerationUtils.randomCoords(chunkX, chunkZ, 16, 91);
                GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreTin, 0, ForestryConfig.genTinSize);
            }
        });
    });
}

if (ForestryConfig.genApatite) {
    Flags.addUniqueAction("oreGenApatite", function () {
        Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
            for (let i = 0; i < ForestryConfig.genApatiteInChunk; i++) {
                let coords = GenerationUtils.randomCoords(chunkX, chunkZ, 10, 64);
                GenerationUtils.generateOre(coords.x, coords.y, coords.z, BlockID.oreApatite, 0, ForestryConfig.genApatiteSize);
            }
        });
    });
}
