IDRegistry.genBlockID("centrifuge");
FactoryManager.register("centrifuge", "forestry.block.centrifuge", [
    ["centrifuge_top", 0], ["centrifuge_top", 0], ["centrifuge", 0], ["centrifuge", 0], ["centrifuge_side", 0], ["centrifuge_side", 0]
], true);
GROUP_ITEM_PIPE.add(BlockID.centrifuge, -1);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.centrifuge, count: 1, data: 0}, [
        "cgc",
        "cmc",
        "cgc"
    ], ['c', ItemID.ingotCopper, -1, 'g', VanillaBlockID.glass, -1, 'm', ItemID.sturdyMachine, -1]);
});