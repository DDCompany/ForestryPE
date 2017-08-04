for (var i = 0; i < 4; i++) {
    RecipeRegistry.addCarpenterRecipe({
        input: {"slot4": {id: 17, data: i}},
        liquid: "water",
        liquidAmount: 0.25,
        output: {
            id: ItemID.woodPulp,
            count: 4,
            data: 0
        }
    });

    if (Config.crateEnabled) {
        RecipeRegistry.addCarpenterRecipe({
            input: {
                "slot1": {id: 17, data: i},
                "slot3": {id: 17, data: i},
                "slot5": {id: 17, data: i},
                "slot7": {id: 17, data: i}
            },
            liquid: "water",
            liquidAmount: 1,
            output: {
                id: ItemID.crate,
                count: 24,
                data: 0
            }
        });
    }

    RecipeRegistry.addCarpenterRecipe({
        input: {
            "slot0": {id: 17, data: i},
            "slot1": {id: 17, data: i},
            "slot2": {id: 17, data: i},
            "slot3": {id: 17, data: i},
            "slot5": {id: 17, data: i},
            "slot6": {id: 17, data: i},
            "slot7": {id: 17, data: i},
            "slot8": {id: 17, data: i}
        },
        liquid: "forestrySeedoil",
        liquidAmount: 1,
        output: {
            id: ItemID.impregnatedCasing,
            count: 1,
            data: 0
        }
    });

    RecipeRegistry.addCarpenterRecipe({
        input: {"slot4": {id: 17, data: i}, "slot7": {id: 17, data: i}},
        liquid: "forestrySeedoil",
        liquidAmount: 0.01,
        output: {
            id: ItemID.stickImpregnated,
            count: 2,
            data: 0
        }
    });
}

for (var i = 0; i < 2; i++) {

    if (Config.crateEnabled) {
        RecipeRegistry.addCarpenterRecipe({
            input: {
                "slot1": {id: 162, data: i},
                "slot3": {id: 162, data: i},
                "slot5": {id: 162, data: i},
                "slot7": {id: 162, data: i}
            },
            liquid: "water",
            liquidAmount: 1,
            output: {
                id: ItemID.crate,
                count: 24,
                data: 0
            }
        });
    }

    RecipeRegistry.addCarpenterRecipe({
        input: {"slot4": {id: 162, data: i}},
        liquid: "water",
        liquidAmount: 0.25,
        output: {
            id: ItemID.woodPulp,
            count: 4,
            data: 0
        }
    });

    RecipeRegistry.addCarpenterRecipe({
        input: {
            "slot0": {id: 162, data: i},
            "slot1": {id: 162, data: i},
            "slot2": {id: 162, data: i},
            "slot3": {id: 162, data: i},
            "slot5": {id: 162, data: i},
            "slot6": {id: 162, data: i},
            "slot7": {id: 162, data: i},
            "slot8": {id: 162, data: i}
        },
        output: {
            id: 368,
            count: 1,
            data: 0
        }
    });

    RecipeRegistry.addCarpenterRecipe({
        input: {"slot4": {id: 162, data: i}, "slot7": {id: 162, data: i}},
        liquid: "forestrySeedoil",
        liquidAmount: 0.01,
        output: {
            id: ItemID.stickImpregnated,
            count: 2,
            data: 0
        }
    });

}

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: 331, data: 0}, "slot2": {id: 331, data: 0},
        "slot3": {id: 331, data: 0}, "slot4": {id: ItemID.ingotTin, data: 0}, "slot5": {id: 331, data: 0},
        "slot6": {id: 331, data: 0}, "slot8": {id: 331, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: ItemID.chipsetBasic,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: 331, data: 0}, "slot1": {id: ItemID.ingotBronze, data: 0}, "slot2": {id: 331, data: 0},
        "slot3": {id: 331, data: 0}, "slot4": {id: ItemID.ingotBronze, data: 0}, "slot5": {id: 331, data: 0},
        "slot6": {id: 331, data: 0}, "slot7": {id: ItemID.ingotBronze, data: 0}, "slot8": {id: 331, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: ItemID.chipsetEnhanced,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: 331, data: 0}, "slot1": {id: 265, data: 0}, "slot2": {id: 331, data: 0},
        "slot3": {id: 331, data: 0}, "slot4": {id: 265, data: 0}, "slot5": {id: 331, data: 0},
        "slot6": {id: 331, data: 0}, "slot7": {id: 265, data: 0}, "slot8": {id: 331, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: ItemID.chipsetIntricate,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: 331, data: 0}, "slot1": {id: 266, data: 0}, "slot2": {id: 331, data: 0},
        "slot3": {id: 331, data: 0}, "slot4": {id: 266, data: 0}, "slot5": {id: 331, data: 0},
        "slot6": {id: 331, data: 0}, "slot7": {id: 266, data: 0}, "slot8": {id: 331, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: ItemID.chipsetRefined,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {"slot4": {id: ItemID.woodPulp, data: 0}, "slot7": {id: ItemID.woodPulp, data: 0}},
    liquid: "water",
    liquidAmount: 0.25,
    output: {
        id: 339,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {"slot4": {id: ItemID.brokenBronzePickaxe, data: 0}},
    output: {
        id: ItemID.ingotBronze,
        count: 2,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {"slot4": {id: ItemID.brokenBronzeShovel, data: 0}},
    output: {
        id: ItemID.ingotBronze,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: ItemID.silkWisp, data: 0},
        "slot1": {id: ItemID.silkWisp, data: 0},
        "slot2": {id: ItemID.silkWisp, data: 0},
        "slot3": {id: ItemID.silkWisp, data: 0},
        "slot4": {id: ItemID.silkWisp, data: 0},
        "slot5": {id: ItemID.silkWisp, data: 0},
        "slot6": {id: ItemID.silkWisp, data: 0},
        "slot7": {id: ItemID.silkWisp, data: 0},
        "slot8": {id: ItemID.silkWisp, data: 0}
    },
    liquid: "water",
    liquidAmount: 0.5,
    output: {
        id: BlockID.wovenSilk,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: ItemID.honeyDrop, data: 0},
        "slot1": {id: ItemID.royalJelly, data: 0},
        "slot2": {id: ItemID.honeyDrop, data: 0},
        "slot3": {id: ItemID.royalJelly, data: 0},
        "slot4": {id: ItemID.canEmpty, data: 0},
        "slot5": {id: ItemID.royalJelly, data: 0},
        "slot6": {id: 289, data: 0},
        "slot7": {id: ItemID.royalJelly, data: 0},
        "slot8": {id: 289, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: ItemID.dissipationCharge,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: ItemID.honeyDrop, data: 0},
        "slot1": {id: ItemID.pollen1, data: 0},
        "slot2": {id: ItemID.honeyDrop, data: 0},
        "slot3": {id: ItemID.pollen1, data: 0},
        "slot4": {id: ItemID.canEmpty, data: 0},
        "slot5": {id: ItemID.pollen1, data: 0},
        "slot6": {id: 289, data: 0},
        "slot7": {id: ItemID.pollen1, data: 0},
        "slot8": {id: 289, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: ItemID.iodineCapsule,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: 3, data: 0}, "slot1": {id: 264, data: 0}, "slot2": {id: 3, data: 0},
        "slot3": {id: 12, data: 0}, "slot4": {id: ItemID.mulch, data: 0}, "slot5": {id: 12, data: 0},
        "slot6": {id: 3, data: 0}, "slot7": {id: 12, data: 0}, "slot8": {id: 3, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: BlockID.bog,
        count: 8,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: ItemID.wovenSilk, data: 0},
        "slot1": {id: 264, data: 0},
        "slot2": {id: ItemID.wovenSilk, data: 0},
        "slot3": {id: ItemID.wovenSilk, data: 0},
        "slot4": {id: ItemID.backpackMiners, data: 0},
        "slot5": {id: ItemID.wovenSilk, data: 0},
        "slot6": {id: ItemID.wovenSilk, data: 0},
        "slot7": {id: ItemID.wovenSilk, data: 0},
        "slot8": {id: ItemID.wovenSilk, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: BlockID.backpackMinersT2,
        count: 8,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: ItemID.wovenSilk, data: 0},
        "slot1": {id: 264, data: 0},
        "slot2": {id: ItemID.wovenSilk, data: 0},
        "slot3": {id: ItemID.wovenSilk, data: 0},
        "slot4": {id: ItemID.backpackBuilder, data: 0},
        "slot5": {id: ItemID.wovenSilk, data: 0},
        "slot6": {id: ItemID.wovenSilk, data: 0},
        "slot7": {id: ItemID.wovenSilk, data: 0},
        "slot8": {id: ItemID.wovenSilk, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: BlockID.backpackBuilderT2,
        count: 8,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: ItemID.wovenSilk, data: 0},
        "slot1": {id: 264, data: 0},
        "slot2": {id: ItemID.wovenSilk, data: 0},
        "slot3": {id: ItemID.wovenSilk, data: 0},
        "slot4": {id: ItemID.backpackDigger, data: 0},
        "slot5": {id: ItemID.wovenSilk, data: 0},
        "slot6": {id: ItemID.wovenSilk, data: 0},
        "slot7": {id: ItemID.wovenSilk, data: 0},
        "slot8": {id: ItemID.wovenSilk, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: BlockID.backpackDiggerT2,
        count: 8,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: ItemID.wovenSilk, data: 0},
        "slot1": {id: 264, data: 0},
        "slot2": {id: ItemID.wovenSilk, data: 0},
        "slot3": {id: ItemID.wovenSilk, data: 0},
        "slot4": {id: ItemID.backpackForester, data: 0},
        "slot5": {id: ItemID.wovenSilk, data: 0},
        "slot6": {id: ItemID.wovenSilk, data: 0},
        "slot7": {id: ItemID.wovenSilk, data: 0},
        "slot8": {id: ItemID.wovenSilk, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: BlockID.backpackForesterT2,
        count: 8,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: ItemID.wovenSilk, data: 0},
        "slot1": {id: 264, data: 0},
        "slot2": {id: ItemID.wovenSilk, data: 0},
        "slot3": {id: ItemID.wovenSilk, data: 0},
        "slot4": {id: ItemID.backpackHunter, data: 0},
        "slot5": {id: ItemID.wovenSilk, data: 0},
        "slot6": {id: ItemID.wovenSilk, data: 0},
        "slot7": {id: ItemID.wovenSilk, data: 0},
        "slot8": {id: ItemID.wovenSilk, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: BlockID.backpackHunterT2,
        count: 8,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: 3, data: 0}, "slot1": {id: 3, data: 0}, "slot2": {id: 3, data: 0},
        "slot3": {id: 3, data: 0}, "slot4": {id: ItemID.mulch, data: 0}, "slot5": {id: 3, data: 0},
        "slot6": {id: 3, data: 0}, "slot7": {id: 3, data: 0}, "slot8": {id: 3, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: BlockID.humus,
        count: 9,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot1": {id: ItemID.woodPulp, data: 0},
        "slot3": {id: ItemID.woodPulp, data: 0},
        "slot5": {id: ItemID.woodPulp, data: 0},
        "slot7": {id: ItemID.woodPulp, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    output: {
        id: ItemID.carton,
        count: 2,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: ItemID.ingotBronze, data: 0},
        "slot1": {id: ItemID.ingotBronze, data: 0},
        "slot2": {id: ItemID.ingotBronze, data: 0},
        "slot4": {id: 280, data: 0},
        "slot7": {id: 280, data: 0}
    },
    dop: {
        id: ItemID.carton,
        data: 0,
        dec: true
    },
    output: {
        id: ItemID.kitPickaxe,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot1": {id: ItemID.royalJelly, data: 0},
        "slot3": {id: 5, data: 0},
        "slot4": {id: 5, data: 0},
        "slot5": {id: 5, data: 0},
        "slot6": {id: ItemID.beeswax, data: 0},
        "slot7": {id: ItemID.pollen1, data: 0},
        "slot8": {id: ItemID.beeswax, data: 0}
    },
    liquid: "forestryHoney",
    liquidAmount: 0.5,
    output: {
        id: ItemID.scentedPaneling,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {"slot1": {id: ItemID.ingotBronze, data: 0}, "slot4": {id: 280, data: 0}, "slot7": {id: 280, data: 0}},
    dop: {
        id: ItemID.carton,
        data: 0,
        dec: true
    },
    output: {
        id: ItemID.kitShovel,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot1": {id: ItemID.pulsatingMesh, data: 0},
        "slot3": {id: ItemID.pulsatingMesh, data: 0},
        "slot4": {id: ItemID.pulsatingMesh, data: 0},
        "slot5": {id: ItemID.pulsatingMesh, data: 0},
        "slot7": {id: ItemID.pulsatingMesh, data: 0}
    },
    output: {
        id: 368,
        count: 1,
        data: 0
    }
});

RecipeRegistry.addCarpenterRecipe({
    input: {
        "slot0": {id: 264, data: 0},
        "slot2": {id: 264, data: 0},
        "slot4": {id: ItemID.sturdyMachine, data: 0},
        "slot6": {id: 264, data: 0},
        "slot8": {id: 264, data: 0}
    },
    liquid: "water",
    liquidAmount: 5,
    dop: {
        id: ItemID.carton,
        data: 0,
        dec: true
    },
    output: {
        id: ItemID.kitShovel,
        count: 1,
        data: 0
    }
});