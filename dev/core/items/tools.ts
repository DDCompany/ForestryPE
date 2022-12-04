ToolAPI.addToolMaterial("bronze", {
    durability: 201,
    level: 3,
    efficiency: 6,
    damage: 0
});

IDRegistry.genItemID("brokenBronzePickaxe");
Item.createItem("brokenBronzePickaxe", "forestry.item.broken_pickaxe", {name: "brokenBronzePickaxe"}, {stack: 1});

IDRegistry.genItemID("brokenBronzeShovel");
Item.createItem("brokenBronzeShovel", "forestry.item.broken_shovel", {name: "brokenBronzeShovel"}, {stack: 1});

IDRegistry.genItemID("forestryBronzePickaxe");
Item.createItem("forestryBronzePickaxe", "forestry.item.survivalists_pickaxe", {name: "forestryBronzePickaxe"}, {stack: 1});
ToolLib.setTool(ItemID.forestryBronzePickaxe, "bronze", ToolType.pickaxe, ItemID.brokenBronzePickaxe);

IDRegistry.genItemID("forestryBronzeShovel");
Item.createItem("forestryBronzeShovel", "forestry.item.survivalists_shovel", {name: "forestryBronzeShovel"}, {stack: 1});
ToolLib.setTool(ItemID.forestryBronzeShovel, "bronze", ToolType.shovel, ItemID.brokenBronzeShovel);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: ItemID.forestryBronzePickaxe, count: 1, data: 0}, [
        " s ",
        " s ",
        "bbb"
    ], ['s', VanillaItemID.stick, -1, 'b', ItemID.ingotBronze, -1]);

    Recipes.addShaped({id: ItemID.forestryBronzeShovel, count: 1, data: 0}, [
        "s",
        "s",
        "b"
    ], ['s', VanillaItemID.stick, -1, 'b', ItemID.ingotBronze, -1]);
});