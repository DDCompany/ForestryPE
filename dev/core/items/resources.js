IDRegistry.genItemID("ingotCopper");
Item.createItem("ingotCopper", "Copper ingot", {name: "ingotCopper", meta: 0}, {});

IDRegistry.genItemID("ingotTin");
Item.createItem("ingotTin", "Tin ingot", {name: "ingotTin", meta: 0}, {});

IDRegistry.genItemID("ingotBronze");
Item.createItem("ingotBronze", "Bronze ingot", {name: "ingotBronze", meta: 0}, {});

IDRegistry.genItemID("apatite");
Item.createItem("apatite", "Apatite", {name: "apatite", meta: 0}, {});

if (ForestryConfig.recipeBronzeIngot) {
    Callback.addCallback("PostLoaded", function () {
        Recipes.addShapeless({id: ItemID.ingotBronze, count: 4, data: 0}, [{
            id: ItemID.ingotCopper,
            data: 0
        }, {id: ItemID.ingotCopper, data: 0}, {id: ItemID.ingotCopper, data: 0}, {id: ItemID.ingotTin, data: 0}]);
    });
}