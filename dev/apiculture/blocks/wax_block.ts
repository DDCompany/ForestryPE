IDRegistry.genBlockID("blockWax");
Block.createBlock("blockWax", [
    {name: "forestry.block.wax_block", texture: [["block_wax", 0]], inCreative: true},
]);
Block.setBlockMaterial(BlockID.blockWax, "dirt", 1);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.blockWax, count: 1, data: 0}, [
        "iii",
        "iii",
        "iii"
    ], ['i', ItemID.beeswax, -1]);
    Recipes.addShapeless({id: ItemID.beeswax, count: 9, data: 0}, [{id: BlockID.blockWax, data: 0}]);
});