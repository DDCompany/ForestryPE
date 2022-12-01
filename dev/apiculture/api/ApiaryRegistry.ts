class ApiaryRegistry {
    static readonly blockIDs: number[] = [];
    static readonly slabIDs: number[] = [];

    static register(id: number) {
        this.blockIDs.push(id);
        Item.addCreativeGroup(GROUP_ALVEARY, GROUP_ALVEARY_NAME, [id]);
    }

    static isApiaryComponent(id: number): boolean {
        return this.blockIDs.indexOf(id) > -1;
    }

    static addAllSlabs(...ids: number[]) {
        for (const id of ids) {
            this.slabIDs.push(id);
        }
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
                if (this.slabIDs.indexOf(block) == -1) {
                    return false;
                }
            }
        }

        return true;
    }
}

ApiaryRegistry.addAllSlabs(
    VanillaTileID.blackstone_slab,
    VanillaTileID.crimson_slab,
    VanillaTileID.polished_blackstone_brick_slab,
    VanillaTileID.polished_blackstone_slab,
    VanillaTileID.stone_slab,
    VanillaTileID.stone_slab2,
    VanillaTileID.stone_slab3,
    VanillaTileID.stone_slab4,
    VanillaTileID.warped_slab,
    VanillaTileID.wooden_slab,
);