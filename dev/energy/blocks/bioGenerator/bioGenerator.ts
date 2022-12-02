IDRegistry.genBlockID("biogenerator");
FactoryManager.register("biogenerator", "forestry.block.bio_generator",
    [["biogenerator_top", 0], ["biogenerator_top", 0], ["biogenerator", 0], ["biogenerator", 0], ["biogenerator_side", 0], ["biogenerator_side", 0]], true);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.biogenerator, count: 1, data: 0}, [
        "ghg",
        "gmg",
        "ghg"
    ], ['g', 266, 0, 'h', 20, 0, 'm', ItemID.sturdyMachine, 0,]);
});


BioGeneratorManager.addFuel("biomass", {
    ticks: 1,
    energy: 8
});

BioGeneratorManager.addFuel("ethanol", {
    ticks: 2,
    energy: 16
});

GROUP_ITEM_PIPE.add(BlockID.biogenerator, -1);