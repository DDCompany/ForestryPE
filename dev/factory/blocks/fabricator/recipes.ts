//Smelting
FabricatorManager.addSmelting({
    input: {
        id: VanillaBlockID.glass,
    },
    amount: 1,
    temperature: 1000
});

FabricatorManager.addSmelting({
    input: {
        id: VanillaBlockID.sand,
    },
    amount: 1,
    temperature: 3000
});

FabricatorManager.addSmelting({
    input: {
        id: VanillaBlockID.sand,
        data: 1
    },
    amount: 1,
    temperature: 3000
});

FabricatorManager.addSmelting({
    input: {
        id: VanillaBlockID.glass_pane,
    },
    amount: 0.375,
    temperature: 1000
});

FabricatorManager.addSmelting({
    input: {
        id: VanillaBlockID.sandstone,
    },
    amount: 4,
    temperature: 4800
});

FabricatorManager.addSmelting({
    input: {
        id: VanillaBlockID.sandstone,
        data: 1
    },
    amount: 4,
    temperature: 4800
});

FabricatorManager.addSmelting({
    input: {
        id: VanillaBlockID.sandstone,
        data: 2
    },
    amount: 4,
    temperature: 4800
});

//Recipes
function registerTubeRecipe(itemId: number, materialId: number, materialData: number = 0) {
    FabricatorManager.registerRecipe({
        input: {
            1: {id: materialId, data: materialData},
            3: {id: VanillaItemID.redstone, data: 0},
            4: {id: materialId, data: materialData},
            5: {id: VanillaItemID.redstone, data: 0},
            6: {id: materialId, data: materialData},
            7: {id: materialId, data: materialData},
            8: {id: materialId, data: materialData}
        },
        result: {
            id: itemId,
            count: 4,
            data: 0
        },
    });
}

registerTubeRecipe(ItemID.thermionicTubeCopper, ItemID.ingotCopper);
registerTubeRecipe(ItemID.thermionicTubeTin, ItemID.ingotTin);
registerTubeRecipe(ItemID.thermionicTubeBronze, ItemID.ingotBronze);
registerTubeRecipe(ItemID.thermionicTubeDiamond, VanillaItemID.diamond);
registerTubeRecipe(ItemID.thermionicTubeGold, VanillaItemID.gold_ingot);
registerTubeRecipe(ItemID.thermionicTubeIron, VanillaItemID.iron_ingot);
registerTubeRecipe(ItemID.thermionicTubeObsidian, VanillaBlockID.obsidian);
registerTubeRecipe(ItemID.thermionicTubeBlaze, VanillaItemID.blaze_rod);
registerTubeRecipe(ItemID.thermionicTubeEmerald, VanillaItemID.emerald);
registerTubeRecipe(ItemID.thermionicTubeApatite, ItemID.apatite);
registerTubeRecipe(ItemID.thermionicTubeLapis, VanillaItemID.lapis_lazuli);