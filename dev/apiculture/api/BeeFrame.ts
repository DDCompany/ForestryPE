interface BeeFramePrototype {
    codeName: string;
    name: string;
    durability: number;
    modifier: BeeModifier;
    texture?: { name: string, data: number };
}

class BeeFrame {
    static readonly frames: Record<number, BeeFramePrototype> = {};

    static registerFrame(obj: BeeFramePrototype) {
        if (!obj.codeName) {
            summonException("CodeName is undefined! (Frames Registration)");
            return;
        }

        if (!obj.name) {
            summonException("Name is undefined! (Frames Registration)");
            return;
        }

        if (!obj.durability) {
            summonException("Durability is undefined! (Frames Registration)");
            return;
        }

        if (!obj.modifier) {
            summonException("Modifier is undefined! (Frames Registration)");
            return;
        }

        if (!obj.texture) {
            obj.texture = {
                name: obj.codeName,
                data: 0,
            };
        }

        IDRegistry.genItemID(obj.codeName);
        Item.createItem(obj.codeName, obj.name, obj.texture, {stack: 1});

        const itemId = ItemID[obj.codeName];
        Item.setToolRender(itemId, true);
        Item.setMaxDamage(itemId, obj.durability);

        Item.registerNameOverrideFunction(itemId, (item, name) => {
            const modifier = obj.modifier;
            name += `§7${t("forestry.tooltip.frame.production", modifier.getProductionModifier?.() || 1)}\n`;
            name += `${t("forestry.tooltip.frame.genetic_decay", modifier.getGeneticDecay?.() || 1)}\n`;
            name += `${t("forestry.tooltip.frame.durability", obj.durability - item.data)}`;
            return name;
        });

        this.frames[itemId] = obj;
    }

    static isFrame(id: number) {
        return this.frames[id];
    }
}