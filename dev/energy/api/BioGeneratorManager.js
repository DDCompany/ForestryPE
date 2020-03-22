setLoadingTip("Energy Module Loading...");

const BioGeneratorManager = {
    fuel: [],

    addFuel: function (fluid, fuel) {
        fuel.fluid = fluid;
        this.fuel.push(fuel);
    },

    getFuel: function (fluid) {
        return this.fuel
            .find(function (fuel) {
                return fuel.fluid === fluid
            });
    },

    integrateWithRecipeViewer: function (api) {
        function bakeFuelRecipes(list) {
            return list.map(function (recipe) {
                return {
                    input: [],
                    output: [],
                    totalEnergy: recipe.ticks * recipe.energy,
                    burnTime: recipe.ticks,
                    fluid: recipe.fluid
                };
            });
        }

        api.registerRecipeType("fpe_bio_generator_fuel", {
            contents: {
                icon: BlockID.biogenerator,
                description: "Fuel",
                drawing: [
                    {
                        type: "bitmap",
                        x: 300,
                        y: 100,
                        scale: 5,
                        bitmap: "forestry.bgs.liquid_1"
                    }
                ],
                elements: {
                    scaleFluid: {
                        type: "scale",
                        x: 305,
                        y: 105,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                    textTotalEnergy: {type: "text", x: 435, y: 190, font: {size: 30}},
                    textBurnTime: {type: "text", x: 435, y: 235, font: {size: 30}},
                }
            },
            getList: function (id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.biogenerator)
                        return bakeFuelRecipes(BioGeneratorManager.fuel);
                    else {
                        let empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                        if (empty)
                            return bakeFuelRecipes([BioGeneratorManager.getFuel(empty.liquid)]);
                    }
                } else return [];
            },

            onOpen: function (elements, data) {
                let scaleFluid = elements.get("scaleFluid");

                elements.get("textTotalEnergy")
                    .onBindingUpdated("text", "Total Energy: " + data.totalEnergy);

                elements.get("textBurnTime")
                    .onBindingUpdated("text", "Burn Time: " + data.burnTime);

                scaleFluid.onBindingUpdated("texture", LiquidRegistry.getLiquidUITexture(data.fluid, 16, 58));
                scaleFluid.onBindingUpdated("value", 1);
            }
        });
    }
};