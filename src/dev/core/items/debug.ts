IDRegistry.genItemID("debugForestryClimate");
Item.createItem("debugForestryClimate", "forestry.item.debug_climate", {name: "stick"});

Item.registerUseFunction("debugForestryClimate", ({x, y, z}, item, block, player) => {
    const blockSource = BlockSource.getDefaultForActor(player);
    const biomeId = blockSource.getBiome(x, z);
    const temperature = ClimateUtil.getTemperatureAt(blockSource, x, y, z);
    const humidity = ClimateUtil.getHumidityAt(blockSource, x, y, z);
    const splitter = "-".repeat(10);

    Debug.message(splitter);
    Debug.message(`BiomeID: ${biomeId}`);
    Debug.message(`IsHellish: ${ClimateUtil.isHellishBiome(biomeId)}`);
    Debug.message(`DimensionId: ${blockSource.getDimension()}`);
    Debug.message(`Humidity: ${ClimateUtil.toDisplay(humidity)} / 0`); //TODO: change after adding getBiomeHumidityAt
    Debug.message(`Temperature: ${ClimateUtil.toDisplay(temperature)} / ${blockSource.getBiomeTemperatureAt(x, y, z).toFixed(2)}`);
    Debug.message(splitter);
});