IDRegistry.genItemID("gearCopper");
Item.createItem("gearCopper", "Copper Gear", {name: "gearCopper", meta: 0}, {});

IDRegistry.genItemID("gearTin");
Item.createItem("gearTin", "Tin Gear", {name: "gearTin", meta: 0}, {});

IDRegistry.genItemID("gearBronze");
Item.createItem("gearBronze", "Bronze Gear", {name: "gearBronze", meta: 0}, {});

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: ItemID.gearCopper, count: 1, data: 0}, [
        " W ",
        "WWW",
        " W "
    ], ['W', ItemID.ingotCopper, -1]);

    Recipes.addShaped({id: ItemID.gearTin, count: 1, data: 0}, [
        " W ",
        "WXW",
        " W "
    ], ['W', ItemID.ingotTin, -1, 'X', ItemID.ingotCopper, -1]);

    Recipes.addShaped({id: ItemID.gearBronze, count: 1, data: 0}, [
        " W ",
        "WXW",
        " W "
    ], ['W', ItemID.ingotBronze, -1, 'X', ItemID.ingotCopper, -1]);
});