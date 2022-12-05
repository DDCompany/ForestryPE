IDRegistry.genItemID("silkWisp");
Item.createItem("silkWisp", "forestry.item.silk_wisp", {name: "silkWisp"}, {});
Item.setCategory(ItemID.silkWisp, EItemCategory.MATERIAL);

IDRegistry.genItemID("wovenSilk");
Item.createItem("wovenSilk", "forestry.item.woven_silk", {name: "wovenSilk"}, {});
Item.setCategory(ItemID.wovenSilk, EItemCategory.MATERIAL);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: VanillaItemID.string, count: 1, data: 0}, [
        " w ",
        " w ",
        " w "
    ], ['w', ItemID.silkWisp, 0]);
});