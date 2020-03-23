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

for (let i in fermenterLiquids) {
    let modifier = fermenterLiquids[i];

    FermenterManager.addRecipe({
        id: 6,
        inputLiquid: i,
        liquidAmount: 0.25,
        modifier: modifier,
        liquid: "biomass"
    });

    FermenterManager.addRecipe({
        id: 81,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier: modifier,
        liquid: "biomass"
    });

    FermenterManager.addRecipe({
        id: 296,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier: modifier,
        liquid: "biomass"
    });

    FermenterManager.addRecipe({
        id: 338,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier: modifier,
        liquid: "biomass"
    });

    FermenterManager.addRecipe({
        id: 392,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier: modifier,
        liquid: "biomass"
    });

    FermenterManager.addRecipe({
        id: 39,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier: modifier,
        liquid: "biomass"
    });

    FermenterManager.addRecipe({
        id: 40,
        inputLiquid: i,
        liquidAmount: 0.05,
        modifier: modifier,
        liquid: "biomass"
    });
}