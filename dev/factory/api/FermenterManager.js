const FermenterManager = {
    recipes: [],
    fuels: [],

    addRecipe: function (recipe) {
        if (recipe.id <= 0) {
            summonException("Id is not correct! (Fermenter Recipe Registration)");
            return;
        }

        if (!recipe.inputLiquid) {
            summonException("Input Liquid is not correct! (Fermenter Recipe Registration)");
            return;
        }

        if (!recipe.liquid) {
            summonException("Liquid is not correct! (Fermenter Recipe Registration)");
            return;
        }

        if (!recipe.liquidAmount) {
            summonException("Liquid Amount is not correct! (Fermenter Recipe Registration)");
            return;
        }

        recipe.data = recipe.data || 0;
        this.recipes.push(recipe);
    },

    addFuel: function (fuel) {
        if (fuel.id <= 0) {
            summonException("Id is not correct! (Fermenter Fuel Registration)");
            return;
        }

        if (fuel.perCycle <= 0) {
            summonException("'perCycle' value is not correct! (Fermenter Fuel Registration)");
            return;
        }

        if (fuel.cycles <= 0) {
            summonException("'cycles' is not correct! (Fermenter Fuel Registration)");
            return;
        }

        fuel.data = fuel.data || 0;

        this.fuels.push(fuel);
    },

    getRecipe: function (id, data, inputLiquid) {
        let item = {id: id, data: data || 0};
        return this.recipes.find(function (recipe) {
            return ContainerHelper.equals(item, recipe) && inputLiquid === recipe.inputLiquid;
        });
    },

    getRecipeByItem: function (id, data) {
        let item = {id: id, data: data || 0};
        return this.recipes.find(function (recipe) {
            return ContainerHelper.equals(item, recipe)
        });
    },

    getRecipeByInputLiquid: function (liquid) {
        return this.recipes
            .filter(function (recipe) {
                return recipe.inputLiquid === liquid
            })
    },

    getRecipeByResultLiquid: function (liquid) {
        return this.recipes
            .filter(function (recipe) {
                return recipe.liquid === liquid
            })
    },

    getFuel: function (id, data) {
        let item = {id: id, data: data || 0};
        return this.fuels.find(function (fuel) {
            return ContainerHelper.equals(item, fuel);
        });
    },

    integrateWithRecipeViewer: function (api) {
        function bakeFuelRecipes(list) {
            return list.map(function (recipe) {
                return {
                    input: [
                        {id: recipe.id, data: recipe.data, count: 1}
                    ],
                    output: [],
                    value: recipe.perCycle,
                    cycles: recipe.cycles
                };
            });
        }

        function bakeRecipes(list) {
            return list.map(function (recipe) {
                return {
                    input: [
                        {id: recipe.id, data: recipe.data, count: 1}
                    ],
                    output: [],
                    recipe: recipe
                };
            });
        }

        api.registerRecipeType("fpe_fermenter_fuel", {
            contents: {
                icon: BlockID.fermenter,
                description: "Fuel",
                drawing: [],
                elements: {
                    input0: {type: "slot", x: 355, y: 125, size: 110, needClean: true},
                    textValue: {type: "text", x: 485, y: 140, font: {size: 30}},
                    textCycles: {type: "text", x: 485, y: 185, font: {size: 30}},
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.fermenter) {
                        return bakeFuelRecipes(FermenterManager.fuels);
                    } else {
                        let fuel = FermenterManager.getFuel(id, data);
                        if (fuel)
                            return bakeFuelRecipes([fuel]);
                        else return [];
                    }
                } else return [];
            },

            onOpen: function (elements, data) {
                elements.get("textValue")
                    .onBindingUpdated("text", data ? "Value: " + data.value : "0");

                elements.get("textCycles")
                    .onBindingUpdated("text", data ? "Cycles: " + data.cycles : "0");
            }
        });

        api.registerRecipeType("fpe_fermenter", {
            contents: {
                icon: BlockID.fermenter,
                drawing: [
                    {type: "bitmap", x: 300, y: 80, scale: 5, bitmap: "forestry.bgs.liquid_1"},
                    {type: "bitmap", x: 520, y: 200, scale: 5, bitmap: "forestry.scales.furnace_full"},
                    {type: "bitmap", x: 640, y: 80, scale: 5, bitmap: "forestry.bgs.liquid_1"},
                ],
                elements: {
                    input0: {type: "slot", x: 400, y: 180, size: 110, needClean: true},
                    textInputLiquid: {type: "text", x: 280, y: 10, font: {size: 30}, multiline: true},
                    scaleInputLiquid: {
                        type: "scale",
                        x: 305,
                        y: 85,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                    textResultLiquid: {type: "text", x: 620, y: 10, font: {size: 30}, multiline: true},
                    scaleResultLiquid: {
                        type: "scale",
                        x: 645,
                        y: 85,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.fermenter) {
                        return bakeRecipes(FermenterManager.recipes);
                    } else {
                        let fuel = FermenterManager.getRecipeByItem(id, data);
                        let empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                        let recipes = [];
                        if (fuel)
                            recipes = bakeRecipes([fuel]);

                        if (empty)
                            recipes = recipes.concat(bakeRecipes(FermenterManager.getRecipeByInputLiquid(empty.liquid)));

                        return recipes;
                    }
                } else {
                    let empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                    if (empty)
                        return bakeRecipes(FermenterManager.getRecipeByResultLiquid(empty.liquid));

                    return [];
                }
            },

            onOpen: function (elements, data) {
                if (!data) return;

                let scaleInputLiquid = elements.get("scaleInputLiquid");
                let scaleResultLiquid = elements.get("scaleResultLiquid");
                let recipe = data.recipe;

                scaleInputLiquid.onBindingUpdated("texture",
                    LiquidRegistry.getLiquidUITexture(recipe.inputLiquid, 16, 58));
                scaleInputLiquid.onBindingUpdated("value", recipe.liquidAmount / 10);

                scaleResultLiquid.onBindingUpdated("texture",
                    LiquidRegistry.getLiquidUITexture(recipe.liquid, 16, 58));
                scaleResultLiquid.onBindingUpdated("value", recipe.liquidAmount / 10);

                elements.get("textInputLiquid").onBindingUpdated("text",
                    LiquidRegistry.getLiquidName(recipe.inputLiquid) + "\n" + "Modifier: " + recipe.modifier + "x");

                elements.get("textResultLiquid").onBindingUpdated("text",
                    LiquidRegistry.getLiquidName(recipe.liquid));
            }
        });
    }
};