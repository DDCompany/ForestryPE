for (const [name, fullName] of combNames) {
    IDRegistry.genBlockID(fullName);
    Block.createBlock(fullName, [
        {name: `forestry.block.${name}_comb`, texture: [[fullName, 0]], inCreative: true},
    ]);
    Block.setDestroyTime(fullName, 1);

    Recipes.addShaped({id: BlockID[fullName], count: 1, data: 0}, [
        "cc",
        "cc",
    ], ['c', ItemID[fullName], 0]);
    Recipes.addShapeless({id: ItemID[fullName], count: 4, data: 0}, [{id: BlockID[fullName], data: 0}]);
}

Item.addCreativeGroup("comb_blocks", t("forestry.creative_group.comb_blocks"), [
    ...combNames.map(value => BlockID[value[1]]),
]);