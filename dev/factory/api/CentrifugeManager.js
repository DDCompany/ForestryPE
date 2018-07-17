const CentrifugeManager = {
    recipes: [],

    registerRecipe: function (recipe) {
        let input = recipe.input;
        let result = recipe.result;

        if(!input) {
            Logger.Log("[ForestryAPI] Result is not correct! (Centrifuge Recipe Registration)", "ERROR");
            return;
        }

        if(!result) {
            Logger.Log("[ForestryAPI] Input is not correct! (Centrifuge Recipe Registration)", "ERROR");
            return;
        }

        input.data = input.data || 0;

        for(let i in result) {
            let item = result[i];
            item.data = item.data || 0;
        }

        this.recipes.push(recipe);
    },

    getRecipe: function (id, data) {
        for (let key in this.recipes) {
            let recipe = this.recipes[key];
            if (recipe.input.id === id && recipe.input.data === data) {
                return recipe;
            }
        }
    }
};