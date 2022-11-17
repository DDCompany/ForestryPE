IDRegistry.genItemID("helmetApiarist");
Item.createArmorItem("helmetApiarist", "Apiarist's Hat", {name: "apiarist_helmet"}, {
    type: "helmet",
    armor: 1,
    durability: 100,
    texture: "armor/apiarist_armor_1.png"
});
IDRegistry.genItemID("chestApiarist");
Item.createArmorItem("chestApiarist", "Apiarist's Shirt", {name: "apiarist_chest"}, {
    type: "chestplate",
    armor: 3,
    durability: 100,
    texture: "armor/apiarist_armor_1.png"
});
IDRegistry.genItemID("leggingsApiarist");
Item.createArmorItem("leggingsApiarist", "Apiarist's Pants", {name: "apiarist_legs"}, {
    type: "leggings",
    armor: 2,
    durability: 100,
    texture: "armor/apiarist_armor_2.png"
});
IDRegistry.genItemID("bootsApiarist");
Item.createArmorItem("bootsApiarist", "Apiarist's Shoes", {name: "apiarist_boots"}, {
    type: "boots",
    armor: 1,
    durability: 100,
    texture: "armor/apiarist_armor_1.png"
});

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: ItemID.helmetApiarist, count: 1, data: 0}, [
        "www",
        "w w",
        "   "
    ], ['w', ItemID.wovenSilk, -1]);

    Recipes.addShaped({id: ItemID.chestApiarist, count: 1, data: 0}, [
        "w w",
        "www",
        "www"
    ], ['w', ItemID.wovenSilk, -1]);

    Recipes.addShaped({id: ItemID.leggingsApiarist, count: 1, data: 0}, [
        "www",
        "w w",
        "w w"
    ], ['w', ItemID.wovenSilk, -1]);

    Recipes.addShaped({id: ItemID.bootsApiarist, count: 1, data: 0}, [
        "   ",
        "w w",
        "w w"
    ], ['w', ItemID.wovenSilk, -1]);
});