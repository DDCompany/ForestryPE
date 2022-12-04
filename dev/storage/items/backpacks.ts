interface BackpackDefinition {
    nameId: string;
    name: string;
    texture: string;
    items: T_BackpackItem[];
    recipeItemId: number;
}

function createBackpack({nameId, name, texture, recipeItemId, items}: BackpackDefinition) {
    IDRegistry.genItemID(nameId);
    Item.createItem(nameId, `forestry.item.${name}`, {name: texture}, {stack: 1});

    const wovenId = `${nameId}T2`;
    IDRegistry.genItemID(wovenId);
    Item.createItem(wovenId, `forestry.item.woven_${name}`, {name: `${texture}T2`,}, {stack: 1});

    BackpackRegistry.register(ItemID[nameId], {
        slots: 15,
        inRow: 5,
        items,
    });

    BackpackRegistry.register(ItemID[wovenId], {
        slots: 45,
        inRow: 9,
        items,
    });

    Item.addCreativeGroup("forestry_backpacks", t("forestry.creative_group.backpacks"), [
        ItemID[nameId],
    ]);

    Item.addCreativeGroup("forestry_woven_backpacks", t("forestry.creative_group.woven_backpacks"), [
        ItemID[wovenId],
    ]);

    Recipes.addShaped({id: ItemID[nameId], count: 1, data: 0}, [
        "sws",
        "ici",
        "sws"
    ], ['s', VanillaItemID.string, -1, 'w', VanillaBlockID.wool, -1, 'c', VanillaBlockID.chest, -1, 'i', recipeItemId, -1]);

    CarpenterManager.registerRecipe({
        input: {
            0: {id: ItemID.wovenSilk, data: 0},
            1: {id: VanillaItemID.diamond, data: 0},
            2: {id: ItemID.wovenSilk, data: 0},
            3: {id: ItemID.wovenSilk, data: 0},
            4: {id: ItemID[nameId], data: 0},
            5: {id: ItemID.wovenSilk, data: 0},
            6: {id: ItemID.wovenSilk, data: 0},
            7: {id: ItemID.wovenSilk, data: 0},
            8: {id: ItemID.wovenSilk, data: 0}
        },
        liquid: "water",
        liquidAmount: 1,
        result: {
            id: ItemID[wovenId],
            count: 1,
            data: 0
        }
    });
}

createBackpack({
    nameId: "backpackMiners",
    name: "mining_backpack",
    texture: "backpackMiners",
    recipeItemId: VanillaItemID.iron_ingot,
    items: [
        "^ore.+",
        "^dust.+",
        "^gem.+",
        "^ingot.+",
        "^nugget.+",
        "^oreCrushed.+",
        "^dustSmall.+",
        "^dustTiny.+",
        "^apatite$",
        VanillaItemID.lapis_lazuli,
        VanillaItemID.coal,
        VanillaBlockID.iron_ore,
        VanillaBlockID.gold_ore,
        VanillaItemID.emerald,
        VanillaItemID.diamond,
        VanillaItemID.quartz,
        VanillaBlockID.emerald_ore,
        VanillaBlockID.lapis_ore,
        VanillaBlockID.redstone_ore,
        VanillaBlockID.diamond_ore,
        VanillaBlockID.quartz_ore,
        VanillaItemID.iron_ingot,
        VanillaItemID.gold_ingot,
    ],
});

createBackpack({
    nameId: "backpackDigger",
    name: "digging_backpack",
    texture: "backpackDigger",
    recipeItemId: VanillaBlockID.stone,
    items: [
        "^stone.+",
        1,
        3,
        4,
        12,
        24,
        13,
        318,
        337,
        87,
        88
    ],
});

createBackpack({
    nameId: "backpackForester",
    name: "foresting_backpack",
    texture: "backpackForester",
    recipeItemId: VanillaBlockID.log,
    items: [
        "^sapling.+",
        "^seed.+",
        "^leaves.+",
        "^log.+",
        {
            id: 17,
            data: -1
        },
        {
            id: 162,
            data: -1
        },
        {
            id: 6,
            data: -1
        },
        {
            id: 39,
            data: -1
        },
        {
            id: 40,
            data: -1
        },
        {
            id: 175,
            data: 3
        },
        {
            id: 38,
            data: -1
        },
        {
            id: 175,
            data: -1
        },
        {
            id: 18,
            data: -1
        },
        106,
        260,
        37,
        161,
        81,
    ],
});

createBackpack({
    nameId: "backpackHunter",
    name: "hunting_backpack",
    texture: "backpackHunter",
    recipeItemId: VanillaItemID.feather,
    items: [
        "^fish.+",
        "^egg.+",
        "^leather.+",
        "^bone.+",
        VanillaItemID.lapis_lazuli,
        {
            id: 35,
            data: -1
        },
        288,
        289,
        377,
        370,
        371,
        367,
        262,
        363,
        319,
        365,
        334,
        344,
        368,
    ],
});

createBackpack({
    nameId: "backpackBuilder",
    name: "building_backpack",
    texture: "backpackBuilder",
    recipeItemId: VanillaItemID.clay_ball,
    items: [
        "^glass.+",
        "^chest.+",
        "^block.+",
        {
            id: 98,
            data: -1
        },
        {
            id: 5,
            data: -1
        },
        {
            id: 43,
            data: 5
        },
        {
            id: 45,
            data: 5
        },
        1,
        112,
        113,
        53,
        67,
        108,
        109,
        114,
        128,
        134,
        135,
        136,
        156,
        163,
        164,
        180,
        20,
        85,
        107,
        101,
        50,
        44,
        183,
        184,
        185,
        186,
        187,
        188,
        189,
        190,
        191,
        192
    ],
});

IDRegistry.genItemID("backpackApiarist");
Item.createItem("backpackApiarist", "forestry.item.apiarists_backpack", {name: "backpackApiarist"}, {stack: 1});

BackpackRegistry.register(ItemID.backpackApiarist, {
    slots: 125,
    inRow: 10,
    isValidItem(id) {
        return BeeRegistry.isBee(id);
    }
});

Item.addCreativeGroup("forestry_backpacks", t("forestry.creative_group.backpacks"), [
    ItemID.backpackApiarist,
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: ItemID.backpackApiarist, count: 1, data: 0}, [
        "sws",
        "ici",
        "sws"
    ], ['s', VanillaItemID.string, -1, 'w', VanillaBlockID.wool, -1, 'c', BlockID.apiaristChest, -1, 'i', VanillaItemID.stick, -1]);

    Recipes.addShaped({id: ItemID.backpackApiarist, count: 1, data: 0}, [
        "sws",
        "ici",
        "sws"
    ], ['s', VanillaItemID.string, -1, 'w', VanillaBlockID.wool, -1, 'c', BlockID.apiaristChest, -1, 'i', VanillaItemID.bone, -1]);
});