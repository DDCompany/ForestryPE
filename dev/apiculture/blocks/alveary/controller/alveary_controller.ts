IDRegistry.genBlockID("alvearyController");
Block.createBlock("alvearyController", [
    {name: "forestry.block.alveary_controller", texture: [["alveary_heater", 0]], inCreative: true}
]);
ToolAPI.registerBlockMaterial(BlockID.alvearyController, "wood");
ApiaryRegistry.register(BlockID.alvearyController);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.alvearyController, count: 1, data: 0}, [
        "ggg",
        "sss",
        "ggg"
    ], ['g', ItemID.thermionicTubeGold, -1, 's', VanillaBlockID.stone, -1]);
});