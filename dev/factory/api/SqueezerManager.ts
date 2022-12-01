interface SqueezerRecipe {
    input: RecipeItem[];

    special?: ChancedRecipeItem;

    liquid: string;

    liquidAmount: number;

    time: number;
}

type SqueezerRecipeTemplate = Omit<SqueezerRecipe, "time"> & {
    time?: number;
};

class SqueezerManager {
    static readonly recipes: SqueezerRecipe[] = [];

    static registerRecipe(recipe: SqueezerRecipeTemplate) {
        const input = recipe.input;
        if (!input) {
            summonException("Input is not correct! (Squeezer Recipe Registration)");
            return;
        }

        if (!recipe.liquid) {
            summonException("Liquid is not correct! (Squeezer Recipe Registration)");
            return;
        }

        if (!recipe.liquidAmount) {
            summonException("Amount of Liquid is not correct! (Squeezer Recipe Registration)");
            return;
        }

        for (const i in input) {
            const item = input[i];

            item.data = item.data || 0;
            item.count = item.count || 1;
        }

        this.recipes.push({
            ...recipe,
            time: recipe.time || 10,
        });
    }

    static getRecipesByInput(id: number, data: number = 0): SqueezerRecipe[] {
        const item = {id, data};
        return this.recipes.filter(recipe =>
            recipe.input.find(input => ContainerHelper.equals(input, item))
        );
    }

    static getRecipesBySpecial(id: number, data: number = 0): SqueezerRecipe[] {
        const item = {id, data};
        return this.recipes.filter(recipe => {
            const special = recipe.special;
            return special && ContainerHelper.equals(special, item);
        });
    }

    static getRecipesByLiquid(liquid: string): SqueezerRecipe[] {
        return this.recipes.filter(recipe => recipe.liquid === liquid)
    }

    static getRecipes(): SqueezerRecipe[] {
        return this.recipes;
    }

    static integrateWithRecipeViewer(api: RecipeViewerOld) {
        function bakeRecipes(recipes: SqueezerRecipe[]) {
            return recipes.map(recipe => {
                const output = [];
                if (recipe.special) {
                    const special = recipe.special;
                    output.push({id: special.id, data: special.data || 0, count: special.count || 1})
                }

                return {
                    input: recipe.input.map(item => ({id: item.id, data: item.data || 0, count: item.count || 1})),
                    output,
                    recipe
                };
            });
        }

        api.registerRecipeType("fpe_squeezer", {
            contents: {
                icon: BlockID.squeezer,
                drawing: [
                    {type: "bitmap", x: 500, y: 200, scale: 5, bitmap: "forestry.scales.furnace_full"},
                    {type: "bitmap", x: 625, y: 90, scale: 5, bitmap: "forestry.bgs.liquid_1"}
                ],
                elements: {
                    input0: {type: "slot", x: 210, y: 110, size: 90},
                    input1: {type: "slot", x: 300, y: 110, size: 90},
                    input2: {type: "slot", x: 390, y: 110, size: 90},
                    input3: {type: "slot", x: 210, y: 200, size: 90},
                    input4: {type: "slot", x: 300, y: 200, size: 90},
                    input5: {type: "slot", x: 390, y: 200, size: 90},
                    input6: {type: "slot", x: 210, y: 290, size: 90},
                    input7: {type: "slot", x: 300, y: 290, size: 90},
                    input8: {type: "slot", x: 390, y: 290, size: 90},
                    output0: {type: "slot", x: 505, y: 280, size: 90},
                    scaleLiquid: {
                        type: "scale",
                        x: 630,
                        y: 95,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                    textLiquid: {type: "text", x: 630, y: 25, font: {size: 30}, multiline: true},
                    textChance: {type: "text", x: 510, y: 380, font: {size: 30}, multiline: true}
                }
            },
            getList(id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.squeezer) {
                        return bakeRecipes(SqueezerManager.recipes);
                    } else return bakeRecipes(SqueezerManager.getRecipesByInput(id, data));
                } else {
                    let recipes = bakeRecipes(SqueezerManager.getRecipesBySpecial(id, data));
                    const empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                    if (empty)
                        recipes = recipes.concat(bakeRecipes(SqueezerManager.getRecipesByLiquid(empty.liquid)));

                    return recipes;
                }
            },

            onOpen(elements, data) {
                if (!data) return;

                const recipe = data.recipe;
                const scaleLiquid = elements.get("scaleLiquid");
                const textLiquid = elements.get("textLiquid");
                const textChance = elements.get("textChance");

                if (recipe.special) {
                    textChance.onBindingUpdated("text", recipe.special.chance * 100 + "%");
                } else {
                    textChance.onBindingUpdated("text", "");
                }

                if (recipe.liquid) {
                    scaleLiquid.onBindingUpdated("texture",
                        LiquidRegistry.getLiquidUITexture(recipe.liquid, 16, 58));
                    scaleLiquid.onBindingUpdated("value",
                        recipe.liquidAmount / 10);
                    textLiquid.onBindingUpdated("text",
                        LiquidRegistry.getLiquidName(recipe.liquid) + "\n" + (recipe.liquidAmount * 1000) + " mB");
                } else {
                    scaleLiquid.onBindingUpdated("texture", null);
                    scaleLiquid.onBindingUpdated("value", 0);
                    textLiquid.onBindingUpdated("text", "");
                }
            }
        });
    }
}