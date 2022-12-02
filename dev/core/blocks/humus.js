setLoadingTip("Core Module Loading...");

Block.setPrototype("humus", {
    type: Block.TYPE_BASE,

    getVariations() {
        return [
            {name: "forestry.block.humus", texture: [["humus", 0]], inCreative: true},
        ];
    },

    getMaterial(a) {
        return "dirt";
    },

    getDrop() {
        return [[3, 1, 0]];
    }
});

Callback.addCallback("PostLoaded", () => {
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