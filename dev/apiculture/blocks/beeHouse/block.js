Block.setPrototype("beeHouse", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{
            name: "Bee house",
            texture: [["bee_house", 0], ["bee_house", 0], ["bee_house", 1], ["bee_house", 1], ["bee_house", 1], ["bee_house", 1]],
            inCreative: true
        }];
    }

});
Block.setBlockMaterial(BlockID.beeHouse, "wood", 1);

Callback.addCallback("PostLoaded", function () {
    var combs = [ItemID.combCocoa, ItemID.combDripping, ItemID.combHoney, ItemID.combFrozen, ItemID.combMellow, ItemID.combMossy, ItemID.combMysterious, ItemID.combParched, ItemID.combPowdery, ItemID.combSilky, ItemID.combSimmering, ItemID.combStringy, ItemID.combWheaten, ItemID.combIrradiated];
    
    for(var id in combs) {
        Recipes.addShaped({id: BlockID.beeHouse, count: 1, data: 0}, [
            "ppp",
            "sgs",
            "sss"
        ], ['s', 5, -1, 'p', 158, -1, 'g', combs[id], 0]);
    }
});
