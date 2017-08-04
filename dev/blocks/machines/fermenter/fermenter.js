var textures_fermenter = [["fermenter_top", 0], ["fermenter_top", 0], ["fermenter", 0], ["fermenter", 0], ["fermenter_side", 0], ["fermenter_side", 0]];
Block.setPrototype("fermenter", {
    type: Block.TYPE_ROTATION,

    getVariations: function () {
        return [{name: "Fermenter", texture: textures_fermenter, inCreative: true}];
    }

});

ModelHelper.createFactoryModel(BlockID.fermenter, textures_fermenter);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.fermenter, count: 1, data: 0}, [
        "cgc",
        "gmg",
        "cgc"
    ], ['c', ItemID.gearBronze, -1, 'g', 20, -1, 'm', ItemID.sturdyMachine, -1]);
});

ICRenderLib.addConnectionBlock("bc-container", BlockID.fermenter);