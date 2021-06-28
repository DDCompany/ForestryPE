Block.createSpecialType({
    base: VanillaBlockID.brick_block,
    solid: true,
    destroytime: 2,
    explosionres: 10,
    sound: "stone",
}, "forestry_bricks");

IDRegistry.genBlockID("bricksAsh");
Block.createBlock("bricksAsh", [
    {name: `forestry.block.ash_bricks`, texture: [["bricksAsh", 0]], inCreative: true},
], "forestry_bricks");
Block.setBlockMaterial("bricksAsh", "stone", 1);
Block.setDestroyLevel("bricksAsh", 1);

Callback.addCallback("PreLoaded", () => {
    Recipes.addShaped({id: BlockID.bricksAsh, count: 1, data: 0}, [
        "ABA",
        "B B",
        "ABA",
    ], ['A', ItemID.ash, 0, 'B', VanillaItemID.brick, 0]);
});