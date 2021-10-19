class CoreConfig {
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
        deepslateCopper: {
            enabled: __config__.getBool("core.worldGen.deepslateCopper.enabled"),
            lowestY: +__config__.getNumber("core.worldGen.deepslateCopper.lowestY"),
            highestY: +__config__.getNumber("core.worldGen.deepslateCopper.highestY"),
            veins: +__config__.getNumber("core.worldGen.deepslateCopper.veins"),
            veinSize: +__config__.getNumber("core.worldGen.deepslateCopper.veinSize"),
        },
        deepslateTin: {
            enabled: __config__.getBool("core.worldGen.deepslateTin.enabled"),
            lowestY: +__config__.getNumber("core.worldGen.deepslateTin.lowestY"),
            highestY: +__config__.getNumber("core.worldGen.deepslateTin.highestY"),
            veins: +__config__.getNumber("core.worldGen.deepslateTin.veins"),
            veinSize: +__config__.getNumber("core.worldGen.deepslateTin.veinSize"),
        },
        apatite: {
            enabled: __config__.getBool("core.worldGen.apatite.enabled"),
            lowestY: +__config__.getNumber("core.worldGen.apatite.lowestY"),
            highestY: +__config__.getNumber("core.worldGen.apatite.highestY"),
            chance: +__config__.getNumber("core.worldGen.apatite.chance"),
            veinSize: +__config__.getNumber("core.worldGen.apatite.veinSize"),
        },
    };
    static readonly recipes = {
        bronze: __config__.getBool("core.recipes.bronze"),
    };
}