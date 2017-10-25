IDRegistry.genItemID("scoop");
Item.createItem("scoop", "Scoop", {name: "scoop", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("scoop", {durability: 10, level: 4, efficiency: 12, damage: 0, enchantability: 0});
ToolAPI.addToolMaterial("bronze", {durability: 201, level: 3, efficiency: 6, damage: 0, enchantability: 0});
Item.setToolRender(ItemID.scoop, true);
ToolAPI.registerTool(ItemID.scoop, "scoop", ["beehive"], {damage: 0});

IDRegistry.genItemID("bronzePickaxe");
Item.createItem("bronzePickaxe", "Bronze pickaxe", {name: "bronzePickaxe", meta: 0}, {stack: 1});
Item.setToolRender(ItemID.bronzePickaxe, true);
ToolAPI.registerTool(ItemID.bronzePickaxe, "bronze", ["stone"], {damage: 0});

IDRegistry.genItemID("bronzeShovel");
Item.createItem("bronzeShovel", "Bronze shovel", {name: "bronzeShovel", meta: 0}, {stack: 1});
Item.setToolRender(ItemID.bronzeShovel, true);
ToolAPI.registerTool(ItemID.bronzeShovel, "bronze", ["dirt"], {damage: 0});


IDRegistry.genItemID("brokenBronzePickaxe");
Item.createItem("brokenBronzePickaxe", "Broken bronze pickaxe", {name: "brokenBronzePickaxe", meta: 0}, {stack: 1});

IDRegistry.genItemID("brokenBronzeShovel");
Item.createItem("brokenBronzeShovel", "Broken bronze shovel", {name: "brokenBronzeShovel", meta: 0}, {stack: 1});

Callback.addCallback("DestroyBlock", function (a, b, c) {
    if (Player.getCarriedItem().id == ItemID.bronzePickaxe && Player.getCarriedItem().data == 223) {
        World.drop(a.x + 0.5, a.y + 0.1, a.z + 0.5, ItemID.brokenBronzePickaxe, 1, 0);
        Player.setCarriedItem(0, 0, 0);
    } else if (Player.getCarriedItem().id == ItemID.bronzeShovel && Player.getCarriedItem().data == 223) {
        World.drop(a.x + 0.5, a.y + 0.1, a.z + 0.5, ItemID.brokenBronzeShovel, 1, 0);
        Player.setCarriedItem(0, 0, 0);
    }
});

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