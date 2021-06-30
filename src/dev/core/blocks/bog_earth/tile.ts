interface ITileDataBogEarth {
    maturity: number,
    ticks: number
}

@Tile(BlockID.earthBog)
class TileBogEarth extends ModdedTileEntity<ITileDataBogEarth> {
    defaultValues = {
        maturity: 0,
        ticks: 1,
    };

    tick() {
        if (this.data.ticks % 500 === 0 && this.isMaturated() && Math.random() <= 1 / 13) {
            if (++this.data.maturity === 3) {
                this.blockSource.setBlock(this.x, this.y, this.z, BlockID.peat, 0);
            }
        }

        this.data.ticks++;
    }

    isMaturated() {
        for (let xx = this.x - 1; xx <= this.x + 1; xx++) {
            for (let zz = this.z - 1; zz <= this.z + 1; zz++) {
                const blockId = this.blockSource.getBlockId(xx, this.y, zz);
                if (blockId === VanillaBlockID.water || blockId === VanillaBlockID.flowing_water) {
                    return true;
                }
            }
        }

        return false;
    }
}