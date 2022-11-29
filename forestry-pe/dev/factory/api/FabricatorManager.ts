interface FabricatorRecipe {
    input: Record<number, SingleRecipeItem>;

    amount: number;

    result: RecipeItem;

    special?: { id: number, data?: number, dec?: boolean };
}

type FabricatorRecipeTemplate = Omit<FabricatorRecipe, "amount"> & {
    amount?: number;
};

interface FabricatorSmelting {
    input: SingleRecipeItem;

    amount: number;

    temperature: number;
}

type FabricatorSmeltingTemplate = Omit<FabricatorSmelting, "temperature"> & {
    temperature?: number;
};

class FabricatorManager {
    static readonly recipes: FabricatorRecipe[] = [];
    static readonly smeltingList: FabricatorSmelting[] = [];

    static registerRecipe(recipe: FabricatorRecipeTemplate) {
        if (!recipe.input) {
            summonException("Input is not correct! (Fabricator Recipe Registration)");
            return;
        }

        const result = recipe.result;
        if (!result || result.id <= 0) {
            summonException("Result is not correct! (Fabricator Recipe Registration)");
            return;
        }

        this.recipes.push({
            ...recipe,
            amount: recipe.amount || .5,
        });
    }

    static addSmelting(smelting: FabricatorSmeltingTemplate) {
        const input = smelting.input;
        if (!input || input.id <= 0) {
            summonException("Input is not correct! (Fabricator Smelting Registration)");
            return;
        }

        if (!smelting.amount) {
            summonException("Amount of Liquid Glass is not correct! (Fabricator Smelting Registration)");
            return;
        }

        smelting.temperature = smelting.temperature || 0;
        input.data = input.data || 0;

        this.smeltingList.push({
            ...smelting,
            temperature: smelting.temperature || 0,
        });
    }

    static getSmelting(id: number, data: number = 0): FabricatorSmelting | undefined {
        const item = {id, data};
        return this.smeltingList.find(smelting => ContainerHelper.equals(smelting.input, item));
    }

    static getRecipe(pattern: ItemInstance[]): FabricatorRecipe | undefined {
        return this.recipes.find(recipe => {
            for (let i = 0; i < 9; i++) {
                const recipePattern = recipe.input[i] || {id: 0, data: 0};
                const input = pattern[i] || {id: 0, data: 0};

                if (!ContainerHelper.equals(recipePattern, input))
                    return false;
            }

            return true;
        });
    }

    static getRecipesByIngredient(id: number, data: number = 0): FabricatorRecipe[] {
        const ingredient = {id, data};
        return this.recipes.filter(recipe => {
            const input = recipe.input;
            for (const key in input) {
                const item = input[key];
                if (ContainerHelper.equals(ingredient, item))
                    return true;
            }

            return false;
        })
    }

    static getRecipesByResult(id: number, data: number = 0): FabricatorRecipe[] {
        const item = {id, data};
        return this.recipes.filter(recipe => ContainerHelper.equals(item, recipe.result));
    }
}