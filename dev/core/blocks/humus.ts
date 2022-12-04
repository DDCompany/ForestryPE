IDRegistry.genBlockID("humus");
Block.createBlock("humus", [
    {name: "forestry.block.humus", texture: [["humus", 0]], inCreative: true},
]);
ToolAPI.registerBlockMaterial(BlockID.humus, "dirt");

Block.registerDropFunction(BlockID.humus, () => {
    return [[VanillaBlockID.dirt, 1, 0]];
});

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.humus, count: 8, data: 0}, [
        "ddd",
        "dmd",
        "ddd"
    ], ['d', VanillaBlockID.dirt, -1, 'm', ItemID.mulch, -1]);

    Recipes.addShaped({id: BlockID.humus, count: 8, data: 0}, [
        "ddd",
        "dmd",
        "ddd"
    ], ['d', VanillaBlockID.dirt, -1, 'm', ItemID.fertilizerBio, -1]);
});