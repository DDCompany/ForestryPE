const SqueezerManager = {
    recipes: [],

    registerRecipe: function (recipe) {
        let input = recipe.input;

        if(!input)
            return;

        recipe.time = recipe.time || 10;

        for(let i in input) {
            let item = input[i];

            item.data = item.data || 0;
            item.count = item.count || 1;
        }

        this.recipes.push(recipe);
    },

    getRecipes: function () {
        return this.recipes;
    }

};