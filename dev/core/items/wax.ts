IDRegistry.genItemID("beeswax");
Item.createItem("beeswax", "forestry.item.beeswax", {name: "beeswax"}, {});

IDRegistry.genItemID("refractoryWax");
Item.createItem("refractoryWax", "forestry.item.refractory_wax", {name: "refractoryWax"}, {});

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: VanillaBlockID.torch, count: 1, data: 0}, [
        " W ",
        " W ",
        " S "
    ], ['W', ItemID.beeswax, -1, 'S', VanillaItemID.stick, -1]);
});