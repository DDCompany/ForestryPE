IDRegistry.genItemID("combCocoa");
Item.createItem("combCocoa", "forestry.item.cocoa_comb", {name: "combCocoa", meta: 0}, {});

IDRegistry.genItemID("combDripping");
Item.createItem("combDripping", "forestry.item.dripping_comb", {name: "combDripping", meta: 0}, {});

IDRegistry.genItemID("combHoney");
Item.createItem("combHoney", "forestry.item.honey_comb", {name: "combHoney", meta: 0}, {});

IDRegistry.genItemID("combFrozen");
Item.createItem("combFrozen", "forestry.item.frozen_comb", {name: "combFrozen", meta: 0}, {});

IDRegistry.genItemID("combMellow");
Item.createItem("combMellow", "forestry.item.mellow_comb", {name: "combMellow", meta: 0}, {});

IDRegistry.genItemID("combMossy");
Item.createItem("combMossy", "forestry.item.mossy_comb", {name: "combMossy", meta: 0}, {});

IDRegistry.genItemID("combMysterious");
Item.createItem("combMysterious", "forestry.item.mysterious_comb", {name: "combMysterious", meta: 0}, {});

IDRegistry.genItemID("combParched");
Item.createItem("combParched", "forestry.item.parched_comb", {name: "combParched", meta: 0}, {});

IDRegistry.genItemID("combPowdery");
Item.createItem("combPowdery", "forestry.item.powdery_comb", {name: "combPowdery", meta: 0}, {});

IDRegistry.genItemID("combSilky");
Item.createItem("combSilky", "forestry.item.silky_comb", {name: "combSilky", meta: 0}, {});

IDRegistry.genItemID("combSimmering");
Item.createItem("combSimmering", "forestry.item.simmering_comb", {name: "combSimmering", meta: 0}, {});

IDRegistry.genItemID("combStringy");
Item.createItem("combStringy", "forestry.item.stringy_comb", {name: "combStringy", meta: 0}, {});

IDRegistry.genItemID("combWheaten");
Item.createItem("combWheaten", "forestry.item.wheaten_comb", {name: "combWheaten", meta: 0}, {});

IDRegistry.genItemID("combIrradiated");
Item.createItem("combIrradiated", "forestry.item.irradiated_comb", {name: "combIrradiated", meta: 0}, {});

COMBS.push(ItemID.combCocoa);
COMBS.push(ItemID.combDripping);
COMBS.push(ItemID.combHoney);
COMBS.push(ItemID.combFrozen);
COMBS.push(ItemID.combMellow);
COMBS.push(ItemID.combMossy);
COMBS.push(ItemID.combMysterious);
COMBS.push(ItemID.combParched);
COMBS.push(ItemID.combPowdery);
COMBS.push(ItemID.combSilky);
COMBS.push(ItemID.combSimmering);
COMBS.push(ItemID.combStringy);
COMBS.push(ItemID.combWheaten);
COMBS.push(ItemID.combIrradiated);

Item.addCreativeGroup("forestry_combs", t("forestry.creative_group.bee_combs"), COMBS);