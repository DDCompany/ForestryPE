for (var i = 0; i < 16; i++) {
    RecipeRegistry.addFabricatorRecipe({
        input: {"slot4": {id: 351, data: i}, "slot7": {id: ItemID.propolis, data: 0}},
        dop: {
            id: ItemID.waxCast,
            data: 0,
            count: 1,
            dec: false
        },
        output: {
            id: BlockID.forestryGlass,
            count: 1,
            data: i
        }
    });
}

for (var i = 0; i < 16; i++) {
    RecipeRegistry.addFabricatorRecipe({
        input: {"slot4": {id: 351, data: i}, "slot7": {id: ItemID.propolisSilky, data: 0}},
        dop: {
            id: ItemID.waxCast,
            data: 0,
            count: 1,
            dec: false
        },
        output: {
            id: BlockID.forestryGlass,
            count: 1,
            data: i
        }
    });

}

for (var i = 0; i < 16; i++) {

    RecipeRegistry.addFabricatorRecipe({
        input: {"slot4": {id: 351, data: i}, "slot7": {id: ItemID.propolisPulse, data: 0}},
        dop: {
            id: ItemID.waxCast,
            data: 0,
            count: 1,
            dec: false
        },
        output: {
            id: BlockID.forestryGlass,
            count: 1,
            data: i
        }
    });

}

RecipeRegistry.addFabricatorRecipe({
    input: {
        "slot1": {id: ItemID.ingotCopper, data: 0},
        "slot3": {id: 331, data: 0},
        "slot4": {id: ItemID.ingotCopper, data: 0},
        "slot5": {id: 331, data: 0},
        "slot6": {id: ItemID.ingotCopper, data: 0},
        "slot7": {id: ItemID.ingotCopper, data: 0},
        "slot8": {id: ItemID.ingotCopper, data: 0}
    },
    output: {
        id: ItemID.thermionicTubeCopper,
        count: 4,
        data: 0
    }
});

RecipeRegistry.addFabricatorRecipe({
    input: {
        "slot1": {id: ItemID.ingotTin, data: 0},
        "slot3": {id: 331, data: 0},
        "slot4": {id: ItemID.ingotTin, data: 0},
        "slot5": {id: 331, data: 0},
        "slot6": {id: ItemID.ingotTin, data: 0},
        "slot7": {id: ItemID.ingotTin, data: 0},
        "slot8": {id: ItemID.ingotTin, data: 0}
    },
    output: {
        id: ItemID.thermionicTubeTin,
        count: 4,
        data: 0
    }
});

RecipeRegistry.addFabricatorRecipe({
    input: {
        "slot1": {id: ItemID.ingotBronze, data: 0},
        "slot3": {id: 331, data: 0},
        "slot4": {id: ItemID.ingotBronze, data: 0},
        "slot5": {id: 331, data: 0},
        "slot6": {id: ItemID.ingotBronze, data: 0},
        "slot7": {id: ItemID.ingotBronze, data: 0},
        "slot8": {id: ItemID.ingotBronze, data: 0}
    },
    output: {
        id: ItemID.thermionicTubeBronze,
        count: 4,
        data: 0
    }
});

RecipeRegistry.addFabricatorRecipe({
    input: {
        "slot1": {id: 264, data: 0},
        "slot3": {id: 331, data: 0},
        "slot4": {id: 264, data: 0},
        "slot5": {id: 331, data: 0},
        "slot6": {id: 264, data: 0},
        "slot7": {id: 264, data: 0},
        "slot8": {id: 264, data: 0}
    },
    output: {
        id: ItemID.thermionicTubeDiamond,
        count: 4,
        data: 0
    }
});

RecipeRegistry.addFabricatorRecipe({
    input: {
        "slot1": {id: 266, data: 0},
        "slot3": {id: 331, data: 0},
        "slot4": {id: 266, data: 0},
        "slot5": {id: 331, data: 0},
        "slot6": {id: 266, data: 0},
        "slot7": {id: 266, data: 0},
        "slot8": {id: 266, data: 0}
    },
    output: {
        id: ItemID.thermionicTubeGold,
        count: 4,
        data: 0
    }
});

RecipeRegistry.addFabricatorRecipe({
    input: {
        "slot1": {id: 265, data: 0},
        "slot3": {id: 331, data: 0},
        "slot4": {id: 265, data: 0},
        "slot5": {id: 331, data: 0},
        "slot6": {id: 265, data: 0},
        "slot7": {id: 265, data: 0},
        "slot8": {id: 265, data: 0}
    },
    output: {
        id: ItemID.thermionicTubeIron,
        count: 4,
        data: 0
    }
});