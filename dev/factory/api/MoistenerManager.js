const MoistenerManager = {
    fuels: [],
    recipes: [],

    registerFuel: function (fuel) {
        let inputItem = fuel.inputItem;
        let outputItem = fuel.outputItem;

        if (!inputItem || inputItem.id <= 0) {
            summonException("Input is not correct! (Moistener Fuel Registration)");
            return;
        }

        if (!outputItem || outputItem.id <= 0) {
            summonException("Output is not correct! (Moistener Fuel Registration)");
            return;
        }

        inputItem.data = inputItem.data || 0;
        outputItem.data = outputItem.data || 0;
        outputItem.count = 1;

        this.fuels.push(fuel);
    },

    registerRecipe: function (recipe) {
        let inputItem = recipe.inputItem;
        let outputItem = recipe.outputItem;

        if (!inputItem || inputItem.id <= 0) {
            summonException("Input is not correct! (Moistener Recipe Registration)");
            return;
        }

        if (!outputItem || outputItem.id <= 0) {
            summonException("Output is not correct! (Moistener Recipe Registration)");
            return;
        }

        inputItem.data = inputItem.data || 0;
        outputItem.data = outputItem.data || 0;
        outputItem.count = 1;

        this.recipes.push(recipe);
    },

    getFuelInfo: function (id, data) {
        data = data || 0;
        return this.fuels.find(function (obj) {
            let fuel = obj.inputItem;
            return fuel.id === id && (fuel.data === -1 || data === -1 || fuel.data === data);
        });
    },

    getFuelByResult: function (id, data) {
        data = data || 0;
        return this.fuels.find(function (obj) {
            let fuel = obj.outputItem;
            return fuel.id === id && (fuel.data === -1 || data === -1 || fuel.data === data);
        });
    },

    getRecipe: function (id, data) {
        data = data || 0;
        return this.recipes.find(function (obj) {
            let item = obj.inputItem;
            return item.id === id && (item.data === -1 || data === -1 || item.data === data);
        });
    },

    getRecipeByResult: function (id, data) {
        data = data || 0;
        return this.recipes.find(function (obj) {
            let item = obj.outputItem;
            return item.id === id && (item.data === -1 || data === -1 || item.data === data);
        });
    },

    integrateWithRecipeViewer: function (api) {
        function bakeRecipes(list) {
            return list.map(function (recipe) {
                try {
                    let input = recipe.inputItem;
                    let output = recipe.outputItem;
                    return {
                        input: [
                            {id: input.id, data: input.data, count: 1}
                        ],
                        output: [
                            {id: output.id, data: output.data, count: 1}
                        ]
                    };
                } catch (e) {
                    alert(e);
                }
            });
        }

        api.registerRecipeType("fpe_moistener_fuel", {
            contents: {
                icon: BlockID.moistener,
                description: "Fuel",
                drawing: [
                    {type: "bitmap", x: 470, y: 140, scale: 5, bitmap: "forestry.scales.furnace_full"},
                ],
                elements: {
                    input0: {type: "slot", x: 355, y: 125, size: 110, needClean: true},
                    output0: {type: "slot", x: 585, y: 125, size: 110, needClean: true}
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.moistener) {
                        return bakeRecipes(MoistenerManager.fuels);
                    } else {
                        let fuel = MoistenerManager.getFuelInfo(id, data);
                        if (fuel)
                            return bakeRecipes([fuel]);
                        else return [];
                    }
                } else {
                    let fuel = MoistenerManager.getFuelByResult(id, data);
                    if (fuel)
                        return bakeRecipes([fuel]);
                    else return [];
                }
            }
        });

        api.registerRecipeType("fpe_moistener", {
            contents: {
                icon: BlockID.moistener,
                drawing: [
                    {type: "bitmap", x: 470, y: 140, scale: 5, bitmap: "forestry.scales.furnace_full"},
                ],
                elements: {
                    input0: {type: "slot", x: 355, y: 125, size: 110, needClean: true},
                    output0: {type: "slot", x: 585, y: 125, size: 110, needClean: true}
                }
            },
            getList: function (id, data, isUsage) {
                try {
                    if (isUsage) {
                        if (id === BlockID.moistener) {
                            return bakeRecipes(MoistenerManager.recipes);
                        } else {
                            let fuel = MoistenerManager.getRecipe(id, data);
                            if (fuel)
                                return bakeRecipes([fuel]);
                            else return [];
                        }
                    } else {
                        let fuel = MoistenerManager.getRecipeByResult(id, data);
                        if (fuel)
                            return bakeRecipes([fuel]);
                        else return [];
                    }
                } catch (e) {
                    alert(e);
                }
            }
        });
    }
};