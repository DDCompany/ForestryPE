Block.setPrototype("apiary", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{
            name: "Apiary",
            texture: [["apiary", 0], ["apiary", 0], ["apiary", 1], ["apiary", 1], ["apiary", 1], ["apiary", 1]],
            inCreative: true
        }];
    }

});
Block.setBlockMaterial(BlockID.apiary, "wood", 1);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.apiary, count: 1, data: 0}, [
        "ppp",
        "sgs",
        "sss"
    ], ['s', 5, -1, 'p', 158, -1, 'g', ItemID.impregnatedCasing, 0]);
});

//ICRenderLib.addConnectionBlock("bc-container", BlockID.apiary);
