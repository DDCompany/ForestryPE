var textures_centrifuge = [["centrifuge_top", 0], ["centrifuge_top", 0], ["centrifuge", 0], ["centrifuge", 0], ["centrifuge_side", 0], ["centrifuge_side", 0]];
Block.setPrototype("centrifuge", {
    type: Block.TYPE_ROTATION,

    getVariations: function () {
        return [{name: "Centrifuge", texture: textures_centrifuge, inCreative: true}];
    }

});

ModelHelper.createFactoryModel(BlockID.centrifuge, textures_centrifuge);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.centrifuge, count: 1, data: 0}, [
        "cgc",
        "cmc",
        "cgc"
    ], ['c', ItemID.ingotCopper, -1, 'g', 20, -1, 'm', ItemID.sturdyMachine, -1]);
});

ICRenderLib.addConnectionBlock("bc-container", BlockID.centrifuge);