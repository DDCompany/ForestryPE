class ItemUtils {
    static addStaticTooltip(id: number, tooltip: string) {
        Item.registerNameOverrideFunction(id, (item: ItemInstance, name: string) => {
            return `${name}\n§7${Translation.translate(tooltip)}`;
        });
    }

    static addTooltip(id: number, onTooltip: (item: ItemInstance) => string) {
        Item.registerNameOverrideFunction(id, (item: ItemInstance, name: string) => {
            return `${name}\n§7${onTooltip(item)}`;
        });
    }

    static addContainsTooltip(id: number, provider: (item: ItemInstance) => ItemContainer | null) {
        Item.registerNameOverrideFunction(id, (item: ItemInstance, name: string) => {
            const container = provider(item);
            if (!container) {
                return name;
            }

            let tooltip = "";
            for (const slotName in container.slots) {
                const containedItem = container.getSlot(slotName);
                if (containedItem.count > 0) {
                    const itemName = Translation.translate(Item.getName(containedItem.id, containedItem.data));
                    tooltip += `\n§7${itemName} x${containedItem.count}`;
                }
            }

            return name + tooltip;
        });
    }
}