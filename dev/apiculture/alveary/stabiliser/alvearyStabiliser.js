IDRegistry.genBlockID("alvearyStabiliser");
Block.createBlock("alvearyStabiliser", [
    {name: "Alveary Stabiliser", texture: [["alveary_stabiliser", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.alvearyStabiliser, "wood");
ApiaryRegistry.register(BlockID.alvearyStabiliser);

Callback.addCallback("PostLoaded", () => {

    Recipes.addShaped({id: BlockID.alvearyStabiliser, count: 1, data: 0}, [
        "g g",
        "gmg",
        "g g"
    ], ['m', BlockID.alveary, 0, 'g', 406, 0]);

});