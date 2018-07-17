const FermenterManager = {
    recipes: {},
    fuels: {},

    addRecipe: function (recipe) {
        if(recipe.id <= 0) {
            Logger.Log("[ForestryAPI] Id is not correct! (Fermenter Recipe Registration)", "ERROR");
            return;
        }

        if(!recipe.liquid) {
            Logger.Log("[ForestryAPI] Liquid is not correct! (Fermenter Recipe Registration)", "ERROR");
            return;
        }

        if(!recipe.liquidAmount) {
            Logger.Log("[ForestryAPI] Liquid Amount is not correct! (Fermenter Recipe Registration)", "ERROR");
            return;
        }

        recipe.data = recipe.data || 0;

        this.recipes[recipe.id + ":" + recipe.data] = recipe;
    },

    addFuel: function (fuel) {
        if(fuel.id <= 0) {
            Logger.Log("[ForestryAPI] Id is not correct! (Fermenter Fuel Registration)", "ERROR");
            return;
        }

        if(fuel.perCycle <= 0) {
            Logger.Log("[ForestryAPI] perCycle value is not correct! (Fermenter Fuel Registration)", "ERROR");
            return;
        }

        if(fuel.cycles <= 0) {
            Logger.Log("[ForestryAPI] cycles is not correct! (Fermenter Fuel Registration)", "ERROR");
            return;
        }

        fuel.data = fuel.data || 0;

        this.fuels[fuel.id + ":" + fuel.data] = fuel;
    },

    getRecipe: function (id, data) {
        data = data || 0;
        return this.recipes[id + ":" + data];
    },

    getFuel: function (id, data) {
        data = data || 0;
        return this.fuels[id + ":" + data];
    }
};