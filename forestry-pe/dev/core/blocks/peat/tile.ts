TileEntity.registerPrototype(BlockID.bog, {
    useNetworkItemContainer: true,

    defaultValues: {
        maturity: 0
    },

    increaseMaturity() {
        if (!this.isMoistened()) {
            return;
        }

        this.data.maturity++;

        if (this.data.maturity >= 3) {
            this.blockSource.setBlock(this.x, this.y, this.z, BlockID.blockPeat, 0);
        }
    },

    isMoistened() {
        for (let xx = this.x - 1; xx <= this.x + 1; xx++) {
            for (let zz = this.z - 1; zz <= this.z + 1; zz++) {
                let blockId = this.blockSource.getBlockId(xx, this.y, zz);

                if (blockId === 8 || blockId === 9) {
                    return true;
                }
            }
        }

        return false;
    }
});

Block.setRandomTickCallback(BlockID.bog, (x, y, z) => {
    let tile = World.getTileEntity(x, y, z);

    if (tile === null)
        tile = TileEntity.addTileEntity(x, y, z);

    (tile as any).increaseMaturity();
});