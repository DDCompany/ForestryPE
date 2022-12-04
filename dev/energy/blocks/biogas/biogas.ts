IDRegistry.genBlockID("engineBiogas");
Block.createBlock("engineBiogas", [
    {
        name: "forestry.block.biogas_engine",
        texture: [["engine_biogas", 0], ["engine_biogas", 2], ["engine_biogas", 1]],
        inCreative: true,
    },
]);
ModelHelper.createEngineModel(BlockID.engineBiogas);
GROUP_ITEM_PIPE.add(BlockID.engineBiogas, -1);

Item.addCreativeGroup("forestry_engines", t("forestry.creative_group.engines"), [
    BlockID.engineBiogas,
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.engineBiogas, count: 1, data: 0}, [
        "bbb",
        "0s0",
        "gpg"
    ], ['b', ItemID.ingotBronze, -1, 'g', ItemID.gearBronze, -1, 'p', VanillaBlockID.piston, -1, 's', VanillaBlockID.glass, -1]);
});