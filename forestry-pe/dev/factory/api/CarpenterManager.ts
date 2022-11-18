setLoadingTip("Factory Module Loading...");

interface CarpenterRecipe {
    input: Record<number, SingleRecipeItem>;

    special?: { id: number, data: number, count?: number, dec: boolean };

    liquid?: string;

    liquidAmount?: number;

    result: RecipeItem;

    time?: number;
}

class CarpenterManager {
    static readonly recipes: CarpenterRecipe[] = [];

    static registerRecipe(recipe: CarpenterRecipe) {
        const input = recipe.input;
        if (!input) {
            summonException("Input is not correct! (Carpenter Recipe Registration)");
            return;
        }

        const result = recipe.result;
        if (!result || result.id <= 0) {
            summonException("Result is not correct! (Carpenter Recipe Registration)");
            return;
        }

        this.recipes.push(recipe);
    }

    static getRecipe(pattern: ItemInstance[]): CarpenterRecipe | undefined {
        return this.recipes.find(recipe => {
            for (let k = 0; k < 9; k++) {
                const recipePattern = recipe.input[k] || {id: 0, data: 0};
                const input = pattern[k] || {id: 0, data: 0};

                if (!ContainerHelper.equals(recipePattern, input))
                    return false;
            }

            return true;
        });
    }

    static getRecipesByIngredient(id: number, data: number = 0): CarpenterRecipe[] {
        const ingredient = {id, data};
        return this.recipes.filter(recipe => {
            const input = recipe.input;
            for (const key in input) {
                const item = input[key];
                if (ContainerHelper.equals(item, ingredient))
                    return true;
            }

            return false;
        });
    }

    static getRecipesByLiquid(liquid: string): CarpenterRecipe[] {
        return this.recipes.filter(recipe => recipe.liquid === liquid)
    }

    static getRecipesByResult(id: number, data: number = 0): CarpenterRecipe[] {
        const item = {id, data};
        return this.recipes.filter(recipe => ContainerHelper.equals(item, recipe.result));
    }

    static integrateWithRecipeViewer(api: RecipeViewerOld) {
        function bakeCarpenterRecipes(recipes: any[]) {
            return recipes.map(recipe => {
                const result = recipe.result;
                const input = [];
                for (let i = 0; i < 9; i++) {
                    const item = recipe.input[i];
                    if (item)
                        input.push({id: item.id, data: item.data || 0, count: 1});
                    else input.push({id: 0, data: 0, count: 0})
                }

                if (recipe.special) {
                    const special = recipe.special;
                    input.push({id: special.id, data: special.data || 0, count: special.count || 1})
                }

                return {
                    input,
                    output: [{id: result.id, data: result.data || 0, count: result.count || 1}],
                    liquid: recipe.liquid,
                    liquidAmount: recipe.liquidAmount,
                    energy: (recipe.time || 50) * 204
                };
            });
        }

        api.registerRecipeType("fpe_carpenter", {
            contents: {
                icon: BlockID.carpenter,
                drawing: [
                    {type: "bitmap", x: 450, y: 100, scale: 5, bitmap: "forestry.for.recipeViewer.carpenter"}
                ],
                elements: {
                    input0: {type: "slot", x: 170, y: 110, size: 90},
                    input1: {type: "slot", x: 260, y: 110, size: 90},
                    input2: {type: "slot", x: 350, y: 110, size: 90},
                    input3: {type: "slot", x: 170, y: 200, size: 90},
                    input4: {type: "slot", x: 260, y: 200, size: 90},
                    input5: {type: "slot", x: 350, y: 200, size: 90},
                    input6: {type: "slot", x: 170, y: 290, size: 90},
                    input7: {type: "slot", x: 260, y: 290, size: 90},
                    input8: {type: "slot", x: 350, y: 290, size: 90},
                    input9: {type: "slot", x: 540, y: 110, size: 90},
                    output0: {type: "slot", x: 530, y: 275, size: 80},
                    scaleLiquid: {
                        type: "scale",
                        x: 730,
                        y: 105,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.bgs.liquid_2",
                        overlay: "forestry.bgs.liquid_2"
                    },
                    textLiquid: {type: "text", x: 730, y: 30, font: {size: 30}, multiline: true}
                }
            },
            getList(id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.carpenter) {
                        return bakeCarpenterRecipes(CarpenterManager.recipes);
                    } else {
                        let recipes = bakeCarpenterRecipes(CarpenterManager.getRecipesByIngredient(id, data));
                        const empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                        if (empty)
                            recipes = recipes.concat(bakeCarpenterRecipes(CarpenterManager.getRecipesByLiquid(empty.liquid)));

                        return recipes;
                    }
                } else {
                    return bakeCarpenterRecipes(CarpenterManager.getRecipesByResult(id, data));
                }
            },

            onOpen(elements, data) {
                if (!data) return;

                const scaleLiquid = elements.get("scaleLiquid");
                const textLiquid = elements.get("textLiquid");

                scaleLiquid.onBindingUpdated("texture",
                    LiquidRegistry.getLiquidUITexture(data.liquid, 16, 58));
                scaleLiquid.onBindingUpdated("value",
                    data.liquid ? data.liquidAmount / 10 : 0);
                textLiquid.onBindingUpdated("text",
                    data.liquid ? LiquidRegistry.getLiquidName(data.liquid) + "\n" + (data.liquidAmount * 1000) + " mB" : "");
            }
        });

        api.registerRecipeType("fpe_fabricator", {
            contents: {
                icon: BlockID.fabricator,
                drawing: [
                    {type: "bitmap", x: 140, y: 110, scale: 5, bitmap: "forestry.for.fabricator.bg"},
                    {type: "bitmap", x: 315, y: 115, scale: 5, bitmap: "forestry.for.fabricator.scale"}
                ],
                elements: {
                    slotGlass: {
                        type: "slot",
                        x: 170,
                        y: 135,
                        size: 80,
                        visual: true,
                        source: {id: 264, count: 1, data: 0}
                    },
                    scaleGlass: {
                        type: "scale",
                        x: 170,
                        y: 270,
                        scale: 5,
                        direction: 1,
                        bitmap: "forestry.liquids.glass_16x16"
                    },
                    input0: {type: "slot", x: 390, y: 110, size: 90},
                    input1: {type: "slot", x: 480, y: 110, size: 90},
                    input2: {type: "slot", x: 570, y: 110, size: 90},
                    input3: {type: "slot", x: 390, y: 200, size: 90},
                    input4: {type: "slot", x: 480, y: 200, size: 90},
                    input5: {type: "slot", x: 570, y: 200, size: 90},
                    input6: {type: "slot", x: 390, y: 290, size: 90},
                    input7: {type: "slot", x: 480, y: 290, size: 90},
                    input8: {type: "slot", x: 570, y: 290, size: 90},
                    input9: {type: "slot", x: 790, y: 110, size: 90},
                    output0: {type: "slot", x: 790, y: 290, size: 90},
                }
            },
            getList(id, data, isUsage) {
                if (isUsage)
                    if (id === BlockID.fabricator) {
                        return bakeCarpenterRecipes(FabricatorManager.recipes);
                    } else return bakeCarpenterRecipes(FabricatorManager.getRecipesByIngredient(id, data));
                else return bakeCarpenterRecipes(FabricatorManager.getRecipesByResult(id, data));
            },

            onOpen(elements) {
                const glass =
                    FabricatorManager.smeltingList[Math.round(Math.random() * FabricatorManager.smeltingList.length)].input;
                const slotGlass = elements.get("slotGlass");
                slotGlass.onBindingUpdated("source", {id: glass.id, count: 1, data: glass.data});
            }
        })
    }
}