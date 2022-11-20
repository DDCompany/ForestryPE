setLoadingTip("Storage Module Loading...");

IDRegistry.genItemID("backpackMiners");
Item.createItem("backpackMiners", "Mining Backpack", {name: "backpackMiners", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackMiners, {
    slots: 15,
    inRow: 5,
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
        263,
        15,
        14,
        388,
        264,
        406,
        129,
        21,
        73,
        56,
        153,
        265,
        266
    ]
});

IDRegistry.genItemID("backpackDigger");
Item.createItem("backpackDigger", "Digging Backpack", {name: "backpackDigger", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackDigger, {
    slots: 15,
    inRow: 5,
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
    ]
});

IDRegistry.genItemID("backpackForester");
Item.createItem("backpackForester", "Foresting Backpack", {name: "backpackForester", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackForester, {
    slots: 15,
    inRow: 5,
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
        81
    ]
});

IDRegistry.genItemID("backpackHunter");
Item.createItem("backpackHunter", "Hunting Backpack", {name: "backpackHunter", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackHunter, {
    slots: 15,
    inRow: 5,
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
        368
    ]
});

IDRegistry.genItemID("backpackBuilder");
Item.createItem("backpackBuilder", "Building Backpack", {name: "backpackBuilder", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackBuilder, {
    slots: 15,
    inRow: 5,
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
    ]
});

//Woven

IDRegistry.genItemID("backpackMinersT2");
Item.createItem("backpackMinersT2", "Woven Mining Backpack", {name: "backpackMinersT2", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackMinersT2, {
    slots: 45,
    inRow: 9,

    isValidItem(id, count, data) {
        return !BackpackRegistry.isBackpack(id) &&
            BackpackRegistry.isValidFor(id, data, BackpackRegistry.prototypes[ItemID.backpackMiners].items);
    }
});

IDRegistry.genItemID("backpackDiggerT2");
Item.createItem("backpackDiggerT2", "Woven Digging Backpack", {name: "backpackDiggerT2", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackDiggerT2, {
    slots: 45,
    inRow: 9,

    isValidItem(id, count, data) {
        return !BackpackRegistry.isBackpack(id) &&
            BackpackRegistry.isValidFor(id, data, BackpackRegistry.prototypes[ItemID.backpackDigger].items);
    }
});

IDRegistry.genItemID("backpackForesterT2");
Item.createItem("backpackForesterT2", "Woven Foresting Backpack", {name: "backpackForesterT2", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackForesterT2, {
    slots: 45,
    inRow: 9,

    isValidItem(id, count, data) {
        return !BackpackRegistry.isBackpack(id) &&
            BackpackRegistry.isValidFor(id, data, BackpackRegistry.prototypes[ItemID.backpackForester].items);
    }
});

IDRegistry.genItemID("backpackHunterT2");
Item.createItem("backpackHunterT2", "Woven Hunting Backpack", {name: "backpackHunterT2", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackHunterT2, {
    slots: 45,
    inRow: 9,

    isValidItem(id, count, data) {
        return !BackpackRegistry.isBackpack(id) &&
            BackpackRegistry.isValidFor(id, data, BackpackRegistry.prototypes[ItemID.backpackHunter].items);
    }
});

IDRegistry.genItemID("backpackBuilderT2");
Item.createItem("backpackBuilderT2", "Woven Building Backpack", {name: "backpackBuilderT2", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackBuilderT2, {
    slots: 45,
    inRow: 9,

    isValidItem(id, count, data) {
        return !BackpackRegistry.isBackpack(id) &&
            BackpackRegistry.isValidFor(id, data, BackpackRegistry.prototypes[ItemID.backpackBuilder].items);
    }
});


IDRegistry.genItemID("backpackApiarist");
Item.createItem("backpackApiarist", "Apiarist's Backpack", {name: "backpackApiarist", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackApiarist, {
    slots: 125,
    inRow: 10,

    isValidItem(id) {
        return BeeRegistry.isBee(id);
    }
});

Item.addCreativeGroup(GROUP_BACKPACKS, GROUP_BACKPACKS_NAME, [
    ItemID.backpackMiners,
    ItemID.backpackDigger,
    ItemID.backpackForester,
    ItemID.backpackHunter,
    ItemID.backpackBuilder,
    ItemID.backpackApiarist
]);

Item.addCreativeGroup(GROUP_WOVEN_BACKPACKS, GROUP_WOVEN_BACKPACKS_NAME, [
    ItemID.backpackMinersT2,
    ItemID.backpackDiggerT2,
    ItemID.backpackForesterT2,
    ItemID.backpackHunterT2,
    ItemID.backpackBuilderT2
]);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: ItemID.backpackMiners, count: 1, data: 0}, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, 0, 'c', 54, 0, 'i', 265, 0]);

    Recipes.addShaped({id: ItemID.backpackDigger, count: 1, data: 0}, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, 0, 'c', 54, 0, 'i', 1, 0]);

    Recipes.addShaped({id: ItemID.backpackForester, count: 1, data: 0}, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, 0, 'c', 54, 0, 'i', 17, 0]);

    Recipes.addShaped({id: ItemID.backpackHunter, count: 1, data: 0}, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, 0, 'c', 54, 0, 'i', 288, 0]);

    Recipes.addShaped({id: ItemID.backpackBuilder, count: 1, data: 0}, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, 0, 'c', 54, 0, 'i', 337, 0]);

    Recipes.addShaped({id: ItemID.backpackApiarist, count: 1, data: 0}, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, -1, 'c', BlockID.apiaristChest, 0, 'i', 280, 0]);

    Recipes.addShaped({id: ItemID.backpackApiarist, count: 1, data: 0}, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, -1, 'c', BlockID.apiaristChest, 0, 'i', 352, 0]);
});