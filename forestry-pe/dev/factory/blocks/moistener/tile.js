const MOISTENER_SLOTS = [
    {
        prefix: "slotOutput_0",
        amount: 5
    },
    {
        prefix: "slotOutput_1",
        amount: 2
    },
    {
        prefix: "slotOutput_2",
        amount: 0
    }

];

TileEntity.registerPrototype(BlockID.moistener, {
    defaultValues: {
        progress: 0,
        progressMax: 0,
        progressRecipe: 0,
        progressRecipeMax: 0,
        outputBurn: null,
        outputRecipe: null,
        slots: null,
        recipeSlot: 0
    },

    init: function () {
        this.liquidStorage.setLimit("water", 10);
    },

    getSpeed: function () {
        let light = World.getLightLevel(this.x, this.y + 1, this.z);
        return light >= 9 ? 1 : (light >= 7 ? 2 : (light >= 5 ? 3 : 4));
    },

    enoughSpace: function (prefix, amount, id, data) {
        for (; amount >= 0; amount--) {
            let slot = this.container.getSlot(prefix + amount);

            if (!slot.id)
                return true;

            if (slot.id === id && slot.data === data && slot.count < Item.getMaxStack(id))
                return true;
        }

        return false;
    },

    findRecipe: function () {
        if (!this.data.progressRecipe) {
            let slot = this.container.getSlot("slotRecipe");
            let recipe = MoistenerManager.getRecipe(slot.id, slot.data);

            if (recipe) {
                this.data.progressRecipe = 1;
                this.data.progressRecipeMax = recipe.time;
                this.data.outputRecipe = recipe.outputItem;
                slot.count--;
                this.container.validateSlot("slotRecipe");
            } else return false;
        }

        return true;
    },

    startBurning: function () {
        let length = MOISTENER_SLOTS.length;
        for (let i = 0; i < length; i++) {
            let slots = MOISTENER_SLOTS[i];
            let nextSlots;

            if (i === length - 1)
                nextSlots = MOISTENER_SLOTS[0];
            else nextSlots = MOISTENER_SLOTS[i + 1];

            let data = this.getForGroup(slots.prefix, slots.amount, nextSlots.prefix, nextSlots.amount);
            if (data) {
                let fuelData = data.fuelData;

                this.data.progress = 1;
                this.data.progressMax = fuelData.time;
                this.data.slots = {prefix: nextSlots.prefix, amount: nextSlots.amount};
                this.data.outputBurn = fuelData.outputItem;
                this.data.recipeSlot = slots.prefix + data.slot;
            }
        }
    },

    getForGroup: function (prefix, amount, outPrefix, outAmount) {
        for (; amount >= 0; amount--) {
            let slot = this.container.getSlot(prefix + amount);
            let fuelData = MoistenerManager.getFuelInfo(slot.id, slot.data);

            if (fuelData) {
                let output = fuelData.outputItem;
                if (this.enoughSpace(outPrefix, outAmount, output.id, output.data))
                    return {fuelData: fuelData, slot: amount};
            }
        }

        return null;
    },

    putToSlots: function (amount, prefix, item) {
        for (; amount >= 0; amount--) {
            let slot = this.container.getSlot(prefix + amount);
            if (ContainerHelper.putInSlot(slot, item))
                return true;
        }

        return false;
    },

    tick: function () {
        if (World.getThreadTime() % 20 === 0)
            ContainerHelper.drainContainer2("water", this, "slotContainer", "slotEmptyContainer");

        if (this.findRecipe()) {
            if (this.data.progressRecipe >= this.data.progressRecipeMax) {
                let slot = this.container.getSlot("slotResult");
                if (ContainerHelper.putInSlot(slot, this.data.outputRecipe)) {
                    this.data.progressRecipe = 0;
                }
            } else if (this.data.progress) {
                let slot = this.container.getSlot(this.data.recipeSlot);
                if (!MoistenerManager.getFuelInfo(slot.id, slot.data)) {
                    this.data.progress = 0;
                    return;
                }

                if (this.data.progress >= this.data.progressMax) {
                    let output = this.data.outputBurn;
                    let slots = this.data.slots;

                    if (this.putToSlots(slots.amount, slots.prefix, output)) {
                        slot.count--;
                        this.container.validateSlot(this.data.recipeSlot);
                    }
                    this.data.progress = 0;
                } else {
                    if (this.liquidStorage.getAmount("water") >= 0.001) {
                        let speed = this.getSpeed();
                        this.data.progress += speed;
                        this.data.progressRecipe += speed;
                        this.liquidStorage.getLiquid("water", 0.001);
                    }
                }
            } else {
                this.startBurning()
            }
        }

        let progress = (this.data.progress / this.data.progressMax) || 0;
        this.container.setScale("progressScale2", progress);
        this.container.setScale("progressScale", progress);
        this.container.setScale("progressScale3", this.data.progressRecipe / this.data.progressRecipeMax);
        this.liquidStorage.updateUiScale("liquidScale", "water");
    },

    getGuiScreen: function () {
        return moistenerGUI;
    }
});

{
    let slots = {
        "slotContainer": {
            input: true,
            isValid: function (item) {
                return LiquidRegistry.getEmptyItem(item.id, item.data) != null;
            },
        },
        "slotRecipe": {
            input: true,
            isValid: function (item) {
                return MoistenerManager.getRecipe(item.id, item.data);
            },
        },
        "slotResult": {
            output: true
        },
        "slotEmptyContainer": {
            output: true
        }
    };

    for (let i = 0; i < 11; i++) {
        let number = "";
        if (i < 6) {
            number = "0" + i;
        } else if (i < 10) {
            number = "1" + (i - 6);
        } else number = "20";

        slots["slotOutput_" + i] = {
            input: true,
            output: true,

            isValid: function (item) {
                return MoistenerManager.getFuelInfo(item.id, item.data);
            },

            canOutput: function (item) {
                return !MoistenerManager.getFuelInfo(item.id, item.data);
            }
        };
    }

    StorageInterface.createInterface(BlockID.moistener, {
        slots: slots,

        canReceiveLiquid: function (liquid) {
            return liquid === "water";
        }
    });
}