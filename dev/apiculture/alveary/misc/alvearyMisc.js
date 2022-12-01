IDRegistry.genBlockID("alveary_misc");
Block.createBlock("alveary_misc", [
    {name: "misc", texture: [["alveary_misc", 0]], inCreative: false}
]);

IDRegistry.genBlockID("alveary_misc_center");
Block.createBlock("alveary_misc_center", [
    {name: "Alveary Controller", texture: [["alveary_heater", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.alveary_misc, "unbreaking");
ToolAPI.registerBlockMaterial(BlockID.alveary_misc, "wood");

ApiaryRegistry.register(BlockID.alveary_misc_center);
ApiaryRegistry.register(BlockID.alveary_misc);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.alveary_misc_center, count: 1, data: 0}, [
        "ggg",
        "sss",
        "ggg"
    ], ['g', ItemID.thermionicTubeGold, 0, 's', 1, 0]);
});