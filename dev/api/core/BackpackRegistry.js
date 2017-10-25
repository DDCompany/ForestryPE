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
        containers: {}
    },
    prototypes: {},
    temp: false,
    openedUI: null,
    guis: {},

    checkBackpacksSlots: function () {

        var pos = Player.getPosition();
        var proto = this.prototypes[this.openedBackpack];
        for (var i in this.openedUI.slots) {
            if (this.openedUI.slots[i].id && !proto.isValidItem(proto, this.openedUI.getSlot(i))) {
                this.openedUI.dropSlot(i, pos.x + 0.5, pos.y + 0.5, pos.z + 0.5);
            }
        }

    },

    onBackpackUse: function (item) {
        if (!this.save["containers"]) {
            this.save["containers"] = {};
        }
        if (typeof this.save.uniqueID === 'undefined') {
            this.save.uniqueID = 0;
        }

        if (item.data === 0 || !this.save["containers"]["b" + item.data]) {
            var u = ++this.save.uniqueID;
            this.save["containers"]["b" + u] = new UI.Container();
            Player.setCarriedItem(item.id, 1, u);
            item.data = u;
            this.onBackpackUse(item);
        } else {
            this.openedUI = this.save["containers"]["b" + item.data];
            this.openedUI.openAs(this.guis[this.prototypes[item.id].slots]);
            this.temp = true;
        }

    },

    register: function (arg) {

        IDRegistry.genItemID(arg.codeName);
        Item.createItem(arg.codeName, arg.name, {name: arg.codeName, meta: 0}, {stack: 1});

        if (!this.guis[arg.slots]) {
            var obj = new UI.StandartWindow({
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
                    },
                    minHeight: 90 + (arg.slots / 10 * 61) + 70
                },
                drawing: [],
                elements: {}
            });

            var xp = 345;
            var yp = 90;

            obj.content.elements["addBtn"] = {
                type: "button", x: 345, y: 40, bitmap: "backpack_0", scale: 3, clicker: {
                    onClick: function (container) {
                        var proto = BackpackRegistry.prototypes[BackpackRegistry.openedBackpack];
                        for (var i = 0; i < 36; i++) {
                            var invs = Player.getInventorySlot(i);
                            if (invs.id && proto.isValidItem(proto, invs)) {
                                for (var k = 1; k <= arg.slots; k++) {
                                    var slot = container.getSlot("slot" + k);
                                    if (!slot.id) {
                                        slot.id = invs.id;
                                        slot.data = invs.data;
                                        slot.count = invs.count;

                                        Player.setInventorySlot(i, 0, 0, 0);
                                        break;
                                    } else if (slot.id === invs.id && slot.data === invs.data) {
                                        var consume = Math.min(Item.getMaxStack(slot.id) - slot.count, invs.count);
                                        slot.count += consume;
                                        invs.count -= consume;
                                        Player.setInventorySlot(i, invs.id, invs.count, invs.data);
                                        if (invs.count === 0) break;
                                    }

                                }
                            }
                        }
                    }
                }
            };

            obj.content.elements["consumeBtn"] = {
                type: "button", x: 395, y: 40, bitmap: "backpack_1", scale: 3, clicker: {
                    onClick: function (container) {

                        for (var i = 1; i <= arg.slots; i++) {
                            var slot = container.getSlot("slot" + i);
                            if (slot.id) {
                                for (var k = 0; k < 36; k++) {
                                    var invs = Player.getInventorySlot(k);
                                    if (!invs.id) {
                                        Player.setInventorySlot(k, slot.id, slot.count, slot.data);
                                        container.clearSlot("slot" + i);
                                    } else if (slot.id === invs.id && slot.data === invs.data) {
                                        var consume = Math.min(Item.getMaxStack(invs.id) - invs.count, slot.count);

                                        Player.setInventorySlot(k, invs.id, invs.count + consume, invs.data);
                                        slot.count -= consume;
                                        if (slot.count === 0) {
                                            container.validateSlot("slot" + i);
                                            break;
                                        }

                                    }

                                }
                            }
                        }
                    }
                }
            };

            for (var i = 1; i <= arg.slots; i++) {
                obj.content.elements["slot" + i] = {type: "slot", x: xp, y: yp};
                xp += 61;
                if (i % 10 === 0) {
                    xp = 345;
                    yp += 61;
                }
            }

            this.guis[arg.slots] = obj;
        }

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

        Item.registerUseFunctionForID(arg.id, function (coords, item) {
            if (World.getBlockID(coords.x, coords.y, coords.z) === 54) {
                var container = World.getContainer(coords.x, coords.y, coords.z);
                var bcontainer = BackpackRegistry.save["containers"]["b" + item.data];

                for (var i = 1; i <= BackpackRegistry.prototypes[item.id].slots; i++) {
                    var slot = bcontainer.getSlot("slot" + i);
                    if (slot.id) {
                        for (var k = 0; k < container.getSize(); k++) {
                            var conts = container.getSlot(k);
                            if (!conts.id) {
                                container.setSlot(k, slot.id, slot.count, slot.data);
                                bcontainer.clearSlot("slot" + i);
                                break;
                            } else if (conts.id === slot.id && conts.data === slot.data) {
                                var consume = Math.min(Item.getMaxStack(conts.id) - conts.count, slot.count);
                                slot.count -= consume;
                                container.setSlot(k, conts.id, conts.count + consume, conts.data);
                                if (slot.count === 0) {
                                    bcontainer.validateSlot("slot" + i);
                                    break;
                                }
                            }
                        }
                    }

                }

            } else {
                BackpackRegistry.openedBackpack = item.id;
                BackpackRegistry.onBackpackUse(item);
            }
        });

        this.prototypes[arg.id] = arg;
    }
};