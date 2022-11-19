class ItemUtils {
    static addStaticTooltip(id: number, tooltip: string) {
        Item.registerNameOverrideFunction(id, (item: ItemInstance, name: string) => {
            return name + "\n§7" + Translation.translate(tooltip);
        });
    }
}