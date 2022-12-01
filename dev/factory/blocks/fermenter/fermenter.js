IDRegistry.genBlockID("fermenter");
FactoryManager.register("fermenter", "Fermenter",
    [["fermenter_top", 0], ["fermenter_top", 0], ["fermenter", 0], ["fermenter", 0], ["fermenter_side", 0], ["fermenter_side", 0]], true);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.fermenter, count: 1, data: 0}, [
        "cgc",
        "gmg",
        "cgc"
    ], ['c', ItemID.gearBronze, -1, 'g', 20, -1, 'm', ItemID.sturdyMachine, -1]);
});

GROUP_ITEM_PIPE.add(BlockID.fermenter, -1);