//Smelting
FabricatorManager.addSmelting({
    input: {
        id: 20
    },
    amount: 1,
    temperature: 1000
});

FabricatorManager.addSmelting({
    input: {
        id: 12
    },
    amount: 1,
    temperature: 3000
});

FabricatorManager.addSmelting({
    input: {
        id: 12,
        data: 1
    },
    amount: 1,
    temperature: 3000
});

FabricatorManager.addSmelting({
    input: {
        id: 102
    },
    amount: 0.375,
    temperature: 1000
});

FabricatorManager.addSmelting({
    input: {
        id: 24
    },
    amount: 4,
    temperature: 4800
});

FabricatorManager.addSmelting({
    input: {
        id: 24,
        data: 1
    },
    amount: 4,
    temperature: 4800
});

FabricatorManager.addSmelting({
    input: {
        id: 24,
        data: 2
    },
    amount: 4,
    temperature: 4800
});

//Recipes
function registerTubeRecipe(itemId, materialId, materialData) {
    materialData = materialData || 0;
    FabricatorManager.registerRecipe({
        input: {
            1: {id: materialId, data: materialData},
            3: {id: 331, data: 0},
            4: {id: materialId, data: materialData},
            5: {id: 331, data: 0},
            6: {id: materialId, data: materialData},
            7: {id: materialId, data: materialData},
            8: {id: materialId, data: materialData}
        },
        result: {
            id: itemId,
            count: 4,
            data: 0
        }
    });
}

registerTubeRecipe(ItemID.thermionicTubeCopper, ItemID.ingotCopper);
registerTubeRecipe(ItemID.thermionicTubeTin, ItemID.ingotTin);
registerTubeRecipe(ItemID.thermionicTubeBronze, ItemID.ingotBronze);
registerTubeRecipe(ItemID.thermionicTubeDiamond, 264);
registerTubeRecipe(ItemID.thermionicTubeGold, 266);
registerTubeRecipe(ItemID.thermionicTubeIron, 265);
registerTubeRecipe(ItemID.thermionicTubeObsidian, 49);
registerTubeRecipe(ItemID.thermionicTubeBlaze, 377);
registerTubeRecipe(ItemID.thermionicTubeEmerald, 388);
registerTubeRecipe(ItemID.thermionicTubeApatite, ItemID.apatite);
registerTubeRecipe(ItemID.thermionicTubeLapis, 351, 4);