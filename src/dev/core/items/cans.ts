IDRegistry.genItemID("can");
Item.createItem("can", "forestry.item.can", {name: "can"});

IDRegistry.genItemID("capsuleWax");
Item.createItem("capsuleWax", "forestry.item.wax_capsule", {name: "capsuleWax"});

IDRegistry.genItemID("capsuleRefractory");
Item.createItem("capsuleRefractory", "forestry.item.refractory_capsule", {name: "capsuleRefractory"});

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: ItemID.can, count: 10, data: 0}, [
        " I ",
        "I I",
        " I ",
    ], ['I', ItemID.ingotTin, 0]);

    Recipes.addShaped({id: ItemID.capsuleWax, count: 3, data: 0}, [
        "WWW",
        " W ",
    ], ['W', ItemID.waxBees, 0]);

    Recipes.addShaped({id: ItemID.capsuleRefractory, count: 3, data: 0}, [
        "WWW",
        " W ",
    ], ['W', ItemID.waxRefractory, 0]);
});