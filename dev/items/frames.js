BeeFrame.registerFrame({
    codeName: "frameUntreated",
    localize: {en: "Untreated frame", ru: "Необработанная рамка"},
    modifier: {
        getProductionModifier: function () {
            return 2;
        },

        getGeneticDecay: function () {
            return 0.9;
        }
    },
    durability: 80
});

Item.registerNameOverrideFunction(ItemID.frameUntreated, function (item, name) {
    return name + "§7\nProduction: 2.0x\nGenetic Decay: 0.9x\nDurability: " + (80 - item.data);
});

BeeFrame.registerFrame({
    codeName: "frameImpregnated",
    localize: {en: "Impregnated frame", ru: "Пропитанная рамка"},
    modifier: {
        getProductionModifier: function () {
            return 2;
        },

        getGeneticDecay: function () {
            return 0.4;
        }
    },
    durability: 240
});

Item.registerNameOverrideFunction(ItemID.frameImpregnated, function (item, name) {
    return name + "§7\nProduction: 2.0x\nGenetic Decay: 0.4x\nDurability: " + (240 - item.data);
});

BeeFrame.registerFrame({
    codeName: "frameProven",
    localize: {en: "Proven frame", ru: "Проверенная рамка"},
    modifier: {
        getProductionModifier: function () {
            return 2;
        },

        getGeneticDecay: function () {
            return 0.3;
        }
    },
    durability: 720
});

Item.registerNameOverrideFunction(ItemID.frameProven, function (item, name) {
    return name + "§7\nProduction: 2.0x\nGenetic Decay: 0.3x\nDurability: " + (720 - item.data);
});

Callback.addCallback("PostLoaded", function () {

    Recipes.addShaped({id: ItemID.frameUntreated, count: 1, data: 0}, [
        "sss",
        "sws",
        "sss"
    ], ['w', 287, -1, 's', 280, -1]);

    Recipes.addShaped({id: ItemID.frameImpregnated, count: 1, data: 0}, [
        "sss",
        "sws",
        "sss"
    ], ['w', 287, -1, 's', ItemID.stickImpregnated, -1]);

});


