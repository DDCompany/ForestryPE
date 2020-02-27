const FabricatorManager = {
    recipes: [],
    smeltingList: [],

    registerRecipe: function (recipe) {
        if (!recipe.input) {
            summonException("Input is not correct! (Fabricator Recipe Registration)");
            return;
        }

        let result = recipe.result;
        if (!result || result.id <= 0) {
            summonException("Result is not correct! (Fabricator Recipe Registration)");
            return;
        }

        recipe.amount = recipe.amount || 0.5;

        this.recipes.push(recipe);
    },

    addSmelting: function (smelting) {
        let input = smelting.input;
        if (!input || input.id <= 0) {
            summonException("Input is not correct! (Fabricator Smelting Registration)");
            return;
        }

        if (!smelting.amount) {
            summonException("Amount of Liquid Glass is not correct! (Fabricator Smelting Registration)");
            return;
        }

        smelting.temperature = smelting.temperature || 0;
        input.data = input.data || 0;

        this.smeltingList.push(smelting);
    },

    getSmelting: function (id, data) {
        let item = {id: id, data: data || 0};
        return this.smeltingList
            .find(function (smelting) {
                return ContainerHelper.equals(smelting, item);
            });
    },

    getRecipe: function (pattern) {
        return this.recipes
            .find(function (recipe) {
                for (let i = 0; i < 9; i++) {
                    let recipePattern = recipe.input[i];
                    let input = pattern[i];

                    if (!ContainerHelper.equals(recipePattern, input))
                        return false;
                }

                return true;
            });
    },

    getRecipesByIngredient: function (id, data) {
        let ingredient = {id: id, data: data || 0};
        return this.recipes
            .filter(function (recipe) {
                const input = recipe.input;
                for (let key in input) {
                    let item = input[key];
                    if (ContainerHelper.equals(ingredient, item))
                        return true;
                }

                return false;
            })
    },

    getRecipesByResult: function (id, data) {
        let item = {id: id, data: data || 0};
        return this.recipes
            .filter(function (recipe) {
                return ContainerHelper.equals(item, recipe.result);
            });
    }
};