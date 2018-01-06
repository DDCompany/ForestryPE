if (Config.backpackAdventurerDictionary.length) {
    BackpackRegistry.register({
        codeName: "backpackAdventurer",
        name: "Adventurer's backpack",
        slots: 15,
        blocks: Config.backpackAdventurerDictionary
    });

    BackpackRegistry.register({
        codeName: "backpackAdventurerT2",
        name: "Adventurer's woven backpack",
        slots: 45,
        blocks: Config.backpackAdventurerDictionary
    });
}
BackpackRegistry.register({
    codeName: "backpackMiners",
    name: "Miner's backpack",
    slots: 15,
    blocks: Dictionary.get("backpackMiners")
});

BackpackRegistry.register({
    codeName: "backpackDigger",
    name: "Digger's backpack",
    slots: 15,
    blocks: Dictionary.get("backpackDiggers")
});

BackpackRegistry.register({
    codeName: "backpackForester",
    name: "Forester's backpack",
    slots: 15,
    blocks: Dictionary.get("backpackForester")
});

BackpackRegistry.register({
    codeName: "backpackHunter",
    name: "Hunter's backpack",
    slots: 15,
    blocks: Dictionary.get("backpackHunter")
});

BackpackRegistry.register({
    codeName: "backpackBuilder",
    name: "Builder's backpack",
    slots: 15,
    blocks: Dictionary.get("backpackBuilder")
});

BackpackRegistry.register({
    codeName: "backpackMinersT2",
    name: "Miner's woven backpack",
    slots: 45,
    blocks: Dictionary.get("backpackMiners")
});

BackpackRegistry.register({
    codeName: "backpackDiggerT2",
    name: "Digger's woven backpack",
    slots: 45,
    blocks: Dictionary.get("backpackDiggers")
});

BackpackRegistry.register({
    codeName: "backpackForesterT2",
    name: "Forester's woven backpack",
    slots: 45,
    blocks: Dictionary.get("backpackForester")
});

BackpackRegistry.register({
    codeName: "backpackHunterT2",
    name: "Hunter's woven backpack",
    slots: 45,
    blocks: Dictionary.get("backpackHunter")
});

BackpackRegistry.register({
    codeName: "backpackBuilderT2",
    name: "Builder's woven backpack",
    slots: 45,
    blocks: Dictionary.get("backpackBuilder")
});

BackpackRegistry.register({
    codeName: "backpackApiarist",
    name: "Apiarist backpack",
    slots: 125,
    isValidItem: function (b, item) {
        return BeeRegistry.isBee(item.id);
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
    ], ['s', 287, 0, 'w', 35, -1, 'c', BlockID.apiaristchest, 0, 'i', 280, 0]);

    Recipes.addShaped({id: ItemID.backpackApiarist, count: 1, data: 0}, [
        "sws",
        "ici",
        "sws"
    ], ['s', 287, 0, 'w', 35, -1, 'c', BlockID.apiaristchest, 0, 'i', 352, 0]);
});