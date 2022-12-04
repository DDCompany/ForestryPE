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

        Item.setToolRender(ItemID[obj.codeName], true);
        Item.setMaxDamage(ItemID[obj.codeName], obj.durability);

        this.frames[ItemID[obj.codeName]] = obj;
    }

    static isFrame(id: number) {
        return this.frames[id];
    }
}