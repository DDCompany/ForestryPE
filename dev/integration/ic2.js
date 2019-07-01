ModAPI.addAPICallback("ICore", function (api) {
    let blacklist = api.requireGlobal("recyclerBlacklist");

    for (let i in BeeRegistry.bees) {
        let bee = BeeRegistry.bees[i];
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

    FermenterManager.addRecipe({
        id: ItemID.rubberSapling,
        liquidAmount: 0.25,
        liquid: "biomass"
    });

    Logger.Log("IC Integration Activated", LOG_TAG)
});