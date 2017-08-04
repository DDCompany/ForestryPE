MachineRegistry.register(BlockID.fabricator, {

    TEMPERATURE_MAX: 5000,

    defaultValues: {
        temperature: 0
    },

    getTransportSlots: function () {
        var out = ["slotResult"];
        var inp = [];
        for (var i = 0; i < 18; i++) {
            inp.push("slotResources" + i);
        }
        return {input: inp, output: out};
    },

    init: function () {
        this.liquidStorage.setLimit("forestryGlass", 2);
    },

    getGuiScreen: function () {
        return fabricatorGUI;
    },

    tick: function () {
        var temp = 0;
        var content = this.container.getGuiContent();
        if (content && !content.elements["slotResources0"]) {
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 9; j++) {
                    var slot_size = 60;
                    var x = 353 + j * slot_size;
                    var y = (133 + 59 * 3.2) + i * slot_size;
                    content.elements["slotResources" + temp] = {type: "slot", x: x, y: y};
                    temp++;
                }
            }
        }

        var slotGlass = this.container.getSlot("slotGlass");
        var slotDop = this.container.getSlot("slotDop");
        var slotResult = this.container.getSlot("slotResult");
        var energyDec = 15;
        this.liquidStorage.updateUiScale("liquedGlassScale", "forestryGlass");

        if (slotGlass.id > 0) {
            var add = false;

            if (slotGlass.id === 20 && this.data.temperature >= 1000) {
                add = 1;
            } else if (slotGlass.id === 102 && this.data.temperature >= 1000) {
                add = 0.375;
            } else if (slotGlass.id === 12 && this.data.temperature >= 3000) {
                add = 1;
            }

            if (add && (!this.liquidStorage.hasDataFor("forestryGlass") || this.liquidStorage.getAmount("forestryGlass") + add <= 2)) {
                this.liquidStorage.addLiquid("forestryGlass", add);
                slotGlass.count--;
            }
        }

        if (this.data.energy >= energyDec && (slotGlass.id === 12 || slotGlass.id === 20 || slotGlass.id === 102 )) {
            this.data.energy -= energyDec;
            if (this.data.temperature < this.TEMPERATURE_MAX) {
                this.data.temperature++;
            }
        } else if (this.data.temperature > 0) {
            this.data.temperature--;
        }

        if (this.data.temperature === 0 && this.liquidStorage.hasDataFor("forestryGlass")) {
            this.liquidStorage.getLiquid("forestryGlass", this.liquidStorage.getAmount("forestryGlass"));
        }

        if (this.liquidStorage.hasDataFor("forestryGlass")) {
            var input = {};

            for (var i = 0; i < 9; i++) {
                var slot = this.container.getSlot("slotInput" + i);
                input["slot" + i] = {
                    id: slot.id,
                    data: slot.data,
                    count: slot.count
                };
            }

            var recipe = RecipeRegistry.getFabricatorRecipe(input);
            if (recipe) {
                var glassRequired = !recipe.glassRequired ? 1 : recipe.glassRequired;

                if (this.liquidStorage.getAmount("forestryGlass") >= glassRequired) {
                    var f = false;
                    if (((!recipe.dop || recipe.dop.id === 0) && slotDop.id === 0) ||
                        (recipe.dop && recipe.dop.id === slotDop.id && recipe.dop.data === slotDop.data && recipe.dop.count <= slotDop.count)) {
                        if (recipe.dop && recipe.dop.dec) {
                            slotDop.count -= recipe.dop.count;
                        }
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
                            for (var i = 0; i < 9; i++) {
                                var g = true;
                                var slot = this.container.getSlot("slotInput" + i);
                                if (slot.id) {
                                    for (var j = 0; j < 19; j++) {
                                        var res_slot = this.container.getSlot("slotResources" + j);
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
        }

        this.container.setScale("temperatureScale", this.data.temperature / this.TEMPERATURE_MAX);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());

        this.container.validateAll();
    },

    getEnergyStorage: function () {
        return 3300;
    },


});