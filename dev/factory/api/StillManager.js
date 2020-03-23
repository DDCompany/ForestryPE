const StillManager = {
    recipes: [],

    registerRecipe: function (recipe) {
        let inputLiquid = recipe.inputLiquid;

        if (!inputLiquid) {
            summonException("Input Liquid is not correct! (Still Recipe Registration)");
            return;
        }

        if (recipe.inputAmount <= 0) {
            summonException("Amount of input liquids is not correct! (Still Recipe Registration)");
            return;
        }

        if (!recipe.outputLiquid) {
            summonException("Output Liquid is not correct! (Still Recipe Registration)");
            return;
        }

        if (recipe.outputAmount <= 0) {
            summonException("Amount of output liquids is not correct! (Still Recipe Registration)");
            return;
        }

        if (!recipe.cycles) {
            summonException("'cycles' value is not correct! (Still Recipe Registration)");
            return;
        }

        this.recipes.push(recipe);
    },

    getRecipe: function (liquid) {
        return this.recipes.find(function (recipe) {
            return recipe.inputLiquid === liquid
        });
    },

    getRecipeByResult: function (liquid) {
        return this.recipes.find(function (recipe) {
            return recipe.outputLiquid === liquid
        });
    },

    integrateWithRecipeViewer: function (api) {
        function bakeRecipes(list) {
            return list.map(function (recipe) {
                return {
                    input: [],
                    output: [],
                    recipe: recipe
                };
            });
        }

        api.registerRecipeType("fpe_still", {
            contents: {
                icon: BlockID.still,
                drawing: [
                    {type: "bitmap", x: 260, y: 100, scale: 5, bitmap: "forestry.for.recipeViewer.still"},
                ],
                elements: {
                    textInputLiquid: {type: "text", x: 260, y: 30, font: {size: 30}, multiline: true},
                    scaleInputLiquid: {
                        type: "scale",
                        x: 265,
                        y: 105,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                    textResultLiquid: {type: "text", x: 715, y: 30, font: {size: 30}, multiline: true},
                    scaleResultLiquid: {
                        type: "scale",
                        x: 715,
                        y: 105,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.still) {
                        return bakeRecipes(StillManager.recipes);
                    } else {
                        let empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                        if (empty) {
                            let recipe = StillManager.getRecipe(empty.liquid);
                            if (recipe)
                                return bakeRecipes([recipe]);
                        }
                    }
                } else {
                    let empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                    if (empty) {
                        let recipe = StillManager.getRecipeByResult(empty.liquid);
                        if (recipe)
                            return bakeRecipes([recipe]);
                    }
                }

                return []
            },

            onOpen: function (elements, data) {
                if (!data) return;

                let scaleInputLiquid = elements.get("scaleInputLiquid");
                let scaleResultLiquid = elements.get("scaleResultLiquid");
                let recipe = data.recipe;

                scaleInputLiquid.onBindingUpdated("texture",
                    LiquidRegistry.getLiquidUITexture(recipe.inputLiquid, 16, 58));
                scaleInputLiquid.onBindingUpdated("value", recipe.inputAmount * recipe.cycles / 10);

                scaleResultLiquid.onBindingUpdated("texture",
                    LiquidRegistry.getLiquidUITexture(recipe.outputLiquid, 16, 58));
                scaleResultLiquid.onBindingUpdated("value", recipe.outputAmount * recipe.cycles / 10);

                elements.get("textInputLiquid").onBindingUpdated("text",
                    LiquidRegistry.getLiquidName(recipe.inputLiquid) + "\n" + recipe.inputAmount * recipe.cycles * 1000 + " mB");

                elements.get("textResultLiquid").onBindingUpdated("text",
                    LiquidRegistry.getLiquidName(recipe.outputLiquid) + "\n" + recipe.outputAmount * recipe.cycles * 1000 + " mB");
            }
        });
    }
};