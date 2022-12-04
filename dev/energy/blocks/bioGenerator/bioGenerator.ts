IDRegistry.genBlockID("biogenerator");
FactoryManager.register("biogenerator", "forestry.block.bio_generator", [
    ["biogenerator_top", 0], ["biogenerator_top", 0], ["biogenerator", 0],
    ["biogenerator", 0], ["biogenerator_side", 0], ["biogenerator_side", 0],
], true);
GROUP_ITEM_PIPE.add(BlockID.biogenerator, -1);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.biogenerator, count: 1, data: 0}, [
        "ghg",
        "gmg",
        "ghg"
    ], ['g', VanillaItemID.gold_ingot, -1, 'h', VanillaBlockID.glass, -1, 'm', ItemID.sturdyMachine, -1]);
});