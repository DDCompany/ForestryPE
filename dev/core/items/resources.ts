IDRegistry.genItemID("ingotCopper");
Item.createItem("ingotCopper", "forestry.item.copper_ingot", {name: "ingotCopper"}, {});
Item.setCategory(ItemID.ingotCopper, EItemCategory.MATERIAL);

IDRegistry.genItemID("ingotTin");
Item.createItem("ingotTin", "forestry.item.tin_ingot", {name: "ingotTin"}, {});
Item.setCategory(ItemID.ingotTin, EItemCategory.MATERIAL);

IDRegistry.genItemID("ingotBronze");
Item.createItem("ingotBronze", "forestry.item.bronze_ingot", {name: "ingotBronze"}, {});
Item.setCategory(ItemID.ingotBronze, EItemCategory.MATERIAL);

IDRegistry.genItemID("apatite");
Item.createItem("apatite", "forestry.item.apatite", {name: "apatite"}, {});
Item.setCategory(ItemID.apatite, EItemCategory.MATERIAL);

IDRegistry.genItemID("phosphor");
Item.createItem("phosphor", "forestry.item.phosphor", {name: "phosphor"}, {});
Item.setCategory(ItemID.phosphor, EItemCategory.MATERIAL);

Item.addCreativeGroup("ingot", t("forestry.creative_group.ingots"), [
    ItemID.ingotCopper,
    ItemID.ingotTin,
    ItemID.ingotBronze,
]);

if (ForestryConfig.recipeBronzeIngot) {
    Callback.addCallback("PostLoaded", () => {
        Recipes.addShapeless({id: ItemID.ingotBronze, count: 4, data: 0}, [
            {id: ItemID.ingotCopper, data: 0},
            {id: ItemID.ingotCopper, data: 0},
            {id: ItemID.ingotCopper, data: 0},
            {id: ItemID.ingotTin, data: 0},
        ]);
    });
}