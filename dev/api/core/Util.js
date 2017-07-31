var Util = {
    objectUnion: function () {
        var obj = {};
        for (var key in arguments) {
            var n = arguments[key];
            if (typeof n !== "object" && !this.isArray(n)) {
                continue;
            }
            for (var key2 in n) {
                if (typeof n[key2] === "object" && !this.isArray(n[key2])) {
                    obj[key2] = this.objectUnion(obj, n[key2]);
                    continue;
                }
                obj[key2] = n[key2];
            }
        }
        return obj;
    },

    isArray: function (arr) {
        return "length" in arr ? true : false;
    },

    getBlocksInRange: function (coords, range, block, skip) {
        return this.getBlocksInRange2(coords, range, [block], skip);
    },

    getBlocksInRange2: function (coords, range, blockList, skip) {
        var arr = [];

        for (var xx = coords.x - range.x; xx < coords.x + range.x; xx++) {
            for (var yy = coords.y - range.y; yy < coords.y + range.y; yy++) {
                for (var zz = coords.z - range.z; zz < coords.z + range.z; zz++) {
                    var b = World.getBlock(xx, yy, zz);
                    if (!blockList || this.existsBlockInList(b, blockList)) {
                        var o = {
                            x: xx,
                            y: yy,
                            z: zz,
                            block: b
                        };
                        arr.push(o);
                        if (skip) return o;
                    }
                }
            }
        }

        return arr;
    },

    existsBlockInList: function (block, list) {
        for (var key in list) {
            var k = list[key];
            if (k.id == block.id && (k.data == block.data || k.data == -1)) {
                return true;
            }
        }
    }
};