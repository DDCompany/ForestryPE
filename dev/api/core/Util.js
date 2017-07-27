var Util = {
    objectUnion: function (objs) {
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
    }
};