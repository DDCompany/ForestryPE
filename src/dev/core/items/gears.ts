IDRegistry.genItemID("gearBronze");
Item.createItem("gearBronze", "forestry.item.bronze_gear", {name: "gearBronze"});

IDRegistry.genItemID("gearCopper");
Item.createItem("gearCopper", "forestry.item.copper_gear", {name: "gearCopper"});

IDRegistry.genItemID("gearTin");
Item.createItem("gearTin", "forestry.item.tin_gear", {name: "gearTin"});

Item.addCreativeGroup("gears", t("forestry.creative_group.gears"), [
    ItemID.gearCopper,
    ItemID.gearTin,
    ItemID.gearBronze,
]);

Callback.addCallback("PostLoaded", () => {
    const gearCenter = ItemID.gear_stone || ItemID.gearStone || ItemID.ingotCopper; //FIXME
    Recipes.addShaped({id: ItemID.gearBronze, count: 1, data: 0}, [
        " I ",
        "ICI",
        " I ",
    ], ['I', ItemID.ingotBronze, 0, "C", gearCenter, 0]);

    Recipes.addShaped({id: ItemID.gearCopper, count: 1, data: 0}, [
        " I ",
        "ICI",
        " I ",
    ], ['I', ItemID.ingotCopper, 0, "C", gearCenter, 0]);

    Recipes.addShaped({id: ItemID.gearTin, count: 1, data: 0}, [
        " I ",
        "ICI",
        " I ",
    ], ['I', ItemID.ingotTin, 0, "C", gearCenter, 0]);
});