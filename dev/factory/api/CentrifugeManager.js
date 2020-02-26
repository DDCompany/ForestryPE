const CentrifugeManager = {
    recipes: [],

    registerRecipe: function (recipe) {
        let input = recipe.input;
        let result = recipe.result;

        if (!input) {
            summonException("Result is not correct! (Centrifuge Recipe Registration)");
            return;
        }

        if (!result) {
            summonException("Input is not correct! (Centrifuge Recipe Registration)");
            return;
        }

        input.data = input.data || 0;

        for (let i in result) {
            let item = result[i];
            item.data = item.data || 0;
        }

        this.recipes.push(recipe);
    },

    getRecipe: function (id, data) {
        return this.recipes
            .find(function (recipe) {
                const input = recipe.input;
                return input.id === id && input.data === data;
            });
    },

    getRecipeByIngredient: function (id, data) {
        data = data || 0;
        return this.recipes
            .find(function (recipe) {
                const input = recipe.input;
                return input.id === id && (input.data === -1 || data === -1 || input.data === data);
            });
    },

    getRecipesByResult: function (id, data) {
        data = data || 0;
        return this.recipes
            .filter(function (recipe) {
                return recipe.result
                    .find(function (result) {
                        return result.id === id && (result.data === -1 || data === -1 || result.data === data);
                    }) !== undefined;
            });
    },

    integrateWithRecipeViewer: function (api) {
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

        api.registerRecipeType("fpe_centrifuge", {
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
    }
};