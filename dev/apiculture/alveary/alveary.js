IDRegistry.genBlockID("alveary");
Block.createBlock("alveary", [
    {name: "Alveary", texture: [["alveary_bottom", 0], ["alveary_bottom", 0], ["alveary_plain", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.alveary_misc, "wood");
ApiaryRegistry.register(BlockID.alveary);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.alveary, count: 1, data: 0}, [
        "ddd",
        "dmd",
        "ddd"
    ], ['m', ItemID.impregnatedCasing, 0, 'd', ItemID.scentedPaneling, 0]);
});