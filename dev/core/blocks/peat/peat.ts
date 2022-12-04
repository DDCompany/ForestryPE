IDRegistry.genBlockID("bog");
Block.createBlock("bog", [
    {name: "forestry.block.bog_earth", texture: [["bog", 0]], inCreative: true},
]);
ToolAPI.registerBlockMaterial(BlockID.bog, "dirt");

IDRegistry.genBlockID("blockPeat");
Block.createBlock("blockPeat", [
    {name: "forestry.block.peat", texture: [["blockPeat", 0]], inCreative: true},
]);
ToolAPI.registerBlockMaterial(BlockID.blockPeat, "dirt");

Block.registerDropFunction(BlockID.blockPeat, () => {
    return [[ItemID.peat, 2, 0], [VanillaBlockID.dirt, 1, 0]];
});

Callback.addCallback("PostLoaded", () => {
    for (const key in LiquidRegistry.FullByEmpty) {
        if (key.split(":")[2] === "water") {
            const desc = LiquidRegistry.FullByEmpty[key];
            Recipes.addShaped({id: BlockID.bog, count: 8, data: 0}, [
                "dsd",
                "scs",
                "dsd"
            ], ['d', VanillaBlockID.dirt, 0, 's', VanillaBlockID.sand, 0, 'c', desc.id, desc.data]);
        }
    }
});
