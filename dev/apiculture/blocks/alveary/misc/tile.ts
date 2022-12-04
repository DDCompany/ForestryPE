TileEntity.registerPrototype(BlockID.alvearyMisc, {
    useNetworkItemContainer: true,
    click(id, count, data, coords, player) {
        if (Entity.getSneaking(player)) {
            return false;
        }

        const blockSource = BlockSource.getDefaultForActor(player);
        if (!blockSource) {
            return false;
        }

        for (const dir of directions) {
            const x = this.x + dir.x;
            const y = this.y + dir.y;
            const z = this.z + dir.z;
            if (this.blockSource.getBlockID(x, y, z) === BlockID.alvearyController) {
                const tile = World.getTileEntity(x, y, z, blockSource);
                if (tile) {
                    const client = Network.getClientForPlayer(player);
                    tile.container.openFor(client, "main");
                    break;
                }
            }
        }

        return true;
    }
});