IDRegistry.genItemID("propolis");
Item.createItem("propolis", "forestry.item.propolis", {name: "propolis"}, {});

IDRegistry.genItemID("propolisSilky");
Item.createItem("propolisSilky", "forestry.item.silky_propolis", {name: "propolis", data: 1}, {});

IDRegistry.genItemID("propolisPulse");
Item.createItem("propolisPulse", "forestry.item.pulsating_propolis", {name: "propolis", data: 2}, {});

Item.addCreativeGroup("forestry_propolis", t("forestry.creative_group.propolis"), [
    ItemID.propolis,
    ItemID.propolisSilky,
    ItemID.propolisPulse,
]);