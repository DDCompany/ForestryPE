IDRegistry.genItemID("ingotCopper");
Item.createItem("ingotCopper", "forestry.item.copper_ingot", {name: "ingotCopper"}, {});

IDRegistry.genItemID("ingotTin");
Item.createItem("ingotTin", "forestry.item.tin_ingot", {name: "ingotTin"}, {});

IDRegistry.genItemID("ingotBronze");
Item.createItem("ingotBronze", "forestry.item.bronze_ingot", {name: "ingotBronze"}, {});

IDRegistry.genItemID("apatite");
Item.createItem("apatite", "forestry.item.apatite", {name: "apatite"}, {});

IDRegistry.genItemID("phosphor");
Item.createItem("phosphor", "forestry.item.phosphor", {name: "phosphor"}, {});

Item.addCreativeGroup("forestry_ingots", t("forestry.creative_group.ingots"), [
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