IDRegistry.genBlockID("still");
FactoryManager.register("still", "forestry.block.still",
    [["still_top", 0], ["still_top", 0], ["still", 0], ["still", 0], ["still_side", 0], ["still_side", 0]], true);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.still, count: 1, data: 0}, [
        "cgc",
        "gbg",
        "cgc"
    ], ['c', 331, -1, 'g', 20, -1, 'b', ItemID.sturdyMachine, -1]);
});

GROUP_ITEM_PIPE.add(BlockID.still, -1);