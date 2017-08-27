var ApiaryRegistry = {
    blockIDs: [],

    register: function (id) {
        this.blockIDs.push(id);
    },

    isApiaryComponent: function (id) {
        return this.blockIDs.indexOf(id) > -1 ? this.blockIDs.indexOf(id) > -1 : id + "!=";
    },

    isValidStructure: function (x, y, z) {

        for (var xx = 0; xx < 3; xx++) {
            for (var yy = 0; yy < 3; yy++) {
                for (var zz = 0; zz < 3; zz++) {
                    var block = World.getBlock(xx + x, yy + y, zz + z).id;
                    if (!this.isApiaryComponent(block)) {
                        Debug.message(this.isApiaryComponent(block));
                        Debug.message(xx + " " + yy + " " + zz + " " + block + (typeof block));
                        return false;
                    }
                }
            }
        }

        /*for (var xx = 0; xx < 3; xx++) {
            for (var zz = 0; zz < 3; zz++) {
                var block = World.getBlock(xx + x, y + 3, zz + z).id;
                if (block != 44) {
                    Debug.message("ff"+xx+" "+(y + 3)+" "+zz+" "+block + (typeof block));
                    return false;
                }
            }
        }*/

        return true;
    }

};