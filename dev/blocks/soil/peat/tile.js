TileEntity.registerPrototype(BlockID.bog, {

    defaultValues: {
        CYCLE: 28 * 20,
        cyclen: 0,
        commmonTime: 0,
        counter: 0
    },

    tick: function () {
        if ((World.getBlockID(this.x + 1, this.y, this.z) == 8 || World.getBlockID(this.x + 1, this.y, this.z) == 9) ||
            (World.getBlockID(this.x - 1, this.y, this.z) == 8 || World.getBlockID(this.x - 1, this.y, this.z) == 9) ||
            (World.getBlockID(this.x, this.y, this.z + 1) == 8 || World.getBlockID(this.x, this.y, this.z + 1) == 9) ||
            (World.getBlockID(this.x, this.y, this.z - 1) == 8 || World.getBlockID(this.x, this.y, this.z - 1) == 9) ||
            (World.getBlockID(this.x, this.y + 1, this.z) == 8 || World.getBlockID(this.x, this.y + 1, this.z) == 9) ||
            (World.getBlockID(this.x, this.y - 1, this.z) == 8 || World.getBlockID(this.x, this.y + 1, this.z) == 9)) {
            this.data.cyclen++;
            this.data.commmonTime++;
            if (this.data.cyclen >= this.data.CYCLE) {
                this.data.cyclen = 0;
                if (Math.random() < 0.07) {
                    this.data.counter++;
                }
                if (this.data.counter == 3 || this.data.commmonTime >= 39200) {
                    World.setBlock(this.x, this.y, this.z, BlockID.blockPeat)
                }
            }
        }
    }
});