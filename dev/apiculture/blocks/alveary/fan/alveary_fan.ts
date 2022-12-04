IDRegistry.genBlockID("alvearyFan");
Block.createBlock("alvearyFan", [
    {name: "forestry.block.alveary_fan", texture: [["alveary_fan", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.alvearyFan, "wood");
ApiaryRegistry.register(BlockID.alvearyFan);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.alvearyFan, count: 1, data: 0}, [
        "i i",
        " m ",
        "igi"
    ], ['i', VanillaItemID.iron_ingot, -1, 'm', BlockID.alveary, -1, 'g', ItemID.thermionicTubeGold, -1]);
});