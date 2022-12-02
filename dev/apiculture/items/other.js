IDRegistry.genItemID("honeyDrop");
Item.createItem("honeyDrop", "forestry.item.honey_drop", {name: "honeyDrop", meta: 0}, {});

IDRegistry.genItemID("beeswax");
Item.createItem("beeswax", "forestry.item.beeswax", {name: "beeswax", meta: 0}, {});

IDRegistry.genItemID("honeydew");
Item.createItem("honeydew", "forestry.item.honeydew", {name: "honeydew", meta: 0}, {});

IDRegistry.genItemID("propolis");
Item.createItem("propolis", "forestry.item.propolis", {name: "propolis", meta: 0}, {});

IDRegistry.genItemID("propolisSilky");
Item.createItem("propolisSilky", "forestry.item.silky_propolis", {name: "propolis", meta: 1}, {});

IDRegistry.genItemID("propolisPulse");
Item.createItem("propolisPulse", "forestry.item.pulsating_propolis", {name: "propolis", meta: 2}, {});

IDRegistry.genItemID("refractoryWax");
Item.createItem("refractoryWax", "forestry.item.refractory_wax", {name: "refractoryWax", meta: 0}, {});

IDRegistry.genItemID("phosphor");
Item.createItem("phosphor", "forestry.item.phosphor", {name: "phosphor", meta: 0}, {});

IDRegistry.genItemID("pollen");
Item.createItem("pollen", "forestry.item.crystalline_pollen_cluster", {name: "pollen", meta: 0}, {});

IDRegistry.genItemID("pollen1");
Item.createItem("pollen1", "forestry.item.pollen_cluster", {name: "pollen", meta: 1}, {});

IDRegistry.genItemID("royalJelly");
Item.createItem("royalJelly", "forestry.item.royal_jelly", {name: "royalJelly", meta: 0}, {});

IDRegistry.genItemID("iceShard");
Item.createItem("iceShard", "forestry.item.ice_shard", {name: "iceShard", meta: 0}, {});

IDRegistry.genItemID("silkWisp");
Item.createItem("silkWisp", "forestry.item.silk_wisp", {name: "silkWisp", meta: 0}, {});

IDRegistry.genItemID("wovenSilk");
Item.createItem("wovenSilk", "forestry.item.woven_silk", {name: "wovenSilk", meta: 0}, {});

IDRegistry.genItemID("waxCast");
Item.createItem("waxCast", "forestry.item.wax_cast", {name: "waxCast", meta: 0}, {});

IDRegistry.genItemID("pulsatingMesh");
Item.createItem("pulsatingMesh", "forestry.item.pulsating_mesh", {name: "pulsatingMesh", meta: 0}, {});

IDRegistry.genItemID("stickImpregnated");
Item.createItem("stickImpregnated", "forestry.item.impregnated_stick", {name: "stickImpregnated", meta: 0}, {});

IDRegistry.genItemID("scentedPaneling");
Item.createItem("scentedPaneling", "forestry.item.scented_paneling", {name: "scentedPaneling", meta: 0}, {});

Item.addCreativeGroup("forestry_propolis", t("forestry.creative_group.propolis"), [
    ItemID.propolis,
    ItemID.propolisSilky,
    ItemID.propolisPulse,
]);

Item.addCreativeGroup("forestry_pollen", t("forestry.creative_group.pollen"), [
    ItemID.pollen,
    ItemID.pollen1,
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: 382, count: 1, data: 0}, [
        "hdh",
        "hmh",
        "hdh"
    ], ['h', ItemID.honeyDrop, 0, 'd', ItemID.honeydew, 0, 'm', 360, 0]);

    Recipes.addShaped({id: 341, count: 1, data: 0}, [
        "pdp",
        "pdp",
        "pdp"
    ], ['p', ItemID.propolis, 0, 'd', ItemID.pollen1, 0]);

    Recipes.addShaped({id: 287, count: 1, data: 0}, [
        " w ",
        " w ",
        " w "
    ], ['w', ItemID.silkWisp, 0]);

    Recipes.addShaped({id: ItemID.pulsatingMesh, count: 1, data: 0}, [
        "w w",
        " w ",
        "w w"
    ], ['w', ItemID.propolisPulse, -1]);

    Recipes.addShaped({id: ItemID.waxCast, count: 1, data: 0}, [
        "www",
        "w w",
        "www"
    ], ['w', ItemID.beeswax, -1]);

    Recipes.addShaped({id: 50, count: 1, data: 0}, [
        " W ",
        " W ",
        " S "
    ], ['W', ItemID.beeswax, -1, 'S', 280, -1]);
});