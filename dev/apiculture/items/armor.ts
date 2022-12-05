IDRegistry.genItemID("helmetApiarist");
Item.createArmorItem("helmetApiarist", "forestry.item.apiarists_hat", {name: "apiarist_helmet"}, {
    type: "helmet",
    armor: 1,
    durability: 100,
    texture: "armor/apiarist_armor_1.png"
});

IDRegistry.genItemID("chestApiarist");
Item.createArmorItem("chestApiarist", "forestry.item.apiarists_shirt", {name: "apiarist_chest"}, {
    type: "chestplate",
    armor: 3,
    durability: 100,
    texture: "armor/apiarist_armor_1.png"
});

IDRegistry.genItemID("leggingsApiarist");
Item.createArmorItem("leggingsApiarist", "forestry.item.apiarists_pants", {name: "apiarist_legs"}, {
    type: "leggings",
    armor: 2,
    durability: 100,
    texture: "armor/apiarist_armor_2.png"
});

IDRegistry.genItemID("bootsApiarist");
Item.createArmorItem("bootsApiarist", "forestry.item.apiarists_shoes", {name: "apiarist_boots"}, {
    type: "boots",
    armor: 1,
    durability: 100,
    texture: "armor/apiarist_armor_1.png"
});

Item.addCreativeGroup("helmet", t("forestry.creative_group.helmets"), [
    ItemID.helmetApiarist,
]);

Item.addCreativeGroup("chestplate", t("forestry.creative_group.chestplates"), [
    ItemID.chestApiarist,
]);

Item.addCreativeGroup("leggings", t("forestry.creative_group.leggings"), [
    ItemID.leggingsApiarist,
]);

Item.addCreativeGroup("boots", t("forestry.creative_group.boots"), [
    ItemID.bootsApiarist,
]);

Callback.addCallback("PostLoaded", () => {
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