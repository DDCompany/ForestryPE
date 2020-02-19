setLoadingTip("Factory Module Loading...");

const CarpenterManager = {
    recipes: [],

    registerRecipe: function (recipe) {
        let input = recipe.input;
        if (!input) {
            summonException("Input is not correct! (Carpenter Recipe Registration)");
            return;
        }

        let result = recipe.result;
        if (!result || result.id <= 0) {
            summonException("Result is not correct! (Carpenter Recipe Registration)");
            return;
        }

        this.recipes.push(recipe);
    },

    getRecipe: function (pattern) {
        return this.recipes
            .find(function (recipe) {
                for (let k = 0; k < 9; k++) {
                    let recipePattern = recipe.input[k];
                    let input = pattern[k];

                    if (!ContainerHelper.equals(recipePattern, input))
                        return false;
                }

                return true;
            });
    },

    getRecipesByIngredient: function (id, data) {
        data = data || 0;
        return this.recipes
            .filter(function (recipe) {
                const input = recipe.input;
                for (let key in input) {
                    let item = input[key];
                    if (item.id === id && (item.data === -1 || data === -1 || item.data === data))
                        return true;
                }

                return false;
            })
    },

    getRecipesByResult: function (id, data) {
        data = data || 0;
        return this.recipes
            .filter(function (recipe) {
                const result = recipe.result;
                return result.id === id && (result.data === -1 || data === -1 || result.data === data);
            });
    }
};