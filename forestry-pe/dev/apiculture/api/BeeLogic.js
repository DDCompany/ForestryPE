var BeeLogic = {
    /**
     * Спаривает принцессу и дрона
     * @param {Bee} princess
     * @param {Bee} drone
     * @return {Bee} королева
     */
    mate(princess, drone) {
        var queen = new Bee(princess.type, BeeRegistry.BEETYPE_QUEEN);
        queen.active_chromosomes_list = princess.active_chromosomes_list;
        queen.inactive_chromosomes_list = princess.inactive_chromosomes_list;
        queen.mate = {
            type: drone.type,
            active_chromosomes_list: drone.active_chromosomes_list,
            inactive_chromosomes_list: drone.inactive_chromosomes_list
        };
        queen.generation = princess.generation;
        queen.pristine = princess.pristine || drone.pristine;

        return queen;
    },

    /**
     * @param {Bee} queen
     * @param {number} productionModifier Модификатор продукции
     * @param {number} houseModifier Модификатор продукции пасеки
     * @return {Array} Произведенная продукция
     */
    produce(queen, productionModifier, houseModifier) {
        var produce = queen.getProduce();
        var specialty = queen.getSpecialty();
        var speed = queen.getActiveChromosome("SPEED") * productionModifier * houseModifier * BM_SPEED_MODIFIER;
        var result = [];

        for (var key in produce) {
            if (Math.random() < produce[key][2] * speed) {
                result.push([produce[key][0], produce[key][1], 1]);
            }
        }

        for (var key2 in specialty) {
            if (Math.random() < specialty[key2][2] * speed) {
                result.push([specialty[key2][0], specialty[key2][1], 1]);
            }
        }

        return result;
    },

    /**
     * @param {Bee} bee
     * @param {Object} coords
     * @return {boolean} Найдены ли подходящие цветы для пчелы
     */
    findFlowers(bee, coords) {
        var flowers = bee.getFlowers();
        var territory = BeeRegistry.rangeToObject(bee.getActiveChromosome("TERRITORY"));

        for (var xx = coords.x - territory.x; xx < coords.x + territory.x; xx++) {
            for (var yy = coords.y - territory.y; yy < coords.y + territory.y; yy++) {
                for (var zz = coords.z - territory.z; zz < coords.z + territory.z; zz++) {
                    var block = World.getBlock(xx, yy, zz);
                    if (flowers.indexOf(block.id + ":" + block.data) > -1 || flowers.indexOf(block.id + ":-1") > -1) return true;
                }
            }
        }

        return false;
    },

    spawnAll(bee, modifierList, houseModifierList, house) {
        let arr = [];

        if (BM_CAN_FATIGUE) {
            if (!bee.pristine && bee.generation > 96 + Util.random(0, 6) + Util.random(0, 6) && Math.random() < 0.02 * houseModifierList.getGeneticDecay(house) * modifierList.getGeneticDecay(house)) return [];
        }

        this.spawnPrincess(bee, modifierList, houseModifierList, house, arr);
        this.spawnDrones(bee, modifierList, houseModifierList, house, arr);

        return arr;
    },

    /**
     * Возвращает потомства(принцессы)
     * @param {Bee} bee королева
     * @param {ModifierList} modifierList
     * @param {ModifierList} houseModifierList
     * @param {BeeHouse} house
     * @return {Array}
     */
    spawnPrincess(bee, modifierList, houseModifierList, house, arr) {
        var count = Math.random() < ForestryConfig.secondPrincessChance ? 2 : 1;
        for (var i = 0; i < count; i++) {
            arr.push(this.createOffspring(bee, BeeRegistry.BEETYPE_PRINCESS, modifierList, houseModifierList, house));
        }
    },

    /**
     * Возвращает потомства(дроны)
     * @param {Bee} bee королева
     * @param {ModifierList} modifierList
     * @param {ModifierList} houseModifierList
     * @param {BeeHouse} house
     * @return {Array}
     */
    spawnDrones(bee, modifierList, houseModifierList, house, arr) {
        var toCreate = parseInt(bee.getActiveChromosome("FERTILITY"));

        if (BM_REDUCES_FERTILITY)
            toCreate = Util.random(1, toCreate);

        for (var i = 0; i < toCreate; i++) {
            arr.push(this.createOffspring(bee, BeeRegistry.BEETYPE_DRONE, modifierList, houseModifierList, house));
        }

    },

    createOffspring(bee, bee_type, modifierList, houseModifierList, house) {
        if (!bee.mate) {
            return null;
        }

        var species1 = bee.type;
        var species2 = bee.mate.type;

        var parent1in = null;
        var parent1act = null;
        var parent2in = null;
        var parent2act = null;

        var mutated1 = this.mutateSpecies(bee, bee.mate, modifierList, houseModifierList, house);
        if (mutated1) {
            species1 = mutated1.type;
            parent1in = mutated1.chromosomes;
            parent1act = mutated1.chromosomes;
        } else {
            parent1in = Util.objectUnion(BeeRegistry.chromosomes_list, BeeRegistry.getBeeByType(species1).chromosomes_list, bee.active_chromosomes_list);
            parent1act = Util.objectUnion(BeeRegistry.chromosomes_list, BeeRegistry.getBeeByType(species1).chromosomes_list, bee.inactive_chromosomes_list);
        }

        var mutated2 = this.mutateSpecies(bee, bee.mate, modifierList, houseModifierList, house);
        if (mutated2) {
            species2 = mutated2.type;
            parent2in = mutated2.chromosomes;
            parent2act = mutated2.chromosomes;
        } else {
            parent2in = Util.objectUnion(BeeRegistry.chromosomes_list, BeeRegistry.getBeeByType(species2).chromosomes_list, bee.mate.active_chromosomes_list);
            parent2act = Util.objectUnion(BeeRegistry.chromosomes_list, BeeRegistry.getBeeByType(species2).chromosomes_list, bee.mate.inactive_chromosomes_list);
        }

        var princess = new Bee(species1, bee_type, true, species2);

        for (var key in parent1act) {
            var ch = this.inheritChromosome({
                active: parent1act[key],
                inactive: parent1in[key]
            }, {active: parent2act[key], inactive: parent2in[key]});
            princess.active_chromosomes_list[key] = ch.active;
            princess.inactive_chromosomes_list[key] = ch.inactive;
            if (key === "SPECIES") princess.type = ch.active;
        }

        princess.generation = bee.generation;
        princess.generation++;
        princess.pristine = bee.pristine;

        return princess;
    },

    inheritChromosome(chromosomes1, chromosomes2) {
        var ch = null;
        if (Math.random() < 0.5) {
            ch = chromosomes1.active;
        } else {
            ch = chromosomes1.inactive;
        }

        var ch2 = null;
        if (Math.random() < 0.5) {
            ch2 = chromosomes2.active;
        } else {
            ch2 = chromosomes2.inactive;
        }

        if (Math.random() <= 0.5) {
            return {active: ch, inactive: ch2};
        } else {
            return {active: ch2, inactive: ch};
        }
    },

    mutateSpecies(parent1, parent2, modifierList, houseModifierList, house) {
        var combinations = BeeRegistry.getMutations(parent1.type, parent2.type);
        for (var key in combinations) {
            if (Math.random() < combinations[key].chance * modifierList.getMutationModifier(house) * houseModifierList.getMutationModifier(house) * BM_MUTATION_MODIFIER && combinations[key].onMutate(house)) {
                var mut = BeeRegistry.getBeeByType(combinations[key].result);
                return {type: mut.type, chromosomes: Util.objectUnion(mut.chromosomes_list, {SPECIES: mut.type})};
            }
        }

        return null;
    }

};