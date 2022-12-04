IDRegistry.genBlockID("squeezer");
FactoryManager.register("squeezer", "forestry.block.squeezer", [
    ["squeezer_top", 0], ["squeezer_top", 0], ["squeezer", 0], ["squeezer", 0], ["squeezer_side", 0], ["squeezer_side", 0]
], true);
GROUP_ITEM_PIPE.add(BlockID.squeezer, -1);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.squeezer, count: 1, data: 0}, [
        "cgc",
        "cmc",
        "cgc"
    ], ['c', ItemID.ingotTin, -1, 'g', VanillaBlockID.glass, -1, 'm', ItemID.sturdyMachine, -1]);
});