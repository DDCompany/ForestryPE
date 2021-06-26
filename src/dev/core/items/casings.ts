IDRegistry.genItemID("casingSturdy");
Item.createItem("casingSturdy", "forestry.item.sturdy_casing", {name: "casingSturdy"});

IDRegistry.genItemID("casingHardened");
Item.createItem("casingHardened", "forestry.item.hardened_casing", {name: "casingHardened"});

IDRegistry.genItemID("casingImpregnated");
Item.createItem("casingImpregnated", "forestry.item.impregnated_casing", {name: "casingImpregnated"});

Item.addCreativeGroup("casings", t("forestry.creative_group.casings"), [
    ItemID.casingSturdy,
    ItemID.casingHardened,
    ItemID.casingImpregnated,
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: ItemID.casingSturdy, count: 1, data: 0}, [
        "III",
        "I I",
        "III",
    ], ['I', ItemID.ingotBronze, 0]);
});