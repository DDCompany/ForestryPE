IDRegistry.genBlockID("carpenter");
FactoryManager.register("carpenter", "forestry.block.carpenter",
    [["carpenter_top", 0], ["carpenter_top", 0], ["carpenter", 0], ["carpenter", 0], ["carpenter_side", 0], ["carpenter_side", 0]], true);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.carpenter, count: 1, data: 0}, [
        "bgb",
        "bfb",
        "bgb"
    ], ['b', ItemID.ingotBronze, 0, 'g', 20, 0, 'f', ItemID.sturdyMachine, 0]);
});

//ICRenderLib.addConnectionBlock("bc-container", BlockID.carpenter);
GROUP_ITEM_PIPE.add(BlockID.carpenter, -1);