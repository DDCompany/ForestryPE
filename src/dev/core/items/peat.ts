IDRegistry.genItemID("peat");
Item.createItem("peat", "forestry.item.peat", {name: "peat"});

IDRegistry.genItemID("peatBituminous");
Item.createItem("peatBituminous", "forestry.item.bituminous_peat", {name: "peatBituminous"});

Item.addCreativeGroup("peat", t("forestry.creative_group.peat"), [
    ItemID.peat,
    ItemID.peatBituminous,
]);

Recipes.addFurnaceFuel(ItemID.peat, 0, 2000);
Recipes.addFurnaceFuel(ItemID.peatBituminous, 0, 4200);