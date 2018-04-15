const SqueezerManager = {
    recipes: [],

    registerRecipe: function (recipe) {
        this.recipes.push(recipe);
    },

    getRecipe: function (input) {

        for (let i = 0; i < this.recipes.length; i++) {

            if (input[0].id === this.recipes[i].input0.id) {
                if (input[0].data === this.recipes[i].input0.data) {
                    if (input[0].count >= this.recipes[i].input0.count) {

                        if (input[1].id === this.recipes[i].input1.id) {
                            if (input[1].data === this.recipes[i].input1.data) {
                                if (input[1].count >= this.recipes[i].input1.count) {

                                    return this.recipes[i];

                                }
                            }
                        }

                    }
                }
            }

        }

    }

};