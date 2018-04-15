var textures_still = [["still_top", 0], ["still_top", 0], ["still", 0], ["still", 0], ["still_side", 0], ["still_side", 0]];
Block.setPrototype("still", {
    type: Block.TYPE_ROTATION,

    getVariations: function () {
        return [{name: "Still", texture: textures_still, inCreative: true}];
    }

});

ModelHelper.createFactoryModel(BlockID.still, textures_still);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.still, count: 1, data: 0}, [
        "cgc",
        "gbg",
        "cgc"
    ], ['c', 331, -1, 'g', 20, -1, 'b', ItemID.sturdyMachine, -1]);
});

//ICRenderLib.addConnectionBlock("bc-container", BlockID.still);
