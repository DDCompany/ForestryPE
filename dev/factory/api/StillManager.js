const StillManager = {
    recipes: {},

    registerRecipe: function (recipe) {
        let inputLiquid = recipe.inputLiquid;

        if(!inputLiquid) {
            summonException("Input Liquid is not correct! (Still Recipe Registration)");
            return;
        }

        if(recipe.inputAmount <= 0) {
            summonException("Amount of input liquids is not correct! (Still Recipe Registration)");
            return;
        }

        if(!recipe.outputLiquid) {
            summonException("Output Liquid is not correct! (Still Recipe Registration)");
            return;
        }

        if(recipe.outputAmount <= 0) {
            summonException("Amount of output liquids is not correct! (Still Recipe Registration)");
            return;
        }

        if(!recipe.cycles) {
            summonException("'cycles' value is not correct! (Still Recipe Registration)");
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