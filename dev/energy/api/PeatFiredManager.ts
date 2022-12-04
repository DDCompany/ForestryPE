interface PeatFiredFuel {
    id: number;

    energy: number;

    burnTime: number;
}

class PeatFiredManager {
    static readonly fuel: PeatFiredFuel[] = [];

    static addFuel(id: number, energy: number, burnTime: number) {
        if (energy <= 0) {
            summonException("Energy must be > 0! (Peat Fired Fuel Registration)");
            return;
        }

        if (burnTime <= 0) {
            summonException("Burn time must be > 0! (Peat Fired Fuel Registration)");
            return;
        }

        this.fuel.push({
            id,
            energy,
            burnTime
        });
    }

    static getFuel(id: number) {
        return this.fuel.find(recipe => recipe.id === id);
    }

    static integrateWithRecipeViewer(api: RecipeViewerOld) {
        function bakeFuelRecipes(list: PeatFiredFuel[]) {
            return list.map(recipe => ({
                input: [
                    {id: recipe.id, data: 0, count: 1}
                ],
                output: [],
                totalEnergy: recipe.burnTime * recipe.energy,
                burnTime: recipe.burnTime
            }));
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
            getList(id, data, isUsage) {
                if (isUsage) {
                    if (id === BlockID.enginePeat) {
                        return bakeFuelRecipes(PeatFiredManager.fuel);
                    } else {
                        const fuel = PeatFiredManager.getFuel(id);
                        if (fuel)
                            return bakeFuelRecipes([fuel]);
                        else return [];
                    }
                } else return [];
            },

            onOpen(elements, data) {
                elements.get("textTotalEnergy")
                    .onBindingUpdated("text", t("forestry.gui.total_energy", I18n.formatEnergy(data.totalEnergy)));

                elements.get("textBurnTime")
                    .onBindingUpdated("text", t("forestry.gui.burn_time", I18n.formatTicks(data.burnTime)));
            }
        });
    }
}