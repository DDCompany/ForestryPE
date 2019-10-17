/**
 ItemPipes lib
 © SWCorp
 **/

LIBRARY({
    name: "Pipe",
    version: 3,
    shared: true,
    api: "CoreEngine",
    dependencies: []
});

var Pipe = {
    item: new GameObject("fc_item", {
        init: function () {
            this.position = {x: 0, y: 0, z: 0};
            this.target = {x: 0, y: 0, z: 0};
            this.item = {id: 0, data: 0, count: 0};
            this.direction = {x: 0, y: 0, z: 0};
            this.nbt = {};
            this.velocity = 0.02;
            this.friction = 0;
        },
        update: function () {
            if (this.move()) {
                this.pathfinder();
            }
            var x = Math.floor(this.position.x);
            var y = Math.floor(this.position.y);
            var z = Math.floor(this.position.z);
            var id = World.getBlockID(x, y, z);
            var container = World.getContainer(x, y, z);

            if (container) {
                if (container.tileEntity) {
                    if (container.tileEntity.setPipeFunctions) {
                        container.tileEntity.setPipeFunctions(this);
                    }
                }
            }
            this.moveAnimation()
            if (this.item.count < 1) {
                this.destroySelf();
            }
            if (id == 0) {
                World.drop(this.position.x, this.position.y, this.position.z, this.item.id, this.item.count, this.item.data);
                this.destroySelf();
            }
        },

        destroySelf: function () {
            this.animation.destroy()
            this.destroy();
        },

        setFriction: function (vel) {
            this.friction = vel;
        },
        setVelocity: function (vel) {
            this.velocity = vel;
        },

        turnBack: function () {
            this.target = {
                x: Math.floor(this.position.x) - this.direction.x,
                y: Math.floor(this.position.y) - this.direction.y,
                z: Math.floor(this.position.z) - this.direction.z
            }
        },

        setItem: function (item) {
            this.item = item;
            this.animate();
        },
        setPosition: function (pos) {
            this.position = pos;
            this.direction = {x: 0, y: 0, z: 0}
        },
        setTarget: function (pos) {
            this.target = pos;
        },

        //animation
        animate: function () {
            var OFFSET = .5;
            if (this.animation) {
                this.animation.destroy();
                this.animation = null;
            }
            this.animation = new Animation.Item(this.position.x + OFFSET, this.position.y + OFFSET, this.position.z + OFFSET);
            this.animation.describeItem({
                id: this.item.id,
                count: 1,
                data: this.item.data,
                size: .25,
                rotation: "x"
            }, {
                x: -OFFSET,
                y: -OFFSET,
                z: -OFFSET,
            });
            this.animation.load();
        },
        moveAnimation: function () {
            var OFFSET = .5;
            if (this.animation) this.animation.setPos(this.position.x + OFFSET, this.position.y + OFFSET, this.position.z + OFFSET);
        },

        //move
        move: function () {
            var dvelocity = Math.min(.5, Math.max(.02, this.velocity - this.friction || 0));
            if (this.target && dvelocity) {
                var delta = {
                    x: this.target.x - this.position.x,
                    y: this.target.y - this.position.y,
                    z: this.target.z - this.position.z,
                };
                var dis = Math.sqrt(delta.x * delta.x + delta.y * delta.y + delta.z * delta.z);
                this.direction = {
                    x: Math.floor(delta.x / dis + .5) || 0,
                    y: Math.floor(delta.y / dis + .5) || 0,
                    z: Math.floor(delta.z / dis + .5) || 0,
                };
                var move = Math.min(dis, dvelocity) / dis || 0;
                this.position.x += delta.x * move;
                this.position.y += delta.y * move;
                this.position.z += delta.z * move;
                return dis <= dvelocity;
            }
            return true;
        },
        pathfinder: function () {
            var containers = Pipe.findContainers(this.position.x, this.position.y, this.position.z);
            var resC = Pipe.filterDirections(containers, this.direction);
            var cpipe = Pipe.isPipe(World.getBlockID(this.position.x, this.position.y, this.position.z)) || {};
            if (resC) {
                var dir = resC[parseInt(Math.random() * resC.length)]
                if (dir) {
                    var container = World.getContainer(Math.floor(this.position.x) + dir.x, Math.floor(this.position.y) + dir.y, Math.floor(this.position.z) + dir.z);
                    if (container && !cpipe.stopContainerAdding) this.addToContainer(container);
                }
            }

            var path = Pipe.findPath(this);
            var dir;
            if (path) {
                dir = path[parseInt(Math.random() * path.length)]
            } else {
                dir = this.direction
            }
            try {
                this.target = {
                    x: Math.floor(this.position.x) + dir.x,
                    y: Math.floor(this.position.y) + dir.y,
                    z: Math.floor(this.position.z) + dir.z
                }
            } catch (e) {
            }
        },

        addToContainer: function (container) {
            var tileEntity = container.tileEntity;
            var slots = [];
            var slotsInitialized = false;
            var notNative = container.isContainer;
            if (tileEntity) {
                if (tileEntity.addTransportedItem) {
                    tileEntity.addTransportedItem(this, this.item, this.direction);
                    return;
                }
                if (tileEntity.getTransportSlots) {
                    slots = tileEntity.getTransportSlots().input || [];
                    slotsInitialized = true;
                }
                if (tileEntity.getTransportSlotsInput) {
                    slotsInitialized = true;
                    var d = tileEntity.getTransportSlotsInput();
                    var p = {
                        x: Math.floor(this.position.x),
                        y: Math.floor(this.position.y),
                        z: Math.floor(this.position.z)
                    }
                    for (var i in (d.directions)) {
                        var dir = d.directions[i];
                        if (tileEntity.x + dir.x == p.x && tileEntity.y + dir.y == p.y && tileEntity.z + dir.z == p.z) {
                            slots = d.slots || [];
                            slotsInitialized = true;
                        }
                    }
                }
            }
            if (!slotsInitialized) {
                if (notNative) {
                    for (var name in container.slots) {
                        slots.push(name);
                    }
                } else {
                    for (var index = 0; index < container.getSize(); index++) {
                        slots.push(index);
                    }
                }
            }
            for (var i in slots) {
                var slot = container.getSlot(slots[i]);
                if (this.item.count <= 0) {
                    break;
                }
                if (slot.id == 0 || slot.id == this.item.id && slot.data == this.item.data) {
                    var maxStack = slot.id > 0 ? Item.getMaxStack(slot.id) : 64;
                    var add = Math.min(maxStack - slot.count, this.item.count);
                    this.item.count -= add;
                    slot.count += add;
                    slot.id = this.item.id;
                    slot.data = this.item.data;
                    if (!notNative)
                        container.setSlot(i, slot.id, slot.count, slot.data);
                }
            }
            if (notNative) container.validateAll();
        }
    }),

    pipes: {},
    nativeContainer: {
        54: true,
        61: true,
        62: true,
        154: true
    },
    registerTile: function (id, proto) {
        !proto ? proto = {} : null;
        !proto.friction ? proto.friction = 0 : null;
        this.pipes[id] = proto;
    },
    isPipe: function (id) {
        return this.pipes[id] || false;
    },

    canUseTile: function (tile) {
        if (tile.getTransportSlots || tile.getTransportSlotsInput || tile.getTransportSlotsOutput || tile.addTransportedItem || tile.getTransportedItem) return true
        return false;
    },

    canConnectTo: function (x, y, z, s) {
        var id = World.getBlockID(x, y, z);
        var container = World.getContainer(x, y, z);

        if (this.isPipe(id)) return true
        if (!s && this.nativeContainer[id]) return true
        if (!s && container) {
            if (container.tileEntity) {
                if (this.canUseTile(container.tileEntity)) return true
            }
        }
        return false
    },

    directions: [
        {x: 0, y: 0, z: -1},
        {x: 0, y: 0, z: 1},
        {x: -1, y: 0, z: 0},
        {x: 1, y: 0, z: 0},
        {x: 0, y: -1, z: 0},
        {x: 0, y: 1, z: 0}
    ],

    findDirections: function (x, y, z, s) {
        var possible = [];
        for (var i in this.directions) {
            var dir = this.directions[i];
            if (this.isPipe(World.getBlockID(x + dir.x, y + dir.y, z + dir.z))) possible.push(dir);
        }
        return possible
    },
    findContainers: function (x, y, z, s) {
        var possible = [];
        for (var i in this.directions) {
            var dir = this.directions[i];
            if (!this.isPipe(World.getBlockID(x + dir.x, y + dir.y, z + dir.z)) && this.canConnectTo(x + dir.x, y + dir.y, z + dir.z, s)) possible.push(dir);
        }
        return possible
    },
    filterDirections: function (list, dir) {
        var possible = [];
        for (var i in list) {
            var current = list[i];
            if (!(current.x == -dir.x && current.y == -dir.y && current.z == -dir.z)) {
                possible.push(current)
            }
        }
        return possible
    },
    findPath: function (item) {
        var pos = item.position;
        var dir = item.direction;
        var id = World.getBlockID(pos.x, pos.y, pos.z);
        var pipe = this.isPipe(id);

        this.setupNativePipeFunctions(item);
        var list = this.findDirections(pos.x, pos.y, pos.z);
        var res = this.filterDirections(list, dir);
        var container = World.getContainer(pos.x, pos.y, pos.z);
        if (container) {
            if (container.tileEntity) {
                if (container.tileEntity.getTransportingDirections) {
                    res = container.tileEntity.getTransportingDirections(item);
                }
            }
        }
        if (pipe && pipe.getTransportingDirections) {
            res = pipe.getTransportingDirections(item);
        }
        return res
    },
    setupNativePipeFunctions: function (item) {
        var id = World.getBlockID(item.position.x, item.position.y, item.position.z);
        var pipe = this.isPipe(id);
        if (pipe) {
            var friction = item.friction;
            item.setFriction(Math.min(0, friction + pipe.friction));
        }
    }
};

EXPORT("Pipe", Pipe);