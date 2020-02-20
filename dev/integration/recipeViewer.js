ModAPI.addAPICallback("RecipeViewer", function (api) {
    const RecipeViewer = api.Core;

    function bakeCarpenterRecipes(recipes) {
        return recipes.map(function (recipe) {
            const result = recipe.result;
            const input = [];
            for (let i = 0; i < 9; i++) {
                let item = recipe.input[i];
                if (item)
                    input.push({id: item.id, data: item.data, count: 1});
                else input.push({id: 0, data: 0, count: 0})
            }

            if (recipe.special) {
                const special = recipe.special;
                input.push({id: special.id, data: special.data || 0, count: special.count || 1})
            }

            return {
                input: input,
                output: [{id: result.id, data: result.data || 0, count: result.count || 1}],
                liquid: recipe.liquid,
                liquidAmount: recipe.liquidAmount,
                energy: (recipe.time || 50) * 204
            };
        });
    }

    RecipeViewer.registerRecipeType("fpe_carpenter", {
        contents: {
            icon: BlockID.carpenter,
            drawing: [
                {type: "bitmap", x: 450, y: 100, scale: 5, bitmap: "forestry.for.recipeViewer.carpenter"}
            ],
            elements: {
                input0: {type: "slot", x: 170, y: 110, size: 90},
                input1: {type: "slot", x: 260, y: 110, size: 90},
                input2: {type: "slot", x: 350, y: 110, size: 90},
                input3: {type: "slot", x: 170, y: 200, size: 90},
                input4: {type: "slot", x: 260, y: 200, size: 90},
                input5: {type: "slot", x: 350, y: 200, size: 90},
                input6: {type: "slot", x: 170, y: 290, size: 90},
                input7: {type: "slot", x: 260, y: 290, size: 90},
                input8: {type: "slot", x: 350, y: 290, size: 90},
                input9: {type: "slot", x: 540, y: 110, size: 90},
                output0: {type: "slot", x: 530, y: 275, size: 80},
                scaleLiquid: {
                    type: "scale",
                    x: 730,
                    y: 105,
                    scale: 5,
                    direction: 1,
                    bitmap: "forestry.bgs.liquid_2",
                    overlay: "forestry.bgs.liquid_2"
                },
                textLiquid: {type: "text", x: 730, y: 30, font: {size: 30}, multiline: true}
            }
        },
        getList: function (id, data, isUsage) {
            if (isUsage) {
                if (id === BlockID.carpenter) {
                    return bakeCarpenterRecipes(CarpenterManager.recipes);
                } else return bakeCarpenterRecipes(CarpenterManager.getRecipesByIngredient(id, data));
            } else {
                return bakeCarpenterRecipes(CarpenterManager.getRecipesByResult(id, data));
            }
        },

        onOpen: function (elements, data) {
            if (!data) return;

            let scaleLiquid = elements.get("scaleLiquid");
            let textLiquid = elements.get("textLiquid");

            scaleLiquid.onBindingUpdated("texture",
                LiquidRegistry.getLiquidUITexture(data.liquid, 16, 58));
            scaleLiquid.onBindingUpdated("value",
                data.liquid ? data.liquidAmount / 10 : 0);
            textLiquid.onBindingUpdated("text",
                data.liquid ? LiquidRegistry.getLiquidName(data.liquid) + "\n" + (data.liquidAmount * 1000) + " mB" : "");
        }
    });

    RecipeViewer.registerRecipeType("fpe_fabricator", {
        contents: {
            icon: BlockID.fabricator,
            drawing: [
                {type: "bitmap", x: 140, y: 110, scale: 5, bitmap: "forestry.for.fabricator.bg"},
                {type: "bitmap", x: 315, y: 115, scale: 5, bitmap: "forestry.for.fabricator.scale"}
            ],
            elements: {
                slotGlass: {
                    type: "slot",
                    x: 170,
                    y: 135,
                    size: 80,
                    visual: true,
                    source: {id: 264, count: 1, data: 0}
                },
                scaleGlass: {
                    type: "scale",
                    x: 170,
                    y: 270,
                    scale: 5,
                    direction: 1,
                    bitmap: "forestry.liquids.glass_16x16"
                },
                input0: {type: "slot", x: 390, y: 110, size: 90},
                input1: {type: "slot", x: 480, y: 110, size: 90},
                input2: {type: "slot", x: 570, y: 110, size: 90},
                input3: {type: "slot", x: 390, y: 200, size: 90},
                input4: {type: "slot", x: 480, y: 200, size: 90},
                input5: {type: "slot", x: 570, y: 200, size: 90},
                input6: {type: "slot", x: 390, y: 290, size: 90},
                input7: {type: "slot", x: 480, y: 290, size: 90},
                input8: {type: "slot", x: 570, y: 290, size: 90},
                input9: {type: "slot", x: 790, y: 110, size: 90},
                output0: {type: "slot", x: 790, y: 290, size: 90},
            }
        },
        getList: function (id, data, isUsage) {
            if (isUsage)
                if (id === BlockID.fabricator) {
                    return bakeCarpenterRecipes(FabricatorManager.recipes);
                } else return bakeCarpenterRecipes(FabricatorManager.getRecipesByIngredient(id, data));
            else return bakeCarpenterRecipes(FabricatorManager.getRecipesByResult(id, data));
        },

        onOpen: function (elements, data) {
            const glass =
                FabricatorManager.smeltingList[Math.round(Math.random() * FabricatorManager.smeltingList.length)].input;
            let slotGlass = elements.get("slotGlass");
            slotGlass.onBindingUpdated("source", {id: glass.id, count: 1, data: glass.data});
        }
    });

    function bakeCentrifugeRecipes(recipes) {
        return recipes.map(function (recipe) {
            const input = recipe.input;
            return {
                input: [{id: input.id, data: input.data, count: 1}],
                output: recipe.result
                    .map(function (item) {
                        return {id: item.id, data: item.data || 0, count: item.count || 1};
                    })
            };
        });
    }

    RecipeViewer.registerRecipeType("fpe_centrifuge", {
        contents: {
            icon: BlockID.centrifuge,
            drawing: [
                {type: "bitmap", x: 240, y: 130, scale: 5, bitmap: "forestry.for.recipeViewer.centrifuge"},
                {type: "bitmap", x: 280, y: 220, scale: 5, bitmap: "forestry.for.centrifuge.scale"},
                {type: "bitmap", x: 400, y: 220, scale: 5, bitmap: "forestry.for.centrifuge.scale"},
            ],
            elements: {
                input0: {type: "slot", x: 310, y: 225, size: 80},
                output0: {type: "slot", x: 570, y: 130, size: 90},
                output1: {type: "slot", x: 660, y: 130, size: 90},
                output2: {type: "slot", x: 750, y: 130, size: 90},
                output3: {type: "slot", x: 570, y: 220, size: 90},
                output4: {type: "slot", x: 660, y: 220, size: 90},
                output5: {type: "slot", x: 750, y: 220, size: 90},
                output6: {type: "slot", x: 570, y: 310, size: 90},
                output7: {type: "slot", x: 660, y: 310, size: 90},
                output8: {type: "slot", x: 750, y: 310, size: 90}
            }
        },

        getList: function (id, data, isUsage) {
            if (isUsage) {
                if (id === BlockID.centrifuge) {
                    return bakeCentrifugeRecipes(CentrifugeManager.recipes);
                } else {
                    const recipe = CentrifugeManager.getRecipeByIngredient(id, data);
                    if (recipe)
                        return bakeCentrifugeRecipes([recipe]);

                    return [];
                }
            } else return bakeCentrifugeRecipes(CentrifugeManager.getRecipesByResult(id, data));
        }
    });

    function bakeBeeMutations(mutations) {
        if (!mutations)
            return [];

        return mutations.map(function (mutation) {
            const princessId = BeeRegistry.getPrincessByType(mutation.species1);
            const droneId = BeeRegistry.getDroneByType(mutation.species2);
            const resultId = BeeRegistry.getPrincessByType(mutation.result);

            return {
                input: [
                    {id: princessId, data: 0, count: 1},
                    {id: droneId, data: 0, count: 1}
                ],
                chance: mutation.chance * 100,
                output: [{id: resultId, data: 0, count: 1}]
            };
        });
    }

    RecipeViewer.registerRecipeType("fpe_bee_mutation", {
        contents: {
            icon: ItemID.queenMeadows,
            description: "Mutation",
            drawing: [
                {type: "bitmap", x: 300, y: 100, scale: 5, bitmap: "forestry.for.apiary.bg_left"},
                {type: "bitmap", x: 325, y: 130, scale: 5, bitmap: "forestry.for.apiary.scale_green"},
                {type: "bitmap", x: 500, y: 220, scale: 5, bitmap: "forestry.scales.furnace_empty"}
            ],
            elements: {
                input0: {type: "slot", x: 355, y: 125, size: 110, bitmap: "_default_slot_empty", needClean: true},
                input1: {type: "slot", x: 355, y: 255, size: 110, bitmap: "_default_slot_empty", needClean: true},
                output0: {type: "slot", x: 620, y: 200, size: 120},
                textChance: {type: "text", x: 620, y: 330, font: {size: 30}},
            }
        },
        getList: function (id, data, isUsage) {
            const species = BeeRegistry.getSpeciesByID(id);
            if (!species)
                return [];

            if (isUsage) {
                return bakeBeeMutations(BeeRegistry.getMutations(species));
            } else return bakeBeeMutations(BeeRegistry.getMutationsByResult(species));
        },
        onOpen: function (elements, data) {
            elements.get("textChance")
                .onBindingUpdated("text", data ? "Chance: " + data.chance + "%" : "%");
        }
    });

    RecipeViewer.registerRecipeType("fpe_bee_product", {
        contents: {
            icon: ItemID.queenForest,
            description: "Product",
            drawing: [
                {type: "bitmap", x: 500, y: 100, scale: 4, bitmap: "forestry.for.recipeViewer.bee_produce"},
                {type: "bitmap", x: 380, y: 230, scale: 4, bitmap: "forestry.scales.furnace_empty"}
            ],
            elements: {
                input0: {type: "slot", x: 240, y: 200, size: 120},
                output0: {type: "slot", x: 603, y: 119, size: 90, bitmap: "_default_slot_empty", needClean: true},
                output1: {type: "slot", x: 519, y: 171, size: 90, bitmap: "_default_slot_empty", needClean: true},
                output2: {type: "slot", x: 691, y: 171, size: 90, bitmap: "_default_slot_empty", needClean: true},
                output3: {type: "slot", x: 603, y: 223, size: 90, bitmap: "_default_slot_empty", needClean: true},
                output4: {type: "slot", x: 519, y: 275, size: 90, bitmap: "_default_slot_empty", needClean: true},
                output5: {type: "slot", x: 603, y: 327, size: 90, bitmap: "_default_slot_empty", needClean: true},
                output6: {type: "slot", x: 691, y: 275, size: 90, bitmap: "_default_slot_empty", needClean: true}
            }
        },
        getList: function (id, data, isUsage) {
            if (isUsage) {
                let beeType = BeeRegistry.getBeeByType(BeeRegistry.getSpeciesByID(id));
                return beeType ? [{
                    input: [{id: beeType.queenID, data: 0, count: 1}],
                    output: beeType.produce
                        .map(function (item) {
                            return {
                                id: item[0],
                                data: item[1],
                                count: 1
                            };
                        })
                }] : [];
            } else {
                let recipes = [];
                for (let i in BeeRegistry.bees) {
                    let beeType = BeeRegistry.bees[i];
                    let produce = beeType.produce;
                    let isOk = produce.find(function (item) {
                        return item[0] === id && (data === -1 || item[1] === data);
                    }) !== undefined;

                    if (isOk) {
                        recipes.push({
                            input: [{id: beeType.queenID, data: 0, count: 1}],
                            output: produce
                                .map(function (item) {
                                    return {
                                        id: item[0],
                                        data: item[1],
                                        count: 1
                                    };
                                })
                        });
                    }
                }

                return recipes;
            }
        }
    });

    log("Recipe Viewer Integration Activated", "INFO");
});