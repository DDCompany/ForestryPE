const MoistenerManager = {
    fuels: {},
    recipes: {},

    registerFuel: function (fuel) {
        let inputItem = fuel.inputItem;
        let outputItem = fuel.outputItem;

        if(!inputItem || inputItem.id <= 0) {
            Logger.Log("[ForestryAPI] Input is not correct! (Moistener Fuel Registration)", "ERROR");
            return;
        }

        if(!outputItem || outputItem.id <= 0) {
            Logger.Log("[ForestryAPI] Output is not correct! (Moistener Fuel Registration)", "ERROR");
            return;
        }

        inputItem.data = inputItem.data || 0;
        outputItem.data = outputItem.data || 0;
        outputItem.count = 1;

        this.fuels[inputItem.id + ":" + inputItem.data] = fuel;
    },

    registerRecipe: function(recipe) {
        let inputItem = recipe.inputItem;
        let outputItem = recipe.outputItem;

        if(!inputItem || inputItem.id <= 0) {
            Logger.Log("[ForestryAPI] Input is not correct! (Moistener Recipe Registration)", "ERROR");
            return;
        }

        if(!outputItem || outputItem.id <= 0) {
            Logger.Log("[ForestryAPI] Output is not correct! (Moistener Recipe Registration)", "ERROR");
            return;
        }

        inputItem.data = inputItem.data || 0;
        outputItem.data = outputItem.data || 0;
        outputItem.count = 1;

        this.recipes[inputItem.id + ":" + inputItem.data] = recipe;
    },

    getFuelInfo: function (id, data) {
        data = data || 0;
        return this.fuels[id + ":" + data];
    },

    getRecipe: function (id, data) {
        data = data || 0;
        return this.recipes[id + ":" + data];
    }
};