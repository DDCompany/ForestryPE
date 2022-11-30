BeeFrame.registerFrame({
    codeName: "frameUntreated",
    localize: {en: "Untreated Frame", ru: "Необработанная рамка"},
    modifier: {
        getProductionModifier() {
            return 2;
        },

        getGeneticDecay() {
            return 0.9;
        }
    },
    durability: 80
});

Item.registerNameOverrideFunction(ItemID.frameUntreated, (item, name) => name + "§7\nProduction: 2.0x\nGenetic Decay: 0.9x\nDurability: " + (80 - item.data));

BeeFrame.registerFrame({
    codeName: "frameImpregnated",
    localize: {en: "Impregnated Frame", ru: "Пропитанная рамка"},
    modifier: {
        getProductionModifier() {
            return 2;
        },

        getGeneticDecay() {
            return 0.4;
        }
    },
    durability: 240
});

Item.registerNameOverrideFunction(ItemID.frameImpregnated, (item, name) => name + "§7\nProduction: 2.0x\nGenetic Decay: 0.4x\nDurability: " + (240 - item.data));

BeeFrame.registerFrame({
    codeName: "frameProven",
    localize: {en: "Proven Frame", ru: "Проверенная рамка"},
    modifier: {
        getProductionModifier() {
            return 2;
        },

        getGeneticDecay() {
            return 0.3;
        }
    },
    durability: 720
});

Item.registerNameOverrideFunction(ItemID.frameProven, (item, name) => name + "§7\nProduction: 2.0x\nGenetic Decay: 0.3x\nDurability: " + (720 - item.data));

Item.addCreativeGroup(GROUP_FRAMES, GROUP_FRAMES_NAME, [ItemID.frameUntreated, ItemID.frameImpregnated, ItemID.frameProven]);

Callback.addCallback("PostLoaded", () => {
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

