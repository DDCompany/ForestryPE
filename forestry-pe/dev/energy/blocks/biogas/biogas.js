Block.setPrototype("engineBiogas", {
    type: Block.TYPE_BASE,

    getVariations() {
        return [{
            name: "Biogas Engine",
            texture: [["engine_biogas", 0], ["engine_biogas", 2], ["engine_biogas", 1]],
            inCreative: true
        }];
    }
});

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.engineBiogas, count: 1, data: 0}, [
        "bbb",
        "0s0",
        "gpg"
    ], ['b', ItemID.ingotBronze, 0, 'g', ItemID.gearBronze, 0, 'p', 33, 0, 's', 20, 0]);
});

GROUP_ITEM_PIPE.add(BlockID.engineBiogas, -1);
ModelHelper.createEngineModel(BlockID.engineBiogas);
Item.addCreativeGroup(GROUP_ENGINES, GROUP_ENGINES_NAME, [BlockID.engineBiogas]);