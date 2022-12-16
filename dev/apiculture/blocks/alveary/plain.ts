IDRegistry.genBlockID("alveary");
Block.createBlock("alveary", [
    {
        name: "forestry.block.alveary",
        texture: [["alveary_bottom", 0], ["alveary_bottom", 0], ["alveary_plain", 0]],
        inCreative: true,
    },
]);

ToolAPI.registerBlockMaterial(BlockID.alveary, "wood");
ApiaryRegistry.register(BlockID.alveary);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.alveary, count: 1, data: 0}, [
        "ddd",
        "dmd",
        "ddd"
    ], ['m', ItemID.impregnatedCasing, -1, 'd', ItemID.scentedPaneling, -1]);
});