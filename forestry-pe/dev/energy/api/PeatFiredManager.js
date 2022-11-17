const PeatFiredManager = {
    fuel: [],

    addFuel: function (id, energy, burnTime) {
        if (energy <= 0) {
            summonException("Energy must be > 0! (Peat Fired Fuel Registration)");
            return;
        }

        if (burnTime <= 0) {
            summonException("Burn time must be > 0! (Peat Fired Fuel Registration)");
            return;
        }

        this.fuel.push({
            id: id,
            energy: energy,
            burnTime: burnTime
        });
    },

    getFuel: function (id) {
        return this.fuel
            .find(function (recipe) {
                return recipe.id === id
            })
    },

    integrateWithRecipeViewer: function (api) {
        function bakeFuelRecipes(list) {
            return list.map(function (recipe) {
                return {
                    input: [
                        {id: recipe.id, data: 0, count: 1}
                    ],
                    output: [],
                    totalEnergy: recipe.burnTime * recipe.energy,
                    burnTime: recipe.burnTime
                };
            });
        }

        api.registerRecipeType("fpe_peat_engine_fuel", {
            contents: {
                icon: BlockID.enginePeat,
                description: "Fuel",
                drawing: [],
                elements: {
                    input0: {type: "slot", x: 295, y: 125, size: 110, needClean: true},
                    textTotalEnergy: {type: "text", x: 425, y: 140, font: {size: 30}},
                    textBurnTime: {type: "text", x: 425, y: 185, font: {size: 30}},
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.enginePeat) {
                        return bakeFuelRecipes(PeatFiredManager.fuel);
                    } else {
                        let fuel = PeatFiredManager.getFuel(id);
                        if (fuel)
                            return bakeFuelRecipes([fuel]);
                        else return [];
                    }
                } else return [];
            },

            onOpen: function (elements, data) {
                elements.get("textTotalEnergy")
                    .onBindingUpdated("text", "Total Energy: " + data.totalEnergy);

                elements.get("textBurnTime")
                    .onBindingUpdated("text", "Burn Time: " + data.burnTime);
            }
        });
    }
};