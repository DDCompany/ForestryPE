Block.setPrototype("raintank", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{name: "Rain tank", texture: [["raintank", 0], ["raintank", 0], ["raintank", 1]], inCreative: true}];
    }

});

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.raintank, count: 1, data: 0}, [
        "igi",
        "isi",
        "igi"
    ], ['s', 265, 0, 'g', 20, 0, 's', ItemID.sturdyCasing, 0]);
});

ICRenderLib.addConnectionBlock("bc-container", BlockID.raintank);
