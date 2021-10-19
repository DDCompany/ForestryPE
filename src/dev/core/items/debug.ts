IDRegistry.genItemID("debugForestryClimate");
Item.createItem("debugForestryClimate", "forestry.item.debug_climate", {name: "stick"});

Item.registerUseFunction("debugForestryClimate", ({x, y, z}, item, block, player) => {
    const blockSource = BlockSource.getDefaultForActor(player);
    const biomeId = blockSource.getBiome(x, z);
    const temperature = ClimateUtil.toDisplay(ClimateUtil.getTemperatureAt(blockSource, x, y, z));
    const humidity = ClimateUtil.toDisplay(ClimateUtil.getHumidityAt(blockSource, x, y, z));
    const splitter = "-".repeat(10);

    Debug.message(splitter);
    Debug.message(`BiomeID: ${biomeId}`);
    Debug.message(`IsHellish: ${ClimateUtil.isHellishBiome(biomeId)}`);
    Debug.message(`DimensionId: ${blockSource.getDimension()}`);
    Debug.message(`Humidity: ${humidity} / ${blockSource.getBiomeDownfallAt(x, y, z).toFixed(2)}`);
    Debug.message(`Temperature: ${temperature} / ${blockSource.getBiomeTemperatureAt(x, y, z).toFixed(2)}`);
    Debug.message(splitter);
});

IDRegistry.genItemID("debugForestryChunkGen");
Item.createItem("debugForestryChunkGen", "forestry.item.debug_chunk_gen", {name: "stick"});

Item.registerUseFunction("debugForestryChunkGen", ({x, y, z}, item, block, player) => {
    const blockSource = BlockSource.getDefaultForActor(player);
    const chunkX = Math.floor(x / 16) * 16;
    const chunkZ = Math.floor(z / 16) * 16;

    for (let xx = chunkX; xx < chunkX + 16; xx++) {
        for (let zz = chunkZ; zz < chunkZ + 16; zz++) {
            for (let yy = y; yy > 2; yy--) {
                const blockId = blockSource.getBlockId(xx, yy, zz);
                if (blockId && Block.isNativeTile(blockId)) {
                    blockSource.setBlock(xx, yy, zz, 0, 0);
                }
            }
        }
    }
});