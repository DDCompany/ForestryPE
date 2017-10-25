var textures_carpenter = [["carpenter_top", 0], ["carpenter_top", 0], ["carpenter", 0], ["carpenter", 0], ["carpenter_side", 0], ["carpenter_side", 0]];

Block.setPrototype("carpenter", {
    type: Block.TYPE_ROTATION,

    getVariations: function () {
        return [{name: "Carpenter", texture: textures_carpenter, inCreative: true}];
    }

});

ModelHelper.createFactoryModel(BlockID.carpenter, textures_carpenter);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.carpenter, count: 1, data: 0}, [
        "bgb",
        "bfb",
        "bgb"
    ], ['b', ItemID.ingotBronze, 0, 'g', 20, 0, 'f', ItemID.sturdyMachine, 0]);
});

//ICRenderLib.addConnectionBlock("bc-container", BlockID.carpenter);