IDRegistry.genBlockID("apiaristChest");
ChestManager.register("apiaristChest", "Apiarist's Chest",
    [["apiaristchest", 1], ["apiaristchest", 0], ["apiaristchest", 2], ["apiaristchest", 3], ["apiaristchest", 2], ["apiaristchest", 2]],
    true, 126, {
        isValid: function (id) {
            return BeeRegistry.isBee(id);
        }
    });

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.apiaristChest, count: 1, data: 0}, [
        " g ",
        "cbc",
        "ccc"
    ], ['g', 20, 0, 'c', ItemID.combHoney, 0, 'b', 54, 0]);
});