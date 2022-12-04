{
    const vanillaWood = [
        {
            id: VanillaBlockID.log,
            variations: 4
        },
        {
            id: VanillaBlockID.log2,
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
                liquidAmount: 0.25,
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
                liquidAmount: 0.1,
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
        1: {id: VanillaBlockID.glass_pane, data: 0},
        2: {id: ItemID.ingotTin, data: 0},
        3: {id: ItemID.ingotTin, data: 0},
        4: {id: VanillaBlockID.glass_pane, data: 0},
        5: {id: ItemID.ingotTin, data: 0},
        6: {id: VanillaItemID.redstone, data: 0},
        7: {id: VanillaItemID.diamond, data: 0},
        8: {id: VanillaItemID.redstone, data: 0}
    },
    liquid: "water",
    liquidAmount: 2,
    result: {
        id: ItemID.analyzer,
        count: 1,
        data: 0
    }
});

CarpenterManager.registerRecipe({
    input: {
        0: {id: VanillaItemID.redstone, data: 0},
        2: {id: VanillaItemID.redstone, data: 0},
        3: {id: VanillaItemID.redstone, data: 0},
        4: {id: ItemID.ingotTin, data: 0},
        5: {id: VanillaItemID.redstone, data: 0},
        6: {id: VanillaItemID.redstone, data: 0},
        8: {id: VanillaItemID.redstone, data: 0},
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
        0: {id: VanillaItemID.redstone, data: 0},
        1: {id: ItemID.ingotBronze, data: 0},
        2: {id: VanillaItemID.redstone, data: 0},
        3: {id: VanillaItemID.redstone, data: 0},
        4: {id: ItemID.ingotBronze, data: 0},
        5: {id: VanillaItemID.redstone, data: 0},
        6: {id: VanillaItemID.redstone, data: 0},
        7: {id: ItemID.ingotBronze, data: 0}, 8: {id: VanillaItemID.redstone, data: 0},
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
        0: {id: VanillaItemID.redstone, data: 0},
        1: {id: VanillaItemID.iron_ingot, data: 0},
        2: {id: VanillaItemID.redstone, data: 0},
        3: {id: VanillaItemID.redstone, data: 0},
        4: {id: VanillaItemID.iron_ingot, data: 0},
        5: {id: VanillaItemID.redstone, data: 0},
        6: {id: VanillaItemID.redstone, data: 0},
        7: {id: VanillaItemID.iron_ingot, data: 0},
        8: {id: VanillaItemID.redstone, data: 0},
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
        0: {id: VanillaItemID.redstone, data: 0},
        1: {id: VanillaItemID.gold_ingot, data: 0},
        2: {id: VanillaItemID.redstone, data: 0},
        3: {id: VanillaItemID.redstone, data: 0},
        4: {id: VanillaItemID.gold_ingot, data: 0},
        5: {id: VanillaItemID.redstone, data: 0},
        6: {id: VanillaItemID.redstone, data: 0},
        7: {id: VanillaItemID.gold_ingot, data: 0},
        8: {id: VanillaItemID.redstone, data: 0},
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
        6: {id: VanillaItemID.gunpowder, data: 0},
        7: {id: ItemID.royalJelly, data: 0},
        8: {id: VanillaItemID.gunpowder, data: 0}
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
        6: {id: VanillaItemID.gunpowder, data: 0},
        7: {id: ItemID.pollen1, data: 0},
        8: {id: VanillaItemID.gunpowder, data: 0}
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
        0: {id: VanillaBlockID.dirt, data: 0},
        1: {id: VanillaBlockID.sand, data: 0},
        2: {id: VanillaBlockID.dirt, data: 0},
        3: {id: VanillaBlockID.sand, data: 0},
        4: {id: ItemID.mulch, data: 0},
        5: {id: VanillaBlockID.sand, data: 0},
        6: {id: VanillaBlockID.dirt, data: 0},
        7: {id: VanillaBlockID.sand, data: 0},
        8: {id: VanillaBlockID.dirt, data: 0},
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
        0: {id: VanillaBlockID.dirt, data: 0},
        1: {id: VanillaBlockID.dirt, data: 0},
        2: {id: VanillaBlockID.dirt, data: 0},
        3: {id: VanillaBlockID.dirt, data: 0},
        4: {id: ItemID.mulch, data: 0},
        5: {id: VanillaBlockID.dirt, data: 0},
        6: {id: VanillaBlockID.dirt, data: 0},
        7: {id: VanillaBlockID.dirt, data: 0},
        8: {id: VanillaBlockID.dirt, data: 0},
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
        4: {id: VanillaItemID.stick, data: 0},
        7: {id: VanillaItemID.stick, data: 0}
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
        3: {id: VanillaBlockID.planks, data: 0},
        4: {id: VanillaBlockID.planks, data: 0},
        5: {id: VanillaBlockID.planks, data: 0},
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
    input: {
        1: {id: ItemID.ingotBronze, data: 0},
        4: {id: VanillaItemID.stick, data: 0},
        7: {id: VanillaItemID.stick, data: 0},
    },
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
        0: {id: VanillaItemID.diamond, data: 0},
        2: {id: VanillaItemID.diamond, data: 0},
        4: {id: ItemID.sturdyMachine, data: 0},
        6: {id: VanillaItemID.diamond, data: 0},
        8: {id: VanillaItemID.diamond, data: 0},
    },
    liquid: "water",
    liquidAmount: 5,
    result: {
        id: ItemID.hardenedMachine,
        count: 1,
        data: 0
    }
});