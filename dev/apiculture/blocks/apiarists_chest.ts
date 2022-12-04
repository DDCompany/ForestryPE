IDRegistry.genBlockID("apiaristChest");
ChestManager.register("apiaristChest", "forestry.block.apiarists_chest", [
    ["apiaristchest", 1], ["apiaristchest", 0], ["apiaristchest", 2], ["apiaristchest", 3], ["apiaristchest", 2], ["apiaristchest", 2]
], true, 126, {
    isValid(id) {
        return BeeRegistry.isBee(id);
    }
});

Callback.addCallback("PostLoaded", () => {
    for (const i in COMBS) {
        Recipes.addShaped({id: BlockID.apiaristChest, count: 1, data: 0}, [
            " g ",
            "cbc",
            "ccc"
        ], ['g', VanillaBlockID.glass, -1, 'c', COMBS[i], -1, 'b', VanillaBlockID.chest, -1]);
    }
});

GROUP_ITEM_PIPE.add(BlockID.apiaristChest, -1);