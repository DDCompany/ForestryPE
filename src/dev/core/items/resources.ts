IDRegistry.genItemID("ingotCopper");
Item.createItem("ingotCopper", "forestry.item.copper_ingot", {name: "ingotCopper"});

IDRegistry.genItemID("ingotTin");
Item.createItem("ingotTin", "forestry.item.tin_ingot", {name: "ingotTin"});

IDRegistry.genItemID("ingotBronze");
Item.createItem("ingotBronze", "forestry.item.bronze_ingot", {name: "ingotBronze"});

IDRegistry.genItemID("apatite");
Item.createItem("apatite", "forestry.item.apatite", {name: "apatite"});

Item.addCreativeGroup("ingot", t("forestry.creative_group.ingots"), [
    ItemID.ingotCopper,
    ItemID.ingotTin,
    ItemID.ingotBronze,
]);

Item.addCreativeGroup("gems", t("forestry.creative_group.gems"), [
    ItemID.apatite
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addFurnace(BlockID.oreApatite, ItemID.apatite, 0);
    Recipes.addFurnace(BlockID.oreCopper, ItemID.ingotCopper, 0);
    Recipes.addFurnace(BlockID.oreTin, ItemID.ingotTin, 0);

    Recipes.addShapeless({id: ItemID.apatite, count: 9, data: 0}, [{id: BlockID.blockApatite, data: 0}]);
    Recipes.addShapeless({id: ItemID.ingotCopper, count: 9, data: 0}, [{id: BlockID.blockCopper, data: 0}]);
    Recipes.addShapeless({id: ItemID.ingotTin, count: 9, data: 0}, [{id: BlockID.blockTin, data: 0}]);
    Recipes.addShapeless({id: ItemID.ingotBronze, count: 9, data: 0}, [{id: BlockID.blockBronze, data: 0}]);

    if (ForestryConfig.craftingBronzeEnabled) {
        Recipes.addShapeless({id: ItemID.ingotBronze, count: 4, data: 0},
            [{id: ItemID.ingotTin, data: 0}, {id: ItemID.ingotCopper, data: 0}, {id: ItemID.ingotCopper, data: 0},
                {id: ItemID.ingotCopper, data: 0}]);
    }
});