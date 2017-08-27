/*
  ______                  _                _____  ______
 |  ____|                | |              |  __ \|  ____|
 | |__ ___  _ __ ___  ___| |_ _ __ _   _  | |__) | |__
 |  __/ _ \| '__/ _ \/ __| __| '__| | | | |  ___/|  __|
 | | | (_) | | |  __/\__ \ |_| |  | |_| | | |    | |____
 |_|  \___/|_|  \___||___/\__|_|   \__, | |_|    |______|
                                    __/ |
                                   |___/
Forestry PE by Dmitriy Medvedev(https://vk.com/id331953744)
*/

importLib("energylib", "*");
var ICRenderLib = ModAPI.requireAPI("ICRenderLib");
var EU = EnergyTypeRegistry.assureEnergyType("EU", 1);

function TileRenderModel(id, data) {
    this.registerAsId = function (id, data) {
        var block = Unlimited.API.GetReal(id, data || 0);
        this.id = block.id;
        this.data = block.data;
        this.convertedId = this.id * 16 + this.data;

        if (this.convertedId) {
            ICRenderLib.registerTileModel(this.convertedId, this);
        }
        else {
            Logger.Log("tile model cannot be registred: block id is undefined or 0", "ERROR");
        }
    }

    this.cloneForId = function (id, data) {
        this.registerAsId(id, data);
    }

    this.registerAsId(id, data);

    this.boxes = [];
    this.dynamic = [];

    this.formatBox = function (x1, y1, z1, x2, y2, z2, block) {
        var M = 1.0;
        var box = [
            x1 * M, y1 * M, z1 * M,
            x2 * M, y2 * M, z2 * M,
        ];

        if (block) {
            block = Unlimited.API.GetReal(block.id, block.data);
            box.push(parseInt(block.id) || 0);
            box.push(parseInt(block.data) || 0)
        }
        else {
            box.push(-1);
            box.push(-1);
        }

        return box;
    }

    this.addBoxF = function (x1, y1, z1, x2, y2, z2, block) {
        this.boxes.push(this.formatBox(x1, y1, z1, x2, y2, z2, block));
    }

    this.addBox = function (x, y, z, size, block) {
        this.boxes.push(this.formatBox(
            x, y, z,
            (x + size.x),
            (y + size.y),
            (z + size.z),
            block
            )
        );
    }

    this.createCondition = function (x, y, z, mode) {
        var model = this;
        var condition = {
            x: x, y: y, z: z,
            mode: Math.max(0, mode || 0),

            boxes: [],

            addBoxF: function (x1, y1, z1, x2, y2, z2, block) {
                this.boxes.push(model.formatBox(x1, y1, z1, x2, y2, z2, block));
            },

            addBox: function (x, y, z, size, block) {
                this.boxes.push(model.formatBox(
                    x, y, z,
                    (x + size.x),
                    (y + size.y),
                    (z + size.z),
                    block
                    )
                );
            },

            tiles: {},
            tileGroups: [],

            addBlock: function (id, data) {
                var block = Unlimited.API.GetReal(id, data || 0);
                var convertedId = block.id * 16 + block.data;
                this.tiles[convertedId] = true;
            },

            addBlockGroup: function (name) {
                this.tileGroups.push(name);
            },

            addBlockGroupFinal: function (name) {
                var group = ICRenderLib.getConnectionGroup(name);
                for (var id in group) {
                    this.tiles[id] = true;
                }
            },

            writeCondition: function () {
                var output = parseInt(this.x) + " " + parseInt(this.y) + " " + parseInt(this.z) + " " + parseInt(this.mode) + "\n";

                for (var i in this.tileGroups) {
                    this.addBlockGroupFinal(this.tileGroups[i]);
                }

                var blocks = [];
                for (var id in this.tiles) {
                    blocks.push(id);
                }
                output += blocks.length + " " + blocks.join(" ") + "\n" + condition.boxes.length + "\n";

                for (var i in condition.boxes) {
                    output += condition.boxes[i].join(" ") + "\n";
                }

                return output;
            }
        };

        this.dynamic.push(condition);
        return condition;
    }

    this.connections = {};
    this.connectionGroups = [];
    this.connectionWidth = 0.5;
    this.hasConnections = false;

    this.setConnectionWidth = function (width) {
        this.connectionWidth = width;
    }

    this.addConnection = function (id, data) {
        var block = Unlimited.API.GetReal(id, data || 0);
        var convertedId = block.id * 16 + block.data;
        this.connections[convertedId] = true;
        this.hasConnections = true;
    }

    this.addConnectionGroup = function (name) {
        this.connectionGroups.push(name);
        this.hasConnections = true;
    }

    this.addConnectionGroupFinal = function (name) {
        var group = ICRenderLib.getConnectionGroup(name);
        for (var id in group) {
            this.connections[id] = true;
        }
    }

    this.addSelfConnection = function () {
        this.connections[this.convertedId] = true;
        this.hasConnections = true;
    }

    this.writeAsId = function (id) {
        var output = "";
        output += id + " " + (this.hasConnections ? 1 : 0) + "\n";
        output += this.boxes.length + "\n";

        for (var i in this.boxes) {
            output += this.boxes[i].join(" ") + "\n";
        }

        output += this.dynamic.length + "\n";
        for (var i in this.dynamic) {
            var condition = this.dynamic[i];
            output += condition.writeCondition();
        }

        for (var i in this.connectionGroups) {
            this.addConnectionGroupFinal(this.connectionGroups[i]);
        }

        var connections = [];
        for (var id in this.connections) {
            connections.push(id);
        }

        output += connections.length + " " + this.connectionWidth + "\n" + connections.join(" ");
        return output;
    }
}


var ICRenderLib = ModAPI.requireAPI("ICRenderLib");

if (!ICRenderLib) {
    var ICRenderLib = {
        /* model registry */
        tileModels: {},

        registerTileModel: function (convertedId, model) {
            this.tileModels[convertedId] = model;
        },

        /* output */
        writeAllData: function () {
            var output = "";
            var count = 0;
            for (var id in this.tileModels) {
                output += this.tileModels[id].writeAsId(id) + "\n\n";
                count++;
            }

            output = count + "\n\n" + output;
            FileTools.WriteText("games/com.mojang/mods/icrender", output);
        },

        /* connection groups functions */
        connectionGroups: {},

        addConnectionBlockWithData: function (name, blockId, blockData) {
            var group = this.connectionGroups[name];
            if (!group) {
                group = {};
                this.connectionGroups[name] = group;
            }

            var block = Unlimited.API.GetReal(blockId, blockData);
            group[block.id * 16 + block.data] = true;
        },

        addConnectionBlock: function (name, blockId) {
            for (var data = 0; data < 16; data++) {
                this.addConnectionBlockWithData(name, blockId, data);
            }
        },

        addConnectionGroup: function (name, blockIds) {
            for (var i in blockIds) {
                this.addConnectionBlock(name, blockIds[i]);
            }
        },

        getConnectionGroup: function (name) {
            return this.connectionGroups[name];
        },


        /* standart models */
        registerAsWire: function (id, connectionGroupName, width) {
            width = width || 0.5;

            var model = new TileRenderModel(id, 0);
            model.addConnectionGroup(connectionGroupName);
            model.addSelfConnection();
            model.setConnectionWidth(width);
            model.addBox(.5 - width / 2.0, .5 - width / 2.0, .5 - width / 2.0, {
                x: width,
                y: width,
                z: width,
            });

            this.addConnectionBlock(connectionGroupName, id);
        }
    };


    ModAPI.registerAPI("ICRenderLib", ICRenderLib);
    Callback.addCallback("PostLoaded", function () {
        ICRenderLib.writeAllData();
    });
    Logger.Log("ICRender API was created and shared by " + __name__ + " with name ICRenderLib", "API");
}