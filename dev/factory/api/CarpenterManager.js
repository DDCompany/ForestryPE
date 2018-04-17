setLoadingTip("Factory Module Loading...");

const CarpenterManager = {
    recipes: [],

    registerRecipe: function (recipe) {
        this.recipes.push(recipe);
    },

    getRecipe: function (input) {
        for (let recipe in this.recipes) {
            let comp = 0;
            for (let i = 0; i < 9; i++) {
                let item = this.recipes[recipe].input["slot" + i];

                if ((!item && input["slot" + i].id === 0) || (item && item.id === 0 && input["slot" + i].id === 0)) {
                    comp++;
                } else if (item && input["slot" + i] && item.id === input["slot" + i].id && item.data === input["slot" + i].data) {
                    comp++;
                } else {
                    break;
                }
            }
            if (comp === 9) {
                return this.recipes[recipe];
            } else {
                comp = 0;
            }
        }
        return null;
    }

};