IDRegistry.genItemID("chipsetBasic");
Item.createItem("chipsetBasic", "forestry.item.basic_circuit_board", {name: "chipsetBasic", meta: 0}, {});

IDRegistry.genItemID("chipsetEnhanced");
Item.createItem("chipsetEnhanced", "forestry.item.enhanced_circuit_board", {name: "chipsetEnhanced", meta: 0}, {});

IDRegistry.genItemID("chipsetIntricate");
Item.createItem("chipsetIntricate", "forestry.item.intricate_circuit_board", {name: "chipsetIntricate", meta: 0}, {});

IDRegistry.genItemID("chipsetRefined");
Item.createItem("chipsetRefined", "forestry.item.refined_circuit_board", {name: "chipsetRefined", meta: 0}, {});

Item.addCreativeGroup("forestry_chipsets", t("forestry.creative_group.chipsets"), [
    ItemID.chipsetBasic,
    ItemID.chipsetEnhanced,
    ItemID.chipsetIntricate,
    ItemID.chipsetRefined,
]);