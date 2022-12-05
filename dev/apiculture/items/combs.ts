IDRegistry.genItemID("combCocoa");
Item.createItem("combCocoa", "forestry.item.cocoa_comb", {name: "combCocoa"}, {});
Item.setCategory(ItemID.combCocoa, EItemCategory.MATERIAL);

IDRegistry.genItemID("combDripping");
Item.createItem("combDripping", "forestry.item.dripping_comb", {name: "combDripping"}, {});
Item.setCategory(ItemID.combDripping, EItemCategory.MATERIAL);

IDRegistry.genItemID("combHoney");
Item.createItem("combHoney", "forestry.item.honey_comb", {name: "combHoney"}, {});
Item.setCategory(ItemID.combHoney, EItemCategory.MATERIAL);

IDRegistry.genItemID("combFrozen");
Item.createItem("combFrozen", "forestry.item.frozen_comb", {name: "combFrozen"}, {});
Item.setCategory(ItemID.combFrozen, EItemCategory.MATERIAL);

IDRegistry.genItemID("combMellow");
Item.createItem("combMellow", "forestry.item.mellow_comb", {name: "combMellow"}, {});
Item.setCategory(ItemID.combMellow, EItemCategory.MATERIAL);

IDRegistry.genItemID("combMossy");
Item.createItem("combMossy", "forestry.item.mossy_comb", {name: "combMossy"}, {});
Item.setCategory(ItemID.combMossy, EItemCategory.MATERIAL);

IDRegistry.genItemID("combMysterious");
Item.createItem("combMysterious", "forestry.item.mysterious_comb", {name: "combMysterious"}, {});
Item.setCategory(ItemID.combMysterious, EItemCategory.MATERIAL);

IDRegistry.genItemID("combParched");
Item.createItem("combParched", "forestry.item.parched_comb", {name: "combParched"}, {});
Item.setCategory(ItemID.combParched, EItemCategory.MATERIAL);

IDRegistry.genItemID("combPowdery");
Item.createItem("combPowdery", "forestry.item.powdery_comb", {name: "combPowdery"}, {});
Item.setCategory(ItemID.combPowdery, EItemCategory.MATERIAL);

IDRegistry.genItemID("combSilky");
Item.createItem("combSilky", "forestry.item.silky_comb", {name: "combSilky"}, {});
Item.setCategory(ItemID.combSilky, EItemCategory.MATERIAL);

IDRegistry.genItemID("combSimmering");
Item.createItem("combSimmering", "forestry.item.simmering_comb", {name: "combSimmering"}, {});
Item.setCategory(ItemID.combSimmering, EItemCategory.MATERIAL);

IDRegistry.genItemID("combStringy");
Item.createItem("combStringy", "forestry.item.stringy_comb", {name: "combStringy"}, {});
Item.setCategory(ItemID.combStringy, EItemCategory.MATERIAL);

IDRegistry.genItemID("combWheaten");
Item.createItem("combWheaten", "forestry.item.wheaten_comb", {name: "combWheaten"}, {});
Item.setCategory(ItemID.combWheaten, EItemCategory.MATERIAL);

IDRegistry.genItemID("combIrradiated");
Item.createItem("combIrradiated", "forestry.item.irradiated_comb", {name: "combIrradiated"}, {});
Item.setCategory(ItemID.combIrradiated, EItemCategory.MATERIAL);

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

Item.addCreativeGroup("bee_combs", t("forestry.creative_group.bee_combs"), COMBS);