setLoadingTip("Common Api Loading...");

const ForestryConfig = {
    /* ----- BEEHIVES GEN ----- */
    genBeehivesDebug: __config__.getBool("gen.beehivesDebug"),
    genForestChance: __config__.getNumber("gen.beehivesForestChance"),
    genMeadowsChance: __config__.getNumber("gen.beehivesMeadowsChance"),
    genModestChance: __config__.getNumber("gen.beehivesModestChance"),
    genTropicalChance: __config__.getNumber("gen.beehivesTropicalChance"),
    genWintryChance: __config__.getNumber("gen.beehivesWintryChance"),
    genMarshyChance: __config__.getNumber("gen.beehivesMarshyChance"),
    genEnderChance: __config__.getNumber("gen.beehivesEnderChance"),

    /* ----- ORE GEN ----- */
    genApatite: __config__.getBool("gen.apatite"),
    genApatiteSize: __config__.getNumber("gen.apatiteSize"),

    genCopper: __config__.getBool("gen.copper"),
    genCopperInChunk: __config__.getNumber("gen.copperInChunk"),
    genCopperSize: __config__.getNumber("gen.copperSize"),

    genTin: __config__.getBool("gen.tin"),
    genTinInChunk: __config__.getNumber("gen.tinInChunk"),
    genTinSize: __config__.getNumber("gen.tinSize"),

    /* ----- BEEKEEPING ----- */
    secondPrincessChance: __config__.getNumber("beekeeping.secondPrincessChance"),

    /* ----- RECIPES ----- */
    recipeBronzeIngot: __config__.getBool("recipes.bronzeIngot"),

    /* ----- PARTICLES ----- */
    particlesBeeHives: __config__.getBool("particles.beeHives"),

    /* ----- OTHER ----- */
    crateEnabled: __config__.getBool("crateEnabled"),
    glassEnabled: __config__.getBool("glassEnabled"),
    combsBlocksEnabled: __config__.getBool("combBlocksEnabled"),
    oresBlocksEnabled: __config__.getBool("oresBlocksEnabled"),
    hiveDamageOnAttack: __config__.getBool("hiveDamageOnAttack"),
    hiveDamageOnPeaceful: __config__.getBool("hiveDamageOnPeaceful"),
    reusableCapsules: __config__.getBool("reusableCapsules")

};