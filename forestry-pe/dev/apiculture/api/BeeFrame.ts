interface BeeFramePrototype {
    codeName: string;
    localize: Record<string, string>;
    durability: number;
    modifier: BeeModifier;
    texture?: { name: string, meta: number };
}

class BeeFrame {
    static readonly frames: Record<number, BeeFramePrototype> = {};

    static registerFrame(obj: BeeFramePrototype) {
        if (!obj.codeName) {
            summonException("CodeName is undefined! (Frames Registration)");
            return;
        }

        if (!obj.localize) {
            summonException("Localize is undefined! (Frames Registration)");
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
                meta: 0
            };
        }

        IDRegistry.genItemID(obj.codeName);
        Item.createItem(obj.codeName, obj.localize.en, obj.texture, {stack: 1});
        Translation.addTranslation(obj.localize.en, obj.localize);

        Item.setToolRender(ItemID[obj.codeName], true);
        Item.setMaxDamage(ItemID[obj.codeName], obj.durability);

        this.frames[ItemID[obj.codeName]] = obj;
    }

    static isFrame(id: number) {
        return this.frames[id];
    }
}