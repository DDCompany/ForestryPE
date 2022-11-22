IDRegistry.genBlockID("centrifuge");
FactoryManager.register("centrifuge", "Centrifuge",
    [["centrifuge_top", 0], ["centrifuge_top", 0], ["centrifuge", 0], ["centrifuge", 0], ["centrifuge_side", 0], ["centrifuge_side", 0]], true);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.centrifuge, count: 1, data: 0}, [
        "cgc",
        "cmc",
        "cgc"
    ], ['c', ItemID.ingotCopper, -1, 'g', 20, -1, 'm', ItemID.sturdyMachine, -1]);
});

GROUP_ITEM_PIPE.add(BlockID.centrifuge, -1);