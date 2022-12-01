//Fuel
MoistenerManager.registerFuel({
    inputItem: {id: 296},
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
    inputItem: {id: 295},
    outputItem: {id: 110},
    time: 5000,
});

MoistenerManager.registerRecipe({
    inputItem: {id: 4},
    outputItem: {id: 48},
    time: 20000,
});

MoistenerManager.registerRecipe({
    inputItem: {id: 98},
    outputItem: {id: 98, data: 1},
    time: 20000,
});

MoistenerManager.registerRecipe({
    inputItem: {id: 18, data: 1},
    outputItem: {id: 3},
    time: 5000,
});