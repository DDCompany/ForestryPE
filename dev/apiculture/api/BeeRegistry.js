const BeeRegistry = {
    bees: {},

    FLOWERS_FLOWERS: ["Flowers", "38:-1", "37:-1", " 175:1", "175:4", " 175:5"],
    FLOWERS_WHEAT: ["Wheat", "59:0"],
    FLOWERS_NETHER: ["Nether", "115:0"],
    FLOWERS_ENDS: ["Ends", "122:0"],
    FLOWERS_CACTI: ["Cacti", "81:0"],
    FLOWERS_MUSHROOMS: ["Mushrooms", "39:0", "40:0"],
    FLOWERS_JUNGLE: ["Jungle", "106:-1", "175:2"],
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

        this.chromosomes_list["SPEED"] = this.SPEED_SLOWEST;
        this.chromosomes_list["LIFESPAN"] = this.LIFESPAN_SHORTER;
        this.chromosomes_list["FERTILITY"] = 2;
        this.chromosomes_list["TEMPERATURE_TOLERANCE"] = this.TOLERANCE_NONE;
        this.chromosomes_list["NEVER_SLEEPS"] = false;
        this.chromosomes_list["HUMIDITY_TOLERANCE"] = this.TOLERANCE_NONE;
        this.chromosomes_list["TOLERATES_RAIN"] = false;
        this.chromosomes_list["CAVE_DWELLING"] = false;
        this.chromosomes_list["TERRITORY"] = "9x6x9";
        this.chromosomes_list["EFFECT"] = BeeEffects.EFFECT_NONE;

    },

    getBeeFromScope: function (scope) {
        let bee = new Bee();
        for (let key in scope) {
            bee[key] = scope[key];
        }

        return bee;
    },
	
    rangeToObject: function (range) {
        return {
            x: parseInt(range.split("x")[0]),
            y: parseInt(range.split("x")[1]),
            z: parseInt(range.split("x")[2])
        };
    },

    convertToItemArray: function (bees) {
        let arr = [];
        for (let key in bees) {
            arr.push([bees[key].getItemID(), bees[key].unique, 1]);
        }

        return arr;
    },

    addMutation: function (arg) {
        if (!arg.species1) {
            summonException("Species1 is undefined! (Bee Mutation Registration)");
            return;
        }
        if (!arg.species2) {
            summonException("Species2 is undefined! (Bee Mutation Registration)");
            return;
        }
        if (!arg.chance) {
            summonException("Chance is undefined or equals zero! (Bee Mutation Registration)");
            return;
        }

        if (!arg.result) {
            summonException("Result is undefined! (Bee Mutation Registration)");
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
        let muts = [];
        for (let key in this.mutations) {
            for (let key2 in this.mutations[key]) {
                let mut = this.mutations[key][key2];
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
            summonException("Localize is undefined! (Bee Registration)");
            return;
        }
        if (!arg.chromosomes) {
            summonException("Chromosomes is undefined! (Bee Registration)");
            return;
        }
        if (!arg.species) {
            summonException("Species is undefined! (Bee Registration)");
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
            for (let key in arg.mutations) {
                arg.mutations[key]["result"] = arg.species;
                this.addMutation(arg.mutations[key]);
            }
        }

        IDRegistry.genItemID("princess" + arg.species);
        Item.createItem("princess" + arg.species, arg.localize.princess.en, {
            name: arg.textures.princess,
            meta: 0
        }, {stack: 1});
        Translation.addTranslation(arg.localize.princess.en, arg.localize.princess);

        IDRegistry.genItemID("drone" + arg.species);
        Item.createItem("drone" + arg.species, arg.localize.drone.en, {name: arg.textures.drone, meta: 0}, {stack: 1});
        Translation.addTranslation(arg.localize.drone.en, arg.localize.drone);

        IDRegistry.genItemID("queen" + arg.species);
        Item.createItem("queen" + arg.species, arg.localize.queen.en, {name: arg.textures.queen, meta: 0}, {stack: 1});
        Translation.addTranslation(arg.localize.queen.en, arg.localize.queen);

        let bee_type = new BeeType(arg.species, ItemID["princess" + arg.species], ItemID["drone" + arg.species], ItemID["queen" + arg.species], arg.flowers, arg.humidity, arg.climate);
        bee_type.chromosomes_list = arg.chromosomes;
        bee_type.dominant = arg.dominant;
        bee_type.produce = arg.produce;
        bee_type.specialty = arg.specialty;

        this.bees[arg.species] = bee_type;

        let NAME_OVERRIDE = function (item, name) {
            let beeType = BeeRegistry.getBeeTypeByID(item.id);
            let bee = BeeSaver.bees["b" + item.data];
            if (beeType !== BeeRegistry.BEETYPE_DRONE) {
                name += "§e\n" + (!bee ? "Pristine Stock" : "Ignoble Stock");
            }
            if (bee && bee.analyzed) {
                let climateTol = bee.getActiveChromosome("TEMPERATURE_TOLERANCE");
                let humidityTol = bee.getActiveChromosome("HUMIDITY_TOLERANCE");
                name += "§7\n" + BeeRegistry.getChromosomeValueName("LIFESPAN", bee.getActiveChromosome("LIFESPAN")) + " Life";
                name += "\n" + BeeRegistry.getChromosomeValueName("SPEED", bee.getActiveChromosome("SPEED")) + " Worker";
                name += "§a\nT: " + BeeRegistry.getChromosomeValueName("CLIMATE", bee.getClimate()) + "/" + bee.getClimateTolValue() + (climateTol === 0 ? "" : (climateTol < 6 ? " B" : (climateTol < 11 ? " U" : " D")));
                name += "\nH: " + BeeRegistry.getChromosomeValueName("HUMIDITY", bee.getHumidity()) + "/" + bee.getClimateTolValue() + (humidityTol === 0 ? "" : (humidityTol < 6 ? " B" : (humidityTol < 11 ? " U" : " D")));
                name += "§7\n" + BeeRegistry.getChromosomeValueName("FLOWERS", bee.getFlowers());
            } else name += "§7\n<unknown genome>";

            return name;
        };

        Item.registerNameOverrideFunction(ItemID["princess" + arg.species], NAME_OVERRIDE);
        Item.registerNameOverrideFunction(ItemID["drone" + arg.species], NAME_OVERRIDE);
        Item.registerNameOverrideFunction(ItemID["queen" + arg.species], NAME_OVERRIDE);
    },

    getBeeTypeByID: function (id) {
        if (id > 0) {
            for (let key in this.bees) {
                let beetype = this.bees[key];
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
        for (let key in this.bees) {
            let beetype = this.bees[key];
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
        let bee = null;
        if (!BeeSaver.bees["b" + data]) {
            let species = BeeRegistry.getTypeByID(id);
            let beetype = BeeRegistry.getBeeTypeByID(id);
            bee = new Bee(species, beetype, false);
            if (beetype === BeeRegistry.BEETYPE_QUEEN) {
                bee.mate = {
                    type: species,
                    active_chromosomes_list: Util.objectUnion(this.bees[species].chromosomes_list, {"SPECIES": species}),
                    inactive_chromosomes_list: Util.objectUnion(this.bees[species].chromosomes_list, {"SPECIES": species})
                };
            }
            return bee;
        }

        bee = BeeSaver.bees["b" + data];
        return bee;
    },

    isBee: function (id) {
        return BeeRegistry.getTypeByID(id) !== BeeRegistry.BEETYPE_NONE;
    },

    getChromosomeValueName: function (name, value) {
        if (name === "LIFESPAN") {

            switch (value) {
                case BeeRegistry.LIFESPAN_SHORTER:
                    return Translation.translate("bees.lifespan.shorted");
                case BeeRegistry.LIFESPAN_SHORTENED:
                    return Translation.translate("bees.lifespan.shortened");
                case BeeRegistry.LIFESPAN_SHORTEST:
                    return Translation.translate("bees.lifespan.shortest");
                case BeeRegistry.LIFESPAN_SHORT:
                    return Translation.translate("bees.lifespan.short");
                case BeeRegistry.LIFESPAN_NORMAL:
                    return Translation.translate("bees.lifespan.normal");
                case BeeRegistry.LIFESPAN_ELONGATED:
                    return Translation.translate("bees.lifespan.elongated");
                case BeeRegistry.LIFESPAN_LONG:
                    return Translation.translate("bees.lifespan.long");
                case BeeRegistry.LIFESPAN_LONGER:
                    return Translation.translate("bees.lifespan.longer");
                case BeeRegistry.LIFESPAN_LONGEST:
                    return Translation.translate("bees.lifespan.longest")
            }
        
        } else if (name === "SPEED") {

            switch (value) {
                case BeeRegistry.SPEED_FAST:
                    return Translation.translate("bees.speed.fast");
                case BeeRegistry.SPEED_FASTER:
                    return Translation.translate("bees.speed.faster");
                case BeeRegistry.SPEED_FASTEST:
                    return Translation.translate("bees.speed.fastest");
                case BeeRegistry.SPEED_NORMAL:
                    return Translation.translate("bees.speed.normal");
                case BeeRegistry.SPEED_SLOW:
                    return Translation.translate("bees.speed.slow");
                case BeeRegistry.SPEED_SLOWER:
                    return Translation.translate("bees.speed.slower");
                case BeeRegistry.SPEED_SLOWEST:
                    return Translation.translate("bees.speed.slowest")
            }
        
        } else if (name === "FLOWERS") {
            return Translation.translate(value[0]);
        } else if (name === "EFFECT") {

            switch (value) {
                case BeeEffects.EFFECT_NONE:
                    return Translation.translate("bees.effect.none");
                case BeeEffects.EFFECT_AGGRESS:
                    return Translation.translate("bees.effect.aggress");
                case BeeEffects.EFFECT_BEATIFIC:
                    return Translation.translate("bees.effect.beatific");
                case BeeEffects.EFFECT_CREEPER:
                    return Translation.translate("bees.effect.creeper");
                case BeeEffects.EFFECT_DRUNKARD:
                    return Translation.translate("bees.effect.drunkard");
                case BeeEffects.EFFECT_EXPLORER:
                    return Translation.translate("bees.effect.explorer");
                case BeeEffects.EFFECT_ENDS:
                    return Translation.translate("bees.effect.ends");
                case BeeEffects.EFFECT_FLAMMABLE:
                    return Translation.translate("bees.effect.flammable");
                case BeeEffects.EFFECT_FREEZING:
                    return Translation.translate("bees.effect.freezing");
                case BeeEffects.EFFECT_HEROIC:
                    return Translation.translate("bees.effect.heroic");
                case BeeEffects.EFFECT_POISON:
                    return Translation.translate("bees.effect.poison");
                case BeeEffects.EFFECT_RADIOACT:
                    return Translation.translate("bees.effect.radiact");
                case BeeEffects.EFFECT_REANIMATION:
                    return Translation.translate("bees.effect.reanimation");
                case BeeEffects.EFFECT_REPULSION:
                    return Translation.translate("bees.effect.repulsion")
            }
        
        } else if (name === "CLIMATE") {

            switch (value) {
                case BiomeHelper.CLIMATE_ICY:
                    return Translation.translate("climate.icy");
                case BiomeHelper.CLIMATE_COLD:
                    return Translation.translate("climate.cold");
                case BiomeHelper.CLIMATE_NORMAL:
                    return Translation.translate("climate.normal");
                case BiomeHelper.CLIMATE_WARM:
                    return Translation.translate("climate.warm");
                case BiomeHelper.CLIMATE_HOT:
                    return Translation.translate("climate.hot");
                case BiomeHelper.CLIMATE_HELLISH:
                    return Translation.translate("climate.hellish")
            }
            
        } else if (name === "HUMIDITY") {

            switch (value) {
                case BiomeHelper.HUMIDITY_ARID:
                    return Translation.translate("humidity.arid");
                case BiomeHelper.HUMIDITY_DAMP:
                    return Translation.translate("humidity.damp");
                case BiomeHelper.HUMIDITY_NORMAL:
                    return Translation.translate("humidity.normal")
            }
            
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