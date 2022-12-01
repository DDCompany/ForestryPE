IDRegistry.genBlockID("alvearyHeater");
Block.createBlock("alvearyHeater", [
    {name: "Alveary Heater", texture: [["alveary_heater", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.alvearyHeater, "wood");
ApiaryRegistry.register(BlockID.alvearyHeater);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.alvearyHeater, count: 1, data: 0}, [
        "gig",
        " m ",
        "sss"
    ], ['i', 265, 0, 'm', BlockID.alveary, 0, 'g', ItemID.thermionicTubeGold, 0, 's', 1, 0]);
});