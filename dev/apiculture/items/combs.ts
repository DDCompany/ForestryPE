IDRegistry.genItemID("combCocoa");
Item.createItem("combCocoa", "forestry.item.cocoa_comb", {name: "combCocoa"}, {});

IDRegistry.genItemID("combDripping");
Item.createItem("combDripping", "forestry.item.dripping_comb", {name: "combDripping"}, {});

IDRegistry.genItemID("combHoney");
Item.createItem("combHoney", "forestry.item.honey_comb", {name: "combHoney"}, {});

IDRegistry.genItemID("combFrozen");
Item.createItem("combFrozen", "forestry.item.frozen_comb", {name: "combFrozen"}, {});

IDRegistry.genItemID("combMellow");
Item.createItem("combMellow", "forestry.item.mellow_comb", {name: "combMellow"}, {});

IDRegistry.genItemID("combMossy");
Item.createItem("combMossy", "forestry.item.mossy_comb", {name: "combMossy"}, {});

IDRegistry.genItemID("combMysterious");
Item.createItem("combMysterious", "forestry.item.mysterious_comb", {name: "combMysterious"}, {});

IDRegistry.genItemID("combParched");
Item.createItem("combParched", "forestry.item.parched_comb", {name: "combParched"}, {});

IDRegistry.genItemID("combPowdery");
Item.createItem("combPowdery", "forestry.item.powdery_comb", {name: "combPowdery"}, {});

IDRegistry.genItemID("combSilky");
Item.createItem("combSilky", "forestry.item.silky_comb", {name: "combSilky"}, {});

IDRegistry.genItemID("combSimmering");
Item.createItem("combSimmering", "forestry.item.simmering_comb", {name: "combSimmering"}, {});

IDRegistry.genItemID("combStringy");
Item.createItem("combStringy", "forestry.item.stringy_comb", {name: "combStringy"}, {});

IDRegistry.genItemID("combWheaten");
Item.createItem("combWheaten", "forestry.item.wheaten_comb", {name: "combWheaten"}, {});

IDRegistry.genItemID("combIrradiated");
Item.createItem("combIrradiated", "forestry.item.irradiated_comb", {name: "combIrradiated"}, {});

const COMBS: number[] = [
    ItemID.combCocoa,
    ItemID.combDripping,
    ItemID.combHoney,
    ItemID.combFrozen,
    ItemID.combMellow,
    ItemID.combMossy,
    ItemID.combMysterious,
    ItemID.combParched,
    ItemID.combPowdery,
    ItemID.combSilky,
    ItemID.combSimmering,
    ItemID.combStringy,
    ItemID.combWheaten,
    ItemID.combIrradiated,
];

Item.addCreativeGroup("forestry_combs", t("forestry.creative_group.bee_combs"), COMBS);