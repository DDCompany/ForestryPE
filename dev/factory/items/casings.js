IDRegistry.genItemID("impregnatedCasing");
Item.createItem("impregnatedCasing", "Impregnated Casing", {name: "impregnatedCasing", meta: 0}, {});

IDRegistry.genItemID("hardenedMachine");
Item.createItem("hardenedMachine", "Hardened Casing", {name: "hardenedMachine", meta: 0}, {});

IDRegistry.genItemID("sturdyMachine");
Item.createItem("sturdyMachine", "Sturdy Casing", {name: "sturdyMachine", meta: 0}, {});

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: ItemID.sturdyMachine, count: 1, data: 0}, [
        "WWW",
        "W W",
        "WWW"
    ], ['W', ItemID.ingotBronze, -1]);
});