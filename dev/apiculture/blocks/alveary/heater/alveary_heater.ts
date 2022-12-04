IDRegistry.genBlockID("alvearyHeater");
Block.createBlock("alvearyHeater", [
    {name: "forestry.block.alveary_heater", texture: [["alveary_heater", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.alvearyHeater, "wood");
ApiaryRegistry.register(BlockID.alvearyHeater);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.alvearyHeater, count: 1, data: 0}, [
        "gig",
        " m ",
        "sss"
    ], ['i', VanillaItemID.iron_ingot, -1, 'm', BlockID.alveary, -1, 'g', ItemID.thermionicTubeGold, -1, 's', VanillaBlockID.stone, -1]);
});