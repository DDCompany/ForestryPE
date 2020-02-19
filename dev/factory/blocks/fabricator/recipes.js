//Smelting
for (let i = 0; i < 16; i++) {
    FabricatorManager.addSmelting({
        input: {
            id: BlockID.forestryGlass,
            data: i
        },
        amount: 1,
        temperature: 1000
    });
}

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
for (let i = 0; i < 16; i++) {
    FabricatorManager.registerRecipe({
        input: {3: {id: 351, data: i}, 6: {id: ItemID.propolis, data: 0}},
        special: {
            id: ItemID.waxCast,
            data: 0,
            count: 1,
            dec: false
        },
        result: {
            id: BlockID.forestryGlass,
            count: 1,
            data: i
        }
    });
}

if (ForestryConfig.glassEnabled) {
    for (let i = 0; i < 16; i++) {
        FabricatorManager.registerRecipe({
            input: {3: {id: 351, data: i}, 6: {id: ItemID.propolisSilky, data: 0}},
            special: {
                id: ItemID.waxCast,
                data: 0,
                count: 1,
                dec: false
            },
            result: {
                id: BlockID.forestryGlass,
                count: 1,
                data: i
            }
        });

    }

    for (let i = 0; i < 16; i++) {
        FabricatorManager.registerRecipe({
            input: {3: {id: 351, data: i}, 6: {id: ItemID.propolisPulse, data: 0}},
            special: {
                id: ItemID.waxCast,
                data: 0,
                count: 1,
                dec: false
            },
            result: {
                id: BlockID.forestryGlass,
                count: 1,
                data: i
            }
        });

    }
}

FabricatorManager.registerRecipe({
    input: {
        1: {id: ItemID.ingotCopper, data: 0},
        3: {id: 331, data: 0},
        4: {id: ItemID.ingotCopper, data: 0},
        5: {id: 331, data: 0},
        6: {id: ItemID.ingotCopper, data: 0},
        7: {id: ItemID.ingotCopper, data: 0},
        8: {id: ItemID.ingotCopper, data: 0}
    },
    result: {
        id: ItemID.thermionicTubeCopper,
        count: 4,
        data: 0
    }
});

FabricatorManager.registerRecipe({
    input: {
        1: {id: ItemID.ingotTin, data: 0},
        3: {id: 331, data: 0},
        4: {id: ItemID.ingotTin, data: 0},
        5: {id: 331, data: 0},
        6: {id: ItemID.ingotTin, data: 0},
        7: {id: ItemID.ingotTin, data: 0},
        8: {id: ItemID.ingotTin, data: 0}
    },
    result: {
        id: ItemID.thermionicTubeTin,
        count: 4,
        data: 0
    }
});

FabricatorManager.registerRecipe({
    input: {
        1: {id: ItemID.ingotBronze, data: 0},
        3: {id: 331, data: 0},
        4: {id: ItemID.ingotBronze, data: 0},
        5: {id: 331, data: 0},
        6: {id: ItemID.ingotBronze, data: 0},
        7: {id: ItemID.ingotBronze, data: 0},
        8: {id: ItemID.ingotBronze, data: 0}
    },
    result: {
        id: ItemID.thermionicTubeBronze,
        count: 4,
        data: 0
    }
});

FabricatorManager.registerRecipe({
    input: {
        1: {id: 264, data: 0},
        3: {id: 331, data: 0},
        4: {id: 264, data: 0},
        5: {id: 331, data: 0},
        6: {id: 264, data: 0},
        7: {id: 264, data: 0},
        8: {id: 264, data: 0}
    },
    result: {
        id: ItemID.thermionicTubeDiamond,
        count: 4,
        data: 0
    }
});

FabricatorManager.registerRecipe({
    input: {
        1: {id: 266, data: 0},
        3: {id: 331, data: 0},
        4: {id: 266, data: 0},
        5: {id: 331, data: 0},
        6: {id: 266, data: 0},
        7: {id: 266, data: 0},
        8: {id: 266, data: 0}
    },
    result: {
        id: ItemID.thermionicTubeGold,
        count: 4,
        data: 0
    }
});

FabricatorManager.registerRecipe({
    input: {
        1: {id: 265, data: 0},
        3: {id: 331, data: 0},
        4: {id: 265, data: 0},
        5: {id: 331, data: 0},
        6: {id: 265, data: 0},
        7: {id: 265, data: 0},
        8: {id: 265, data: 0}
    },
    result: {
        id: ItemID.thermionicTubeIron,
        count: 4,
        data: 0
    }
});