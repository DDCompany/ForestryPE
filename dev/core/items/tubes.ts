IDRegistry.genItemID("thermionicTubeDiamond");
Item.createItem("thermionicTubeDiamond", "forestry.item.diamond_thermionic_tube", {name: "thermionicTubeDiamond"}, {});
Item.setCategory(ItemID.thermionicTubeDiamond, EItemCategory.MATERIAL);

IDRegistry.genItemID("thermionicTubeGold");
Item.createItem("thermionicTubeGold", "forestry.item.gold_thermionic_tube", {name: "thermionicTubeGold"}, {});
Item.setCategory(ItemID.thermionicTubeGold, EItemCategory.MATERIAL);

IDRegistry.genItemID("thermionicTubeBronze");
Item.createItem("thermionicTubeBronze", "forestry.item.bronze_thermionic_tube", {name: "thermionicTubeBronze"}, {});
Item.setCategory(ItemID.thermionicTubeBronze, EItemCategory.MATERIAL);

IDRegistry.genItemID("thermionicTubeCopper");
Item.createItem("thermionicTubeCopper", "forestry.item.copper_thermionic_tube", {name: "thermionicTubeCopper"}, {});
Item.setCategory(ItemID.thermionicTubeCopper, EItemCategory.MATERIAL);

IDRegistry.genItemID("thermionicTubeIron");
Item.createItem("thermionicTubeIron", "forestry.item.iron_thermionic_tube", {name: "thermionicTubeIron"}, {});
Item.setCategory(ItemID.thermionicTubeIron, EItemCategory.MATERIAL);

IDRegistry.genItemID("thermionicTubeTin");
Item.createItem("thermionicTubeTin", "forestry.item.tin_thermionic_tube", {name: "thermionicTubeTin"}, {});
Item.setCategory(ItemID.thermionicTubeTin, EItemCategory.MATERIAL);

IDRegistry.genItemID("thermionicTubeObsidian");
Item.createItem("thermionicTubeObsidian", "forestry.item.obsidian_thermionic_tube", {name: "thermionicTubeObsidian"}, {});
Item.setCategory(ItemID.thermionicTubeObsidian, EItemCategory.MATERIAL);

IDRegistry.genItemID("thermionicTubeBlaze");
Item.createItem("thermionicTubeBlaze", "forestry.item.blaze_thermionic_tube", {name: "thermionicTubeBlaze"}, {});
Item.setCategory(ItemID.thermionicTubeBlaze, EItemCategory.MATERIAL);

IDRegistry.genItemID("thermionicTubeRubber");
Item.createItem("thermionicTubeRubber", "forestry.item.rubber_thermionic_tube", {name: "thermionicTubeRubber"}, {});
Item.setCategory(ItemID.thermionicTubeRubber, EItemCategory.MATERIAL);

IDRegistry.genItemID("thermionicTubeEmerald");
Item.createItem("thermionicTubeEmerald", "forestry.item.emerald_thermionic_tube", {name: "thermionicTubeEmerald"}, {});
Item.setCategory(ItemID.thermionicTubeEmerald, EItemCategory.MATERIAL);

IDRegistry.genItemID("thermionicTubeApatite");
Item.createItem("thermionicTubeApatite", "forestry.item.apatite_thermionic_tube", {name: "thermionicTubeApatite"}, {});
Item.setCategory(ItemID.thermionicTubeApatite, EItemCategory.MATERIAL);

IDRegistry.genItemID("thermionicTubeLapis");
Item.createItem("thermionicTubeLapis", "forestry.item.lapis_thermionic_tube", {name: "thermionicTubeLapis"}, {});
Item.setCategory(ItemID.thermionicTubeLapis, EItemCategory.MATERIAL);

Item.addCreativeGroup("tubeThermionic", t("forestry.creative_group.thermionic_tubes"), [
    ItemID.thermionicTubeDiamond,
    ItemID.thermionicTubeGold,
    ItemID.thermionicTubeBronze,
    ItemID.thermionicTubeCopper,
    ItemID.thermionicTubeIron,
    ItemID.thermionicTubeTin,
    ItemID.thermionicTubeObsidian,
    ItemID.thermionicTubeBlaze,
    ItemID.thermionicTubeRubber,
    ItemID.thermionicTubeEmerald,
    ItemID.thermionicTubeApatite,
    ItemID.thermionicTubeLapis,
]);