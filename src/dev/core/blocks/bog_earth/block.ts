Block.createSpecialType({
    destroytime: 1,
    sound: "grass",
}, "forestry_bog_earth");

IDRegistry.genBlockID("earthBog");
Block.createBlock("earthBog", [
    {name: `forestry.block.bog_earth`, texture: [["earthBog", 0]], inCreative: true},
], "forestry_bog_earth");
Block.setBlockMaterial("earthBog", "dirt", 0);
Block.setDestroyLevel("earthBog", 0);

IDRegistry.genBlockID("peat");
Block.createBlock("peat", [
    {name: `forestry.block.peat`, texture: [["peat", 0]], inCreative: true},
], "forestry_bog_earth");
Block.setBlockMaterial("peat", "dirt", 0);
Block.setDestroyLevel("peat", 0);
Block.registerDropFunction(BlockID.peat, () => [[ItemID.peat, 2, 0], [VanillaBlockID.dirt, 1, 0]]);

Callback.addCallback("PreLoaded", () => {
    for (const key in LiquidRegistry.FullByEmpty) {
        if (key.split(":")[2] === "water") {
            const full = LiquidRegistry.FullByEmpty[key];
            const count = full.id === VanillaItemID.water_bucket ? 4 : 6;
            Recipes.addShaped({id: BlockID.earthBog, count, data: 0}, [
                "DSD",
                "SXS",
                "DSD",
            ], ['S', VanillaBlockID.sand, 0, "D", VanillaBlockID.dirt, 0, "X", full.id, full.data]);
        }
    }
});