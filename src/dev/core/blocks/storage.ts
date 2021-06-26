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

Item.addCreativeGroup("blockMetal", t("forestry.creative_group.metal_blocks"), [
    BlockID.blockCopper,
    BlockID.blockTin,
    BlockID.blockBronze,
]);

Item.addCreativeGroup("blockGems", t("forestry.creative_group.gem_blocks"), [
    BlockID.blockApatite,
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.blockApatite, count: 1, data: 0}, [
        "AAA",
        "AAA",
        "AAA",
    ], ['A', ItemID.apatite, 0]);

    Recipes.addShaped({id: BlockID.blockCopper, count: 1, data: 0}, [
        "AAA",
        "AAA",
        "AAA",
    ], ['A', ItemID.ingotCopper, 0]);

    Recipes.addShaped({id: BlockID.blockTin, count: 1, data: 0}, [
        "AAA",
        "AAA",
        "AAA",
    ], ['A', ItemID.ingotTin, 0]);

    Recipes.addShaped({id: BlockID.blockBronze, count: 1, data: 0}, [
        "AAA",
        "AAA",
        "AAA",
    ], ['A', ItemID.ingotBronze, 0]);
});