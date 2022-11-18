IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper", [
    {name: "Copper Ore", texture: [["oreCopper", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreCopper, "stone", 1, true);
Block.setDestroyTime(BlockID.oreCopper, 1);
Block.setDestroyLevel("oreCopper", 2);

IDRegistry.genBlockID("oreTin");
Block.createBlock("oreTin", [
    {name: "Tin Ore", texture: [["oreTin", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreTin, "stone", 1, true);
Block.setDestroyTime(BlockID.oreTin, 1);
Block.setDestroyLevel("oreTin", 2);

IDRegistry.genBlockID("oreApatite");
Block.createBlock("oreApatite", [
    {name: "Apatite Ore", texture: [["oreApatite", 0]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.oreApatite, "stone", 1, true);
Block.setDestroyTime(BlockID.oreApatite, 1);
Block.setDestroyLevel("oreApatite", 2);

Item.addCreativeGroup(GROUP_ORES, GROUP_ORES_NAME, [BlockID.oreCopper, BlockID.oreTin, BlockID.oreApatite]);

Block.registerDropFunction("oreApatite", function (coords, id, data, diggingLevel) {
    if (diggingLevel > 1) {
        ToolAPI.dropOreExp(coords, 1, 4, 1);
        return [[ItemID.apatite, 1 + Math.random() * 5, 0]];
    }

    return [];
});

Callback.addCallback("PostLoaded", function () {
    Recipes.addFurnace(BlockID.oreCopper, ItemID.ingotCopper, 0);
    Recipes.addFurnace(BlockID.oreTin, ItemID.ingotTin, 0);
});

function generateOre(blockId, chunkX, chunkZ, inChunk, size, minY, maxY, biomes) {
    for (let i = 0; i < inChunk; i++) {
        let coords = GenerationUtils.randomCoords(chunkX, chunkZ, minY, maxY);
        if (!biomes || biomes.indexOf(World.getBiome(coords.x, coords.z)) > -1) {
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, blockId, 0, Util.random(1, size));
        }
    }
}

if (ForestryConfig.genCopper) {
    Flags.addUniqueAction("oreGenCopper", function () {
        Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
            generateOre(BlockID.oreCopper,
                chunkX,
                chunkZ,
                ForestryConfig.genCopperInChunk,
                ForestryConfig.genCopperSize,
                ForestryConfig.genCopperMinY,
                ForestryConfig.genCopperMaxY);
        });
    });
}

if (ForestryConfig.genTin) {
    Flags.addUniqueAction("oreGenTin", function () {
        Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
            generateOre(BlockID.oreTin,
                chunkX,
                chunkZ,
                ForestryConfig.genTinInChunk,
                ForestryConfig.genTinSize,
                ForestryConfig.genTinMinY,
                ForestryConfig.genTinMaxY);
        });
    });
}

if (ForestryConfig.genApatite) {
    Flags.addUniqueAction("oreGenApatite", function () {
        Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
            if (Math.random() < 0.8)
                generateOre(BlockID.oreApatite,
                    chunkX,
                    chunkZ,
                    1,
                    ForestryConfig.genApatiteSize,
                    ForestryConfig.genApatiteMinY,
                    ForestryConfig.genApatiteMaxY,
                    APATITE_GEN_BIOMES);
        });
    });
}
