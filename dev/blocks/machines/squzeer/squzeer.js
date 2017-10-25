var textures_squeezer = [["squeezer_top", 0], ["squeezer_top", 0], ["squeezer", 0], ["squeezer", 0], ["squeezer_side", 0], ["squeezer_side", 0]];
Block.setPrototype("squeezer", {
    type: Block.TYPE_ROTATION,

    getVariations: function () {
        return [{name: "Squeezer", texture: textures_squeezer, inCreative: true}];
    }

});

ModelHelper.createFactoryModel(BlockID.squeezer, textures_squeezer);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.squeezer, count: 1, data: 0}, [
        "cgc",
        "cmc",
        "cgc"
    ], ['c', ItemID.ingotTin, -1, 'g', 20, -1, 'm', ItemID.sturdyMachine, -1]);
});

//ICRenderLib.addConnectionBlock("bc-container", BlockID.squeezer);