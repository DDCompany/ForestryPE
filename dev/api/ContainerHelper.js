setLoadingTip("Common Api Loading...");

const ContainerHelper = {
    putInSlots: function (toPut, container, slots) {
        for (let key in toPut) {
            let count = toPut[key][2];
            for (let key2 in slots) {
                if (!count) break;
                let slot = container.getSlot(slots[key2]);
                if (slot.id === toPut[key][0] && slot.data === toPut[key][1] && slot.count < Item.getMaxStack(slot.id)) {
                    let f = Math.min(count, Item.getMaxStack(slot.id) - slot.count);
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
    },

    /**
     * Наполнение предмета определённой жидкостью из TileEntity
     * @param liquid жидкость, которой необходимо наполнить предмет
     * @param tile TileEntity
     * @param slotEmptyName идентификатор слота для пустых контейнеров
     * @param slotFullName идентификатор слота для заполненных контейнеров
     */
    fillContainer: function (liquid, tile, slotEmptyName, slotFullName) {
        if (!liquid)
            return;

        if (tile.liquidStorage.getAmount(liquid) < 1)
            return;

        let container = tile.container;
        let slotEmpty = container.getSlot(slotEmptyName);
        let slotFull = container.getSlot(slotFullName);
        let full = LiquidRegistry.getFullItem(slotEmpty.id, slotEmpty.data, liquid);

        if (full) {
            if (!ContainerHelper.putInSlot(slotFull, full))
                return;

            slotEmpty.count--;
            tile.liquidStorage.getLiquid(liquid, 1);
            container.validateSlot(slotEmptyName);
            return liquid;
        }
    },

    /**
     * Извлечение жидкости из контейнера и перемещение ёё в TileEntity
     * @param liquid жидкость, которую необходимо извлечь
     * @param tile TileEntity
     * @param slotFullName идентификатор слота с наполненными контейнерами
     */
    drainContainer: function (liquid, tile, slotFullName) {
        let slot = tile.container.getSlot(slotFullName);
        let empty = LiquidRegistry.getEmptyItem(slot.id, slot.data);

        if (!empty)
            return;

        let _liquid = empty.liquid;
        if (!liquid || liquid === _liquid) {
            if (tile.liquidStorage.getAmount(_liquid) + 1 > 10)
                return;

            if (--slot.count === 0) {
                if(!this.isReusable(empty.id)) {
                    tile.container.clearSlot(slotFullName);
                }else {
                    slot.id = empty.id;
                    slot.data = empty.data;
                    slot.count = 1;
                }
            }

            tile.liquidStorage.addLiquid(_liquid, 1);
            return _liquid || liquid;
        }
    },

    drainContainer2: function (liquid, tile, slotFullName, slotEmptyName) {
        let container = tile.container;
        let slotFull = container.getSlot(slotFullName);
        let slotEmpty = container.getSlot(slotEmptyName);
        let empty = LiquidRegistry.getEmptyItem(slotFull.id, slotFull.data);

        if (!empty)
            return;

        let _liquid = empty.liquid;
        if (!liquid || liquid === _liquid) {
            if (tile.liquidStorage.getAmount(_liquid) + 1 > 10)
                return;

            if(!this.isReusable(empty.id) || this.putInSlot(slotEmpty, empty)) {
                slotFull.count--;
                tile.liquidStorage.addLiquid(_liquid, 1);
                container.validateSlot(slotFullName);
                return _liquid;
            }
        }

        return null;
    },

    isReusable: function (id) {
        if(ForestryConfig.reusableCapsules)
            return true;

        switch (id) {
            case ItemID.waxCapsuleEmpty:
            case ItemID.canEmpty:
            case ItemID.refractoryEmpty:
                return false;
            default:
                return true;
        }
    },

    equals: function (item1, item2) {
        if (!item1 && !item2)
            return true;

        if(!item1 || !item2)
            return false;

        return item1.id === item2.id && (item1.data === item2.data || item1.data === -1 || item2.data === -1);
    }
};