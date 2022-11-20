MachineRegistry.registerConsumer(BlockID.squeezer, {
    defaultValues: {
        energy: 0,
        progress: 0,
        special: null,
        progressMax: 0,
        recipe: null
    },

    init() {
        this.liquidStorage.setLimit(null, 10);
    },

    findRecipe() {
        let container = this.container;
        let slots = {};
        for (let i = 0; i < 9; i++) {
            let slotName = "slot" + i;
            slots[slotName] = container.getSlot(slotName);
        }

        let recipes = SqueezerManager.getRecipes();
        let recipeSlots;
        for (let i in recipes) {
            recipeSlots = [];
            let recipe = recipes[i];
            let ingredients = recipe.input;

            for (let k in ingredients) {
                let item = ingredients[k];

                for (let j in slots) {
                    let slot = slots[j];
                    if (ContainerHelper.equals(item, slot) && slot.count >= item.count) {
                        recipeSlots.push(j);
                        break;
                    }
                }
            }

            if (ingredients.length === recipeSlots.length) {
                for (let i in recipeSlots) {
                    let slotName = recipeSlots[i];
                    slots[slotName].count -= ingredients[i].count;
                    container.validateSlot(slotName);
                }
                this.data.progress = 1;
                this.data.progressMax = recipe.time;
                this.data.recipe = recipe;

                let special = recipe.special;
                if (special) {
                    if (Math.random() < special.chance) {
                        this.data.special = special;
                        return;
                    }
                }

                this.data.special = null;
                return;
            }
        }
    },

    tick() {
        if (World.getThreadTime() % 5 !== 0)
            return;

        let liquidStored = this.liquidStorage.getLiquidStored();
        ContainerHelper.fillContainer(liquidStored, this, "slotEmptyContainer", "slotContainer");

        if (this.data.energy >= 200) {
            if (this.data.progress) {
                if (this.data.progress >= this.data.progressMax) {
                    let recipe = this.data.recipe;
                    let liquid = recipe.liquid;
                    if ((!liquidStored || liquidStored === liquid) && this.liquidStorage.getAmount(liquidStored) + recipe.liquidAmount <= 10) {
                        let special = this.data.special;

                        if (!special || ContainerHelper.putInSlot(this.container.getSlot("slotSpecial"), special)) {
                            this.liquidStorage.addLiquid(liquid, recipe.liquidAmount);
                            this.data.progress = 0;
                        }
                    }
                } else {
                    this.data.progress++;
                    this.data.energy -= 200;
                }
            } else this.findRecipe();
        }

        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.liquidStorage.updateUiScale("liquidScale", liquidStored);
    },

    getEnergyStorage() {
        return 5000;
    },

    getGuiScreen() {
        return squeezerGUI;
    }
});

{
    let slots = {
        "slotSpecial": {
            output: true
        },
        "slotContainer": {
            output: true
        },
    };

    for (let i = 0; i < 9; i++) {
        slots["slot" + i] = {
            input: true
        };
    }

    StorageInterface.createInterface(BlockID.squeezer, {
        slots,

        canTransportLiquid() {
            return true;
        }
    });
}