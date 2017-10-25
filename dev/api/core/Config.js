var Config = {
    /* ----- BEEHIVES GEN ----- */

    genForestChance: __config__.getNumber("gen.beehivesForestChance"),
    genMeadowsChance: __config__.getNumber("gen.beehivesMeadowsChance"),
    genModesChancet: __config__.getNumber("gen.beehivesModestChance"),
    genTropicalChance: __config__.getNumber("gen.beehivesTropicalChance"),
    genWintryChance: __config__.getNumber("gen.beehivesWintryChance"),
    genMarshyChance: __config__.getNumber("gen.beehivesMarshyChance"),
    genEnderChance: __config__.getNumber("gen.beehivesEnderChance"),

    /* ----- ORE GEN ----- */
    genApatite: __config__.getBool("gen.apatite"),
    genApatiteInChunk: __config__.getNumber("gen.apatiteInChunk"),
    genApatiteSize: __config__.getNumber("gen.apatiteSize"),

    genCopper: __config__.getBool("gen.copper"),
    genCopperInChunk: __config__.getNumber("gen.copperInChunk"),
    genCopperSize: __config__.getNumber("gen.copperSize"),

    genTin: __config__.getBool("gen.tin"),
    genTinInChunk: __config__.getNumber("gen.tinInChunk"),
    genTinSize: __config__.getNumber("gen.tinSize"),

    /* ----- BEEKEEPING ----- */

    secondPrincessChance: __config__.getNumber("beekeeping.secondPrincessChance"),

    /* ----- OTHER ----- */
    crateEnabled: __config__.getBool("crateEnabled"),
    glassEnabled: __config__.getBool("glassEnabled"),

    /* ----- RECIPES ----- */
    recipeBronzeIngot: __config__.getBool("recipes.bronzeIngot")
};