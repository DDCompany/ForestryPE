var ContainerHelper = {

    putInSlots: function (toPut, container, slots) {
        for (var key in toPut) {
            var count = toPut[key][2];
            for (var key2 in slots) {
                if (!count) break;
                var slot = container.getSlot(slots[key2]);
                if (slot.id === toPut[key][0] && slot.data === toPut[key][1] && slot.count < Item.getMaxStack(slot.id)) {
                    var f = Math.min(count, Item.getMaxStack(slot.id) - slot.count);
                    count -= f;
                    slot.count += f;
                } else if (slot.id === 0) {
                    slot.id = toPut[key][0];
                    slot.data = toPut[key][1];
                    slot.count = toPut[key][2];
                    count = 0;
                }
            }
        }
    },

    putInSlotsChance: function (toPut, container, slots) {
        var arr = [];
        for (key in toPut) {
            if (Math.random() < toPut[key][2]) {
                arr.push([toPut[key][0], toPut[key][1], 1]);
            }
        }
        this.putInSlots(arr, container, slots)
    },

    putInSlotsObj: function (toPut, container, slots) {
        this.putInSlots([[toPut.id, toPut.data, toPut.count || 1]], container, slots);
    },

    fluidContainerFilling: function (liquid, tile, slots) {
        var slotContainerFull = tile.container.getSlot(slots.full);
        var slotContainer = tile.container.getSlot(slots.empty);

        if (slotContainerFull && slotContainer && slotContainer.id) {
            var full = LiquidRegistry.getFullItem(slotContainer.id, slotContainer.data, liquid);

            if (full && tile.liquidStorage.getAmount(liquid) >= 1) {
                var f = false;
                if (slotContainerFull.id === 0) {
                    slotContainerFull.id = full.id;
                    slotContainerFull.data = full.data;
                    slotContainerFull.count = 1;
                    f = true;
                } else if (slotContainerFull.id === full.id && slotContainerFull.data === full.data && slotContainerFull.count < Item.getMaxStack(slotContainerFull.id)) {
                    slotContainerFull.count++;
                    f = true;
                }
                if (f) {
                    tile.liquidStorage.getLiquid(liquid, 1);
                    slotContainer.count--;
                    return true;
                }
            }
        }

        tile.container.validateAll();
        return false;
    },
    /*
        Добавить жидкость в tile из slots.full и добавить пустой контейнер в slots.empty.
        ContainerHelper.fluidContainerEmpty(["water", "water"], tile, {full: "full", empty: "empty"});
     */
    fluidContainerEmpty: function (liquid, tile, slots) {
        var slotContainerFull = tile.container.getSlot(slots.full);
        var slotContainer = tile.container.getSlot(slots.empty);

        if (slotContainerFull && slotContainer && slotContainerFull.id) {
            var empty = LiquidRegistry.getEmptyItem(slotContainerFull.id, slotContainerFull.data);

            if ((liquid === null || liquid.indexOf(empty.liquid)) > -1 && tile.liquidStorage.getAmount(empty.liquid) + 1 <= tile.liquidStorage.getLimit(empty.liquid)) {
                if (slotContainer.id === 0) {
                    slotContainer.id = empty.id;
                    slotContainer.data = empty.data;
                    slotContainer.count = 1;
                    slotContainerFull.count--;
                    tile.liquidStorage.addLiquid(empty.liquid, 1);
                    return true;
                } else if (slotContainer.id === empty.id && slotContainer.data === empty.data && slotContainer.count < Item.getMaxStack(slotContainer.id)) {
                    slotContainer.count++;
                    slotContainerFull.count--;
                    tile.liquidStorage.addLiquid(empty.liquid, 1);
                    return true;
                }
            }
        }

        return false;
    }

};