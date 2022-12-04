IDRegistry.genBlockID("carpenter");
FactoryManager.register("carpenter", "forestry.block.carpenter", [
    ["carpenter_top", 0], ["carpenter_top", 0], ["carpenter", 0], ["carpenter", 0], ["carpenter_side", 0], ["carpenter_side", 0]
], true);
GROUP_ITEM_PIPE.add(BlockID.carpenter, -1);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.carpenter, count: 1, data: 0}, [
        "bgb",
        "bfb",
        "bgb"
    ], ['b', ItemID.ingotBronze, -1, 'g', VanillaBlockID.glass, -1, 'f', ItemID.sturdyMachine, -1]);
});