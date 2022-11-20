var BeeFrame = {
    frames: {},

    registerFrame(obj) {
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

        if (!obj.onFrameUsed) {
            obj.onFrameUsed = (item, house) => {
                item.data++;
                return item;
            }
        }

        IDRegistry.genItemID(obj.codeName);
        Item.createItem(obj.codeName, obj.localize.en, obj.texture, {stack: 1});
        Translation.addTranslation(obj.localize.en, obj.localize);

        Item.setToolRender(ItemID[obj.codeName], true);
        Item.setMaxDamage(ItemID[obj.codeName], obj.durability);

        this.frames[ItemID[obj.codeName]] = obj;
    },

    isFrame(id) {
        return this.frames[id];
    }

};

/*BeeFrame.registerFrame({
    codeName: "frameUntreated",
    localize: {en: "Test frame", ru: "Тестовый фреуаау"},
    modifier: {
        getProductionModifier: function () {
            return 2.0;
        }
    },
    durability: 20
});*/