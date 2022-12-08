IDRegistry.genBlockID("beeHouse");
Block.createBlock("beeHouse", [
    {
        name: "forestry.block.bee_house",
        texture: [["bee_house", 2], ["bee_house", 0], ["bee_house", 1]],
        inCreative: true,
    },
]);
Block.setBlockMaterial(BlockID.beeHouse, "wood", 1);

Callback.addCallback("PostLoaded", () => {
    for (const i in COMBS) {
        Recipes.addShaped({id: BlockID.beeHouse, count: 1, data: 0}, [
            "ppp",
            "sgs",
            "sss"
        ], ['s', VanillaBlockID.planks, -1, 'p', VanillaBlockID.wooden_slab, -1, 'g', COMBS[i], -1]);
    }
});