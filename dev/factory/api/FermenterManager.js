const FermenterManager = {
    recipes: {},
    fuels: {},

    addRecipe: function (recipe) {
        recipe.data = recipe.data || 0;
        this.recipes[recipe.id + ":" + recipe.data] = recipe;
    },

    addFuel: function (fuel) {
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