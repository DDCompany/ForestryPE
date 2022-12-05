IDRegistry.genBlockID("blockCharcoal");
Block.createBlock("blockCharcoal", [
    {name: "forestry.block.charcoal_block", texture: [["block_charcoal", 0]], inCreative: true},
]);
ToolAPI.registerBlockMaterial(BlockID.blockCharcoal, "stone", 1);

IDRegistry.genBlockID("blockAsh");
Block.createBlock("blockAsh", [
    {name: "forestry.block.ash_block", texture: [["block_ash", 0]], inCreative: true},
]);
ToolAPI.registerBlockMaterial(BlockID.blockAsh, "dirt", 1);

IDRegistry.genBlockID("ashBricks");
Block.createBlock("ashBricks", [
    {name: "forestry.block.ash_bricks", texture: [["brick_ash", 0]], inCreative: true},
]);
ToolAPI.registerBlockMaterial(BlockID.ashBricks, "stone", 1);

Item.addCreativeGroup("blockResource", t("forestry.creative_group.ore_blocks"), [
    BlockID.blockAsh,
    BlockID.blockCharcoal,
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.blockAsh, count: 1, data: 0}, [
        "iii",
        "iii",
        "iii"
    ], ['i', ItemID.ash, 0]);
    Recipes.addShapeless({id: ItemID.ash, count: 9, data: 0}, [{id: BlockID.blockAsh, data: 0}]);

    Recipes.addShaped({id: BlockID.ashBricks, count: 1, data: 0}, [
        "A#A",
        "# #",
        "A#A",
    ], ['A', ItemID.ash, 0, '#', VanillaItemID.brick, 0]);

    Recipes.addShaped({id: BlockID.blockCharcoal, count: 1, data: 0}, [
        "iii",
        "iii",
        "iii"
    ], ['i', VanillaItemID.charcoal, -1]);
    Recipes.addShapeless({id: VanillaItemID.charcoal, count: 9, data: 0}, [{id: BlockID.blockCharcoal, data: 0}]);
});