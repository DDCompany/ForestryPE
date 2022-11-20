MachineRegistry.registerConsumer(BlockID.fabricator, {
    TEMPERATURE_MAX: 5000,

    defaultValues: {
        temperature: 0,
        glassAmount: 0,
        output: null
    },

    init() {
        this.liquidStorage.setLimit(null, 8);
    },

    decreaseTemperature() {
        let temperature = this.data.temperature;

        if (temperature > 2500)
            this.data.temperature -= 2;
        else this.data.temperature--;
    },

    findWork() {
        let pattern = {};

        for (let i = 0; i < 9; i++) {
            pattern[i] = this.container.getSlot("slotInput" + i);
        }

        let recipe = FabricatorManager.getRecipe(pattern);
        if (recipe) {
            let slotSpecial = this.container.getSlot("slotSpecial");
            let special = recipe.special;
            if (special) {
                // noinspection EqualityComparisonWithCoercionJS
                if (slotSpecial.id !== special.id || slotSpecial.data != (special.data || 0))
                    return;
            }

            let slots = {};

            for (let i = 0; i < 9; i++) {
                let item = this.container.getSlot("slotInput" + i);

                if (!item.id)
                    continue;

                for (let k = 0; k < 18; k++) {
                    let slot = this.container.getSlot("slotResources" + k);

                    if (slot.id && ContainerHelper.equals(slot, item)) {
                        let count = slots[k];

                        if (!count) {
                            slots[k] = 1;
                        } else {
                            if (slot.count < count + 1) {
                                if (k === 17)
                                    return;

                                continue
                            }

                            slots[k] = count + 1;
                        }
                        break;
                    } else if (k === 17) {
                        return;
                    }
                }
            }

            for (let i in slots) {
                let slot = this.container.getSlot("slotResources" + i);
                slot.count -= slots[i];
            }

            if (special && special.dec) {
                slotSpecial.count -= 1;
            }

            this.data.output = recipe.result;
            this.data.glassAmount = recipe.amount;
            this.container.validateAll();
        }
    },

    trySmelt() {
        let slot = this.container.getSlot("slotGlass");
        let smelting = FabricatorManager.getSmelting(slot.id, slot.data);

        if (smelting && this.data.temperature >= smelting.temperature) {
            if (this.liquidStorage.getAmount("forestryGlass") + smelting.amount <= 2) {
                this.liquidStorage.addLiquid("forestryGlass", smelting.amount);
                slot.count--;
                this.container.validateSlot("slotGlass");
            }
        }
    },

    heat() {
        this.data.temperature = Math.min(this.TEMPERATURE_MAX, this.data.temperature + 10);
    },

    tick() {
        if (World.getThreadTime() % 5 !== 0)
            return;

        if (this.data.energy >= 200) {
            if (this.data.output) {
                this.heat();
                this.trySmelt();

                let slot = this.container.getSlot("slotResult");

                if (this.liquidStorage.getAmount("forestryGlass") >= this.data.glassAmount
                    && ContainerHelper.putInSlot(slot, this.data.output)) {
                    this.liquidStorage.getLiquid("forestryGlass", this.data.glassAmount);
                    this.data.output = null;
                }
                this.data.energy -= 200;
            } else {
                this.findWork();
            }
        }

        if (this.data.temperature > 0) {
            this.decreaseTemperature();
        } else if (this.liquidStorage.getAmount("forestryGlass")) {
            this.liquidStorage.getLiquid("forestryGlass", 0.05)
        }

        this.container.setScale("temperatureScale", this.data.temperature / this.TEMPERATURE_MAX);
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.liquidStorage.updateUiScale("smeltingScale", "forestryGlass");
    },

    getEnergyStorage() {
        return 3300;
    },

    destroy() {
        for (let i = 0; i < 9; i++)
            this.container.clearSlot("slotInput" + i);
    },

    getGuiScreen() {
        return fabricatorGUI;
    }
});

{
    let slots = {
        "slotGlass": {
            input: true,
            isValid(item, side) {
                // noinspection JSSuspiciousNameCombination
                return Math.abs(side.y) === 1
            }
        },
        "slotResult": {
            output: true
        },
    };

    for (let i = 0; i < 18; i++) {
        slots["slotResources" + i] = {
            input: true
        };
    }

    StorageInterface.createInterface(BlockID.fabricator, {
        slots
    });
}