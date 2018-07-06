ToolAPI.addToolMaterial("bronze", {durability: 201, level: 3, efficiency: 6, damage: 0, enchantability: 0});
ToolAPI.addToolMaterial("scoop", {durability: 10, level: 4, efficiency: 12, damage: 0, enchantability: 0});

ToolType.scoop = {
    blockTypes: ["beehive"]
};

IDRegistry.genItemID("kitPickaxe");
Item.createItem("kitPickaxe", "Pickaxe Kit", {name: "kitPickaxe", meta: 0}, {stack: 24});

IDRegistry.genItemID("kitShovel");
Item.createItem("kitShovel", "Shovel Kit", {name: "kitShovel", meta: 0}, {stack: 24});

IDRegistry.genItemID("brokenBronzePickaxe");
Item.createItem("brokenBronzePickaxe", "Broken Pickaxe", {name: "brokenBronzePickaxe", meta: 0}, {stack: 1});

IDRegistry.genItemID("brokenBronzeShovel");
Item.createItem("brokenBronzeShovel", "Broken Shovel", {name: "brokenBronzeShovel", meta: 0}, {stack: 1});

IDRegistry.genItemID("forestryBronzePickaxe");
Item.createItem("forestryBronzePickaxe", "Survivalist's Pickaxe", {name: "forestryBronzePickaxe", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.forestryBronzePickaxe, "bronze", ToolType.pickaxe, ItemID.brokenBronzePickaxe);

IDRegistry.genItemID("forestryBronzeShovel");
Item.createItem("forestryBronzeShovel", "Survivalist's Shovel", {name: "forestryBronzeShovel", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.forestryBronzeShovel, "bronze", ToolType.shovel, ItemID.brokenBronzeShovel);

IDRegistry.genItemID("scoop");
Item.createItem("scoop", "Scoop", {name: "scoop", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.scoop, "scoop", ToolType.scoop);

Item.registerUseFunction("kitPickaxe", function (coords) {
    World.drop(coords.relative.x + 0.5, coords.relative.y + 0.1, coords.relative.z + 0.5, ItemID.forestryBronzePickaxe, 1, 0);
    Player.decreaseCarriedItem(1);
});

Item.registerUseFunction("kitShovel", function (coords) {
    World.drop(coords.relative.x + 0.5, coords.relative.y + 0.1, coords.relative.z + 0.5, ItemID.forestryBronzeShovel, 1, 0);
    Player.decreaseCarriedItem(1);
});

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: ItemID.scoop, count: 1, data: 0}, [
        "sws",
        "sss",
        " s "
    ], ['w', 35, -1, 's', 280, -1]);

    Recipes.addShaped({id: ItemID.forestryBronzePickaxe, count: 1, data: 0}, [
        " s ",
        " s ",
        "bbb"
    ], ['s', 280, 0, 'b', ItemID.ingotBronze, 0]);

    Recipes.addShaped({id: ItemID.forestryBronzeShovel, count: 1, data: 0}, [
        "s",
        "s",
        "b"
    ], ['s', 280, 0, 'b', ItemID.ingotBronze, 0]);

    Recipes.addShaped({id: ItemID.kitPickaxe, count: 1, data: 0}, [
        "pc",
    ], ['p', ItemID.forestryBronzePickaxe, 0, 'c', ItemID.carton, -1]);

    Recipes.addShaped({id: ItemID.kitShovel, count: 1, data: 0}, [
        "pc",
    ], ['p', ItemID.forestryBronzeShovel, 0, 'c', ItemID.carton, -1]);
});