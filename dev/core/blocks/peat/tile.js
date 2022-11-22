TileEntity.registerPrototype(BlockID.bog, {
    defaultValues: {
        maturity: 0
    },

    increaseMaturity: function () {
        if (!this.isMoistened())
            return;

        this.data.maturity++;

        if (this.data.maturity >= 3)
            World.setBlock(this.x, this.y, this.z, BlockID.blockPeat);

    },

    isMoistened: function () {
        for (let xx = this.x - 1; xx <= this.x + 1; xx++) {
            for (let zz = this.z - 1; zz <= this.z + 1; zz++) {
                let blockId = World.getBlockID(xx, this.y, zz);

                if (blockId === 8 || blockId === 9)
                    return true;
            }
        }
    }
});

Block.setRandomTickCallback(BlockID.bog, function (x, y, z) {
    let tile = World.getTileEntity(x, y, z);

    if (tile === null)
        tile = TileEntity.addTileEntity(x, y, z);

    tile.increaseMaturity();
});