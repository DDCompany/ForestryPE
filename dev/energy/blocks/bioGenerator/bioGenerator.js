IDRegistry.genBlockID("biogenerator");
FactoryManager.register("biogenerator", "Bio Generator",
    [["biogenerator_top", 0], ["biogenerator_top", 0], ["biogenerator", 0], ["biogenerator", 0], ["biogenerator_side", 0], ["biogenerator_side", 0]], true);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.biogenerator, count: 1, data: 0}, [
        "ghg",
        "gmg",
        "ghg"
    ], ['g', 266, 0, 'h', 20, 0, 'm', ItemID.sturdyMachine, 0,]);
});


BioGeneratorManager.registerBiogeneratorFuel("biomass", {
    ticks: 1,
    energy: 8
});

BioGeneratorManager.registerBiogeneratorFuel("ethanol", {
    ticks: 2,
    energy: 16
});

//ICRenderLib.addConnectionBlock("bc-container", BlockID.biogenerator);