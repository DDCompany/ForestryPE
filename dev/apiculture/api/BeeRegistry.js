const BeeRegistry = {
    bees: {},

    FLOWERS_FLOWERS: ["forestry.alleles.flowers.vanilla", "38:-1", "37:-1", " 175:1", "175:4", " 175:5"],
    FLOWERS_WHEAT: ["forestry.alleles.flowers.wheat", "59:0"],
    FLOWERS_NETHER: ["forestry.alleles.flowers.nether", "115:0"],
    FLOWERS_ENDS: ["forestry.alleles.flowers.end", "122:0"],
    FLOWERS_CACTI: ["forestry.alleles.flowers.cacti", "81:0"],
    FLOWERS_MUSHROOMS: ["forestry.alleles.flowers.mushrooms", "39:0", "40:0"],
    FLOWERS_JUNGLE: ["forestry.alleles.flowers.jungle", "106:-1", "175:2"],
    FLOWERS_GOURD: ["forestry.alleles.flowers.gourd", "104:0", "105:0"],

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

    init() {
        this.chromosomes_list["SPEED"] = this.SPEED_SLOWEST;
        this.chromosomes_list["LIFESPAN"] = this.LIFESPAN_SHORTER;
        this.chromosomes_list["FERTILITY"] = 2;
        this.chromosomes_list["TEMPERATURE_TOLERANCE"] = this.TOLERANCE_NONE;
        this.chromosomes_list["NEVER_SLEEPS"] = false;
        this.chromosomes_list["HUMIDITY_TOLERANCE"] = this.TOLERANCE_NONE;
        this.chromosomes_list["TOLERATES_RAIN"] = false;
        this.chromosomes_list["CAVE_DWELLING"] = false;
        this.chromosomes_list["TERRITORY"] = "9x6x9";
        this.chromosomes_list["EFFECT"] = null;
    },

    getBeeFromScope(scope) {
        let bee = new Bee();
        for (let key in scope) {
            bee[key] = scope[key];
        }

        return bee;
    },

    rangeToObject(range) {
        return {
            x: parseInt(range.split("x")[0]),
            y: parseInt(range.split("x")[1]),
            z: parseInt(range.split("x")[2])
        };
    },

    convertToItemArray(bees) {
        let arr = [];
        for (let key in bees) {
            arr.push([bees[key].getItemID(), bees[key].unique, 1]);
        }

        return arr;
    },

    addMutation(arg) {
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
            arg.onMutate = () => true;
        }

        if (!this.mutations[arg.result]) {
            this.mutations[arg.result] = [];
        }

        this.mutations[arg.result].push(arg);
    },

    getMutations(species1, species2) {
        let muts = [];

        if (species2) {
            for (let key in this.mutations) {
                for (let key2 in this.mutations[key]) {
                    let mut = this.mutations[key][key2];
                    if ((mut.species1 === species1 && mut.species2 === species2) || (mut.species2 === species1 && mut.species1 === species2)) {
                        muts.push(mut);
                    }
                }
            }
        } else {
            for (let i in this.mutations) {
                let speciesMutations = this.mutations[i];
                for (let k in speciesMutations) {
                    let mutation = speciesMutations[k];
                    if (mutation.species1 === species1 || mutation.species2 === species1)
                        muts.push(mutation);
                }
            }
        }

        return muts;
    },

    getMutationsByResult(species) {
        return this.mutations[species];
    },

    getBeeNextUniqueID() {
        if (!BeeSaver.uniqueID) {
            BeeSaver.uniqueID = 0;
        }

        return ++BeeSaver.uniqueID;
    },

    getPrincessByType(type) {
        return ItemID["princess" + type];
    },

    getDroneByType(type) {
        return ItemID["drone" + type];
    },

    getQueenByType(type) {
        return ItemID["queen" + type];
    },

    getToleranceValue(value) {
        return value === 0 ? 0 : (value < 6 ? value : (value < 11 ? value - 5 : value - 10));
    },

    getTolerance(tol) {
        return tol === this.TOLERANCE_NONE ? 0 : (tol < 6 ? this.TOLERANCE_BOTH : (tol < 11 ? this.TOLERANCE_UP : this.TOLERANCE_DOWN))
    },

    registerBee(arg) {
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
            arg.humidity = Humidity.NORMAL;
        }

        if (!arg.climate) {
            arg.climate = Temperature.NORMAL;
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

        const lowerSpecies = arg.species.toLowerCase();
        IDRegistry.genItemID("princess" + arg.species);
        Item.createItem("princess" + arg.species, `forestry.item.${lowerSpecies}_princess`, {
            name: arg.textures.princess,
            meta: 0
        }, {stack: 1});
        Item.setCategory(ItemID["princess" + arg.species], EItemCategory.MATERIAL);

        IDRegistry.genItemID("drone" + arg.species);
        Item.createItem("drone" + arg.species, `forestry.item.${lowerSpecies}_drone`, {name: arg.textures.drone}, {stack: 1});
        Item.setCategory(ItemID["drone" + arg.species], EItemCategory.MATERIAL);

        IDRegistry.genItemID("queen" + arg.species);
        Item.createItem("queen" + arg.species, `forestry.item.${lowerSpecies}_queen`, {name: arg.textures.queen}, {stack: 1});
        Item.setCategory(ItemID["queen" + arg.species], EItemCategory.MATERIAL);

        if (arg.hasGlint) {
            Item.setGlint(ItemID["princess" + arg.species], true);
            Item.setGlint(ItemID["drone" + arg.species], true);
            Item.setGlint(ItemID["queen" + arg.species], true);
        }

        let bee_type = new BeeType(arg.species, ItemID["princess" + arg.species], ItemID["drone" + arg.species], ItemID["queen" + arg.species], arg.flowers, arg.humidity, arg.climate);
        bee_type.chromosomes_list = arg.chromosomes;
        bee_type.dominant = arg.dominant;
        bee_type.produce = arg.produce;
        bee_type.specialty = arg.specialty;

        this.bees[arg.species] = bee_type;

        let NAME_OVERRIDE = (item, name) => {
            const beeType = BeeRegistry.getBeeTypeByID(item.id);
            const bee = BeeSaver.bees["b" + item.data];

            if (beeType !== BeeRegistry.BEETYPE_DRONE) {
                name += "§e\n" + (!bee ? t("forestry.bee.stock.pristine") : t("forestry.bee.stock.ignoble"));
            }

            if (bee && bee.analyzed) {
                const speed = BeeRegistry._localizeWorkerSpeed(bee.getActiveChromosome("SPEED"));
                const life = BeeRegistry.getChromosomeValueName("LIFESPAN", bee.getActiveChromosome("LIFESPAN")) + " " + t("forestry.tooltip.bee.life");
                const climateTolerance = t(`forestry.alleles.tolerance.${bee.getActiveChromosome("TEMPERATURE_TOLERANCE")}`);
                const humidityTolerance = t(`forestry.alleles.tolerance.${(bee.getActiveChromosome("HUMIDITY_TOLERANCE"))}`);

                name += "§7\n" + life;
                name += "\n" + speed;
                name += "§a\n" + t("forestry.tooltip.bee.temperature", Habitat.localizeTemperature(bee.getClimate()), climateTolerance);
                name += "\n" + t("forestry.tooltip.bee.humidity", Habitat.localizeHumidity(bee.getHumidity()), humidityTolerance);
                name += "§7\n" + BeeRegistry.getChromosomeValueName("FLOWERS", bee.getFlowers());
            } else name += "§7\n" + t("forestry.tooltip.bee.unknown_genome");

            return name;
        };

        Item.registerNameOverrideFunction(ItemID["princess" + arg.species], NAME_OVERRIDE);
        Item.registerNameOverrideFunction(ItemID["drone" + arg.species], NAME_OVERRIDE);
        Item.registerNameOverrideFunction(ItemID["queen" + arg.species], NAME_OVERRIDE);

        Item.addCreativeGroup("forestryPrincess", t("forestry.creative_group.princesses"), [
            ItemID["princess" + arg.species],
        ]);
        Item.addCreativeGroup("forestryDrone", t("forestry.creative_group.drones"), [
            ItemID["drone" + arg.species],
        ]);
        Item.addCreativeGroup("forestryQueen", t("forestry.creative_group.queens"), [
            ItemID["queen" + arg.species],
        ]);
    },

    _localizeWorkerSpeed(speed) {
        switch (speed) {
            case BeeRegistry.SPEED_FASTEST:
                return t("forestry.tooltip.bee.worker.fastest");
            case BeeRegistry.SPEED_FASTER:
                return t("forestry.tooltip.bee.worker.faster");
            case BeeRegistry.SPEED_FAST:
                return t("forestry.tooltip.bee.worker.fast");
            case BeeRegistry.SPEED_NORMAL:
                return t("forestry.tooltip.bee.worker.normal");
            case BeeRegistry.SPEED_SLOW:
                return t("forestry.tooltip.bee.worker.slow");
            case BeeRegistry.SPEED_SLOWER:
                return t("forestry.tooltip.bee.worker.slower");
            case BeeRegistry.SPEED_SLOWEST:
                return t("forestry.tooltip.bee.worker.slowest");
        }

        throw new Error(`Invalid speed value: ${speed}`);
    },

    generateNames() {
        const hashCode = (str) => {
            return java.lang.Integer.valueOf(new java.lang.String(str).hashCode())
        };

        const startTime = Date.now();
        const organismTypes = ["princess", "drone", "queen"];
        for (const lang of I18n.loadedLanguages) {
            const translations = I18n.getTranslationMap(lang);
            const name = translations.get(hashCode("forestry.bee.name")) + ""; // convert java.lang.String to js string
            if (!name) {
                continue;
            }

            for (const type of organismTypes) {
                const typeName = translations.get(hashCode(`forestry.bee.${type}`));
                if (!typeName) {
                    continue;
                }

                for (const species in this.bees) {
                    const lowerSpecies = species.toLowerCase();
                    const itemKey = hashCode(`forestry.item.${lowerSpecies}_${type}`);
                    if (!translations.containsKey(itemKey)) {
                        const speciesName = translations.get(hashCode(`forestry.alleles.species.${lowerSpecies}`));
                        translations.put(itemKey, I18n.formatString(name, speciesName, typeName));
                    }
                }
            }
        }

        log(`Generated bee names in ${Date.now() - startTime}ms`, "INFO");
    },

    getBeeTypeByID(id) {
        if (id > 0) {
            for (let key in this.bees) {
                let bee = this.bees[key];
                switch (id) {
                    case bee.princessID:
                        return BeeRegistry.BEETYPE_PRINCESS;
                    case bee.droneID:
                        return BeeRegistry.BEETYPE_DRONE;
                    case bee.queenID:
                        return BeeRegistry.BEETYPE_QUEEN;
                }
            }
        }
        return BeeRegistry.BEETYPE_NONE;
    },

    getSpeciesByID(id) {
        for (let key in this.bees) {
            let bee = this.bees[key];
            if (bee.princessID === id || bee.droneID === id || bee.queenID === id) {
                return key;
            }
        }
        return null;
    },

    getBeeByType(type) {
        return this.bees[type];
    },

    getBeeFromItem(id, data) {
        let bee = null;
        if (!BeeSaver.bees["b" + data]) {
            let species = BeeRegistry.getSpeciesByID(id);
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

    isBee(id) {
        return BeeRegistry.getSpeciesByID(id) !== null;
    },

    getChromosomeValueName(name, value) {
        if (name === "SPECIES") {
            return t(`forestry.alleles.species.${value.toLowerCase()}`);
        }

        if (name === "LIFESPAN") {
            switch (value) {
                case BeeRegistry.LIFESPAN_SHORTER:
                    return Translation.translate("forestry.alleles.lifespan.shorted");
                case BeeRegistry.LIFESPAN_SHORTENED:
                    return Translation.translate("forestry.alleles.lifespan.shortened");
                case BeeRegistry.LIFESPAN_SHORTEST:
                    return Translation.translate("forestry.alleles.lifespan.shortest");
                case BeeRegistry.LIFESPAN_SHORT:
                    return Translation.translate("forestry.alleles.lifespan.short");
                case BeeRegistry.LIFESPAN_NORMAL:
                    return Translation.translate("forestry.alleles.lifespan.normal");
                case BeeRegistry.LIFESPAN_ELONGATED:
                    return Translation.translate("forestry.alleles.lifespan.elongated");
                case BeeRegistry.LIFESPAN_LONG:
                    return Translation.translate("forestry.alleles.lifespan.long");
                case BeeRegistry.LIFESPAN_LONGER:
                    return Translation.translate("forestry.alleles.lifespan.longer");
                case BeeRegistry.LIFESPAN_LONGEST:
                    return Translation.translate("forestry.alleles.lifespan.longest")
            }
        } else if (name === "SPEED") {
            switch (value) {
                case BeeRegistry.SPEED_FAST:
                    return Translation.translate("forestry.alleles.speed.fast");
                case BeeRegistry.SPEED_FASTER:
                    return Translation.translate("forestry.alleles.speed.faster");
                case BeeRegistry.SPEED_FASTEST:
                    return Translation.translate("forestry.alleles.speed.fastest");
                case BeeRegistry.SPEED_NORMAL:
                    return Translation.translate("forestry.alleles.speed.normal");
                case BeeRegistry.SPEED_SLOW:
                    return Translation.translate("forestry.alleles.speed.slow");
                case BeeRegistry.SPEED_SLOWER:
                    return Translation.translate("forestry.alleles.speed.slower");
                case BeeRegistry.SPEED_SLOWEST:
                    return Translation.translate("forestry.alleles.speed.slowest")
            }
        } else if (name === "FLOWERS") {
            return Translation.translate(value[0]);
        } else if (name === "EFFECT") {
            if (!value) {
                return Translation.translate("forestry.alleles.effect.none");
            }

            return BeeEffects.getLocalizedName(value);
        } else if (name === "CLIMATE") {
            return Habitat.localizeTemperature(value);
        } else if (name === "HUMIDITY") {
            return Habitat.localizeHumidity(value);
        }

        return value;
    },

    isDominant(name, value) {
        if (name === "FERTILITY") {
            return value === 1 || value === 2;
        } else if (name === "SPEED") {
            return value === BeeRegistry.SPEED_SLOWEST || value === BeeRegistry.SPEED_SLOWER || value === BeeRegistry.SPEED_SLOW || value === BeeRegistry.SPEED_FAST;
        } else if (name === "FLOWERS") {
            return value === BeeRegistry.FLOWERS_FLOWERS || value === BeeRegistry.FLOWERS_WHEAT || value === BeeRegistry.FLOWERS_GOURD;
        } else if (name === "EFFECT") {
            if (!value) {
                return true;
            }

            return BeeEffects.isDominant(value);
        } else if (name === "TEMPERATURE_TOLERANCE" || name === "HUMIDITY_TOLERANCE" || name === "TOLERANCE") {
            return value === this.TOLERANCE_BOTH_1 || value === this.TOLERANCE_UP_1 || value === this.TOLERANCE_DOWN_1;
        }

        return false;
    },

    integrateWithRecipeViewer(api) {
        function bakeBeeMutations(mutations) {
            if (!mutations)
                return [];

            return mutations.map(mutation => {
                const princessId = BeeRegistry.getPrincessByType(mutation.species1);
                const droneId = BeeRegistry.getDroneByType(mutation.species2);
                const resultId = BeeRegistry.getPrincessByType(mutation.result);

                return {
                    input: [
                        {id: princessId, data: 0, count: 1},
                        {id: droneId, data: 0, count: 1}
                    ],
                    chance: mutation.chance * 100,
                    output: [{id: resultId, data: 0, count: 1}]
                };
            });
        }

        api.registerRecipeType("fpe_bee_mutation", {
            contents: {
                icon: ItemID.queenMeadows,
                description: "Mutation",
                drawing: [
                    {type: "bitmap", x: 300, y: 100, scale: 5, bitmap: "forestry.for.apiary.bg_left"},
                    {type: "bitmap", x: 325, y: 130, scale: 5, bitmap: "forestry.for.apiary.scale_green"},
                    {type: "bitmap", x: 500, y: 220, scale: 5, bitmap: "forestry.scales.furnace_empty"}
                ],
                elements: {
                    input0: {type: "slot", x: 355, y: 125, size: 110, bitmap: "_default_slot_empty", needClean: true},
                    input1: {type: "slot", x: 355, y: 255, size: 110, bitmap: "_default_slot_empty", needClean: true},
                    output0: {type: "slot", x: 620, y: 200, size: 120},
                    textChance: {type: "text", x: 620, y: 330, font: {size: 30}},
                }
            },
            getList(id, data, isUsage) {
                const species = BeeRegistry.getSpeciesByID(id);
                if (!species)
                    return [];

                if (isUsage) {
                    return bakeBeeMutations(BeeRegistry.getMutations(species));
                } else return bakeBeeMutations(BeeRegistry.getMutationsByResult(species));
            },
            onOpen(elements, data) {
                elements.get("textChance")
                    .onBindingUpdated("text", data ? t("forestry.gui.chance", data.chance) : "%");
            }
        });

        api.registerRecipeType("fpe_bee_product", {
            contents: {
                icon: ItemID.queenForest,
                description: "Product",
                drawing: [
                    {type: "bitmap", x: 500, y: 100, scale: 4, bitmap: "forestry.for.recipeViewer.bee_produce"},
                    {type: "bitmap", x: 380, y: 230, scale: 4, bitmap: "forestry.scales.furnace_empty"}
                ],
                elements: {
                    input0: {type: "slot", x: 240, y: 200, size: 120},
                    output0: {type: "slot", x: 603, y: 119, size: 90, bitmap: "_default_slot_empty", needClean: true},
                    output1: {type: "slot", x: 519, y: 171, size: 90, bitmap: "_default_slot_empty", needClean: true},
                    output2: {type: "slot", x: 691, y: 171, size: 90, bitmap: "_default_slot_empty", needClean: true},
                    output3: {type: "slot", x: 603, y: 223, size: 90, bitmap: "_default_slot_empty", needClean: true},
                    output4: {type: "slot", x: 519, y: 275, size: 90, bitmap: "_default_slot_empty", needClean: true},
                    output5: {type: "slot", x: 603, y: 327, size: 90, bitmap: "_default_slot_empty", needClean: true},
                    output6: {type: "slot", x: 691, y: 275, size: 90, bitmap: "_default_slot_empty", needClean: true}
                }
            },
            getList(id, data, isUsage) {
                if (isUsage) {
                    let beeType = BeeRegistry.getBeeByType(BeeRegistry.getSpeciesByID(id));
                    return beeType ? [{
                        input: [{id: beeType.queenID, data: 0, count: 1}],
                        output: beeType.produce
                            .map(item => ({
                                id: item[0],
                                data: item[1],
                                count: 1
                            }))
                    }] : [];
                } else {
                    let recipes = [];
                    for (let i in BeeRegistry.bees) {
                        let beeType = BeeRegistry.bees[i];
                        let produce = beeType.produce;
                        let isOk = produce.find(item => item[0] === id && (data === -1 || item[1] === data)) !== undefined;

                        if (isOk) {
                            recipes.push({
                                input: [{id: beeType.queenID, data: 0, count: 1}],
                                output: produce
                                    .map(item => ({
                                        id: item[0],
                                        data: item[1],
                                        count: 1
                                    }))
                            });
                        }
                    }

                    return recipes;
                }
            }
        });
    },
};

BeeRegistry.init();

Callback.addCallback("PreLoaded", () => {
    BeeRegistry.generateNames();
});