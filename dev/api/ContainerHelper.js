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
    },

    emptyContainer: function (liquid, tile, slot) {
        let slotContainer = tile.container.getSlot(slot);
        let empty = LiquidRegistry.getEmptyItem(slotContainer.id, slotContainer.data);
        let liquidStorage = tile.liquidStorage;

        if (empty && (!liquidStorage.getLiquidStored() || liquidStorage.getAmount(empty.liquid) > 0) && (liquid === null || liquid.indexOf(empty.liquid)) > -1 && liquidStorage.getAmount(empty.liquid) + 1 <= liquidStorage.getLimit(empty.liquid)) {
            if (empty.id === ItemID.waxCapsuleEmpty || empty.id === ItemID.canEmpty || empty.id === ItemID.refractoryEmpty) {
                slotContainer.count--;
            } else {
                if (slotContainer.count === 1) {
                    slotContainer.id = empty.id;
                    slotContainer.data = empty.data;
                } else {
                    slotContainer.count--;
                }
            }

            liquidStorage.addLiquid(empty.liquid, 1);

            return true;
        }

        return false;
    },

    fillContainer: function (liquids, tile, slots) {
        let liquid = null;
        let liquidStorage = tile.liquidStorage;

        if (liquids === null) {
            liquid = liquidStorage.getLiquidStored();
            if (!liquid) {
                return false;
            }
        } else {
            for (let i in liquids) {
                if (liquidStorage.getAmount(liquids[i]) >= 1) {
                    liquid = liquids[i];
                    break;
                }
            }
        }

        if (liquid) {
            let slotContainerFull = tile.container.getSlot(slots.full);
            let slotContainerEmpty = tile.container.getSlot(slots.empty);
            let full = LiquidRegistry.getFullItem(slotContainerEmpty.id, slotContainerEmpty.data, liquid);

            if (full) {

                if (ContainerHelper.putInSlot(slotContainerFull, full)) {
                    slotContainerEmpty.count--;
                    liquidStorage.getLiquid(liquid, 1);
                    return true;
                }
            }

        }

        return false;
    },

    putInSlot: function (slot, item) {
        let count = item.count || 1;

        if (slot.id === 0) {
            slot.id = item.id;
            slot.data = item.data;
            slot.count = count;
            return true;
        } else if (slot.id === item.id && slot.data === item.data && slot.count + count <= Item.getMaxStack(item.id)) {
            slot.count += count;
            return true;
        }

        return false;
    }

};