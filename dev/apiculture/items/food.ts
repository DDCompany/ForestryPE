IDRegistry.genItemID("honeyedSlice");
Item.createFoodItem("honeyedSlice", "forestry.item.honeyed_slice", {name: "honeyedSlice"}, {food: 10});

IDRegistry.genItemID("honeyPot");
Item.createFoodItem("honeyPot", "forestry.item.honey_pot", {name: "honeyPot"}, {food: 2});

IDRegistry.genItemID("ambrosia");
Item.createFoodItem("ambrosia", "forestry.item.ambrosia", {name: "ambrosia"}, {food: 8});

Item.addCreativeGroup("food", t("forestry.creative_group.food"), [
    ItemID.honeyedSlice,
    ItemID.honeyPot,
    ItemID.ambrosia,
]);

Callback.addCallback("FoodEaten", (food, ratio, player) => {
    const actor = new PlayerActor(player);
    const carriedItem = actor.getInventorySlot(actor.getSelectedSlot());
    if (carriedItem.id === ItemID.ambrosia) {
        Entity.addEffect(player, EPotionEffect.REGENERATION, 40, 1, true, true);
    }
});

Callback.addCallback("PostLoaded", () => {
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