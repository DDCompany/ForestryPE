const StillManager = {
    recipes: {},

    registerRecipe: function (recipe) {
        let inputLiquid = recipe.inputLiquid;

        if(!inputLiquid) {
            Logger.Log("[ForestryAPI]Input liquid is not valid!", "ERROR");
            return;
        }

        if(!recipe.outputLiquid) {
            Logger.Log("[ForestryAPI]Output liquid is not valid!", "ERROR");
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