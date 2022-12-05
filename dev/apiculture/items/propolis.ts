IDRegistry.genItemID("propolis");
Item.createItem("propolis", "forestry.item.propolis", {name: "propolis"}, {});
Item.setCategory(ItemID.propolis, EItemCategory.MATERIAL);

IDRegistry.genItemID("propolisSilky");
Item.createItem("propolisSilky", "forestry.item.silky_propolis", {name: "propolis", data: 1}, {});
Item.setCategory(ItemID.propolisSilky, EItemCategory.MATERIAL);

IDRegistry.genItemID("propolisPulse");
Item.createItem("propolisPulse", "forestry.item.pulsating_propolis", {name: "propolis", data: 2}, {});
Item.setCategory(ItemID.propolisPulse, EItemCategory.MATERIAL);

Item.addCreativeGroup("propolis", t("forestry.creative_group.propolis"), [
    ItemID.propolis,
    ItemID.propolisSilky,
    ItemID.propolisPulse,
]);