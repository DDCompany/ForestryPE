Block.setPrototype("engineClockwork", {
    type: Block.TYPE_BASE,

    getVariations() {
        return [{
            name: "forestry.block.clockwork_engine",
            texture: [["engine_clock", 0], ["engine_clock", 2], ["engine_clock", 1]],
            inCreative: true
        }];
    }
});

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.engineClockwork, count: 1, data: 0}, [
        "bbb",
        "0m0",
        "spt"
    ], ['b', 5, -1, 'm', 20, 0, 's', ItemID.gearCopper, 0, 't', 347, 0, 'p', 33, 0]);
});

ModelHelper.createEngineModel(BlockID.engineClockwork);
Item.addCreativeGroup("forestry_engines", t("forestry.creative_group.engines"), [
    BlockID.engineClockwork,
]);