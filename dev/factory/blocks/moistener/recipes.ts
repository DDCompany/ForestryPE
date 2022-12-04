//Fuel
MoistenerManager.registerFuel({
    inputItem: {id: VanillaBlockID.wheat},
    outputItem: {id: ItemID.mouldyWheat},
    time: 300,
});

MoistenerManager.registerFuel({
    inputItem: {id: ItemID.mouldyWheat},
    outputItem: {id: ItemID.decayingWheat},
    time: 600,
});

MoistenerManager.registerFuel({
    inputItem: {id: ItemID.decayingWheat},
    outputItem: {id: ItemID.mulch},
    time: 900,
});

//Recipes
MoistenerManager.registerRecipe({
    inputItem: {id: VanillaItemID.wheat_seeds},
    outputItem: {id: VanillaBlockID.mycelium},
    time: 5000,
});

MoistenerManager.registerRecipe({
    inputItem: {id: VanillaBlockID.cobblestone},
    outputItem: {id: VanillaBlockID.mossy_cobblestone},
    time: 20000,
});

MoistenerManager.registerRecipe({
    inputItem: {id: VanillaBlockID.stonebrick},
    outputItem: {id: VanillaBlockID.stonebrick, data: 1},
    time: 20000,
});

MoistenerManager.registerRecipe({
    inputItem: {id: VanillaBlockID.leaves, data: 1},
    outputItem: {id: VanillaBlockID.dirt},
    time: 5000,
});