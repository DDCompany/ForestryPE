let textures_biogenerator = [["biogenerator_top", 0], ["biogenerator_top", 0], ["biogenerator", 0], ["biogenerator", 0], ["biogenerator_side", 0], ["biogenerator_side", 0]];
    Block.setPrototype("biogenerator", {
        type: Block.TYPE_ROTATION,

        getVariations: function () {
            return [{name: "Bio Generator", texture: textures_biogenerator, inCreative: true}];
        }
    });

    ModelHelper.createFactoryModel(BlockID.biogenerator, textures_biogenerator);

    Callback.addCallback("PostLoaded", function () {
        Recipes.addShaped({id: BlockID.biogenerator, count: 1, data: 0}, [
            "ghg",
            "gmg",
            "ghg"
        ], ['g', 266, 0, 'h', 20, 0, 'm', ItemID.sturdyMachine, 0,]);
    });


RecipeRegistry.registerBiogeneratorFuel("biomass", {
    ticks: 1,
    energy: 8
});

RecipeRegistry.registerBiogeneratorFuel("ethanol", {
    ticks: 2,
    energy: 16
});

    //ICRenderLib.addConnectionBlock("bc-container", BlockID.biogenerator);