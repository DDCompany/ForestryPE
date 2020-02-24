const FermenterManager = {
    recipes: [],
    fuels: {},

    addRecipe: function (recipe) {
        if (recipe.id <= 0) {
            summonException("Id is not correct! (Fermenter Recipe Registration)");
            return;
        }

        if (!recipe.inputLiquid) {
            summonException("Input Liquid is not correct! (Fermenter Recipe Registration)");
            return;
        }

        if (!recipe.liquid) {
            summonException("Liquid is not correct! (Fermenter Recipe Registration)");
            return;
        }

        if (!recipe.liquidAmount) {
            summonException("Liquid Amount is not correct! (Fermenter Recipe Registration)");
            return;
        }

        recipe.data = recipe.data || 0;
        this.recipes.push(recipe);
    },

    addFuel: function (fuel) {
        if (fuel.id <= 0) {
            summonException("Id is not correct! (Fermenter Fuel Registration)");
            return;
        }

        if (fuel.perCycle <= 0) {
            summonException("'perCycle' value is not correct! (Fermenter Fuel Registration)");
            return;
        }

        if (fuel.cycles <= 0) {
            summonException("'cycles' is not correct! (Fermenter Fuel Registration)");
            return;
        }

        fuel.data = fuel.data || 0;

        this.fuels[fuel.id + ":" + fuel.data] = fuel;
    },

    getRecipe: function (id, data, inputLiquid) {
        data = data || 0;
        return this.recipes.find(function (recipe) {
            return recipe.id === id
                && (recipe.data === -1 || data === -1 || recipe.data === data)
                && inputLiquid === recipe.inputLiquid;
        });
    },

    getFuel: function (id, data) {
        data = data || 0;
        return this.fuels[id + ":" + data];
    }
};