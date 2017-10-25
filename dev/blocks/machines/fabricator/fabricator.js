Block.setPrototype("fabricator", {
    type: Block.TYPE_ROTATION,

    getVariations: function () {
        return [{
            name: "Thermionic Fabricator",
            texture: [["fabricator_bottom", 0], ["fabricator_top", 0], ["fabricator_side", 0], ["fabricator_front", 0], ["fabricator_side", 0], ["fabricator_side", 0]],
            inCreative: true
        }];
    }

});


Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.fabricator, count: 1, data: 0}, [
        "cgc",
        "g g",
        "cbc"
    ], ['c', 266, -1, 'g', 20, -1, 'b', 54, -1]);
});

//ICRenderLib.addConnectionBlock("bc-container", BlockID.fabricator);