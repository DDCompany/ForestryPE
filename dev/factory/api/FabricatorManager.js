const FabricatorManager = {
    recipes: [],
    smeltingList: {},

    registerRecipe: function (recipe) {
        recipe.amount = recipe.amount || 0.5;

        this.recipes.push(recipe);
    },

    addSmelting: function (smelting) {
        let input = smelting.input;
        if(!input)
            return;

        smelting.temperature = smelting.temperature || 0;

        this.smeltingList[input.id + ":" + (input.data || 0)] = smelting;
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
    }
};