ModAPI.addAPICallback("ICore", function (api) {
    let blacklist = api.requireGlobal("recyclerBlacklist");

    for (const key in BeeRegistry.bees) {
        const bee = BeeRegistry.bees[key];
        blacklist.push(bee.princessID);
        blacklist.push(bee.droneID);
        blacklist.push(bee.queenID);
    }

    CentrifugeManager.registerRecipe({
        input: {
            id: ItemID.propolis
        },
        result: [
            {
                id: ItemID.latex
            }
        ]
    });

    for (const key in fermenterLiquids) {
        FermenterManager.addRecipe({
            id: ItemID.rubberSapling,
            inputLiquid: key,
            liquidAmount: 0.25,
            modifier: fermenterLiquids[key],
            liquid: "biomass"
        });
    }

    registerTubeRecipe(ItemID.thermionicTubeRubber, ItemID.rubber);
    registerCrate(ItemID.latex, "Latex", "crateLatex");
    registerCrate(ItemID.scrap, "Scrap", "crateScrap");

    log("IC Integration Activated", "INFO")
});