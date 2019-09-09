const MoistenerManager = {
    fuels: {},
    recipes: {},

    registerFuel: function (fuel) {
        let inputItem = fuel.inputItem;
        let outputItem = fuel.outputItem;

        if(!inputItem || inputItem.id <= 0) {
            summonException("Input is not correct! (Moistener Fuel Registration)");
            return;
        }

        if(!outputItem || outputItem.id <= 0) {
            summonException("Output is not correct! (Moistener Fuel Registration)");
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
            summonException("Input is not correct! (Moistener Recipe Registration)");
            return;
        }

        if(!outputItem || outputItem.id <= 0) {
            summonException("Output is not correct! (Moistener Recipe Registration)");
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