class CoreConfig {
    static readonly craftingBronzeEnabled = __config__.getBool("craftingBronzeEnabled");
    static readonly worldGen = {
        copper: {
            enabled: __config__.getBool("core.worldGen.copper.enabled"),
            lowestY: +__config__.getNumber("core.worldGen.copper.lowestY"),
            highestY: +__config__.getNumber("core.worldGen.copper.highestY"),
            veins: +__config__.getNumber("core.worldGen.copper.veins"),
            veinSize: +__config__.getNumber("core.worldGen.copper.veinSize"),
        },
        tin: {
            enabled: __config__.getBool("core.worldGen.tin.enabled"),
            lowestY: +__config__.getNumber("core.worldGen.tin.lowestY"),
            highestY: +__config__.getNumber("core.worldGen.tin.highestY"),
            veins: +__config__.getNumber("core.worldGen.tin.veins"),
            veinSize: +__config__.getNumber("core.worldGen.tin.veinSize"),
        },
        apatite: {
            enabled: __config__.getBool("core.worldGen.apatite.enabled"),
            lowestY: +__config__.getNumber("core.worldGen.apatite.lowestY"),
            highestY: +__config__.getNumber("core.worldGen.apatite.highestY"),
            chance: +__config__.getNumber("core.worldGen.apatite.chance"),
            veinSize: +__config__.getNumber("core.worldGen.apatite.veinSize"),
        },
    };
}