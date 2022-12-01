interface HiveGeneratorProto {
    chance: number;

    species?: string;

    dimension?: EDimension;

    generate: (
        x: number,
        z: number,
    ) => boolean;
}

class HiveGenerator {
    private static readonly generators: HiveGeneratorProto[] = [];

    static register(generator: HiveGeneratorProto) {
        if (generator.chance <= 0) {
            summonException("Chance is not correct! (Hive Generator Registration)");
            return;
        }

        if (!generator.generate) {
            summonException("Generate function is not correct! (Hive Generator Registration)");
            return;
        }

        if (generator.species && !BeeRegistry.getBeeByType(generator.species)) {
            summonException("Species is not correct! (Hive Generator Registration)");
            return;
        }

        this.generators.push(generator);
    }

    static genChunk(blockSource: BlockSource, chunkX: number, chunkZ: number, dimension: EDimension) {
        const hivesAmount = this.generators.length;
        for (let tries = 0; tries < hivesAmount / 2; tries++) {
            const coords = GenerationUtils.randomXZ(chunkX, chunkZ);
            const temperature = Habitat.getTemperatureAt(blockSource, coords.x, 0, coords.z);
            const humidity = Habitat.getHumidityAt(blockSource, coords.x, 0, coords.z);

            for (const key in HiveGenerator.generators) {
                const generator = HiveGenerator.generators[key];

                const requiredDimension = generator.dimension || EDimension.NORMAL;
                if (requiredDimension !== dimension) {
                    continue;
                }

                if (generator.species) {
                    const species = BeeRegistry.getBeeByType(generator.species);
                    if (!species) {
                        continue;
                    }

                    if (!species.isValidTemperature(temperature) || !species.isValidHumidity(humidity)) {
                        continue;
                    }
                }

                if (generator.chance * hivesAmount / 8 >= Math.random() * 100 && generator.generate(coords.x, coords.z)) {
                    return;
                }
            }
        }
    }

    static genHive(x: number, z: number, blockId: number, blockData: number, grounds?: [number, number][]) {
        const y = GenerationUtils.findHighSurface(x, z).y;

        if (World.getBlockID(x, y + 1, z) !== 0)
            return;

        if (grounds) {
            let validGround = false;
            const block = World.getBlock(x, y, z);

            for (const key in grounds) {
                const ground = grounds[key];

                if (ground[0] === block.id && (ground[1] === -1 || ground[1] === block.data)) {
                    validGround = true;
                    break;
                }
            }

            if (!validGround)
                return;
        }

        World.setBlock(x, y + 1, z, blockId, blockData || 0);
    }

    static genTreeHive(x: number, z: number, blockId: number, blockData: number): boolean {
        let y = 128;
        let prevIsTreeBlock = false;
        while (y > 20) {
            const id = World.getBlockID(x, y, z);
            const isTreeBlock = this.isTreeBlock(id);

            if (prevIsTreeBlock && !isTreeBlock) {
                World.setBlock(x, y, z, blockId, blockData);
                return true;
            } else prevIsTreeBlock = isTreeBlock;
            y--;
        }

        return false;
    }

    private static isTreeBlock(blockId: number): boolean {
        switch (blockId) {
            case 17:
            case 18:
            case 161:
            case 162:
                return true;
        }

        return false;
    }
}

Callback.addCallback("GenerateChunk", (chunkX, chunkZ) => {
    const region = BlockSource.getCurrentWorldGenRegion();
    if (!region) return;

    HiveGenerator.genChunk(region, chunkX, chunkZ, EDimension.NORMAL);
});

Callback.addCallback("GenerateEndChunk", (chunkX, chunkZ) => {
    const region = BlockSource.getCurrentWorldGenRegion();
    if (!region) return;

    HiveGenerator.genChunk(region, chunkX, chunkZ, EDimension.END);
});

Callback.addCallback("GenerateNetherChunk", (chunkX, chunkZ) => {
    const region = BlockSource.getCurrentWorldGenRegion();
    if (!region) return;

    HiveGenerator.genChunk(region, chunkX, chunkZ, EDimension.NETHER);
});