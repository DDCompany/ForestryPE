interface BioGeneratorFuel {
    fluid: string;

    energy: number;

    ticks: number;
}

class BioGeneratorManager {
    static readonly fuel: BioGeneratorFuel[] = [];

    static addFuel(fluid: string, fuel: Omit<BioGeneratorFuel, "fluid">) {
        this.fuel.push({
            ...fuel,
            fluid
        });
    }

    static getFuel(fluid: string): BioGeneratorFuel | undefined {
        return this.fuel.find(fuel => fuel.fluid === fluid);
    }

    static integrateWithRecipeViewer(api: RecipeViewerOld) {
        function bakeFuelRecipes(list: BioGeneratorFuel[]) {
            return list.map(recipe => ({
                input: [],
                output: [],
                totalEnergy: recipe.ticks * recipe.energy,
                burnTime: recipe.ticks,
                fluid: recipe.fluid
            }));
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
            getList(id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.biogenerator)
                        return bakeFuelRecipes(BioGeneratorManager.fuel);
                    else {
                        const empty = LiquidRegistry.getEmptyItem(id, data === -1 ? 0 : data);
                        if (empty) {
                            const recipe = BioGeneratorManager.getFuel(empty.liquid);
                            if (recipe)
                                return bakeFuelRecipes([recipe]);
                        }
                    }
                }

                return [];
            },

            onOpen(elements, data) {
                const scaleFluid = elements.get("scaleFluid");

                elements.get("textTotalEnergy")
                    .onBindingUpdated("text", t("forestry.gui.total_energy", I18n.formatEnergy(data.totalEnergy)));

                elements.get("textBurnTime")
                    .onBindingUpdated("text", t("forestry.gui.burn_time", I18n.formatTicks(data.burnTime)));

                scaleFluid.onBindingUpdated("texture", LiquidRegistry.getLiquidUITexture(data.fluid, 16, 58));
                scaleFluid.onBindingUpdated("value", 1);
            }
        });
    }
}