IDRegistry.genItemID("gearCopper");
Item.createItem("gearCopper", "forestry.item.copper_gear", {name: "gearCopper"}, {});
Item.setCategory(ItemID.gearCopper, EItemCategory.MATERIAL);

IDRegistry.genItemID("gearTin");
Item.createItem("gearTin", "forestry.item.tin_gear", {name: "gearTin"}, {});
Item.setCategory(ItemID.gearTin, EItemCategory.MATERIAL);

IDRegistry.genItemID("gearBronze");
Item.createItem("gearBronze", "forestry.item.bronze_gear", {name: "gearBronze"}, {});
Item.setCategory(ItemID.gearBronze, EItemCategory.MATERIAL);

Item.addCreativeGroup("gear", t("forestry.creative_group.gears"), [
    ItemID.gearCopper,
    ItemID.gearTin,
    ItemID.gearBronze,
]);

Callback.addCallback("PostLoaded", () => {
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