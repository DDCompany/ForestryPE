IDRegistry.genBlockID("apiary");
Block.createBlock("apiary", [
    {name: "forestry.block.apiary", texture: [["apiary", 0], ["apiary", 0], ["apiary", 1]], inCreative: true},
]);
Block.setBlockMaterial(BlockID.apiary, "wood", 1);
GROUP_ITEM_PIPE.add(BlockID.apiary, -1);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.apiary, count: 1, data: 0}, [
        "ppp",
        "sgs",
        "sss"
    ], ['s', VanillaBlockID.planks, -1, 'p', VanillaBlockID.wooden_slab, -1, 'g', ItemID.impregnatedCasing, -1]);
});