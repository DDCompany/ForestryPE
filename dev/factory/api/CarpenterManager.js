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

            for (let k = 0; k < 9; k++) {
                let recipePattern = recipe.input[k];
                let input = pattern[k];

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