class ApiaryRegistry {
    static readonly blockIDs: number[] = [];

    static register(id: number) {
        this.blockIDs.push(id);
        Item.addCreativeGroup(GROUP_ALVEARY, GROUP_ALVEARY_NAME, [id]);
    }

    static isApiaryComponent(id: number): boolean {
        return this.blockIDs.indexOf(id) > -1;
    }

    static isValidStructure(blockSource: BlockSource, x: number, y: number, z: number) {
        for (let xx = 0; xx < 3; xx++) {
            for (let yy = 0; yy < 3; yy++) {
                for (let zz = 0; zz < 3; zz++) {
                    const block = blockSource.getBlockId(xx + x, yy + y, zz + z);
                    if (!this.isApiaryComponent(block)) {
                        return false;
                    }
                }
            }
        }

        for (let xx = 0; xx < 3; xx++) {
            for (let zz = 0; zz < 3; zz++) {
                const block = blockSource.getBlockId(xx + x, y + 3, zz + z);
                if (block != VanillaBlockID.double_stone_slab && block != VanillaBlockID.wooden_slab) {
                    return false;
                }
            }
        }

        return true;
    }
}