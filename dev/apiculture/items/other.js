IDRegistry.genItemID("honeyDrop");
Item.createItem("honeyDrop", "Honey Drop", {name: "honeyDrop", meta: 0}, {});

IDRegistry.genItemID("beeswax");
Item.createItem("beeswax", "Beeswax", {name: "beeswax", meta: 0}, {});

IDRegistry.genItemID("honeydew");
Item.createItem("honeydew", "Honeydew", {name: "honeydew", meta: 0}, {});

IDRegistry.genItemID("propolis");
Item.createItem("propolis", "Propolis", {name: "propolis", meta: 0}, {});

IDRegistry.genItemID("propolisSilky");
Item.createItem("propolisSilky", "Silky Propolis", {name: "propolis", meta: 1}, {});

IDRegistry.genItemID("propolisPulse");
Item.createItem("propolisPulse", "Pulsating Propolis", {name: "propolis", meta: 2}, {});

IDRegistry.genItemID("refractoryWax");
Item.createItem("refractoryWax", "Refractory Wax", {name: "refractoryWax", meta: 0}, {});

IDRegistry.genItemID("phosphor");
Item.createItem("phosphor", "Phosphor", {name: "phosphor", meta: 0}, {});

IDRegistry.genItemID("pollen");
Item.createItem("pollen", "Crystalline Pollen Cluster", {name: "pollen", meta: 0}, {});

IDRegistry.genItemID("pollen1");
Item.createItem("pollen1", "Pollen Cluster", {name: "pollen", meta: 1}, {});

IDRegistry.genItemID("royalJelly");
Item.createItem("royalJelly", "Royal Jelly", {name: "royalJelly", meta: 0}, {});

IDRegistry.genItemID("iceShard");
Item.createItem("iceShard", "Ice Shard", {name: "iceShard", meta: 0}, {});

IDRegistry.genItemID("silkWisp");
Item.createItem("silkWisp", "Silk Wisp", {name: "silkWisp", meta: 0}, {});

IDRegistry.genItemID("wovenSilk");
Item.createItem("wovenSilk", "Woven Silk", {name: "wovenSilk", meta: 0}, {});

IDRegistry.genItemID("waxCast");
Item.createItem("waxCast", "Wax Cast", {name: "waxCast", meta: 0}, {});

IDRegistry.genItemID("pulsatingMesh");
Item.createItem("pulsatingMesh", "Pulsating Mesh", {name: "pulsatingMesh", meta: 0}, {});

IDRegistry.genItemID("stickImpregnated");
Item.createItem("stickImpregnated", "Impregnated Stick", {name: "stickImpregnated", meta: 0}, {});

IDRegistry.genItemID("scentedPaneling");
Item.createItem("scentedPaneling", "Scented Paneling", {name: "scentedPaneling", meta: 0}, {});

Callback.addCallback("PostLoaded", function () {
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