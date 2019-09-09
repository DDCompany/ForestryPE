setLoadingTip("Factory Module Loading...");

const CarpenterManager = {
    recipes: [],

    registerRecipe: function (recipe) {
        if(!recipe.input) {
            summonException("Input is not correct! (Carpenter Recipe Registration)");
            return;
        }

        let result = recipe.result;
        if(!result || result.id <= 0) {
            summonException("Result is not correct! (Carpenter Recipe Registration)");
            return;
        }

        this.recipes.push(recipe);
    },

    getRecipe: function (pattern) {
        for (let i in this.recipes) {
            let recipe = this.recipes[i];
            let isOk = true;

            for (let i = 0; i < 9; i++) {
                let name = "slot" + i;
                let recipePattern = recipe.input[name];
                let input = pattern[name];

                if (!ContainerHelper.equals(recipePattern, input)) {
                    isOk = false;
                    break;
                }
            }

            if(isOk)
                return recipe;
        }

        return null;
    }
};