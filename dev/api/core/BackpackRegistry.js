var updatableBackpacks = {

    update: function () {
        if (BackpackRegistry.temp && BackpackRegistry.openedUI && !BackpackRegistry.openedUI.isOpened()) {
            BackpackRegistry.checkBackpacksSlots();
            BackpackRegistry.openedUI = 0;
            BackpackRegistry.temp = false;
        }
    }

};

Callback.addCallback("LevelLoaded", function () {
    Updatable.addUpdatable(updatableBackpacks);
});

var backpackGUIObj = {
    standart: {
        header: {
            text: {
                text: Translation.translate("Backpack")
            }
        },
        inventory: {
            standart: true
        },
        background: {
            standart: true
        }
    },
    drawing: [],
    elements: {}
};
var backpackGUI = new UI.StandartWindow(backpackGUIObj);

Saver.addSavesScope("BackpacksScope",
    function read(scope) {
        BackpackRegistry.save = scope;
    },

    function save() {
        return BackpackRegistry.save;
    }
);

var BackpackRegistry = {
    save: {
        uniqueID: 0,
        backpacks: {}
    },
    prototypes: {},
    temp: false,
    openedUI: null,
    openedBackpack: null,

    getPrototypeByID: function (id) {

        for (key in this.prototypes) {
            if (this.prototypes[key].id == id || this.prototypes[key].id_locked == id) {
                return this.prototypes[key];
            }
        }

    },

    getItemIDFromMode: function (id, mode) {
        var proto = this.getPrototypeByID(id);
        switch (mode) {
            case 0:
                return proto.id;
                break;
            case 1:
                return proto.id_locked;
                break;
        }
    },

    checkBackpacksSlots: function () {

        var pos = Player.getPosition();
        for (var i in this.openedUI.slots) {
            if (this.openedUI.slots[i].id && !this.getPrototypeByID(this.openedBackpack.id).isValidItem(this.getPrototypeByID(this.openedBackpack.id), this.openedUI.getSlot(i))) {
                this.openedUI.dropSlot(i, pos.x + 0.5, pos.y + 0.5, pos.z + 0.5);
            }
        }

    },

    onBackpackUse: function (item) {
        if (!this.save["backpacks"]) {
            this.save["backpacks"] = {};
        }
        if (typeof this.save.uniqueID === 'undefined') {
            this.save.uniqueID = 0;
        }
        if (item.data === 0 || !this.save["backpacks"][item.data]) {
            item.data = ++this.save.uniqueID;
            this.save["backpacks"][this.save.uniqueID] = {};
            this.save["backpacks"][this.save.uniqueID]["container"] = new UI.Container().save();
            Player.setCarriedItem(item.id, 1, item.data);
            this.onBackpackUse(item);
        } else {
            this.openedUI = new UI.Container();
            this.openedUI.read(this.save["backpacks"][item.data]["container"]);

            backpackGUIObj.elements = {};
            var slotsInRow = 0;
            var xp = 320;
            var yp = 40;
            for (var i = 0; i < this.getPrototypeByID(item.id).slots; i++) {
                backpackGUIObj.elements["slot" + i] = {type: "slot", x: xp, y: yp};
                xp += 61;
                slotsInRow++;
                if (slotsInRow === 10) {
                    xp = 320;
                    yp += 61;
                    slotsInRow = 0;
                }
            }

            backpackGUIObj.standart.minHeight = yp + 60;

            this.openedUI.openAs(backpackGUI);
            this.openedBackpack = item;
            this.temp = true;
        }

    },

    register: function (arg) {

        IDRegistry.genItemID(arg.codeName);
        Item.createItem(arg.codeName, arg.name, {name: arg.codeName, meta: 0}, {stack: 1});

        arg.id = ItemID[arg.codeName];
        arg.isValidItem || (arg.isValidItem = function (b, item) {
            for (var key in b.blocks) {
                var g = b.blocks[key];
                if (item.id === g.id && (g.data === -1 || g.data === item.data)) {
                    return true;
                }
            }
            return false;
        });

        Item.registerUseFunctionForID(ItemID[arg.codeName], this.__func1);

        this.prototypes[arg.codeName] = arg;
    },

    __func1: function (coords, item, block) {
        BackpackRegistry.onBackpackUse(item);
    }
};