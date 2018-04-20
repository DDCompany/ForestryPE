IDRegistry.genItemID("honeyedSlice");
Item.createFoodItem("honeyedSlice", "Honeyed Slice", {name: "honeyedSlice", meta: 0}, {food: 10});

IDRegistry.genItemID("honeyPot");
Item.createFoodItem("honeyPot", "Honey Pot", {name: "honeyPot", meta: 0}, {food: 2});

IDRegistry.genItemID("ambrosia");
Item.createFoodItem("ambrosia", "Ambrosia", {name: "ambrosia", meta: 0}, {food: 8});

Callback.addCallback("FoodEaten", function () {
    if (Player.getCarriedItem().id === ItemID.ambrosia)
        Entity.addEffect(Player.get(), Native.PotionEffect.regeneration, 40, 1, true, true);
});

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: ItemID.honeyPot, count: 1, data: 0}, [
        "h h",
        " m ",
        "h h"
    ], ['h', ItemID.honeyDrop, 0, 'm', ItemID.waxCapsuleEmpty, 0]);

    Recipes.addShaped({id: ItemID.ambrosia, count: 1, data: 0}, [
        "wcw",
        "hhh",
        "www"
    ], ['w', ItemID.royalJelly, 0, 'h', ItemID.honeydew, 0, 'c', ItemID.waxCapsuleEmpty, 0]);

    Recipes.addShaped({id: ItemID.honeyedSlice, count: 4, data: 0}, [
        "sss",
        "sws",
        "sss"
    ], ['w', 297, -1, 's', ItemID.honeyDrop, -1]);
});