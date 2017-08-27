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

    TOLERANCE_BOTH_1: 1,
    TOLERANCE_BOTH_2: 2,
    TOLERANCE_BOTH_3: 3,
    TOLERANCE_BOTH_4: 4,
    TOLERANCE_BOTH_5: 5,
    TOLERANCE_UP_1: 6,
    TOLERANCE_UP_2: 7,
    TOLERANCE_UP_3: 8,
    TOLERANCE_UP_4: 9,
    TOLERANCE_UP_5: 10,
    TOLERANCE_DOWN_1: 11,
    TOLERANCE_DOWN_2: 12,
    TOLERANCE_DOWN_3: 13,
    TOLERANCE_DOWN_4: 14,
    TOLERANCE_DOWN_5: 15,

    TOLERANCE_NONE: 0,
    TOLERANCE_BOTH: 1,
    TOLERANCE_UP: 2,
    TOLERANCE_DOWN: 3,

    chromosomes_list: {},
    mutations: {},

    init: function () {

        this.chromosomes_list["SPEED"] = this.SPEED_NORMAL;
        this.chromosomes_list["LIFESPAN"] = this.LIFESPAN_NORMAL;
        this.chromosomes_list["FERTILITY"] = 2;
        this.chromosomes_list["TEMPERATURE_TOLERANCE"] = this.TOLERANCE_NONE;
        this.chromosomes_list["NEVER_SLEEPS"] = false;
        this.chromosomes_list["HUMIDITY_TOLERANCE"] = this.TOLERANCE_NONE;
        this.chromosomes_list["TOLERATES_RAIN"] = false;
        this.chromosomes_list["CAVE_DWELLING"] = false;
        this.chromosomes_list["TERRITORY"] = "9x6x9";
        this.chromosomes_list["EFFECT"] = BeeEffects.EFFECT_NONE;

    },

    rangeToObject: function (range) {
        return {
            x: parseInt(range.split("x")[0]),
            y: parseInt(range.split("x")[1]),
            z: parseInt(range.split("x")[2])
        };
    },

    convertToItemArray: function (bees) {
        var arr = [];
        for (var key in bees) {
            arr.push([bees[key].item.id, bees[key].item.data, 1]);
        }

        return arr;
    },

    addMutation: function (arg) {
        if (!arg.species1) {
            Logger.Log("[ForestryAPI]Species1 is undefined!", "ERROR");
            return;
        }
        if (!arg.species2) {
            Logger.Log("[ForestryAPI]Species2 is undefined!", "ERROR");
            return;
        }
        if (!arg.chance) {
            Logger.Log("[ForestryAPI]Chance is undefined or equals zero!", "ERROR");
            return;
        }

        if (!arg.result) {
            Logger.Log("[ForestryAPI]Result is undefined!", "ERROR");
            return;
        }

        if (!arg.onMutate) {
            arg.onMutate = function () {
                return true;
            };
        }

        if (!this.mutations[arg.result]) {
            this.mutations[arg.result] = [];
        }

        this.mutations[arg.result].push(arg);
    },

    getMutations: function (species1, species2) {
        var muts = [];
        for (var key in this.mutations) {
            for (var key2 in this.mutations[key]) {
                var mut = this.mutations[key][key2];
                if ((mut.species1 === species1 && mut.species2 === species2) || (mut.species2 === species1 && mut.species1 === species2)) {
                    muts.push(mut);
                }
            }
        }
        return muts;
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

    getToleranceValue: function (value) {
        return value === 0 ? 0 : (value < 6 ? value : (value < 11 ? value - 5 : value - 10));
    },

    getTolerance: function (tol) {
        return tol === 0 ? 0 : (tol < 6 ? this.TOLERANCE_BOTH : (tol < 11 ? this.TOLERANCE_UP : this.TOLERANCE_DOWN))
    },

    registerBee: function (arg) {
        if (!arg.localize) {
            Logger.Log("[ForestryAPI]Localize is undefined", "ERROR");
            return;
        }
        if (!arg.chromosomes) {
            Logger.Log("[ForestryAPI]Chromosomes is undefined", "ERROR");
            return;
        }
        if (!arg.species) {
            Logger.Log("[ForestryAPI]Species is undefined", "ERROR");
            return;
        }

        if (!arg.flowers) {
            arg.flowers = BeeRegistry.FLOWERS_FLOWERS;
        }

        if (!arg.humidity) {
            arg.humidity = BiomeHelper.HUMIDITY_NORMAL;
        }


        if (!arg.climate) {
            arg.climate = BiomeHelper.CLIMATE_NORMAL;
        }

        if (!arg.dominant) {
            arg.dominant = false;
        }

        if (!arg.produce) {
            arg.produce = [];
        }

        if (!arg.specialty) {
            arg.specialty = []
        }

        if (!arg.textures) {
            arg.textures = {
                princess: "princess" + arg.species,
                drone: "drone" + arg.species,
                queen: "queen" + arg.species
            };
        }

        if (!arg.textures.princess) {
            arg.textures.princess = "princess" + arg.species;
        }

        if (!arg.textures.drone) {
            arg.textures.drone = "drone" + arg.species;
        }

        if (!arg.textures.queen) {
            arg.textures.queen = "queen" + arg.species;
        }

        if (arg.mutations) {
            for (var key in arg.mutations) {
                arg.mutations[key]["result"] = arg.species;
                this.addMutation(arg.mutations[key]);
            }
        }

        IDRegistry.genItemID("princess" + arg.species);
        Item.createItem("princess" + arg.species, arg.localize.princess.en, {name: arg.textures.princess, meta: 0}, {});
        Translation.addTranslation(arg.localize.princess.en, arg.localize.princess);

        IDRegistry.genItemID("drone" + arg.species);
        Item.createItem("drone" + arg.species, arg.localize.drone.en, {name: arg.textures.drone, meta: 0}, {});
        Translation.addTranslation(arg.localize.drone.en, arg.localize.drone);

        IDRegistry.genItemID("queen" + arg.species);
        Item.createItem("queen" + arg.species, arg.localize.queen.en, {name: arg.textures.queen, meta: 0}, {});
        Translation.addTranslation(arg.localize.queen.en, arg.localize.queen);

        var bee_type = new BeeType(arg.species, ItemID["princess" + arg.species], ItemID["drone" + arg.species], ItemID["queen" + arg.species], arg.flowers, arg.humidity, arg.climate);
        bee_type.chromosomes_list = arg.chromosomes;
        bee_type.dominant = arg.dominant;
        bee_type.produce = arg.produce;
        bee_type.specialty = arg.specialty;

        this.bees[arg.species] = bee_type;
    },

    getBeeTypeByID: function (id) {
        if (id > 0) {
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
            var beetype = BeeRegistry.getBeeTypeByID(id);
            bee = new Bee(BeeRegistry.getTypeByID(id), beetype, false);
            if (beetype === BeeRegistry.BEETYPE_QUEEN) {
                bee.mate = new Bee(BeeRegistry.getTypeByID(id), BeeRegistry.BEETYPE_DRONE, false);
            }
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
            return value === BeeRegistry.LIFESPAN_SHORTER ? Translation.translate("bees.lifespan.shorted") :
                (value === BeeRegistry.LIFESPAN_SHORTENED ? Translation.translate("bees.lifespan.shortened") :
                    (value === BeeRegistry.LIFESPAN_SHORTEST ? Translation.translate("bees.lifespan.shortest") :
                        (value === BeeRegistry.LIFESPAN_SHORT ? Translation.translate("bees.lifespan.short") :
                            (value === BeeRegistry.LIFESPAN_NORMAL ? Translation.translate("bees.lifespan.normal") :
                                (value === BeeRegistry.LIFESPAN_ELONGATED ? Translation.translate("bees.lifespan.elongated") :
                                    (value === BeeRegistry.LIFESPAN_LONG ? Translation.translate("bees.lifespan.long") :
                                        (value === BeeRegistry.LIFESPAN_LONGER ? Translation.translate("bees.lifespan.longer") :
                                            (value === BeeRegistry.LIFESPAN_LONGEST ? Translation.translate("bees.lifespan.longest") : value))))))));
        } else if (name === "SPEED") {
            return value === BeeRegistry.SPEED_FAST ? Translation.translate("bees.speed.fast") :
                (value === BeeRegistry.SPEED_FASTER ? Translation.translate("bees.speed.faster") :
                    (value === BeeRegistry.SPEED_FASTEST ? Translation.translate("bees.speed.fastest") :
                        (value === BeeRegistry.SPEED_NORMAL ? Translation.translate("bees.speed.normal") :
                            (value === BeeRegistry.SPEED_SLOW ? Translation.translate("bees.speed.slow") :
                                (value === BeeRegistry.SPEED_SLOWER ? Translation.translate("bees.speed.slower") :
                                    (value === BeeRegistry.SPEED_SLOWEST ? Translation.translate("bees.speed.slowest") : value))))))
        } else if (name === "FLOWERS") {
            return Translation.translate(value[0]);
        } else if (name === "EFFECT") {
            return value === BeeEffects.EFFECT_NONE ? Translation.translate("bees.effect.none") :
                (value === BeeEffects.EFFECT_AGGRESS ? Translation.translate("bees.effect.aggress") :
                    (value === BeeEffects.EFFECT_BEATIFIC ? Translation.translate("bees.effect.beatific") :
                        (value === BeeEffects.EFFECT_CREEPER ? Translation.translate("bees.effect.creeper") :
                            (value === BeeEffects.EFFECT_DRUNKARD ? Translation.translate("bees.effect.drunkard") :
                                (value === BeeEffects.EFFECT_EXPLORER ? Translation.translate("bees.effect.explorer") :
                                    (value === BeeEffects.EFFECT_ENDS ? Translation.translate("bees.effect.ends") :
                                        (value === BeeEffects.EFFECT_FLAMMABLE ? Translation.translate("bees.effect.flammable") :
                                            (value === BeeEffects.EFFECT_FREEZING ? Translation.translate("bees.effect.freezing") :
                                                (value === BeeEffects.EFFECT_HEROIC ? Translation.translate("bees.effect.heroic") :
                                                    (value === BeeEffects.EFFECT_POISON ? Translation.translate("bees.effect.poison") :
                                                        (value === BeeEffects.EFFECT_RADIOACT ? Translation.translate("bees.effect.radiact") :
                                                            (value === BeeEffects.EFFECT_REANIMATION ? Translation.translate("bees.effect.reanimation") :
                                                                (value === BeeEffects.EFFECT_REPULSION ? Translation.translate("bees.effect.repulsion") : value)))))))))))));
        } else if (name === "CLIMATE") {
            return value === BiomeHelper.CLIMATE_ICY ? Translation.translate("climate.icy") :
                (value === BiomeHelper.CLIMATE_COLD ? Translation.translate("climate.cold") :
                    (value === BiomeHelper.CLIMATE_NORMAL ? Translation.translate("climate.normal") :
                        (value === BiomeHelper.CLIMATE_WARM ? Translation.translate("climate.warm") :
                            (value === BiomeHelper.CLIMATE_HOT ? Translation.translate("climate.hot") : Translation.translate("climate.hellish")))));
        } else if (name === "HUMIDITY") {
            return value === BiomeHelper.HUMIDITY_ARID ? Translation.translate("humidity.arid") :
                (value === BiomeHelper.HUMIDITY_DAMP ? Translation.translate("humidity.damp") : Translation.translate("humidity.normal"));
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
        } else if (name === "TEMPERATURE_TOLERANCE" || name === "HUMIDITY_TOLERANCE" || name === "TOLERANCE") {
            return value === this.TOLERANCE_BOTH_1 || value === this.TOLERANCE_UP_1 || value === this.TOLERANCE_DOWN_1;
        }

        return false;
    }
};

BeeRegistry.init();

/*BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Тестовая принцесса",
            en: "Test princess"
        },
        drone: {
            ru: "Тестовый дрон",
            en: "Test drone"
        },
        queen: {
            ru: "Тестовая королева",
            en: "Test queen"
        }
    },
    species: "Tester",
    produce: [[1, 0, 0.1]],
    effect: BeeEffects.EFFECT_DRUNKARD,
    chromosomes: {HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "BETTHER принцесса",
            en: "BETTHER princess"
        },
        drone: {
            ru: "BETTHER дрон",
            en: "BETTHER drone"
        },
        queen: {
            ru: "BETTHER королева",
            en: "BETTHER queen"
        }
    },
    mutations: [
        {
            species1: "Tester",
            species2: "BIG",
            chance: 0.9
        }
    ],
    species: "BETTHER",
    produce: [],
    chromosomes: {"NEVER_SLEEPS": true}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "BIG принцесса",
            en: "BIG princess"
        },
        drone: {
            ru: "BIG дрон",
            en: "BIG drone"
        },
        queen: {
            ru: "BIG королева",
            en: "BIG queen"
        }
    },
    species: "BIG",
    produce: [],
    chromosomes: {HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_UP_4}
});*/