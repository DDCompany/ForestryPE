Block.setPrototype("fabricator", {
    type: Block.TYPE_ROTATION,

    getVariations() {
        return [{
            name: "forestry.block.thermionic_fabricator",
            texture: [["fabricator_bottom", 0], ["fabricator_top", 0], ["fabricator_side", 0], ["fabricator_front", 0], ["fabricator_side", 0], ["fabricator_side", 0]],
            inCreative: true
        }];
    }

});


Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.fabricator, count: 1, data: 0}, [
        "cgc",
        "g g",
        "cbc"
    ], ['c', 266, -1, 'g', 20, -1, 'b', 54, -1]);
});

GROUP_ITEM_PIPE.add(BlockID.fabricator, -1);
Item.addCreativeGroup("forestry_machines", t("forestry.creative_group.machines"), [
    BlockID.fabricator,
]);