const CentrifugeManager = {
    recipes: [],

    registerRecipe: function (recipe) {
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