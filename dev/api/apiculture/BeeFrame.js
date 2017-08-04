var BeeFrame = {
    frames: {},

    registerFrame: function (obj) {

        if (!obj.codeName) {
            Logger.Log("[ForestryAPI]CodeName is undefined!", "ERROR");
            return;
        }

        if (!obj.localize) {
            Logger.Log("[ForestryAPI]Localize is undefined!", "ERROR");
            return;
        }

        if (!obj.durability) {
            Logger.Log("[ForestryAPI]Durability is undefined!", "ERROR");
            return;
        }

        if (!obj.modifier) {
            Logger.Log("[ForestryAPI]Modifier is undefined!", "ERROR");
            return;
        }

        if (!obj.texture) {
            obj.texture = {
                name: obj.codeName,
                meta: 0
            };
        }

        if (!obj.onFrameUsed) {
            obj.onFrameUsed = function (item, house) {
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

    isFrame: function (id) {
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