ModAPI.addAPICallback("ICore", function (api) {
    icIntegrationBiogeneratorGUI();
    icIntegrationBiogenerator();
    icIntegrationBiogeneratorTile(api);

    Dictionary.add("backpackMiners", {id: BlockID.oreCopper, data: 0});
    Dictionary.add("backpackMiners", {id: BlockID.oreLead, data: 0});
    Dictionary.add("backpackMiners", {id: BlockID.oreUranium, data: 0});
    Dictionary.add("backpackMiners", {id: ItemID.ingotCopper, data: 0});
    Dictionary.add("backpackMiners", {id: ItemID.ingotBronze, data: 0});
    Dictionary.add("backpackMiners", {id: ItemID.ingotTin, data: 0});
    Dictionary.add("backpackMiners", {id: ItemID.ingotSteel, data: 0});
    Dictionary.add("backpackMiners", {id: ItemID.ingotLead, data: 0});

    Logger.Log("IC PE integration enabled", "ForestryPE");
});