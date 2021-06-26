IDRegistry.genItemID("waxBees");
Item.createItem("waxBees", "forestry.item.beeswax", {name: "waxBees"});

IDRegistry.genItemID("waxRefractory");
Item.createItem("waxRefractory", "forestry.item.refractory_wax", {name: "waxRefractory"});

Item.addCreativeGroup("waxes", t("forestry.creative_group.waxes"), [
    ItemID.waxBees,
    ItemID.waxRefractory,
]);