Block.setPrototype("engineBiogas", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{
            name: "Biogas generator",
            texture: [["engine_biogas", 0], ["engine_biogas", 0], ["engine_biogas", 1]],
            inCreative: true
        }];
    }
});

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.engineBiogas, count: 1, data: 0}, [
        "bbb",
        "gmg",
        "sps"
    ], ['b', ItemID.ingotBronze, 0, 'g', ItemID.gearBronze, 0, 'm', ItemID.sturdyMachine, 0, 'p', 33, 0, 's', 20, 0]);
});

ICRenderLib.addConnectionBlock("bc-container", BlockID.engineBiogas);