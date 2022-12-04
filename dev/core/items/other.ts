IDRegistry.genItemID("woodPulp");
Item.createItem("woodPulp", "forestry.item.wood_pulp", {name: "woodPulp"}, {});

IDRegistry.genItemID("ash");
Item.createItem("ash", "forestry.item.ash", {name: "ash"}, {});

IDRegistry.genItemID("fertilizerBio");
Item.createItem("fertilizerBio", "forestry.item.compost", {name: "fertilizerBio"}, {});

IDRegistry.genItemID("fertilizerCompound");
Item.createItem("fertilizerCompound", "forestry.item.fertilizer", {name: "fertilizerCompound"}, {});

IDRegistry.genItemID("stickImpregnated");
Item.createItem("stickImpregnated", "forestry.item.impregnated_stick", {name: "stickImpregnated"}, {});

IDRegistry.genItemID("pulsatingMesh");
Item.createItem("pulsatingMesh", "forestry.item.pulsating_mesh", {name: "pulsatingMesh"}, {});

IDRegistry.genItemID("scentedPaneling");
Item.createItem("scentedPaneling", "forestry.item.scented_paneling", {name: "scentedPaneling"}, {});

IDRegistry.genItemID("iceShard");
Item.createItem("iceShard", "forestry.item.ice_shard", {name: "iceShard"}, {})

Callback.addCallback("PostLoaded", () => {
    Recipes.addFurnace(VanillaItemID.coal, ItemID.ash, 0);

    Recipes.addShaped({id: ItemID.fertilizerBio, count: 4, data: 0}, [
        " w ",
        "wdw",
        " w "
    ], ['w', VanillaBlockID.wheat, -1, 'd', VanillaBlockID.dirt, -1]);

    Recipes.addShaped({id: ItemID.fertilizerBio, count: 1, data: 0}, [
        " w ",
        "wdw",
        " w "
    ], ['w', ItemID.ash, -1, 'd', VanillaBlockID.dirt, -1]);

    Recipes.addShaped({id: ItemID.fertilizerCompound, count: 8, data: 0}, [
        " s ",
        " w ",
        " s "
    ], ['w', ItemID.apatite, -1, 's', VanillaBlockID.sand, -1]);

    Recipes.addShaped({id: ItemID.fertilizerCompound, count: 16, data: 0}, [
        "sss",
        "sws",
        "sss"
    ], ['w', ItemID.apatite, -1, 's', ItemID.ash, -1]);
});