FermenterManager.addFuel({
    id: ItemID.fertilizerBio,
    perCycle: 250,
    cycles: 45,
});

FermenterManager.addFuel({
    id: ItemID.fertilizerCompound,
    perCycle: 200,
    cycles: 56,
});

for (const i in fermenterLiquids) {
    const modifier = fermenterLiquids[i as keyof typeof fermenterLiquids];

    FermenterManager.addRecipe({
        id: VanillaBlockID.sapling,
        inputLiquid: i,
        liquidAmount: 0.25,
        modifier,
        liquid: "biomass"
    });

    FermenterManager.addRecipe({
        id: VanillaBlockID.cactus,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier,
        liquid: "biomass"
    });

    FermenterManager.addRecipe({
        id: VanillaBlockID.wheat,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier,
        liquid: "biomass"
    });

    FermenterManager.addRecipe({
        id: VanillaBlockID.reeds,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier,
        liquid: "biomass"
    });

    FermenterManager.addRecipe({
        id: VanillaItemID.potato,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier,
        liquid: "biomass"
    });

    FermenterManager.addRecipe({
        id: VanillaBlockID.brown_mushroom,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier,
        liquid: "biomass"
    });

    FermenterManager.addRecipe({
        id: VanillaBlockID.brown_mushroom,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier,
        liquid: "biomass"
    });
}