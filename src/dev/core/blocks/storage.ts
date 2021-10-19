Block.createSpecialType({
    base: VanillaBlockID.iron_block,
    solid: true,
    destroytime: 3,
    explosionres: 5,
    sound: "stone",
}, "forestry_storage");

IDRegistry.genBlockID("blockCopper");
Block.createBlock("blockCopper", [
    {name: `forestry.block.copper_block`, texture: [["blockCopper", 0]], inCreative: true},
], "forestry_storage");
Block.setBlockMaterial("blockCopper", "stone", 1);
Block.setDestroyLevel("blockCopper", 1);

IDRegistry.genBlockID("blockTin");
Block.createBlock("blockTin", [
    {name: `forestry.block.tin_block`, texture: [["blockTin", 0]], inCreative: true},
], "forestry_storage");
Block.setBlockMaterial("blockTin", "stone", 1);
Block.setDestroyLevel("blockTin", 1);

IDRegistry.genBlockID("blockBronze");
Block.createBlock("blockBronze", [
    {name: `forestry.block.bronze_block`, texture: [["blockBronze", 0]], inCreative: true},
], "forestry_storage");
Block.setBlockMaterial("blockBronze", "stone", 1);
Block.setDestroyLevel("blockBronze", 1);

IDRegistry.genBlockID("blockApatite");
Block.createBlock("blockApatite", [
    {name: `forestry.block.apatite_block`, texture: [["blockApatite", 0]], inCreative: true},
], "forestry_storage");
Block.setBlockMaterial("blockApatite", "stone", 1);
Block.setDestroyLevel("blockApatite", 1);

IDRegistry.genBlockID("blockRawCopper");
Block.createBlock("blockRawCopper", [
    {name: `forestry.block.raw_copper_block`, texture: [["blockRawCopper", 0]], inCreative: true},
], "forestry_storage");
Block.setBlockMaterial("blockRawCopper", "stone", 1);
Block.setDestroyLevel("blockRawCopper", 1);

IDRegistry.genBlockID("blockRawTin");
Block.createBlock("blockRawTin", [
    {name: `forestry.block.raw_tin_block`, texture: [["blockRawTin", 0]], inCreative: true},
], "forestry_storage");
Block.setBlockMaterial("blockRawTin", "stone", 1);
Block.setDestroyLevel("blockRawTin", 1);

Item.addCreativeGroup("blockRaw", t("forestry.creative_group.raw_blocks"), [
    BlockID.blockRawCopper,
    BlockID.blockRawTin,
]);

Item.addCreativeGroup("blockMetal", t("forestry.creative_group.metal_blocks"), [
    BlockID.blockCopper,
    BlockID.blockTin,
    BlockID.blockBronze,
]);

Item.addCreativeGroup("blockGems", t("forestry.creative_group.gem_blocks"), [
    BlockID.blockApatite,
]);

Callback.addCallback("PreLoaded", () => {
    function createPackRecipe(resultId: number, sourceId: number) {
        Recipes.addShaped({id: resultId, count: 1, data: 0}, [
            "AAA",
            "AAA",
            "AAA",
        ], ['A', sourceId, 0]);
    }

    createPackRecipe(BlockID.blockApatite, ItemID.apatite);
    createPackRecipe(BlockID.blockCopper, ItemID.ingotCopper);
    createPackRecipe(BlockID.blockTin, ItemID.ingotTin);
    createPackRecipe(BlockID.blockBronze, ItemID.ingotBronze);
    createPackRecipe(BlockID.blockRawCopper, ItemID.metalRawCopper);
    createPackRecipe(BlockID.blockRawTin, ItemID.metalRawTin);
});