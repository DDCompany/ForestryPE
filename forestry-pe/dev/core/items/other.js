IDRegistry.genItemID("fertilizerBio");
Item.createItem("fertilizerBio", "Compost", {name: "fertilizerBio", meta: 0}, {});

IDRegistry.genItemID("mouldyWheat");
Item.createItem("mouldyWheat", "Mouldy Wheat", {name: "mouldyWheat", meta: 0}, {});

IDRegistry.genItemID("decayingWheat");
Item.createItem("decayingWheat", "Decaying Wheat", {name: "decayingWheat", meta: 0}, {});

IDRegistry.genItemID("mulch");
Item.createItem("mulch", "Mulch", {name: "mulch", meta: 0}, {});

IDRegistry.genItemID("woodPulp");
Item.createItem("woodPulp", "Wood Pulp", {name: "woodPulp", meta: 0}, {});

IDRegistry.genItemID("carton");
Item.createItem("carton", "Carton", {name: "carton", meta: 0}, {});

IDRegistry.genItemID("fertilizerCompound");
Item.createItem("fertilizerCompound", "Fertilizer", {name: "fertilizerCompound", meta: 0}, {});

IDRegistry.genItemID("ash");
Item.createItem("ash", "Ash", {name: "ash", meta: 0}, {});

IDRegistry.genItemID("iodineCapsule");
Item.createItem("iodineCapsule", "Iodine Capsule", {name: "iodineCapsule", meta: 0}, {});
ItemUtils.addStaticTooltip(ItemID.iodineCapsule, "item.iodine_capsule.tooltip");

IDRegistry.genItemID("dissipationCharge");
Item.createItem("dissipationCharge", "Dissipation Charge", {name: "dissipationCharge", meta: 0}, {});
ItemUtils.addStaticTooltip(ItemID.dissipationCharge, "item.dissipation_charge.tooltip");

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: ItemID.fertilizerBio, count: 4, data: 0}, [
        " w ",
        "wdw",
        " w "
    ], ['w', 296, -1, 'd', 3, -1]);

    Recipes.addShaped({id: ItemID.fertilizerBio, count: 1, data: 0}, [
        " w ",
        "wdw",
        " w "
    ], ['w', ItemID.ash, -1, 'd', 3, -1]);

    Recipes.addShaped({id: ItemID.fertilizerCompound, count: 8, data: 0}, [
        " s ",
        " w ",
        " s "
    ], ['w', ItemID.apatite, -1, 's', 12, -1]);

    Recipes.addShaped({id: ItemID.fertilizerCompound, count: 16, data: 0}, [
        "sss",
        "sws",
        "sss"
    ], ['w', ItemID.apatite, -1, 's', ItemID.ash, -1]);

    Recipes.addFurnace(263, ItemID.ash, 0);
});