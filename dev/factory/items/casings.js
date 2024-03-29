IDRegistry.genItemID("impregnatedCasing");
Item.createItem("impregnatedCasing", "forestry.item.impregnated_casing", {name: "impregnatedCasing", meta: 0}, {});

IDRegistry.genItemID("hardenedMachine");
Item.createItem("hardenedMachine", "forestry.item.hardened_casing", {name: "hardenedMachine", meta: 0}, {});

IDRegistry.genItemID("sturdyMachine");
Item.createItem("sturdyMachine", "forestry.item.sturdy_casing", {name: "sturdyMachine", meta: 0}, {});

Item.addCreativeGroup("forestry_casings", t("forestry.creative_group.machine_casings"), [
    ItemID.impregnatedCasing,
    ItemID.hardenedMachine,
    ItemID.sturdyMachine,
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: ItemID.sturdyMachine, count: 1, data: 0}, [
        "WWW",
        "W W",
        "WWW"
    ], ['W', ItemID.ingotBronze, -1]);
});