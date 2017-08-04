BeeFrame.registerFrame({
    codeName: "frameUntreated",
    localize: {en: "Untreated frame", ru: "Необработанная рамка"},
    modifier: {
        getProductionModifier: function (house, currect) {
            return currect < 10 ? 2 : 1;
        }
    },
    durability: 80
});

BeeFrame.registerFrame({
    codeName: "frameImpregnated",
    localize: {en: "Impregnated frame", ru: "Пропитанная рамка"},
    modifier: {
        getProductionModifier: function (house, currect) {
            return currect < 10 ? 2 : 1;
        }
    },
    durability: 240
});

BeeFrame.registerFrame({
    codeName: "frameProven",
    localize: {en: "Proven frame", ru: "Проверенная рамка"},
    modifier: {
        getProductionModifier: function (house, currect) {
            return currect < 10 ? 2 : 1;
        }
    },
    durability: 720
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


