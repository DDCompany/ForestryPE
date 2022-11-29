IDRegistry.genItemID("impregnatedCasing");
Item.createItem("impregnatedCasing", "Impregnated Casing", {name: "impregnatedCasing", meta: 0}, {});

IDRegistry.genItemID("hardenedMachine");
Item.createItem("hardenedMachine", "Hardened Casing", {name: "hardenedMachine", meta: 0}, {});

IDRegistry.genItemID("sturdyMachine");
Item.createItem("sturdyMachine", "Sturdy Casing", {name: "sturdyMachine", meta: 0}, {});

Item.addCreativeGroup(GROUP_CASINGS, GROUP_CASINGS_NAME, [ItemID.impregnatedCasing, ItemID.hardenedMachine, ItemID.sturdyMachine]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: ItemID.sturdyMachine, count: 1, data: 0}, [
        "WWW",
        "W W",
        "WWW"
    ], ['W', ItemID.ingotBronze, -1]);
});