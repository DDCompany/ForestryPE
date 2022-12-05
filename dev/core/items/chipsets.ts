IDRegistry.genItemID("chipsetBasic");
Item.createItem("chipsetBasic", "forestry.item.basic_circuit_board", {name: "chipsetBasic"}, {});
Item.setCategory(ItemID.chipsetBasic, EItemCategory.MATERIAL);

IDRegistry.genItemID("chipsetEnhanced");
Item.createItem("chipsetEnhanced", "forestry.item.enhanced_circuit_board", {name: "chipsetEnhanced"}, {});
Item.setCategory(ItemID.chipsetEnhanced, EItemCategory.MATERIAL);

IDRegistry.genItemID("chipsetIntricate");
Item.createItem("chipsetIntricate", "forestry.item.intricate_circuit_board", {name: "chipsetIntricate"}, {});
Item.setCategory(ItemID.chipsetIntricate, EItemCategory.MATERIAL);

IDRegistry.genItemID("chipsetRefined");
Item.createItem("chipsetRefined", "forestry.item.refined_circuit_board", {name: "chipsetRefined"}, {});
Item.setCategory(ItemID.chipsetRefined, EItemCategory.MATERIAL);

Item.addCreativeGroup("chipset", t("forestry.creative_group.chipsets"), [
    ItemID.chipsetBasic,
    ItemID.chipsetEnhanced,
    ItemID.chipsetIntricate,
    ItemID.chipsetRefined,
]);