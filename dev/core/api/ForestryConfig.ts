class ForestryConfig {
    /* ----- BEEHIVES GEN ----- */
    static readonly genBeehivesDebug = __config__.getBool("gen.beehives.debug");
    static readonly genForestChance = __config__.getDouble("gen.beehives.forest");
    static readonly genMeadowsChance = __config__.getDouble("gen.beehives.meadows");
    static readonly genModestChance = __config__.getDouble("gen.beehives.modest");
    static readonly genTropicalChance = __config__.getDouble("gen.beehives.tropical");
    static readonly genWintryChance = __config__.getDouble("gen.beehives.wintry");
    static readonly genMarshyChance = __config__.getDouble("gen.beehives.marshy");
    static readonly genEnderChance = __config__.getDouble("gen.beehives.ender");

    /* ----- ORE GEN ----- */
    static readonly genApatite = __config__.getBool("gen.apatite.enabled");
    static readonly genApatiteSize = __config__.getInteger("gen.apatite.size");
    static readonly genApatiteMinY = __config__.getInteger("gen.apatite.minY");
    static readonly genApatiteMaxY = __config__.getInteger("gen.apatite.maxY");

    static readonly genCopper = __config__.getBool("gen.copper.enabled");
    static readonly genCopperInChunk = __config__.getInteger("gen.copper.inChunk");
    static readonly genCopperSize = __config__.getInteger("gen.copper.size");
    static readonly genCopperMinY = __config__.getInteger("gen.copper.minY");
    static readonly genCopperMaxY = __config__.getInteger("gen.copper.maxY");

    static readonly genTin = __config__.getBool("gen.tin.enabled");
    static readonly genTinInChunk = __config__.getInteger("gen.tin.inChunk");
    static readonly genTinSize = __config__.getInteger("gen.tin.size");
    static readonly genTinMinY = __config__.getInteger("gen.tin.minY");
    static readonly genTinMaxY = __config__.getInteger("gen.tin.maxY");

    /* ----- BEEKEEPING ----- */
    static beekeepingMode = __config__.getInteger("beekeeping.mode");
    static readonly secondPrincessChance = __config__.getDouble("beekeeping.secondPrincessChance");
    static readonly hiveDamageOnAttack = __config__.getBool("beekeeping.hiveDamageOnAttack");
    static readonly hiveDamageOnPeaceful = __config__.getBool("beekeeping.hiveDamageOnPeaceful");

    /* ----- RECIPES ----- */
    static readonly recipeBronzeIngot = __config__.getBool("recipes.bronzeIngot");

    /* ----- PARTICLES ----- */
    static readonly particlesBeeHives = __config__.getBool("particles.beeHives");

    /* ----- MACHINES ----- */
    static readonly rainTankEnabled = __config__.getBool("machines.rainTank");

    /* ----- BLOCKS ----- */
    static readonly combsBlocksEnabled = __config__.getBool("blocks.combsEnabled");
    static readonly oresBlocksEnabled = __config__.getBool("blocks.oresEnabled");

    /* ----- OTHER ----- */
    static readonly crateEnabled = __config__.getBool("crateEnabled");
    static readonly reusableCapsules = __config__.getBool("reusableCapsules");
}