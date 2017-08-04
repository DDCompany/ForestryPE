var RecipeRegistry = {

    recipesCentrifuge: [],
    recipesCarpenter: [],
    recipesFabricator: [],
    bioItems: [],
    recipesSqueezer: [],

    registerSqueezerRecipe: function (recipe) {
        this.recipesSqueezer.push(recipe);
    },

    getSqueezerRecipe: function (input) {

        for (var i = 0; i < this.recipesSqueezer.length; i++) {

            if (input[0].id == this.recipesSqueezer[i].input0.id) {
                if (input[0].data == this.recipesSqueezer[i].input0.data) {
                    if (input[0].count >= this.recipesSqueezer[i].input0.count) {

                        if (input[1].id == this.recipesSqueezer[i].input1.id) {
                            if (input[1].data == this.recipesSqueezer[i].input1.data) {
                                if (input[1].count >= this.recipesSqueezer[i].input1.count) {

                                    return this.recipesSqueezer[i];

                                }
                            }
                        }

                    }
                }
            }

        }

    },

    addBioItem: function (arg) {
        this.bioItems[arg.id] = arg;
    },

    getBioItem: function (id) {
        return this.bioItems[id];
    },

    addFabricatorRecipe: function (recipe) {
        this.recipesFabricator.push(recipe);
    },

    getFabricatorRecipe: function (input) {
        for (var recipe in this.recipesFabricator) {
            var comp = 0;
            for (var i = 0; i < 9; i++) {
                var item = this.recipesFabricator[recipe].input["slot" + i];

                if ((!item && input["slot" + i].id === 0) || (item && item.id === 0 && input["slot" + i].id === 0)) {
                    comp++;
                } else if (item && input["slot" + i] && item.id === input["slot" + i].id && item.data === input["slot" + i].data) {
                    comp++;
                } else {
                    break;
                }
            }
            if (comp === 9) {
                return this.recipesFabricator[recipe];
            } else {
                comp = 0;
            }
        }
        return null;
    },

    addCarpenterRecipe: function (recipe) {
        this.recipesCarpenter.push(recipe);
    },

    getCarpenterRecipe: function (input) {
        for (var recipe in this.recipesCarpenter) {
            var comp = 0;
            for (var i = 0; i < 9; i++) {
                var item = this.recipesCarpenter[recipe].input["slot" + i];

                if ((!item && input["slot" + i].id === 0) || (item && item.id === 0 && input["slot" + i].id === 0)) {
                    comp++;
                } else if (item && input["slot" + i] && item.id === input["slot" + i].id && item.data === input["slot" + i].data) {
                    comp++;
                } else {
                    break;
                }
            }
            if (comp === 9) {
                return this.recipesCarpenter[recipe];
            } else {
                comp = 0;
            }
        }
        return null;
    },

    registerCentrifugeRecipe: function (recipe) {
        this.recipesCentrifuge.push(recipe);
    },

    getCentrifugeRecipe: function (id, data) {
        for (var key in this.recipesCentrifuge) {
            var recipe = this.recipesCentrifuge[key];
            if (recipe.input.id === id && recipe.input.data === data) {
                return recipe;
            }
        }
    },

};