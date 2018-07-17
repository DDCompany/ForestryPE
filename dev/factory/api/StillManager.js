const StillManager = {
    recipes: {},

    registerRecipe: function (recipe) {
        let inputLiquid = recipe.inputLiquid;

        if(!inputLiquid) {
            Logger.Log("[ForestryAPI] Input Liquid is not correct! (Still Recipe Registration)", "ERROR");
            return;
        }

        if(recipe.inputAmount <= 0) {
            Logger.Log("[ForestryAPI] Amount of input liquid is not correct! (Still Recipe Registration)", "ERROR");
            return;
        }

        if(!recipe.outputLiquid) {
            Logger.Log("[ForestryAPI] Output Liquid is not correct! (Still Recipe Registration)", "ERROR");
            return;
        }

        if(recipe.outputAmount <= 0) {
            Logger.Log("[ForestryAPI] Amount of output liquid is not correct! (Still Recipe Registration)", "ERROR");
            return;
        }

        if(!recipe.cycles) {
            Logger.Log("[ForestryAPI] Cycles value is not correct! (Still Recipe Registration)", "ERROR");
            return;
        }

        this.recipes[inputLiquid] = recipe;
    },

    getRecipe: function (inputLiquid) {
        return this.recipes[inputLiquid];
    }
};

StillManager.registerRecipe({
    inputLiquid: "biomass",
    inputAmount: 0.010,
    outputLiquid: "ethanol",
    outputAmount: 0.003,
    cycles: 100
});