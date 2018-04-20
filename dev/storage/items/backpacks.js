IDRegistry.genItemID("backpackMiners");
Item.createItem("backpackMiners", "Mining Backpack", {name: "backpackMiners", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackMiners, {
    slots: 15,
    inRow: 5,

    isValidItem: function (id, count, data) {
        return BackpackManager.isValidItem("miners", id, data);
    }
});

IDRegistry.genItemID("backpackDigger");
Item.createItem("backpackDigger", "Digging Backpack", {name: "backpackDigger", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackDigger, {
    slots: 15,
    inRow: 5,

    isValidItem: function (id, count, data) {
        return BackpackManager.isValidItem("diggers", id, data);
    }
});

IDRegistry.genItemID("backpackForester");
Item.createItem("backpackForester", "Foresting Backpack", {name: "backpackForester", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackForester, {
    slots: 15,
    inRow: 5,

    isValidItem: function (id, count, data) {
        return BackpackManager.isValidItem("foresters", id, data);
    }
});

IDRegistry.genItemID("backpackHunter");
Item.createItem("backpackHunter", "Hunting Backpack", {name: "backpackHunter", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackHunter, {
    slots: 15,
    inRow: 5,

    isValidItem: function (id, count, data) {
        return BackpackManager.isValidItem("hunters", id, data);
    }
});

IDRegistry.genItemID("backpackBuilder");
Item.createItem("backpackBuilder", "Building Backpack", {name: "backpackBuilder", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackBuilder, {
    slots: 15,
    inRow: 5,

    isValidItem: function (id, count, data) {
        return BackpackManager.isValidItem("builders", id, data);
    }
});

//Woven

IDRegistry.genItemID("backpackMinersT2");
Item.createItem("backpackMinersT2", "Woven Mining Backpack", {name: "backpackMinersT2", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackMinersT2, {
    slots: 45,
    inRow: 9,

    isValidItem: function (id, count, data) {
        return BackpackManager.isValidItem("miners", id, data);
    }
});

IDRegistry.genItemID("backpackDiggerT2");
Item.createItem("backpackDiggerT2", "Woven Digging Backpack", {name: "backpackDiggerT2", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackDiggerT2, {
    slots: 45,
    inRow: 9,

    isValidItem: function (id, count, data) {
        return BackpackManager.isValidItem("diggers", id, data);
    }
});

IDRegistry.genItemID("backpackForesterT2");
Item.createItem("backpackForesterT2", "Woven Foresting Backpack", {name: "backpackForesterT2", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackForesterT2, {
    slots: 45,
    inRow: 9,

    isValidItem: function (id, count, data) {
        return BackpackManager.isValidItem("foresters", id, data);
    }
});

IDRegistry.genItemID("backpackHunterT2");
Item.createItem("backpackHunterT2", "Woven Hunting Backpack", {name: "backpackHunterT2", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackHunterT2, {
    slots: 45,
    inRow: 9,

    isValidItem: function (id, count, data) {
        return BackpackManager.isValidItem("hunters", id, data);
    }
});

IDRegistry.genItemID("backpackBuilderT2");
Item.createItem("backpackBuilderT2", "Woven Building Backpack", {name: "backpackBuilderT2", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackBuilderT2, {
    slots: 45,
    inRow: 9,

    isValidItem: function (id, count, data) {
        return BackpackManager.isValidItem("builders", id, data);
    }
});


IDRegistry.genItemID("backpackApiarist");
Item.createItem("backpackApiarist", "Apiarist's Backpack", {name: "backpackApiarist", meta: 0}, {stack: 1});

BackpackRegistry.register(ItemID.backpackApiarist, {
    slots: 125,
    inRow: 10,

    isValidItem: function (id) {
        return BeeRegistry.isBee(id);
    }
});

Callback.addCallback("PostLoaded", function () {
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