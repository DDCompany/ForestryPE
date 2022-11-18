IDRegistry.genItemID("ingotCopper");
Item.createItem("ingotCopper", "Copper Ingot", {name: "ingotCopper", meta: 0}, {});

IDRegistry.genItemID("ingotTin");
Item.createItem("ingotTin", "Tin Ingot", {name: "ingotTin", meta: 0}, {});

IDRegistry.genItemID("ingotBronze");
Item.createItem("ingotBronze", "Bronze Ingot", {name: "ingotBronze", meta: 0}, {});

IDRegistry.genItemID("apatite");
Item.createItem("apatite", "Apatite", {name: "apatite", meta: 0}, {});

Item.addCreativeGroup(GROUP_INGOTS, GROUP_INGOTS_NAME, [ItemID.ingotCopper, ItemID.ingotTin, ItemID.ingotBronze]);

if (ForestryConfig.recipeBronzeIngot) {
    Callback.addCallback("PostLoaded", function () {
        Recipes.addShapeless({id: ItemID.ingotBronze, count: 4, data: 0}, [{
            id: ItemID.ingotCopper,
            data: 0
        }, {id: ItemID.ingotCopper, data: 0}, {id: ItemID.ingotCopper, data: 0}, {id: ItemID.ingotTin, data: 0}]);
    });
}