var ApiaryRegistry = {
    blockIDs: [],

    register: function (id) {
        this.blockIDs.push(id);
        Item.addCreativeGroup(GROUP_ALVEARY, GROUP_ALVEARY_NAME, [id]);
    },

    isApiaryComponent: function (id) {
        return this.blockIDs.indexOf(id) > -1;
    },

    isValidStructure: function (x, y, z) {

        var gb = World.getBlock;

        for (var xx = 0; xx < 3; xx++) {
            for (var yy = 0; yy < 3; yy++) {
                for (var zz = 0; zz < 3; zz++) {
                    var block = gb(xx + x, yy + y, zz + z).id;
                    if (!this.isApiaryComponent(block)) {
                        return false;
                    }
                }
            }
        }

        for (var xx = 0; xx < 3; xx++) {
            for (var zz = 0; zz < 3; zz++) {
                var block = gb(xx + x, y + 3, zz + z).id;
                if (block != 44 && block != 158) {
                    return false;
                }
            }
        }

        return true;
    }

};