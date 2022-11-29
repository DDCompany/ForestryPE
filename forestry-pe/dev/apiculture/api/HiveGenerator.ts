interface HiveGeneratorProto {
    chance: number;

    biomes?: number[];

    dimension: EDimension | Native.Dimension | number;

    generate: (
        x: number,
        z: number,
        dimension: EDimension | Native.Dimension | number,
        climate: number,
        humidity: number,
        biome: number,
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

        this.generators.push(generator);
    }

    static genChunk(chunkX: number, chunkZ: number, dimension: EDimension | Native.Dimension | number) {
        for (let tries = 0; tries < 4; tries++) {
            const coords = GenerationUtils.randomXZ(chunkX, chunkZ);
            const biome = World.getBiome(coords.x, coords.z);
            const climate = BiomeHelper.getBiomeClimate(biome);
            const humidity = BiomeHelper.getBiomeHumidity(biome);

            for (const key in HiveGenerator.generators) {
                const generator = HiveGenerator.generators[key];

                if (generator.dimension && generator.dimension !== dimension)
                    continue;

                if (generator.biomes && generator.biomes.indexOf(biome) === -1)
                    continue;

                if (Math.random() <= generator.chance && generator.generate(coords.x, coords.z, dimension, climate, humidity, biome))
                    return;
            }
        }
    }

    static genChunkDebug(chunkX: number, chunkZ: number, dimension: EDimension | Native.Dimension | number) {
        for (let xOffset = 0; xOffset < 16; xOffset++) {
            for (let zOffset = 0; zOffset < 16; zOffset++) {
                const x = 16 * chunkX + xOffset;
                const z = 16 * chunkZ + zOffset;
                const biome = World.getBiome(x, z);
                const climate = BiomeHelper.getBiomeClimate(biome);
                const humidity = BiomeHelper.getBiomeHumidity(biome);

                for (const key in HiveGenerator.generators) {
                    const generator = HiveGenerator.generators[key];

                    if (generator.dimension && generator.dimension !== dimension)
                        continue;

                    if (generator.biomes && generator.biomes.indexOf(biome) === -1)
                        continue;

                    if (Math.random() <= generator.chance)
                        generator.generate(x, z, dimension, climate, humidity, biome)
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

if (ForestryConfig.genBeehivesDebug) {
    Callback.addCallback("GenerateChunk", (chunkX, chunkZ) => {
        HiveGenerator.genChunkDebug(chunkX, chunkZ, Dimension.NORMAL);
    });

    Callback.addCallback("GenerateEndChunk", (chunkX, chunkZ) => {
        HiveGenerator.genChunkDebug(chunkX, chunkZ, Dimension.END);
    });

    Callback.addCallback("GenerateNetherChunk", (chunkX, chunkZ) => {
        HiveGenerator.genChunkDebug(chunkX, chunkZ, Dimension.NETHER);
    });
} else {
    Callback.addCallback("GenerateChunk", (chunkX, chunkZ) => {
        HiveGenerator.genChunk(chunkX, chunkZ, Dimension.NORMAL);
    });

    Callback.addCallback("GenerateEndChunk", (chunkX, chunkZ) => {
        HiveGenerator.genChunk(chunkX, chunkZ, Dimension.END);
    });

    Callback.addCallback("GenerateNetherChunk", (chunkX, chunkZ) => {
        HiveGenerator.genChunk(chunkX, chunkZ, Dimension.NETHER);
    });
}