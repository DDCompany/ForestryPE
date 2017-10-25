TileEntity.registerPrototype(BlockID.moistener, {

    defaultValues: {
        progress: 0,
        outputID: 0,
        tprogress: 0
    },

    getTime: function () {
        var light = World.__inworld.getLightLevel(this.x, this.y + 1, this.z);
        return light > 11 ? -1 : (light === 0 ? 25 : light * 10);
    },

    init: function () {
        this.liquidStorage.setLimit("water", 10);
    },

    tick: function () {
        var time = this.getTime();
        var slotContainer = this.container.getSlot("slotContainer");
        var slotEmptyContainer = this.container.getSlot("slotEmptyContainer");
        var slotProcessing = this.container.getSlot("slotProcessing");
        var slotRecipe = this.container.getSlot("slotRecipe");
        var slotResult = this.container.getSlot("slotResult");

        this.liquidStorage.updateUiScale("liquidScale", "water");

        if (slotContainer.id !== 0 && this.liquidStorage.getAmount("water") + 1 <= 10) {
            var empty = LiquidRegistry.getEmptyItem(slotContainer.id, slotContainer.data);
            if (empty && empty.liquid === "water") {
                var f = false;

                if (slotEmptyContainer.id === 0) {
                    slotEmptyContainer.id = empty.id;
                    slotEmptyContainer.data = empty.data;
                    slotEmptyContainer.count = 1;
                    f = true;
                } else if (slotEmptyContainer.id !== 0 && slotEmptyContainer.id === empty.id && slotEmptyContainer.data === empty.data && slotEmptyContainer.count + 1 <= Item.getMaxStack(slotEmptyContainer.id)) {
                    slotEmptyContainer.count++;
                    f = true;
                }

                if (f) {
                    this.liquidStorage.addLiquid("water", 1);
                    slotContainer.count--;
                }
            }
        }

        for (var i = 0; i < 6; i++) {
            var slot = this.container.getSlot("slotOutput_t" + i);
            if (slot.id === ItemID.mouldyWheat || slot.id === ItemID.decayingWheat || slot.id === 296) {
                for (var j = 0; j < 3; j++) {
                    var slot2 = this.container.getSlot("slotOutput_b" + j);
                    if (slot2.id === 0) {
                        slot2.id = slot.id;
                        slot2.data = slot.data;
                        slot2.count = slot.count;

                        this.container.clearSlot("slotOutput_t" + i);
                        break;
                    } else if (slot2.id === slot.id && slot2.data === slot.data && slot2.count < Item.getMaxStack(slot2.id)) {
                        if (slot2.count + slot.count <= Item.getMaxStack(slot2.id)) {
                            slot2.count += slot.count;
                            this.container.clearSlot("slotOutput_t" + i);
                            break;
                        } else {
                            var to = Item.getMaxStack(slot2.id) - slot2.count;
                            slot2.count += to;
                            slot.count -= to;
                            break;
                        }
                    }
                }
            }
        }

        if (slotProcessing.id === 0) {
            for (var i = 0; i < 3; i++) {
                var slot = this.container.getSlot("slotOutput_b" + i);
                if (slot.id === 296 || slot.id === ItemID.mouldyWheat || slot.id === ItemID.decayingWheat) {
                    slotProcessing.id = slot.id;
                    slotProcessing.data = slot.data;
                    slotProcessing.count = slot.count;

                    this.container.clearSlot("slotOutput_b" + i);
                }
            }
        } else if (slotProcessing.count < Item.getMaxStack(slotProcessing.id)) {
            for (var i = 0; i < 3; i++) {
                var slot = this.container.getSlot("slotOutput_b" + i);
                if (slotProcessing.id === slot.id && slotProcessing.data === slot.data) {
                    var to = Math.min(Item.getMaxStack(slotProcessing.id), slot.count);
                    slotProcessing.count += to;
                    slot.count -= to;
                }
            }
        }

        if (this.data.progress > 0 && time !== -1) {
            this.data.progress++;
            if (this.data.progress >= time) {
                for (var i = 0; i < 6; i++) {
                    var slot = this.container.getSlot("slotOutput_t" + i);
                    var g = false;
                    if (slot.id === 0) {
                        slot.id = this.data.outputID;
                        slot.data = 0;
                        slot.count = 1;
                        g = true;
                    } else if (slot.id === this.data.outputID && slot.count < Item.getMaxStack(slot.id)) {
                        slot.count++;
                        g = true;
                    }
                    if (g) {
                        this.data.tprogress++;
                        if (this.data.tprogress >= 16) {
                            var out = 0;
                            var outData = 0;
                            if (slotRecipe.id === 295) {
                                out = 110;
                            } else if (slotRecipe.id === 4) {
                                out = 48;
                            } else if (slotRecipe.id === 98) {
                                out = 98;
                                outData = 1;
                            }
                            if (out) {
                                var p = false;
                                if (slotResult.id === 0) {
                                    slotResult.id = out;
                                    slotResult.data = outData;
                                    slotResult.count = 1;
                                    slotRecipe.count--;
                                } else if (slotResult.id === out && slotResult.data === outData && slotRecipe.count < Item.getMaxStack(slotResult.id)) {
                                    slotResult.count++;
                                    slotRecipe.count--;
                                }
                            }
                            this.data.tprogress = 0;
                        }
                        this.data.progress = 0;
                        break;
                    }
                }
            }
        } else if ((slotProcessing.id === 296 || slotProcessing.id === ItemID.mouldyWheat || slotProcessing.id === ItemID.decayingWheat)
            && this.liquidStorage.getAmount("water") >= 0.5 && time !== -1) {
            if (slotProcessing.id === 296) {
                this.data.outputID = ItemID.mouldyWheat;
            } else if (slotProcessing.id === ItemID.mouldyWheat) {
                this.data.outputID = ItemID.decayingWheat;
            } else if (slotProcessing.id === ItemID.decayingWheat) {
                this.data.outputID = ItemID.mulch;
            }
            this.liquidStorage.getLiquid("water", 0.5);
            this.data.progress = 1;
            slotProcessing.count--;
        }

        this.container.setScale("progressScale2", this.data.progress / time);
        this.container.setScale("progressScale", this.data.progress / time);
        this.container.setScale("progressScale3", this.data.tprogress / 16);

        this.container.validateAll();
    },

    getGuiScreen: function () {
        return moistenerGUI;
    }

});