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

    for (let i in fermenterLiquids) {
        FermenterManager.addRecipe({
            id: ItemID.rubberSapling,
            inputLiquid: i,
            liquidAmount: 0.25,
            modifier: fermenterLiquids[i],
            liquid: "biomass"
        });
    }

    registerTubeRecipe(ItemID.thermionicTubeRubber, ItemID.rubber);

    log("IC Integration Activated", "INFO")
});