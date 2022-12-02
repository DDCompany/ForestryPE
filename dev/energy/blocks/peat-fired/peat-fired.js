Block.setPrototype("enginePeat", {
    type: Block.TYPE_BASE,

    getVariations() {
        return [{
            name: "forestry.block.peat_engine",
            texture: [["engine_peat", 0], ["engine_peat", 2], ["engine_peat", 1]],
            inCreative: true
        }];
    }
});

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.enginePeat, count: 1, data: 0}, [
        "bbb",
        "0s0",
        "gpg"
    ], ['b', ItemID.ingotCopper, 0, 'g', ItemID.gearCopper, 0, 'p', 33, 0, 's', 20, 0]);
});

GROUP_ITEM_PIPE.add(BlockID.enginePeat, -1);
ModelHelper.createEngineModel(BlockID.enginePeat);
Item.addCreativeGroup("forestry_engines", t("forestry.creative_group.engines"), [
    BlockID.enginePeat,
]);