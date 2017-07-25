var BeeRegistry = {
    bees: {},

    FLOWERS_FLOWERS: ["Flowers", "38:0", "37:0"],
    FLOWERS_WHEAT: ["Wheat", "59:0"],
    FLOWERS_NETHER: ["Nether", "115:0"],
    FLOWERS_ENDS: ["Ends", "122:0"],
    FLOWERS_CACTI: ["Cacti", "81:0"],
    FLOWERS_MUSHROOMS: ["Mushrooms", "39:0", "40:0"],
    FLOWERS_JUNGLE: ["Jungle", "106:0", "31:0"],
    FLOWERS_GOURD: ["Gourd", "104:0", "105:0"],

    BEETYPE_NONE: -1,
    BEETYPE_PRINCESS: 0,
    BEETYPE_DRONE: 1,
    BEETYPE_QUEEN: 2,

    LIFESPAN_SHORTEST: 10,
    LIFESPAN_SHORTER: 20,
    LIFESPAN_SHORT: 30,
    LIFESPAN_SHORTENED: 35,
    LIFESPAN_NORMAL: 40,
    LIFESPAN_ELONGATED: 45,
    LIFESPAN_LONG: 50,
    LIFESPAN_LONGER: 60,
    LIFESPAN_LONGEST: 70,

    SPEED_FASTEST: 1.7,
    SPEED_FASTER: 1.4,
    SPEED_FAST: 1.2,
    SPEED_NORMAL: 1,
    SPEED_SLOW: 0.8,
    SPEED_SLOWER: 0.6,
    SPEED_SLOWEST: 0.3,

    CLIMATE_ICY_BIOMES: [12],
    CLIMATE_COLD_BIOMES: [30, 158, 5, 133, 32, 160],
    CLIMATE_WARM_BIOMES: [21, 149],
    CLIMATE_HOT_BIOMES: [2, 130],
    CLIMATE_HELLISH_BIOMES: [8],

    CLIMATE_HELLISH: "Hellish",
    CLIMATE_HOT: "Hot",
    CLIMATE_WARM: "Warm",
    CLIMATE_NORMAL: "Normal",
    CLIMATE_COLD: "Cold",
    CLIMATE_ICY: "Icy",

    HUMIDITY_DAMP: "Damp",
    HUMIDITY_NORMAL: "Normal",
    HUMIDITY_ARID: "Arid",

    HUMIDITY_DAMP_BIOMES: [149, 6, 134, 21],
    HUMIDITY_ARID_BIOMES: [8, 2, 130],

    chromosomes_list: {},

    init: function () {

        this.chromosomes_list["SPEED"] = this.SPEED_NORMAL;
        this.chromosomes_list["LIFESPAN"] = this.LIFESPAN_NORMAL;
        this.chromosomes_list["FERTILITY"] = 2;
        this.chromosomes_list["CLIMATE"] = this.CLIMATE_NORMAL;
        this.chromosomes_list["HUMIDITY"] = this.HUMIDITY_NORMAL;
        this.chromosomes_list["TEMPERATURE_TOLERANCE"] = 0;
        this.chromosomes_list["NEVER_SLEEPS"] = false;
        this.chromosomes_list["HUMIDITY_TOLERANCE"] = 0;
        this.chromosomes_list["TOLERATES_RAIN"] = false;
        this.chromosomes_list["CAVE_DWELLING"] = false;
        this.chromosomes_list["FLOWERS"] = this.FLOWERS_FLOWERS;
        this.chromosomes_list["TERRITORY"] = "9x6x9";
        this.chromosomes_list["EFFECT"] = BeeEffects.EFFECT_NONE;
        this.chromosomes_list["PRODUCE"] = [];
        this.chromosomes_list["SPECIALTY"] = [];

    },

    getBeeNextUniqueID: function () {
        if (!BeeSaver.uniqueID) {
            BeeSaver.uniqueID = 0;
        }
        return ++BeeSaver.uniqueID;
    },

    getPrincessByType: function (type) {
        return ItemID["princess" + type];
    },

    getDroneByType: function (type) {
        return ItemID["drone" + type];
    },

    getQueenByType: function (type) {
        return ItemID["queen" + type];
    },

    registerBee: function (name, typename, textures, dominant, chromosomes) {
        if (!name) {
            Logger.LogError("NAME IS UNDEFINED", "ForestryAPI");
            return;
        }
        if (!name) {
            Logger.LogError("Chromosomes IS UNDEFINED", "ForestryAPI");
            return;
        }
        if (!typename) {
            Logger.LogError("Type name IS UNDEFINED", "ForestryAPI");
            return;
        }

        if (!textures) {
            textures = {
                princess: "princess" + typename,
                drone: "drone" + typename,
                queen: "queen" + typename
            };
        }

        IDRegistry.genItemID("princess" + typename);
        Item.createItem("princess" + typename, name.princess.en, {name: textures.princess, meta: 0}, {stack: 1});
        Translation.addTranslation("princess" + typename, name.princess);

        IDRegistry.genItemID("drone" + typename);
        Item.createItem("drone" + typename, name.drone.en, {name: textures.drone, meta: 0}, {stack: 1});
        Translation.addTranslation("drone" + typename, name.drone);

        IDRegistry.genItemID("queen" + typename);
        Item.createItem("queen" + typename, name.queen.en, {name: textures.queen, meta: 0}, {stack: 1});
        Translation.addTranslation("drone" + typename, name.queen);

        var bee_type = new BeeType(typename, ItemID["princess" + typename], ItemID["drone" + typename], ItemID["queen" + typename]);
        bee_type.chromosomes_list = chromosomes;
        bee_type.dominant = dominant;

        this.bees[typename] = bee_type;
    },

    getBeeTypeByID: function (id) {
        for (var key in this.bees) {
            var beetype = this.bees[key];
            switch (id) {
                case beetype.princessID:
                    return BeeRegistry.BEETYPE_PRINCESS;
                    break;
                case beetype.droneID:
                    return BeeRegistry.BEETYPE_DRONE;
                    break;
                case beetype.queenID:
                    return BeeRegistry.BEETYPE_QUEEN;
                    break;
            }
        }
        return BeeRegistry.BEETYPE_NONE;
    },

    getTypeByID: function (id) {
        for (var key in this.bees) {
            var beetype = this.bees[key];
            if (beetype.princessID === id || beetype.droneID === id || beetype.queenID === id) {
                return key;
            }
        }
        return BeeRegistry.BEETYPE_NONE;
    },

    getBeeByType: function (type) {
        return this.bees[type];
    },

    getBeeFromItem: function (id, data) {
        var bee = null;

        if (!BeeSaver.bees[data]) {
            bee = new Bee(BeeRegistry.getTypeByID(id), BeeRegistry.getBeeTypeByID(id), false);
            return bee;
        }

        bee = BeeSaver.bees[data];
        return bee;
    },

    isBee: function (id) {
        return BeeRegistry.getTypeByID(id) !== BeeRegistry.BEETYPE_NONE;
    },

    getChromosomeValueName: function (name, value) {
        if (name === "LIFESPAN") {
            return value === BeeRegistry.LIFESPAN_SHORTER ? BeeRegistry.localize("Shorted") :
                (value === BeeRegistry.LIFESPAN_SHORTENED ? BeeRegistry.localize("Shortened") :
                    (value === BeeRegistry.LIFESPAN_SHORTEST ? BeeRegistry.localize("Shortest") :
                        (value === BeeRegistry.LIFESPAN_SHORT ? BeeRegistry.localize("Short") :
                            (value === BeeRegistry.LIFESPAN_NORMAL ? BeeRegistry.localize("Normal") :
                                (value === BeeRegistry.LIFESPAN_ELONGATED ? BeeRegistry.localize("Elongated") :
                                    (value === BeeRegistry.LIFESPAN_LONG ? BeeRegistry.localize("Long") :
                                        (value === BeeRegistry.LIFESPAN_LONGER ? BeeRegistry.localize("Longer") :
                                            (value === BeeRegistry.LIFESPAN_LONGEST ? BeeRegistry.localize("Longest") : value))))))));
        } else if (name === "SPEED") {
            return value === BeeRegistry.SPEED_FAST ? BeeRegistry.localize("Fast") :
                (value === BeeRegistry.SPEED_FASTER ? BeeRegistry.localize("Faster") :
                    (value === BeeRegistry.SPEED_FASTEST ? BeeRegistry.localize("Fastest") :
                        (value === BeeRegistry.SPEED_NORMAL ? BeeRegistry.localize("Normal") :
                            (value === BeeRegistry.SPEED_SLOW ? BeeRegistry.localize("Slow") :
                                (value === BeeRegistry.SPEED_SLOWER ? BeeRegistry.localize("Slower") :
                                    (value === BeeRegistry.SPEED_SLOWEST ? BeeRegistry.localize("Slowest") : value))))))
        } else if (name === "FLOWERS") {
            return BeeRegistry.localize(value[0]);
        } else if (name === "EFFECT") {
            return value === BeeEffects.EFFECT_NONE ? BeeRegistry.localize("None") :
                (value === BeeEffects.EFFECT_AGGRESS ? BeeRegistry.localize("Aggress") :
                    (value === BeeEffects.EFFECT_BEATIFIC ? BeeRegistry.localize("Beatific") :
                        (value === BeeEffects.EFFECT_CREEPER ? BeeRegistry.localize("Creeper") :
                            (value === BeeEffects.EFFECT_DRUNKARD ? BeeRegistry.localize("Drunkard") :
                                (value === BeeEffects.EFFECT_ENDS ? BeeRegistry.localize("Ends") :
                                    (value === BeeEffects.EFFECT_EXPLORER ? BeeRegistry.localize("Explorer") :
                                        (value === BeeEffects.EFFECT_FLAMMABLE ? BeeRegistry.localize("Flammable") :
                                            (value === BeeEffects.EFFECT_FREEZING ? BeeRegistry.localize("Freezing") :
                                                (value === BeeEffects.EFFECT_HEROIC ? BeeRegistry.localize("Heroic") :
                                                    (value === BeeEffects.EFFECT_POISON ? BeeRegistry.localize("Poison") :
                                                        (value === BeeEffects.EFFECT_RADIOACT ? BeeRegistry.localize("Radiact") :
                                                            (value === BeeEffects.EFFECT_REANIMATION ? BeeRegistry.localize("Reanimation") :
                                                                (value === BeeEffects.EFFECT_REPULSION ? BeeRegistry.localize("Repulsion") : value)))))) )))))))
        } else if (name === "CLIMATE") {
            return BeeRegistry.localize(value);
        } else if (name === "HUMIDITY") {
            return BeeRegistry.localize(value);
        }

        return value;
    },

    isDominant: function (name, value) {
        if (name === "FERTILITY") {
            return value === 1 || value === 2;
        } else if (name === "SPEED") {
            return value === BeeRegistry.SPEED_SLOWEST || value === BeeRegistry.SPEED_SLOWER || value === BeeRegistry.SPEED_SLOW || value === BeeRegistry.SPEED_FAST;
        } else if (name === "FLOWERS") {
            return value === BeeRegistry.FLOWERS_FLOWERS || value === BeeRegistry.FLOWERS_WHEAT || value === BeeRegistry.FLOWERS_GOURD;
        } else if (name === "EFFECT") {
            return value === BeeEffects.EFFECT_NONE || value === BeeEffects.EFFECT_AGGRESS || value === BeeEffects.EFFECT_CREEPER || value === BeeEffects.EFFECT_ENDS || value === BeeEffects.EFFECT_RADIOACT || value === BeeEffects.EFFECT_REPULSION || value === BeeEffects.EFFECT_REANIMATION;
        }

        return false;
    },

    localize: function (loc) {
        return loc;
    }
};

BeeRegistry.init();

BeeRegistry.registerBee({
    drone: {en: "Tester drone", ru: "Тестовый дрое"},
    princess: {en: "Tester princess", ru: "Тестовый принцесса"},
    queen: {en: "Tester queen", ru: "Тестовый queen"}
}, "Tester", null, true, {PRODUCE: [[1, 0, 0.8]], SPECIALTY: [[3, 0, 0.9]]});

BeeRegistry.registerBee({
    drone: {en: "BIG drone", ru: "BIG дрое"},
    princess: {en: "BIG princess", ru: "BIG принцесса"},
    queen: {en: "BIG queen", ru: "BIG queen"}
}, "BIG", null, false, {PRODUCE: [[3, 0, 0.8]]});