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
    }
};