IDRegistry.genItemID("pollen");
Item.createItem("pollen", "forestry.item.crystalline_pollen_cluster", {name: "pollen"}, {});
Item.setCategory(ItemID.pollen, EItemCategory.MATERIAL);

IDRegistry.genItemID("pollen1");
Item.createItem("pollen1", "forestry.item.pollen_cluster", {name: "pollen", data: 1}, {});
Item.setCategory(ItemID.pollen1, EItemCategory.MATERIAL);

Item.addCreativeGroup("pollen", t("forestry.creative_group.pollen"), [
    ItemID.pollen,
    ItemID.pollen1,
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: VanillaItemID.slime_ball, count: 1, data: 0}, [
        "pdp",
        "pdp",
        "pdp"
    ], ['p', ItemID.propolis, -1, 'd', ItemID.pollen1, -1]);
});