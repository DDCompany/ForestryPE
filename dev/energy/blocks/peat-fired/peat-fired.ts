IDRegistry.genBlockID("enginePeat");
Block.createBlock("enginePeat", [
    {
        name: "forestry.block.peat_engine",
        texture: [["engine_peat", 0], ["engine_peat", 2], ["engine_peat", 1]],
        inCreative: true,
    },
]);
ModelHelper.createEngineModel(BlockID.enginePeat);
GROUP_ITEM_PIPE.add(BlockID.enginePeat, -1);

Item.addCreativeGroup("forestry_engines", t("forestry.creative_group.engines"), [
    BlockID.enginePeat,
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.enginePeat, count: 1, data: 0}, [
        "bbb",
        "0s0",
        "gpg"
    ], ['b', ItemID.ingotCopper, -1, 'g', ItemID.gearCopper, -1, 'p', VanillaBlockID.piston, 0, 's', VanillaBlockID.glass, 0]);
});