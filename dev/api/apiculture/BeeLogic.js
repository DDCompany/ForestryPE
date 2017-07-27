var BeeLogic = {
    mate: function (princess, drone) {
        var queen = new Bee(princess.type, BeeRegistry.BEETYPE_QUEEN);
        queen.active_chromosomes_list = princess.active_chromosomes_list;
        queen.inactive_chromosomes_list = princess.inactive_chromosomes_list;
        queen.mate = drone;

        return queen;
    },

    produce: function (queen) {
        var produce = queen.getProduce();
        var specialty = queen.getSpecialty();
        var speed = queen.getActiveChromosome("SPEED");
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
        var territory = {
            x: parseInt(bee.getActiveChromosome("TERRITORY").split("x")[0]),
            y: parseInt(bee.getActiveChromosome("TERRITORY").split("x")[1]),
            z: parseInt(bee.getActiveChromosome("TERRITORY").split("x")[2])
        };

        for (var xx = coords.x - territory.x; xx < coords.x + territory.x; xx++) {
            for (var yy = coords.y - territory.y; yy < coords.y + territory.y; yy++) {
                for (var zz = coords.z - territory.z; zz < coords.z + territory.z; zz++) {
                    var block = World.getBlock(xx, yy, zz);
                    if (flowers.indexOf(block.id + ":" + block.data) > -1) return true;
                }
            }
        }

    },

    spawnPrincess: function (bee) {
        if (!bee.mate) {
            return null;
        }

        var active = null;
        var inactive = null;

        var mutated1 = this.mutateSpecies(bee, bee.mate);
        if (mutated1) {
            active = Util.objectUnion(BeeRegistry.chromosomes_list, mutated1.chromosomes_list, {SPECIES: mutated1.type});
        } else {
            active = Util.objectUnion(BeeRegistry.chromosomes_list, bee.active_chromosomes_list);
        }

        var mutated2 = this.mutateSpecies(bee, bee.mate);
        if (mutated2) {
            inactive = Util.objectUnion(BeeRegistry.chromosomes_list, mutated2.chromosomes_list, {SPECIES: mutated2.type});
        } else {
            inactive = Util.objectUnion(BeeRegistry.chromosomes_list, bee.inactive_chromosomes_list);
        }

        var princess = new Bee(bee.active_chromosomes_list.SPECIES, BeeRegistry.BEETYPE_PRINCESS, true, bee.inactive_chromosomes_list.SPECIES);

        for (var key in active) {
            if (key === "SPECIES") continue;
            var ch = this.inheritChromosome(active[key], inactive[key]);
            princess.active_chromosomes_list[key] = ch.active;
            princess.inactive_chromosomes_list[key] = ch.inactive;
        }

        princess.generation++;
        Debug.m(princess.item);
        return princess;
    },

    inheritChromosome: function (chromosomes1, chromosomes2) {
        var ch = null;
        if (Math.random() <= 0.5) {
            ch = chromosomes1;
        } else {
            ch = chromosomes1;
        }

        var ch2 = null;
        if (Math.random() <= 0.5) {
            ch2 = chromosomes2;
        } else {
            ch2 = chromosomes2;
        }

        if (Math.random() <= 0.5) {
            return {active: ch, inactive: ch2};
        } else {
            return {active: ch2, inactive: ch};
        }
    },

    mutateSpecies: function (parent1, parent2) {
        var combinations = BeeRegistry.getMutations(parent1.type, parent2.type);
        for (var key in combinations) {
            if (true) {
                return BeeRegistry.getBeeByType(combinations[key].result);
            }
        }

        return null;
    }

};