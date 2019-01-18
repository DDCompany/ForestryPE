setLoadingTip("Core Module Loading...");

Block.setPrototype("humus", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [
            {name: "Humus", texture: [["humus", 0]], inCreative: true},
        ];
    },

    getMaterial: function (a) {
        return "dirt";
    },

    getDrop: function () {
        return [[3, 1, 0]];
    }
});

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.humus, count: 8, data: 0}, [
        "ddd",
        "dmd",
        "ddd"
    ], ['d', 3, 0, 'm', ItemID.mulch, 0]);

    Recipes.addShaped({id: BlockID.humus, count: 8, data: 0}, [
        "ddd",
        "dmd",
        "ddd"
    ], ['d', 3, 0, 'm', ItemID.fertilizerBio, 0]);
});