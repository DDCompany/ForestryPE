{
    const vanillaWood = [
        {
            id: 17,
            variations: 4
        },
        {
            id: 162,
            variations: 2
        }
    ];

    for (let i in vanillaWood) {
        let wood = vanillaWood[i];
        let woodId = wood.id;
        for (let j = 0; j < wood.variations; j++) {
            CarpenterManager.registerRecipe({
                input: {4: {id: woodId, data: j}},
                liquid: "water",
                liquidAmount: 0.25,
                time: 5,
                result: {
                    id: ItemID.woodPulp,
                    count: 4,
                    data: 0
                }
            });

            if (ForestryConfig.crateEnabled) {
                CarpenterManager.registerRecipe({
                    input: {
                        1: {id: woodId, data: j},
                        3: {id: woodId, data: j},
                        5: {id: woodId, data: j},
                        7: {id: woodId, data: j}
                    },
                    liquid: "water",
                    liquidAmount: 1,
                    time: 5,
                    result: {
                        id: ItemID.crate,
                        count: 24,
                        data: 0
                    }
                });
            }

            CarpenterManager.registerRecipe({
                input: {
                    0: {id: woodId, data: j},
                    1: {id: woodId, data: j},
                    2: {id: woodId, data: j},
                    3: {id: woodId, data: j},
                    5: {id: woodId, data: j},
                    6: {id: woodId, data: j},
                    7: {id: woodId, data: j},
                    8: {id: woodId, data: j}
                },
                liquid: "seedOil",
                liquidAmount: 1,
                time: 50,
                result: {
                    id: ItemID.impregnatedCasing,
                    count: 1,
                    data: 0
                }
            });

            CarpenterManager.registerRecipe({
                input: {4: {id: woodId, data: j}, 7: {id: woodId, data: j}},
                liquid: "seedOil",
                liquidAmount: 0.01,
                time: 10,
                result: {
                    id: ItemID.stickImpregnated,
                    count: 2,
                    data: 0
                }
            });
        }
    }
}

CarpenterManager.registerRecipe({
    input: {
        0: {id: ItemID.ingotTin, data: 0},
        1: {id: 102, data: 0},
        2: {id: ItemID.ingotTin, data: 0},
        3: {id: ItemID.ingotTin, data: 0},
        4: {id: 102, data: 0},
        5: {id: ItemID.ingotTin, data: 0},
        6: {id: 331, data: 0},
        7: {id: 264, data: 0},
        8: {id: 331, data: 0}
    },
    result: {
        id: ItemID.analyzer,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: 331, data: 0}, 2: {id: 331, data: 0},
        3: {id: 331, data: 0}, 4: {id: ItemID.ingotTin, data: 0}, 5: {id: 331, data: 0},
        6: {id: 331, data: 0}, 8: {id: 331, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.chipsetBasic,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: 331, data: 0}, 1: {id: ItemID.ingotBronze, data: 0}, 2: {id: 331, data: 0},
        3: {id: 331, data: 0}, 4: {id: ItemID.ingotBronze, data: 0}, 5: {id: 331, data: 0},
        6: {id: 331, data: 0}, 7: {id: ItemID.ingotBronze, data: 0}, 8: {id: 331, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.chipsetEnhanced,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: 331, data: 0}, 1: {id: 265, data: 0}, 2: {id: 331, data: 0},
        3: {id: 331, data: 0}, 4: {id: 265, data: 0}, 5: {id: 331, data: 0},
        6: {id: 331, data: 0}, 7: {id: 265, data: 0}, 8: {id: 331, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.chipsetIntricate,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: 331, data: 0}, 1: {id: 266, data: 0}, 2: {id: 331, data: 0},
        3: {id: 331, data: 0}, 4: {id: 266, data: 0}, 5: {id: 331, data: 0},
        6: {id: 331, data: 0}, 7: {id: 266, data: 0}, 8: {id: 331, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.chipsetRefined,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {4: {id: ItemID.woodPulp, data: 0}, 7: {id: ItemID.woodPulp, data: 0}},
    liquid: "water",
    liquidAmount: 0.25,
    result: {
        id: 339,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {4: {id: ItemID.brokenBronzePickaxe, data: 0}},
    result: {
        id: ItemID.ingotBronze,
        count: 2,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {4: {id: ItemID.brokenBronzeShovel, data: 0}},
    result: {
        id: ItemID.ingotBronze,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: ItemID.silkWisp, data: 0},
        1: {id: ItemID.silkWisp, data: 0},
        2: {id: ItemID.silkWisp, data: 0},
        3: {id: ItemID.silkWisp, data: 0},
        4: {id: ItemID.silkWisp, data: 0},
        5: {id: ItemID.silkWisp, data: 0},
        6: {id: ItemID.silkWisp, data: 0},
        7: {id: ItemID.silkWisp, data: 0},
        8: {id: ItemID.silkWisp, data: 0}
    },
    liquid: "water",
    liquidAmount: 0.5,
    result: {
        id: ItemID.wovenSilk,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: ItemID.honeyDrop, data: 0},
        1: {id: ItemID.royalJelly, data: 0},
        2: {id: ItemID.honeyDrop, data: 0},
        3: {id: ItemID.royalJelly, data: 0},
        4: {id: ItemID.canEmpty, data: 0},
        5: {id: ItemID.royalJelly, data: 0},
        6: {id: 289, data: 0},
        7: {id: ItemID.royalJelly, data: 0},
        8: {id: 289, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.dissipationCharge,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: ItemID.honeyDrop, data: 0},
        1: {id: ItemID.pollen1, data: 0},
        2: {id: ItemID.honeyDrop, data: 0},
        3: {id: ItemID.pollen1, data: 0},
        4: {id: ItemID.canEmpty, data: 0},
        5: {id: ItemID.pollen1, data: 0},
        6: {id: 289, data: 0},
        7: {id: ItemID.pollen1, data: 0},
        8: {id: 289, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.iodineCapsule,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: 3, data: 0}, 1: {id: 12, data: 0}, 2: {id: 3, data: 0},
        3: {id: 12, data: 0}, 4: {id: ItemID.mulch, data: 0}, 5: {id: 12, data: 0},
        6: {id: 3, data: 0}, 7: {id: 12, data: 0}, 8: {id: 3, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: BlockID.bog,
        count: 8,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: ItemID.wovenSilk, data: 0},
        1: {id: 264, data: 0},
        2: {id: ItemID.wovenSilk, data: 0},
        3: {id: ItemID.wovenSilk, data: 0},
        4: {id: ItemID.backpackAdventurer, data: 0},
        5: {id: ItemID.wovenSilk, data: 0},
        6: {id: ItemID.wovenSilk, data: 0},
        7: {id: ItemID.wovenSilk, data: 0},
        8: {id: ItemID.wovenSilk, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.backpackAdventurerT2,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: ItemID.wovenSilk, data: 0},
        1: {id: 264, data: 0},
        2: {id: ItemID.wovenSilk, data: 0},
        3: {id: ItemID.wovenSilk, data: 0},
        4: {id: ItemID.backpackMiners, data: 0},
        5: {id: ItemID.wovenSilk, data: 0},
        6: {id: ItemID.wovenSilk, data: 0},
        7: {id: ItemID.wovenSilk, data: 0},
        8: {id: ItemID.wovenSilk, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.backpackMinersT2,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: ItemID.wovenSilk, data: 0},
        1: {id: 264, data: 0},
        2: {id: ItemID.wovenSilk, data: 0},
        3: {id: ItemID.wovenSilk, data: 0},
        4: {id: ItemID.backpackBuilder, data: 0},
        5: {id: ItemID.wovenSilk, data: 0},
        6: {id: ItemID.wovenSilk, data: 0},
        7: {id: ItemID.wovenSilk, data: 0},
        8: {id: ItemID.wovenSilk, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.backpackBuilderT2,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: ItemID.wovenSilk, data: 0},
        1: {id: 264, data: 0},
        2: {id: ItemID.wovenSilk, data: 0},
        3: {id: ItemID.wovenSilk, data: 0},
        4: {id: ItemID.backpackDigger, data: 0},
        5: {id: ItemID.wovenSilk, data: 0},
        6: {id: ItemID.wovenSilk, data: 0},
        7: {id: ItemID.wovenSilk, data: 0},
        8: {id: ItemID.wovenSilk, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.backpackDiggerT2,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: ItemID.wovenSilk, data: 0},
        1: {id: 264, data: 0},
        2: {id: ItemID.wovenSilk, data: 0},
        3: {id: ItemID.wovenSilk, data: 0},
        4: {id: ItemID.backpackForester, data: 0},
        5: {id: ItemID.wovenSilk, data: 0},
        6: {id: ItemID.wovenSilk, data: 0},
        7: {id: ItemID.wovenSilk, data: 0},
        8: {id: ItemID.wovenSilk, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.backpackForesterT2,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: ItemID.wovenSilk, data: 0},
        1: {id: 264, data: 0},
        2: {id: ItemID.wovenSilk, data: 0},
        3: {id: ItemID.wovenSilk, data: 0},
        4: {id: ItemID.backpackHunter, data: 0},
        5: {id: ItemID.wovenSilk, data: 0},
        6: {id: ItemID.wovenSilk, data: 0},
        7: {id: ItemID.wovenSilk, data: 0},
        8: {id: ItemID.wovenSilk, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.backpackHunterT2,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: 3, data: 0}, 1: {id: 3, data: 0}, 2: {id: 3, data: 0},
        3: {id: 3, data: 0}, 4: {id: ItemID.mulch, data: 0}, 5: {id: 3, data: 0},
        6: {id: 3, data: 0}, 7: {id: 3, data: 0}, 8: {id: 3, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: BlockID.humus,
        count: 9,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        1: {id: ItemID.woodPulp, data: 0},
        3: {id: ItemID.woodPulp, data: 0},
        5: {id: ItemID.woodPulp, data: 0},
        7: {id: ItemID.woodPulp, data: 0}
    },
    liquid: "water",
    liquidAmount: 1,
    result: {
        id: ItemID.carton,
        count: 2,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: ItemID.ingotBronze, data: 0},
        1: {id: ItemID.ingotBronze, data: 0},
        2: {id: ItemID.ingotBronze, data: 0},
        4: {id: 280, data: 0},
        7: {id: 280, data: 0}
    },
    special: {
        id: ItemID.carton,
        data: 0,
        dec: true
    },
    result: {
        id: ItemID.kitPickaxe,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        1: {id: ItemID.royalJelly, data: 0},
        3: {id: 5, data: 0},
        4: {id: 5, data: 0},
        5: {id: 5, data: 0},
        6: {id: ItemID.beeswax, data: 0},
        7: {id: ItemID.pollen1, data: 0},
        8: {id: ItemID.beeswax, data: 0}
    },
    liquid: "honey",
    liquidAmount: 0.5,
    result: {
        id: ItemID.scentedPaneling,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {1: {id: ItemID.ingotBronze, data: 0}, 4: {id: 280, data: 0}, 7: {id: 280, data: 0}},
    special: {
        id: ItemID.carton,
        data: 0,
        dec: true
    },
    result: {
        id: ItemID.kitShovel,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        1: {id: ItemID.pulsatingMesh, data: 0},
        3: {id: ItemID.pulsatingMesh, data: 0},
        4: {id: ItemID.pulsatingMesh, data: 0},
        5: {id: ItemID.pulsatingMesh, data: 0},
        7: {id: ItemID.pulsatingMesh, data: 0}
    },
    result: {
        id: 368,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: 264, data: 0},
        2: {id: 264, data: 0},
        4: {id: ItemID.sturdyMachine, data: 0},
        6: {id: 264, data: 0},
        8: {id: 264, data: 0}
    },
    liquid: "water",
    liquidAmount: 5,
    result: {
        id: ItemID.hardenedMachine,
        count: 1,
        data: 0
    }
});