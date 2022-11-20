IDRegistry.genBlockID("alvearyHygroregulator");
Block.createBlock("alvearyHygroregulator", [
    {name: "Alveary Hygroregulator", texture: [["alveary_valve", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.alvearyHygroregulator, "wood");
ApiaryRegistry.register(BlockID.alvearyHygroregulator);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.alvearyHygroregulator, count: 1, data: 0}, [
        "gig",
        "gmg",
        "gig"
    ], ['i', 265, 0, 'm', BlockID.alveary, 0, 'g', 20, 0]);
});