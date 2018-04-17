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
        for (let index in DIRECTIONS) {
            let dir = DIRECTIONS[index];
            let blockId = World.getBlockID(this.x + dir.x, this.y + dir.y, this.z + dir.z);

            if (blockId === 8 || blockId === 9)
                return true;
        }
    }
});

Block.setRandomTickCallback(BlockID.bog, function (x, y, z) {
    let tile = World.getTileEntity(x, y, z);

    if (tile === null)
        tile = TileEntity.addTileEntity(x, y, z);

    tile.increaseMaturity();
});