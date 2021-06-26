IDRegistry.genItemID("ash");
Item.createItem("ash", "forestry.item.ash", {name: "ash"});

IDRegistry.genItemID("silkWisp");
Item.createItem("silkWisp", "forestry.item.silk_wisp", {name: "silkWisp"});

IDRegistry.genItemID("fertilizerBio");
Item.createItem("fertilizerBio", "forestry.item.bio_fertilizer", {name: "fertilizerBio"});

IDRegistry.genItemID("fertilizerCompound");
Item.createItem("fertilizerCompound", "forestry.item.compound_fertilizer", {name: "fertilizerCompound"});

Callback.addCallback("PostLoaded", () => {
    Recipes.addFurnace(ItemID.peat, ItemID.ash, 0);

    Recipes.addShaped({id: VanillaBlockID.web, count: 4, data: 0}, [
        "W W",
        " W ",
        "W W",
    ], ['W', ItemID.silkWisp, 0]);

    Recipes.addShaped({id: ItemID.fertilizerBio, count: 2, data: 0}, [
        " W ",
        "WDW",
        " W ",
    ], ['D', VanillaBlockID.dirt, 0, "W", /* wheat */ 296, 0]);

    Recipes.addShaped({id: ItemID.fertilizerBio, count: 1, data: 0}, [
        " W ",
        "WDW",
        " W ",
    ], ['D', VanillaBlockID.dirt, 0, "W", ItemID.ash, 0]);

    Recipes.addShaped({id: ItemID.fertilizerCompound, count: 10, data: 0}, [
        "SSS",
        "SAS",
        "SSS",
    ], ['S', ItemID.ash, 0, "A", ItemID.apatite, 0]);

    Recipes.addShaped({id: VanillaItemID.string, count: 1, data: 0}, [
        " S ",
        " S ",
        " S ",
    ], ['S', ItemID.silkWisp, 0]);
});