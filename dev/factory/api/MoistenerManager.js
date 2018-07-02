const MoistenerManager = {
    fuels: {},
    recipes: {},

    registerFuel: function (fuel) {
        let inputItem = fuel.inputItem;
        let outputItem = fuel.outputItem;

        if (!inputItem && !outputItem)
            return;

        inputItem.data = inputItem.data || 0;
        outputItem.data = outputItem.data || 0;
        outputItem.count = 1;

        this.fuels[inputItem.id + ":" + inputItem.data] = fuel;
    },

    registerRecipe: function(recipe) {
        let inputItem = recipe.inputItem;
        let outputItem = recipe.outputItem;

        if (!inputItem && !outputItem)
            return;

        inputItem.data = inputItem.data || 0;
        outputItem.data = outputItem.data || 0;
        outputItem.count = 1;

        this.recipes[inputItem.id + ":" + inputItem.data] = recipe;
    },

    getFuelInfo: function (id, data) {
        return this.fuels[id + ":" + data];
    },

    getRecipe: function (id, data) {
        return this.recipes[id + ":" + data];
    }
};