setLoadingTip("Common Api Loading...");

const ForestryConfig = {
    /* ----- BEEHIVES GEN ----- */
    genBeehivesDebug: __config__.getBool("gen.beehives.debug"),
    genForestChance: __config__.getNumber("gen.beehives.forest"),
    genMeadowsChance: __config__.getNumber("gen.beehives.meadows"),
    genModestChance: __config__.getNumber("gen.beehives.modest"),
    genTropicalChance: __config__.getNumber("gen.beehives.tropical"),
    genWintryChance: __config__.getNumber("gen.beehives.wintry"),
    genMarshyChance: __config__.getNumber("gen.beehives.marshy"),
    genEnderChance: __config__.getNumber("gen.beehives.ender"),

    /* ----- ORE GEN ----- */
    genApatite: __config__.getBool("gen.apatite.enabled"),
    genApatiteSize: __config__.getNumber("gen.apatite.size"),
    genApatiteMinY: __config__.getNumber("gen.apatite.minY"),
    genApatiteMaxY: __config__.getNumber("gen.apatite.maxY"),

    genCopper: __config__.getBool("gen.copper.enabled"),
    genCopperInChunk: __config__.getNumber("gen.copper.inChunk"),
    genCopperSize: __config__.getNumber("gen.copper.size"),
    genCopperMinY: __config__.getNumber("gen.copper.minY"),
    genCopperMaxY: __config__.getNumber("gen.copper.maxY"),

    genTin: __config__.getBool("gen.tin.enabled"),
    genTinInChunk: __config__.getNumber("gen.tin.inChunk"),
    genTinSize: __config__.getNumber("gen.tin.size"),
    genTinMinY: __config__.getNumber("gen.tin.minY"),
    genTinMaxY: __config__.getNumber("gen.tin.maxY"),

    /* ----- BEEKEEPING ----- */
    secondPrincessChance: __config__.getNumber("beekeeping.secondPrincessChance"),
    hiveDamageOnAttack: __config__.getBool("beekeeping.hiveDamageOnAttack"),
    hiveDamageOnPeaceful: __config__.getBool("beekeeping.hiveDamageOnPeaceful"),

    /* ----- RECIPES ----- */
    recipeBronzeIngot: __config__.getBool("recipes.bronzeIngot"),

    /* ----- PARTICLES ----- */
    particlesBeeHives: __config__.getBool("particles.beeHives"),

    /* ----- MACHINES ----- */
    rainTankEnabled: __config__.getBool("machines.rainTank"),

    /* ----- BLOCKS ----- */
    glassEnabled: __config__.getBool("blocks.glassEnabled"),
    combsBlocksEnabled: __config__.getBool("blocks.combsEnabled"),
    oresBlocksEnabled: __config__.getBool("blocks.oresEnabled"),

    /* ----- OTHER ----- */
    crateEnabled: __config__.getBool("crateEnabled"),
    reusableCapsules: __config__.getBool("reusableCapsules")
};