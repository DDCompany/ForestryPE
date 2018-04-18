const HiveGenerator = {
    generators: [],

    register: function (generator) {
        if (generator.chance <= 0) {
            Logger.Log("[ForestryAPI]Hive generation chance is not correct!", "ERROR");
            return;
        }

        if (!generator.generate) {
            Logger.Log("[ForestryAPI]Generate function is not correct!", "ERROR");
            return;
        }

        this.generators.push(generator);
    },

    genChunk: function (chunkX, chunkZ, dimension) {
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
    },

    genChunkDebug: function (chunkX, chunkZ, dimension) {
        for (let xOffset = 0; xOffset < 16; xOffset++) {
            for (let zOffset = 0; zOffset < 16; zOffset++) {
                let x = 16 * chunkX + xOffset;
                let z = 16 * chunkZ + zOffset;
                let biome = World.getBiome(x, z);

                for (let key in HiveGenerator.generators) {
                    let generator = HiveGenerator.generators[key];

                    if (generator.dimension && generator.dimension !== dimension)
                        continue;

                    if (generator.biomes && generator.biomes.indexOf(biome) === -1)
                        continue;

                    if (Math.random() <= generator.chance)
                        generator.generate(x, z, dimension, biome)
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
    }
};

if (ForestryConfig.genBeehivesDebug) {
    alert("DEBUG MODE");
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
    alert("NORMAL MODE");
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