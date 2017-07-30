var BeeLogic = {
    mate: function (princess, drone) {
        var queen = new Bee(princess.type, BeeRegistry.BEETYPE_QUEEN);
        queen.active_chromosomes_list = princess.active_chromosomes_list;
        queen.inactive_chromosomes_list = princess.inactive_chromosomes_list;
        queen.mate = drone;
        queen.generation = princess.generation;

        return queen;
    },

    produce: function (queen, productionModifier, houseModifier) {
        var produce = queen.getProduce();
        var specialty = queen.getSpecialty();
        var speed = queen.getActiveChromosome("SPEED") * productionModifier * houseModifier;
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

    findFlowers: function (bee, coords) {
        var flowers = bee.getFlowers();
        var territory = BeeRegistry.rangeToObject(bee.getActiveChromosome("TERRITORY"));

        for (var xx = coords.x - territory.x; xx < coords.x + territory.x; xx++) {
            for (var yy = coords.y - territory.y; yy < coords.y + territory.y; yy++) {
                for (var zz = coords.z - territory.z; zz < coords.z + territory.z; zz++) {
                    var block = World.getBlock(xx, yy, zz);
                    if (flowers.indexOf(block.id + ":" + block.data) > -1) return true;
                }
            }
        }

    },

    spawnPrincess: function (bee, modifierList, houseModifierList, house) {
        var arr = [];
        var count = Math.random() < Config.secondPrincessChance ? 2 : 1;
        for (var i = 0; i < count; i++) {
            arr.push(this.createOffspring(bee, BeeRegistry.BEETYPE_PRINCESS, modifierList, houseModifierList, house));
        }
        return arr;
    },

    spawnDrones: function (bee, modifierList, houseModifierList, house) {
        var toCreate = parseInt(bee.getActiveChromosome("FERTILITY"));
        var arr = [];
        for (var i = 0; i < toCreate; i++) {
            arr.push(this.createOffspring(bee, BeeRegistry.BEETYPE_DRONE, modifierList, houseModifierList, house));
        }

        return arr;
    },

    createOffspring: function (bee, bee_type, modifierList, houseModifierList, house) {
        if (!bee.mate) {
            return null;
        }

        var species1 = bee.active_chromosomes_list.SPECIES;
        var species2 = bee.inactive_chromosomes_list.SPECIES;

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
            parent1in = Util.objectUnion(BeeRegistry.chromosomes_list, bee.active_chromosomes_list);
            parent1act = Util.objectUnion(BeeRegistry.chromosomes_list, bee.inactive_chromosomes_list);
        }

        var mutated2 = this.mutateSpecies(bee, bee.mate, modifierList, houseModifierList, house);
        if (mutated2) {
            species2 = mutated2.type;
            parent2in = mutated2.chromosomes;
            parent2act = mutated2.chromosomes;
        } else {
            parent2in = Util.objectUnion(BeeRegistry.chromosomes_list, bee.mate.active_chromosomes_list);
            parent2act = Util.objectUnion(BeeRegistry.chromosomes_list, bee.mate.inactive_chromosomes_list);
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

        princess.generation = ++bee.generation;

        return princess;
    },

    inheritChromosome: function (chromosomes1, chromosomes2) {
        var ch = null;
        if (Math.random() <= 0.5) {
            ch = chromosomes1.active;
        } else {
            ch = chromosomes1.inactive;
        }

        var ch2 = null;
        if (Math.random() <= 0.5) {
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

    mutateSpecies: function (parent1, parent2, modifierList, houseModifierList, house) {
        var combinations = BeeRegistry.getMutations(parent1.type, parent2.type);
        for (var key in combinations) {
            if (Math.random() < combinations[key].chance * modifierList.getMutationModifier(house, combinations[key].chance) * houseModifierList.getMutationModifier(house, combinations[key].chance)) {
                var mut = BeeRegistry.getBeeByType(combinations[key].result);
                return {type: mut.type, chromosomes: Util.objectUnion(mut.chromosomes_list, {SPECIES: mut.type})};
            }
        }

        return null;
    }

};