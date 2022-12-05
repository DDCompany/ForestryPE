IDRegistry.genItemID("beeswax");
Item.createItem("beeswax", "forestry.item.beeswax", {name: "beeswax"}, {});
Item.setCategory(ItemID.beeswax, EItemCategory.MATERIAL);

IDRegistry.genItemID("refractoryWax");
Item.createItem("refractoryWax", "forestry.item.refractory_wax", {name: "refractoryWax"}, {});
Item.setCategory(ItemID.refractoryWax, EItemCategory.MATERIAL);

Item.addCreativeGroup("wax", t("forestry.creative_group.wax"), [
    ItemID.beeswax,
    ItemID.refractoryWax,
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: VanillaBlockID.torch, count: 1, data: 0}, [
        " W ",
        " W ",
        " S "
    ], ['W', ItemID.beeswax, -1, 'S', VanillaItemID.stick, -1]);
});