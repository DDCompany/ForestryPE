ToolAPI.addToolMaterial("bronze", {durability: 200, level: 3, efficiency: 6, damage: 0});

IDRegistry.genItemID("forestryWrench");
Item.createItem("forestryWrench", "forestry.item.wrench", {name: "forestryWrench"}, {stack: 1});

Item.registerUseFunction("forestryWrench", () => {
    //TODO: add rotation
});

IDRegistry.genItemID("forestryPickaxeBroken");
Item.createItem("forestryPickaxeBroken", "forestry.item.broken_bronze_pickaxe", {name: "forestryPickaxeBroken"});

IDRegistry.genItemID("forestryShovelBroken");
Item.createItem("forestryShovelBroken", "forestry.item.broken_bronze_shovel", {name: "forestryShovelBroken"});

IDRegistry.genItemID("forestryPickaxe");
Item.createItem("forestryPickaxe", "forestry.item.bronze_pickaxe", {name: "forestryPickaxe"}, {stack: 1});
ToolLib.setTool(ItemID.forestryPickaxe, "bronze", ToolType.pickaxe, ItemID.forestryPickaxe);
Item.addCreativeGroup("pickaxes", t("forestry.creative_group.pickaxes"), [ItemID.forestryPickaze]);

IDRegistry.genItemID("forestryShovel");
Item.createItem("forestryShovel", "forestry.item.bronze_shovel", {name: "forestryShovel"}, {stack: 1});
ToolLib.setTool(ItemID.forestryShovel, "bronze", ToolType.shovel, ItemID.forestryShovel);
Item.addCreativeGroup("shovels", t("forestry.creative_group.shovels"), [ItemID.forestryShovel]);

Callback.addCallback("PreLoaded", () => {
    Recipes.addShaped({id: ItemID.forestryPickaxe, count: 1, data: 0}, [
        " S ",
        " S ",
        "BBB",
    ], ['B', ItemID.ingotBronze, 0, "S", VanillaItemID.stick, 0]);

    Recipes.addShaped({id: ItemID.forestryShovel, count: 1, data: 0}, [
        " S ",
        " S ",
        " B ",
    ], ['B', ItemID.ingotBronze, 0, "S", VanillaItemID.stick, 0]);

    Recipes.addShaped({id: ItemID.forestryWrench, count: 1, data: 0}, [
        "I I",
        " I ",
        " I ",
    ], ['I', ItemID.ingotBronze, 0]);
});