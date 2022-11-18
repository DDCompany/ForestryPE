setLoadingTip("Common Api Loading...");

class ContainerHelper {
    static putInSlots(toPut: [number, number, number][], container: UI.Container, slots: string[]) {
        for (const key in toPut) {
            let count = toPut[key][2];
            for (const key2 in slots) {
                if (!count) break;
                const slot = container.getSlot(slots[key2]);
                if (slot.id === toPut[key][0] && slot.data === toPut[key][1] && slot.count < Item.getMaxStack(slot.id)) {
                    const f = Math.min(count, Item.getMaxStack(slot.id) - slot.count);
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
    }

    static putInSlot(slot: UI.Slot, item: { id: number, data: number, count?: number }): boolean {
        const count = item.count || 1;

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

    /**
     * Наполнение предмета определённой жидкостью из TileEntity
     * @param liquid жидкость, которой необходимо наполнить предмет
     * @param tile TileEntity
     * @param slotEmptyName идентификатор слота для пустых контейнеров
     * @param slotFullName идентификатор слота для заполненных контейнеров
     */
    static fillContainer(liquid: string, tile: TileEntity.TileEntityPrototype, slotEmptyName: string, slotFullName: string): string | undefined {
        if (!liquid)
            return;

        if (tile.liquidStorage.getAmount(liquid) < 1)
            return;

        const container = tile.container;
        const slotEmpty = container.getSlot(slotEmptyName);
        const slotFull = container.getSlot(slotFullName);
        const full = LiquidRegistry.getFullItem(slotEmpty.id, slotEmpty.data, liquid);

        if (full) {
            if (!ContainerHelper.putInSlot(slotFull, full))
                return;

            slotEmpty.count--;
            tile.liquidStorage.getLiquid(liquid, 1);
            container.validateSlot(slotEmptyName);
            return liquid;
        }
    }

    /**
     * Извлечение жидкости из контейнера и перемещение ёё в TileEntity
     * @param liquid жидкость, которую необходимо извлечь
     * @param tile TileEntity
     * @param slotFullName идентификатор слота с наполненными контейнерами
     */
    static drainContainer(liquid: string, tile: TileEntity.TileEntityPrototype, slotFullName: string): string | undefined {
        const slot = tile.container.getSlot(slotFullName);
        const empty = LiquidRegistry.getEmptyItem(slot.id, slot.data);

        if (!empty)
            return;

        const _liquid = empty.liquid;
        if (!liquid || liquid === _liquid) {
            if (tile.liquidStorage.getAmount(_liquid) + 1 > 10)
                return;

            if (--slot.count === 0) {
                if (!this.isReusable(empty.id)) {
                    tile.container.clearSlot(slotFullName);
                } else {
                    slot.id = empty.id;
                    slot.data = empty.data;
                    slot.count = 1;
                }
            }

            tile.liquidStorage.addLiquid(_liquid, 1);
            return _liquid || liquid;
        }
    }

    static drainContainer2(liquid: string, tile: TileEntity.TileEntityPrototype, slotFullName: string, slotEmptyName: string): string | undefined {
        const container = tile.container;
        const slotFull = container.getSlot(slotFullName);
        const slotEmpty = container.getSlot(slotEmptyName);
        const empty = LiquidRegistry.getEmptyItem(slotFull.id, slotFull.data);

        if (!empty)
            return;

        const _liquid = empty.liquid;
        if (!liquid || liquid === _liquid) {
            if (tile.liquidStorage.getAmount(_liquid) + 1 > 10)
                return;

            if (!this.isReusable(empty.id) || this.putInSlot(slotEmpty, empty)) {
                slotFull.count--;
                tile.liquidStorage.addLiquid(_liquid, 1);
                container.validateSlot(slotFullName);
                return _liquid;
            }
        }
    }

    static isReusable(id: number): boolean {
        if (ForestryConfig.reusableCapsules)
            return true;

        switch (id) {
            case ItemID.waxCapsuleEmpty:
            case ItemID.canEmpty:
            case ItemID.refractoryEmpty:
                return false;
            default:
                return true;
        }
    }

    static equals(item1: { id: number, data?: number }, item2: { id: number, data?: number }): boolean {
        if (!item1 && !item2)
            return true;

        if (!item1 || !item2)
            return false;

        return item1.id === item2.id && ((item1.data || 0) === (item2.data || 0) || item1.data === -1 || item2.data === -1);
    }
}