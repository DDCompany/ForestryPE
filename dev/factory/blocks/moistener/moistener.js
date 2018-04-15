var textures_moistener = [["moistener_top", 0], ["moistener_top", 0], ["moistener", 0], ["moistener", 0], ["moistener_side", 0], ["moistener_side", 0]];
Block.setPrototype("moistener", {
    type: Block.TYPE_ROTATION,

    getVariations: function () {
        return [{name: "Moistener", texture: textures_moistener, inCreative: true}];
    }

});

ModelHelper.createFactoryModel(BlockID.moistener, textures_moistener);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.moistener, count: 1, data: 0}, [
        "gsg",
        "sbs",
        "gsg"
    ], ['b', BlockID.fermenter, -1, 'g', ItemID.gearCopper, -1, 's', 20, -1]);
});

//ICRenderLib.addConnectionBlock("bc-container", BlockID.moistener);
