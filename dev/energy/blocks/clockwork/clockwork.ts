IDRegistry.genBlockID("engineClockwork");
Block.createBlock("engineClockwork", [
    {
        name: "forestry.block.clockwork_engine",
        texture: [["engine_clock", 0], ["engine_clock", 2], ["engine_clock", 1]],
        inCreative: true,
    },
]);
ModelHelper.createEngineModel(BlockID.engineClockwork);

Item.addCreativeGroup("forestry_engines", t("forestry.creative_group.engines"), [
    BlockID.engineClockwork,
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.engineClockwork, count: 1, data: 0}, [
        "bbb",
        "0m0",
        "spt"
    ], [
        'b', VanillaBlockID.planks, -1, 'm', VanillaBlockID.glass, -1, 's', ItemID.gearCopper, -1,
        't', VanillaItemID.clock, 0, 'p', VanillaBlockID.piston, 0
    ]);
});