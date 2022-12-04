const fermenterLiquids = {"appleJuice": 1.5, "honey": 1.5, "water": 1} as const;

interface FermenterRecipe {
    id: number;

    data?: number;

    inputLiquid: string;

    liquidAmount: number;

    modifier: number;

    liquid: string;
}

interface FermenterFuel {
    id: number;

    perCycle: number;

    cycles: number;

    data?: number;
}

class FermenterManager {
    static readonly recipes: FermenterRecipe[] = [];
    static readonly fuels: FermenterFuel[] = [];

    static addRecipe(recipe: FermenterRecipe) {
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
    }

    static addFuel(fuel: FermenterFuel) {
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
        this.fuels.push(fuel);
    }

    static getRecipe(id: number, data: number, inputLiquid: string): FermenterRecipe | undefined {
        const item = {id, data};
        return this.recipes.find(recipe =>
            ContainerHelper.equals(item, recipe) && inputLiquid === recipe.inputLiquid
        );
    }

    static getRecipeByItem(id: number, data: number = 0): FermenterRecipe | undefined {
        const item = {id, data};
        return this.recipes.find(recipe => ContainerHelper.equals(item, recipe));
    }

    static getRecipeByInputLiquid(liquid: string): FermenterRecipe[] {
        return this.recipes.filter(recipe => recipe.inputLiquid === liquid);
    }

    static getRecipeByResultLiquid(liquid: string): FermenterRecipe[] {
        return this.recipes.filter(recipe => recipe.liquid === liquid)
    }

    static getFuel(id: number, data: number = 0): FermenterFuel | undefined {
        const item = {id, data};
        return this.fuels.find(fuel => ContainerHelper.equals(item, fuel));
    }

    static integrateWithRecipeViewer(api: RecipeViewerOld) {
        function bakeFuelRecipes(list: FermenterFuel[]) {
            return list.map(recipe => ({
                input: [
                    {id: recipe.id, data: recipe.data || 0, count: 1}
                ],
                output: [],
                value: recipe.perCycle,
                cycles: recipe.cycles
            }));
        }

        function bakeRecipes(list: FermenterRecipe[]) {
            return list.map(recipe => ({
                input: [
                    {id: recipe.id, data: recipe.data || 0, count: 1}
                ],
                output: [],
                recipe
            }));
        }

        api.registerRecipeType("fpe_fermenter_fuel", {
            contents: {
                icon: BlockID.fermenter,
                description: "Fuel",
                drawing: [],
                elements: {
                    input0: {type: "slot", x: 355, y: 125, size: 110, needClean: true},
                    textValue: {type: "text", x: 485, y: 140, font: {size: 30}},
                    textCycles: {type: "text", x: 485, y: 185, font: {size: 30}},
                }
            },
            getList(id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.fermenter) {
                        return bakeFuelRecipes(FermenterManager.fuels);
                    } else {
                        const fuel = FermenterManager.getFuel(id, data);
                        if (fuel)
                            return bakeFuelRecipes([fuel]);
                        else return [];
                    }
                } else return [];
            },

            onOpen(elements, data) {
                elements.get("textValue")
                    .onBindingUpdated("text", data ? t("forestry.gui.fermenter.per_cycle", data.value) : "0");

                elements.get("textCycles")
                    .onBindingUpdated("text", data ? t("forestry.gui.fermenter.cycles", data.cycles) : "0");
            }
        });

        api.registerRecipeType("fpe_fermenter", {
            contents: {
                icon: BlockID.fermenter,
                drawing: [
                    {type: "bitmap", x: 300, y: 80, scale: 5, bitmap: "forestry.bgs.liquid_1"},
                    {type: "bitmap", x: 520, y: 200, scale: 5, bitmap: "forestry.scales.furnace_full"},
                    {type: "bitmap", x: 640, y: 80, scale: 5, bitmap: "forestry.bgs.liquid_1"},
                ],
                elements: {
                    input0: {type: "slot", x: 400, y: 180, size: 110, needClean: true},
                    textInputLiquid: {type: "text", x: 280, y: 10, font: {size: 30}, multiline: true},
                    scaleInputLiquid: {
                        type: "scale",
                        x: 305,
                        y: 85,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                    textResultLiquid: {type: "text", x: 620, y: 10, font: {size: 30}, multiline: true},
                    scaleResultLiquid: {
                        type: "scale",
                        x: 645,
                        y: 85,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                }
            },
            getList(id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.fermenter) {
                        return bakeRecipes(FermenterManager.recipes);
                    } else {
                        const fuel = FermenterManager.getRecipeByItem(id, data);
                        const empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                        let recipes: RecipePattern[] = [];
                        if (fuel)
                            recipes = bakeRecipes([fuel]);

                        if (empty)
                            recipes = recipes.concat(bakeRecipes(FermenterManager.getRecipeByInputLiquid(empty.liquid)));

                        return recipes;
                    }
                } else {
                    const empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                    if (empty)
                        return bakeRecipes(FermenterManager.getRecipeByResultLiquid(empty.liquid));

                    return [];
                }
            },

            onOpen(elements, data) {
                if (!data) return;

                const scaleInputLiquid = elements.get("scaleInputLiquid");
                const scaleResultLiquid = elements.get("scaleResultLiquid");
                const recipe = data.recipe;

                scaleInputLiquid.onBindingUpdated("texture",
                    LiquidRegistry.getLiquidUITexture(recipe.inputLiquid, 16, 58));
                scaleInputLiquid.onBindingUpdated("value", recipe.liquidAmount / 10);

                scaleResultLiquid.onBindingUpdated("texture",
                    LiquidRegistry.getLiquidUITexture(recipe.liquid, 16, 58));
                scaleResultLiquid.onBindingUpdated("value", recipe.liquidAmount / 10);

                elements.get("textInputLiquid").onBindingUpdated("text",
                    t(LiquidRegistry.getLiquidName(recipe.inputLiquid)) + "\n" + t("forestry.gui.modifier", recipe.modifier));

                elements.get("textResultLiquid").onBindingUpdated("text",
                    t(LiquidRegistry.getLiquidName(recipe.liquid)));
            }
        });
    }
}