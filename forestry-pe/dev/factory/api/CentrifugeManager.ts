interface CentrifugeRecipe {
    input: SingleRecipeItem;

    result: ChancedRecipeItem[];

    time?: number;
}

class CentrifugeManager {
    static readonly recipes: CentrifugeRecipe[] = [];

    static registerRecipe(recipe: CentrifugeRecipe) {
        const input = recipe.input;
        const result = recipe.result;

        if (!input) {
            summonException("Result is not correct! (Centrifuge Recipe Registration)");
            return;
        }

        if (!result) {
            summonException("Input is not correct! (Centrifuge Recipe Registration)");
            return;
        }

        input.data = input.data || 0;

        for (const i in result) {
            const item = result[i];
            item.data = item.data || 0;
        }

        this.recipes.push(recipe);
    }

    static getRecipe(id: number, data: number = 0): CentrifugeRecipe | undefined {
        const item = {id, data};
        return this.recipes.find(recipe => ContainerHelper.equals(item, recipe.input));
    }

    static getRecipeByIngredient(id: number, data: number = 0): CentrifugeRecipe | undefined {
        const item = {id, data};
        return this.recipes.find(recipe => ContainerHelper.equals(item, recipe.input));
    }

    static getRecipesByResult(id: number, data: number = 0): CentrifugeRecipe[] {
        const item = {id, data};
        return this.recipes.filter(recipe =>
            recipe.result.find(result => ContainerHelper.equals(item, result)) !== undefined
        );
    }

    static integrateWithRecipeViewer(api: RecipeViewerOld) {
        function bakeCentrifugeRecipes(recipes: CentrifugeRecipe[]) {
            return recipes.map(recipe => {
                const input = recipe.input;
                return {
                    input: [{id: input.id, data: input.data || 0, count: 1}],
                    output: recipe.result.map(item => ({id: item.id, data: item.data || 0, count: item.count || 1}))
                };
            });
        }

        api.registerRecipeType("fpe_centrifuge", {
            contents: {
                icon: BlockID.centrifuge,
                drawing: [
                    {type: "bitmap", x: 240, y: 130, scale: 5, bitmap: "forestry.for.recipeViewer.centrifuge"},
                    {type: "bitmap", x: 280, y: 220, scale: 5, bitmap: "forestry.for.centrifuge.scale"},
                    {type: "bitmap", x: 400, y: 220, scale: 5, bitmap: "forestry.for.centrifuge.scale"},
                ],
                elements: {
                    input0: {type: "slot", x: 310, y: 225, size: 80},
                    output0: {type: "slot", x: 570, y: 130, size: 90},
                    output1: {type: "slot", x: 660, y: 130, size: 90},
                    output2: {type: "slot", x: 750, y: 130, size: 90},
                    output3: {type: "slot", x: 570, y: 220, size: 90},
                    output4: {type: "slot", x: 660, y: 220, size: 90},
                    output5: {type: "slot", x: 750, y: 220, size: 90},
                    output6: {type: "slot", x: 570, y: 310, size: 90},
                    output7: {type: "slot", x: 660, y: 310, size: 90},
                    output8: {type: "slot", x: 750, y: 310, size: 90}
                }
            },

            getList(id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.centrifuge) {
                        return bakeCentrifugeRecipes(CentrifugeManager.recipes);
                    } else {
                        const recipe = CentrifugeManager.getRecipeByIngredient(id, data);
                        if (recipe)
                            return bakeCentrifugeRecipes([recipe]);

                        return [];
                    }
                } else return bakeCentrifugeRecipes(CentrifugeManager.getRecipesByResult(id, data));
            }
        });
    }
}