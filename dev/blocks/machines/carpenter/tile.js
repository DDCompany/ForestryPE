MachineRegistry.register(BlockID.carpenter, {

    defaultValues: {
        liquidStored: 0,
        progress: 0,
        output: 0
    },
    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },

    getGuiScreen: function () {
        return carpenterGUI;
    },

    getTransportSlots: function () {
        var out = ["slotOutput"];
        var inp = [];
        for (var i = 0; i < 18; i++) {
            inp.push("slotResources" + i);
        }
        return {input: inp, output: out};
    },

    tick: function () {
        var temp = 0;
        var content = this.container.getGuiContent();

        if (content && !content.elements["slotInput0"]) {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    var slot_size = 60;
                    var x = 385 + (j * slot_size);
                    var y = 115 + (i * slot_size);
                    content.elements["slotInput" + temp] = {type: "slot", x: x, y: y};
                    temp++;
                }
            }
        }

        var temp2 = 0;
        if (content && !content.elements["slotResources0"]) {
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 9; j++) {
                    var slot_size = 60;
                    var x = 353 + j * slot_size;
                    var y = (133 + 59 * 3.2) + i * slot_size;
                    content.elements["slotResources" + temp2] = {type: "slot", x: x, y: y};
                    temp2++;
                }
            }
        }

        var slotContainer = this.container.getSlot("slotContainer");
        var slotEmptyContainer = this.container.getSlot("slotEmptyContainer");
        var slotSpecial = this.container.getSlot("slotSpecial");
        var slotOutput = this.container.getSlot("slotOutput");
        var energyDec = 10;

        this.liquidStorage.updateUiScale("liquidScale", this.data.liquidStored);

        if (slotContainer.id > 0) {
            var liquid = LiquidRegistry.getItemLiquid(slotContainer.id, slotContainer.data);
            var empty = LiquidRegistry.getEmptyItem(slotContainer.id, slotContainer.data);
            var f = false;

            if (liquid && empty && (this.liquidStorage.getAmount(this.data.liquidStored) === 0 || this.data.liquidStored === liquid) && this.liquidStorage.getAmount(this.data.liquidStored) + 1 <= 10) {
                if (slotEmptyContainer.id === 0) {
                    slotEmptyContainer.id = empty.id;
                    slotEmptyContainer.data = empty.data;
                    slotEmptyContainer.count = 1;
                    f = true;
                } else if (slotEmptyContainer.id === empty.id && slotEmptyContainer.data === empty.data && slotEmptyContainer.count < Item.getMaxStack(slotEmptyContainer.id)) {
                    slotEmptyContainer.count += 1;
                    f = true;
                }

                if (f) {
                    slotContainer.count--;
                    this.data.liquidStored = liquid;
                    this.liquidStorage.addLiquid(this.data.liquidStored, 1);
                    f = false;
                }
            }

        }

        if (this.data.energy >= energyDec) {
            if (this.data.progress > 0) {
                if (this.data.progress >= 160) {
                    var t = false;
                    if (slotOutput.id === 0) {
                        slotOutput.id = this.data.output.id;
                        slotOutput.data = this.data.output.data;
                        slotOutput.count = this.data.output.count;
                        t = true;
                    } else if (slotOutput.id === this.data.output.id && slotOutput.data === this.data.output.data && slotOutput.count + this.data.output.count <= Item.getMaxStack(this.data.output.id)) {
                        slotOutput.count += this.data.output.count;
                        t = true;
                    }
                    if (t) {
                        this.data.progress = 0;
                        this.data.output = 0;
                    }
                } else {
                    this.data.progress++;
                    this.data.energy -= energyDec;
                }
            } else {
                var input = {};

                for (var i = 0; i < 9; i++) {
                    var slot = this.container.getSlot("slotInput" + i);
                    input["slot" + i] = {
                        id: slot.id,
                        data: slot.data,
                        count: slot.count
                    };
                }

                var recipe = RecipeRegistry.getCarpenterRecipe(input);
                if (recipe) {
                    if ((!recipe.liquid && this.liquidStorage.getAmount(this.data.liquidStored) === 0) || (recipe.liquid === this.data.liquidStored && recipe.liquidAmount <= this.liquidStorage.getAmount(this.data.liquidStored))) {
                        if ((!recipe.dop && slotSpecial.id === 0) || (recipe.dop && slotSpecial.id === recipe.dop.id && slotSpecial.data === recipe.dop.data)) {
                            this.data.output = recipe.output;
                            if (recipe.liquid) {
                                this.liquidStorage.getLiquid(this.data.liquidStored, recipe.liquidAmount);
                            }
                            this.data.progress = 1;
                            if (recipe.dop && recipe.dop.dec) {
                                var b = true;
                                for (var j = 0; j < 19; j++) {
                                    var res_slot = this.container.getSlot("slotResources" + j);
                                    if (res_slot && res_slot.id && res_slot.id === recipe.dop.id && res_slot.data === recipe.dop.data) {
                                        res_slot.count--;
                                        b = false;
                                        break;
                                    }
                                }
                                if (b) {
                                    slotSpecial.count--;
                                }
                            }
                            for (var i = 0; i < 9; i++) {
                                var slot = this.container.getSlot("slotInput" + i);
                                var g = true;
                                for (var j = 0; j < 19; j++) {
                                    var res_slot = this.container.getSlot("slotResources" + j);
                                    if (res_slot && res_slot.id && res_slot.id === slot.id && res_slot.data === slot.data) {
                                        res_slot.count--;
                                        g = false;
                                        this.container.validateAll();
                                        break;
                                    }
                                }
                                if (g) {
                                    slot.count--;
                                }
                            }
                        }
                    }
                }
            }
        }

        this.container.setScale("progressScale", this.data.progress / 160);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());

        this.container.validateAll();
    },

    getEnergyStorage: function () {
        return 4000;
    }
});