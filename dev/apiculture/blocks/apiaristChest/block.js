Block.setPrototype("apiaristChest", {
    type: Block.TYPE_ROTATION,

    getVariations: function () {
        return [{
            name: "Apiarist's Chest",
            texture: [["apiaristchest", 1], ["apiaristchest", 0], ["apiaristchest", 2], ["apiaristchest", 3], ["apiaristchest", 2], ["apiaristchest", 2]],
            inCreative: true
        }];
    }
});

ModelHelper.createChestModel(BlockID.apiaristChest);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.apiaristChest, count: 1, data: 0}, [
        " g ",
        "cbc",
        "ccc"
    ], ['g', 20, 0, 'c', ItemID.combHoney, 0, 'b', 54, 0]);
});

//ICRenderLib.addConnectionBlock("bc-container", BlockID.apiaristChest);