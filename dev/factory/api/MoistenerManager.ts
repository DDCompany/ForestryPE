interface MoistenerFuel {
    inputItem: RecipeItem;

    outputItem: RecipeItem;

    time: number;
}

type MoistenerRecipe = MoistenerFuel;

class MoistenerManager {
    static readonly fuels: MoistenerFuel[] = [];
    static readonly recipes: MoistenerRecipe[] = [];

    static registerFuel(fuel: MoistenerFuel) {
        const inputItem = fuel.inputItem;
        const outputItem = fuel.outputItem;

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
    }

    static registerRecipe(recipe: MoistenerRecipe) {
        const inputItem = recipe.inputItem;
        const outputItem = recipe.outputItem;

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
    }

    static getFuelInfo(id: number, data: number = 0): MoistenerFuel | undefined {
        const item = {id, data};
        return this.fuels.find(fuel => ContainerHelper.equals(item, fuel.inputItem));
    }

    static getFuelByResult(id: number, data: number = 0): MoistenerFuel | undefined {
        const item = {id, data};
        return this.fuels.find(fuel => ContainerHelper.equals(item, fuel.outputItem));
    }

    static getRecipe(id: number, data: number = 0): MoistenerFuel | undefined {
        const item = {id, data};
        return this.recipes.find(recipe => ContainerHelper.equals(item, recipe.inputItem));
    }

    static getRecipeByResult(id: number, data: number = 0): MoistenerFuel | undefined {
        const item = {id, data};
        return this.recipes.find(recipe => ContainerHelper.equals(item, recipe.outputItem));
    }

    static integrateWithRecipeViewer(api: RecipeViewerOld) {
        function bakeRecipes(list: MoistenerRecipe[]) {
            return list.map(recipe => {
                const input = recipe.inputItem;
                const output = recipe.outputItem;
                return {
                    input: [{id: input.id, data: input.data || 0, count: 1}],
                    output: [{id: output.id, data: output.data || 0, count: 1}],
                };
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
            getList: (id, data, isUsage) => {
                const fuel = MoistenerManager.getFuelByResult(id, data);
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
            getList: (id, data, isUsage) => {
                const fuel = MoistenerManager.getRecipeByResult(id, data);
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
                    if (fuel)
                        return bakeRecipes([fuel]);
                    else return [];
                }
            }
        });
    }
}