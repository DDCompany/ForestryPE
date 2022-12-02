IDRegistry.genItemID("ingotCopper");
Item.createItem("ingotCopper", "forestry.item.copper_ingot", {name: "ingotCopper", meta: 0}, {});

IDRegistry.genItemID("ingotTin");
Item.createItem("ingotTin", "forestry.item.tin_ingot", {name: "ingotTin", meta: 0}, {});

IDRegistry.genItemID("ingotBronze");
Item.createItem("ingotBronze", "forestry.item.bronze_ingot", {name: "ingotBronze", meta: 0}, {});

IDRegistry.genItemID("apatite");
Item.createItem("apatite", "forestry.item.apatite", {name: "apatite", meta: 0}, {});

Item.addCreativeGroup("forestry_ingots", t("forestry.creative_group.ingots"), [
    ItemID.ingotCopper,
    ItemID.ingotTin,
    ItemID.ingotBronze,
]);

if (ForestryConfig.recipeBronzeIngot) {
    Callback.addCallback("PostLoaded", () => {
        Recipes.addShapeless({id: ItemID.ingotBronze, count: 4, data: 0}, [{
            id: ItemID.ingotCopper,
            data: 0
        }, {id: ItemID.ingotCopper, data: 0}, {id: ItemID.ingotCopper, data: 0}, {id: ItemID.ingotTin, data: 0}]);
    });
}