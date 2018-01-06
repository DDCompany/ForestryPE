MachineRegistry.register(BlockID.fabricator, {
    TEMPERATURE_MAX: 5000,

    defaultValues: {
        temperature: 0,
        workCounter: 0
    },

    getTransportSlots: function () {
        let inp = [];
        for (let i = 0; i < 18; i++) {
            inp.push("slotResources" + i);
        }
        return {input: inp, output: ["slotResult"]};
    },

    init: function () {
        this.liquidStorage.setLimit("forestryGlass", 2);
    },

    getGuiScreen: function () {
        return fabricatorGUI;
    },

    tick: function () {
        let slotGlass = this.container.getSlot("slotGlass");

        if (slotGlass.id > 0) {
            let add = false;

            if (slotGlass.id === 20 && this.data.temperature >= 1000) {
                add = 1;
            } else if (slotGlass.id === 102 && this.data.temperature >= 1000) {
                add = 0.375;
            } else if (slotGlass.id === 12 && this.data.temperature >= 3000) {
                add = 1;
            }

            if (add && this.liquidStorage.getAmount("forestryGlass") + add <= 2) {
                this.liquidStorage.addLiquid("forestryGlass", add);
                slotGlass.count--;
            }
        }

        if (this.data.temperature >= 0) {
            if (this.data.temperature > 2500)
                this.data.temperature -= 2;
            else
                this.data.temperature--;

            let input = {};

            for (let i = 0; i < 9; i++) {
                let slot = this.container.getSlot("slotInput" + i);
                input["slot" + i] = {
                    id: slot.id,
                    data: slot.data,
                    count: slot.count
                };
            }

            let recipe = FabricatorManager.registerRecipe(input);
            if (recipe) {
                let glassRequired = !recipe.glassRequired ? 1 : recipe.glassRequired;

                if (this.liquidStorage.getAmount("forestryGlass") >= glassRequired) {
                    let f = false;
                    let slotDop = this.container.getSlot("slotDop");
                    if (((!recipe.dop || recipe.dop.id === 0) && slotDop.id === 0) ||
                        (recipe.dop && recipe.dop.id === slotDop.id && recipe.dop.data === slotDop.data && recipe.dop.count <= slotDop.count)) {
                        if (recipe.dop && recipe.dop.dec) {
                            slotDop.count -= recipe.dop.count;
                        }

                        let slotResult = this.container.getSlot("slotResult");

                        if (!slotResult || slotResult.id === 0) {
                            f = true;
                            slotResult.id = recipe.output.id;
                            slotResult.data = recipe.output.data;
                            slotResult.count = recipe.output.count;
                        } else if (slotResult && slotResult.id === recipe.output.id && slotResult.data === recipe.output.data && recipe.output.count + slotResult.count <= Item.getMaxStack(slotResult.id)) {
                            f = true;
                            slotResult.count += recipe.output.count;
                        }

                        if (f) {
                            this.liquidStorage.getLiquid("forestryGlass", glassRequired);
                            for (let i = 0; i < 9; i++) {
                                let g = true;
                                let slot = this.container.getSlot("slotInput" + i);
                                if (slot.id) {
                                    for (let j = 0; j < 19; j++) {
                                        let res_slot = this.container.getSlot("slotResources" + j);
                                        if (res_slot && res_slot.id && res_slot.id === slot.id && res_slot.data === slot.data) {
                                            res_slot.count--;
                                            g = false;
                                            break;
                                        }
                                    }
                                    if (g) {
                                        slot.count--;
                                    } else {
                                        g = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (this.liquidStorage.getAmount("forestryGlass")) {
            this.liquidStorage.getLiquid("forestryGlass", 0.005);
        }

        if (World.getThreadTime() % 5 === 0) {

            if (this.data.workCounter < 4) {

                if (this.data.energy >= 50) {
                    this.data.energy -= 50;
                    this.data.workCounter++;
                }

            } else {
                this.data.temperature += 100;
                this.data.workCounter = 0;
            }

        }

        this.container.setScale("temperatureScale", this.data.temperature / this.TEMPERATURE_MAX);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.liquidStorage.updateUiScale("liquedGlassScale", "forestryGlass");

        this.container.validateAll();
    },

    getEnergyStorage: function () {
        return 3300;
    }

});