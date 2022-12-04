ModAPI.addAPICallback("ICore", () => {
    CentrifugeManager.registerRecipe({
        input: {
            id: ItemID.propolis,
        },
        result: [
            {id: ItemID.latex},
        ]
    });

    for (const key in fermenterLiquids) {
        FermenterManager.addRecipe({
            id: ItemID.rubberSapling,
            inputLiquid: key,
            liquidAmount: 0.25,
            modifier: fermenterLiquids[key as keyof typeof fermenterLiquids],
            liquid: "biomass",
        });
    }

    registerTubeRecipe(ItemID.thermionicTubeRubber, ItemID.rubber);
});