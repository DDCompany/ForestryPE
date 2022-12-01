IDRegistry.genItemID("debugForestryClimate");
Item.createItem("debugForestryClimate", "forestry.item.debug_climate", {name: "stick"});
Item.setGlint(ItemID.debugForestryClimate, true);
Item.setToolRender(ItemID.debugForestryClimate, true);

Item.registerUseFunction("debugForestryClimate", ({x, y, z}, item, block, player) => {
    const blockSource = BlockSource.getDefaultForActor(player);
    if (!blockSource) {
        return;
    }

    const biomeId = blockSource.getBiome(x, z);
    const temperature = Habitat.localizeTemperature(Habitat.getTemperatureAt(blockSource, x, y, z));
    const humidity = Habitat.localizeHumidity(Habitat.getHumidityAt(blockSource, x, y, z));
    const splitter = "-".repeat(10);

    Debug.message(splitter);
    Debug.message(`BiomeID: ${biomeId}`);
    Debug.message(`DimensionId: ${blockSource.getDimension()}`);
    Debug.message(`Humidity: ${humidity} / ${blockSource.getBiomeDownfallAt(x, y, z).toFixed(2)}`);
    Debug.message(`Temperature: ${temperature} / ${blockSource.getBiomeTemperatureAt(x, y, z).toFixed(2)}`);
    Debug.message(splitter);
});