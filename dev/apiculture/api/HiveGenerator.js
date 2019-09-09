const HiveGenerator = {
    generators: [],

    register: function (generator) {
        if (generator.chance <= 0) {
            summonException("Chance is not correct! (Hive Generator Registration)");
            return;
        }

        if (!generator.generate) {
            summonException("Generate function is not correct! (Hive Generator Registration)");
            return;
        }

        this.generators.push(generator);
    },

    genChunk: function (chunkX, chunkZ, dimension) {
        for (let tries = 0; tries < 4; tries++) {
            let coords = GenerationUtils.randomXZ(chunkX, chunkZ);
            let biome = World.getBiome(coords.x, coords.z);
            let climate = BiomeHelper.getBiomeClimate(biome);
            let humidity = BiomeHelper.getBiomeHumidity(biome);

            for (let key in HiveGenerator.generators) {
                let generator = HiveGenerator.generators[key];

                if (generator.dimension && generator.dimension !== dimension)
                    continue;

                if (generator.biomes && generator.biomes.indexOf(biome) === -1)
                    continue;

                if (Math.random() <= generator.chance && generator.generate(coords.x, coords.z, dimension, climate, humidity, biome))
                    return;
            }
        }
    },

    genChunkDebug: function (chunkX, chunkZ, dimension) {
        for (let xOffset = 0; xOffset < 16; xOffset++) {
            for (let zOffset = 0; zOffset < 16; zOffset++) {
                let x = 16 * chunkX + xOffset;
                let z = 16 * chunkZ + zOffset;
                let biome = World.getBiome(x, z);
                let climate = BiomeHelper.getBiomeClimate(biome);
                let humidity = BiomeHelper.getBiomeHumidity(biome);

                for (let key in HiveGenerator.generators) {
                    let generator = HiveGenerator.generators[key];

                    if (generator.dimension && generator.dimension !== dimension)
                        continue;

                    if (generator.biomes && generator.biomes.indexOf(biome) === -1)
                        continue;

                    if (Math.random() <= generator.chance)
                        generator.generate(x, z, dimension, climate, humidity, biome)
                }
            }
        }
    },

    genHive: function (x, z, blockId, blockData, grounds) {
        let y = GenerationUtils.findHighSurface(x, z).y;

        if (World.getBlockID(x, y + 1, z) !== 0)
            return;

        if (grounds) {
            let validGround = false;
            let block = World.getBlock(x, y, z);

            for (let key in grounds) {
                let ground = grounds[key];

                if (ground[0] === block.id && (ground[1] === -1 || ground[1] === block.data)) {
                    validGround = true;
                    break;
                }
            }

            if (!validGround)
                return;
        }

        World.setBlock(x, y + 1, z, blockId, blockData || 0);
    },

    genTreeHive: function (x, z, blockId, blockData) {
        let y = 128;
        let prevIsTreeBlock = false;
        while (y > 20) {
            let id = World.getBlockID(x, y, z);
            let isTreeBlock = this.isTreeBlock(id);

            if (prevIsTreeBlock && !isTreeBlock) {
                World.setBlock(x, y, z, blockId, blockData);
                return true;
            } else prevIsTreeBlock = isTreeBlock;
            y--;
        }

        return false;
    },

    isTreeBlock: function (blockId) {
        switch (blockId) {
            case 17:
            case 18:
            case 161:
            case 162:
                return true;
        }

        return false;
    }
};

if (ForestryConfig.genBeehivesDebug) {
    Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
        HiveGenerator.genChunkDebug(chunkX, chunkZ, Dimension.NORMAL);
    });

    Callback.addCallback("GenerateEndChunk", function (chunkX, chunkZ) {
        HiveGenerator.genChunkDebug(chunkX, chunkZ, Dimension.END);
    });

    Callback.addCallback("GenerateNetherChunk", function (chunkX, chunkZ) {
        HiveGenerator.genChunkDebug(chunkX, chunkZ, Dimension.NETHER);
    });
} else {
    Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
        HiveGenerator.genChunk(chunkX, chunkZ, Dimension.NORMAL);
    });

    Callback.addCallback("GenerateEndChunk", function (chunkX, chunkZ) {
        HiveGenerator.genChunk(chunkX, chunkZ, Dimension.END);
    });

    Callback.addCallback("GenerateNetherChunk", function (chunkX, chunkZ) {
        HiveGenerator.genChunk(chunkX, chunkZ, Dimension.NETHER);
    });
}