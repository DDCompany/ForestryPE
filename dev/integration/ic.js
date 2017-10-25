ModAPI.addAPICallback("ICore", function () {
    Dictionary.add("backpackMiners", {id: BlockID.oreLead, data: 0});
    Dictionary.add("backpackMiners", {id: BlockID.oreUranium, data: 0});
    Dictionary.add("backpackMiners", {id: ItemID.ingotSteel, data: 0});
    Dictionary.add("backpackMiners", {id: ItemID.ingotLead, data: 0});
    Dictionary.add("backpackMiners", {id: ItemID.uraniumChunk, data: 0});
    Dictionary.add("backpackMiners", {id: ItemID.iridiumChunk, data: 0});
    

    Logger.Log("IC PE integration enabled", "ForestryPE");
});