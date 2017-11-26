ToolAPI.addToolMaterial("bronze", {durability: 201, level: 3, efficiency: 6, damage: 0, enchantability: 0});
ToolAPI.addToolMaterial("scoop", {durability: 10, level: 4, efficiency: 12, damage: 0, enchantability: 0});

ToolType.scoop = {
    blockTypes: ["beehive"]
};

IDRegistry.genItemID("brokenBronzePickaxe");
Item.createItem("brokenBronzePickaxe", "Broken bronze pickaxe", {name: "brokenBronzePickaxe", meta: 0}, {stack: 1});

IDRegistry.genItemID("brokenBronzeShovel");
Item.createItem("brokenBronzeShovel", "Broken bronze shovel", {name: "brokenBronzeShovel", meta: 0}, {stack: 1});

IDRegistry.genItemID("bronzePickaxe");
Item.createItem("bronzePickaxe", "Bronze pickaxe", {name: "bronzePickaxe", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.bronzePickaxe, "bronze", ToolType.pickaxe, ItemID.brokenBronzePickaxe);

IDRegistry.genItemID("bronzeShovel");
Item.createItem("bronzeShovel", "Bronze shovel", {name: "bronzeShovel", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.bronzeShovel, "bronze", ToolType.shovel, ItemID.brokenBronzeShovel);

IDRegistry.genItemID("scoop");
Item.createItem("scoop", "Scoop", {name: "scoop", meta: 0}, {stack: 1});
ToolAPI.setTool(ItemID.scoop, "scoop", ToolType.scoop);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: ItemID.scoop, count: 1, data: 0}, [
        "sws",
        "sss",
        " s "
    ], ['w', 35, -1, 's', 280, -1]);

    Recipes.addShaped({id: ItemID.bronzePickaxe, count: 1, data: 0}, [
        " s ",
        " s ",
        "bbb"
    ], ['s', 280, 0, 'b', ItemID.ingotBronze, 0]);

    Recipes.addShaped({id: ItemID.bronzeShovel, count: 1, data: 0}, [
        " s ",
        " s ",
        " b "
    ], ['s', 280, 0, 'b', ItemID.ingotBronze, 0]);
});