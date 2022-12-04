IDRegistry.genItemID("peat");
Item.createItem("peat", "forestry.item.peat", {name: "peat"}, {});

IDRegistry.genItemID("bituminousPeat");
Item.createItem("bituminousPeat", "forestry.item.bituminous_peat", {name: "bituminousPeat"}, {});

Callback.addCallback("PostLoaded", () => {
    Recipes.addFurnace(ItemID.peat, ItemID.ash, 0);

    Recipes.addFurnaceFuel(ItemID.peat, 0, 2000);
    Recipes.addFurnaceFuel(ItemID.bituminousPeat, 0, 4200);

    Recipes.addShaped({id: ItemID.bituminousPeat, count: 1, data: 0}, [
        " a ",
        "pgp",
        " a "
    ], ['a', ItemID.ash, 0, 'g', ItemID.propolis, 0, 'p', ItemID.peat, 0]);
});