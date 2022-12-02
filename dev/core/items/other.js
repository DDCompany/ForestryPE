IDRegistry.genItemID("fertilizerBio");
Item.createItem("fertilizerBio", "forestry.item.compost", {name: "fertilizerBio", meta: 0}, {});

IDRegistry.genItemID("mouldyWheat");
Item.createItem("mouldyWheat", "forestry.item.mouldy_wheat", {name: "mouldyWheat", meta: 0}, {});

IDRegistry.genItemID("decayingWheat");
Item.createItem("decayingWheat", "forestry.item.decaying_wheat", {name: "decayingWheat", meta: 0}, {});

IDRegistry.genItemID("mulch");
Item.createItem("mulch", "forestry.item.mulch", {name: "mulch", meta: 0}, {});

IDRegistry.genItemID("woodPulp");
Item.createItem("woodPulp", "forestry.item.wood_pulp", {name: "woodPulp", meta: 0}, {});

IDRegistry.genItemID("carton");
Item.createItem("carton", "forestry.item.carton", {name: "carton", meta: 0}, {});

IDRegistry.genItemID("fertilizerCompound");
Item.createItem("fertilizerCompound", "forestry.item.fertilizer", {name: "fertilizerCompound", meta: 0}, {});

IDRegistry.genItemID("ash");
Item.createItem("ash", "forestry.item.ash", {name: "ash", meta: 0}, {});

IDRegistry.genItemID("iodineCapsule");
Item.createItem("iodineCapsule", "forestry.item.iodine_capsule", {name: "iodineCapsule", meta: 0}, {});
ItemUtils.addStaticTooltip(ItemID.iodineCapsule, "forestry.item.iodine_capsule.tooltip");

IDRegistry.genItemID("dissipationCharge");
Item.createItem("dissipationCharge", "forestry.item.dissipation_charge", {name: "dissipationCharge", meta: 0}, {});
ItemUtils.addStaticTooltip(ItemID.dissipationCharge, "forestry.item.dissipation_charge.tooltip");

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