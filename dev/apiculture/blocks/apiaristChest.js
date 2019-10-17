IDRegistry.genBlockID("apiaristChest");
ChestManager.register("apiaristChest", "Apiarist's Chest",
    [["apiaristchest", 1], ["apiaristchest", 0], ["apiaristchest", 2], ["apiaristchest", 3], ["apiaristchest", 2], ["apiaristchest", 2]],
    true, 126, {
        getTransportSlots: function () {
            let slots = [];
            for (let i = 0; i < 126; i++) {
                slots.push(i);
            }
            return {input: slots, output: slots};
        },

        isValid: function (id) {
            return BeeRegistry.isBee(id);
        }
    });

Callback.addCallback("PostLoaded", function () {
    for (let i in COMBS) {
        Recipes.addShaped({id: BlockID.apiaristChest, count: 1, data: 0}, [
            " g ",
            "cbc",
            "ccc"
        ], ['g', 20, 0, 'c', COMBS[i], 0, 'b', 54, 0]);
    }
});

GROUP_ITEM_PIPE.add(BlockID.apiaristChest, -1);