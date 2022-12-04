IDRegistry.genBlockID("alvearyHygroregulator");
Block.createBlock("alvearyHygroregulator", [
    {name: "forestry.block.alveary_hygroregulator", texture: [["alveary_valve", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.alvearyHygroregulator, "wood");
ApiaryRegistry.register(BlockID.alvearyHygroregulator);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.alvearyHygroregulator, count: 1, data: 0}, [
        "gig",
        "gmg",
        "gig"
    ], ['i', VanillaItemID.iron_ingot, -1, 'm', BlockID.alveary, -1, 'g', VanillaBlockID.glass, -1]);
});