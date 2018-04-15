IDRegistry.genBlockID("alvearyFan");
Block.createBlock("alvearyFan", [
    {name: "Alveary Fan", texture: [["alveary_fan", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.alvearyFan, "wood");
ApiaryRegistry.register(BlockID.alvearyFan);

Callback.addCallback("PostLoaded", function () {

    Recipes.addShaped({id: BlockID.alvearyFan, count: 1, data: 0}, [
        "i i",
        " m ",
        "igi"
    ], ['i', 265, 0, 'm', BlockID.alveary, 0, 'g', ItemID.thermionicTubeGold, 0]);

});