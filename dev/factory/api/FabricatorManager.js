const FabricatorManager = {
    recipes: [],
    smeltingList: {},

    registerRecipe: function (recipe) {
        if(!recipe.input) {
            summonException("Input is not correct! (Fabricator Recipe Registration)");
            return;
        }

        let result = recipe.result;
        if(!result || result.id <= 0) {
            summonException("Result is not correct! (Fabricator Recipe Registration)");
            return;
        }

        recipe.amount = recipe.amount || 0.5;

        this.recipes.push(recipe);
    },

    addSmelting: function (smelting) {
        let input = smelting.input;
        if(!input || input.id <= 0) {
            summonException("Input is not correct! (Fabricator Smelting Registration)");
            return;
        }

        if(!smelting.amount) {
            summonException("Amount of Liquid Glass is not correct! (Fabricator Smelting Registration)");
            return;
        }

        smelting.temperature = smelting.temperature || 0;
        input.data = input.data || 0;

        this.smeltingList[input.id + ":" + input.data] = smelting;
    },

    getSmelting: function(id, data) {
        return this.smeltingList[id + ":" + data];
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

            if (isOk)
                return recipe;
        }

        return null;
    }
};