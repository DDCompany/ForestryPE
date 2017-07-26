function union(obj1, obj2) {
    var obj = {};
    for (var key in obj1) {
        if (typeof obj1[key] == "object") {
            obj[key] = union(obj, obj1[key]);
            continue;
        }
        obj[key] = obj1[key];
    }

    for (var key in obj2) {
        if (typeof obj2[key] == "object") {
            obj[key] = union(obj, obj2[key]);
            continue;
        }
        obj[key] = obj2[key];
    }
    return obj;
}
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

        for (var key in specialty) {
            if (Math.random() < specialty[key][2] * speed) {
                result.push([specialty[key][0], specialty[key][1], 1]);
            }
        }

        return result;
    },

    findFlowers: function (bee, coords) {
        var flowers = bee.getActiveChromosome("FLOWERS");
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

        var active = union(BeeRegistry.chromosomes_list, bee.active_chromosomes_list);
        var inactive = union(BeeRegistry.chromosomes_list, bee.inactive_chromosomes_list);

        var princess = new Bee(bee.active_chromosomes_list.SPECIES, BeeRegistry.BEETYPE_PRINCESS, true, bee.inactive_chromosomes_list.SPECIES);

        for (var key in active) {
            if (key == "SPECIES") continue;
            var ch = this.inheritChromosome(active[key], inactive[key]);
            princess.active_chromosomes_list[key] = ch.active;
            princess.inactive_chromosomes_list[key] = ch.inactive;
        }

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

        var chromosomes_active_1 = parent1.active_chromosomes_list;
        var chromosomes_inactive_1 = parent1.inactive_chromosomes_list;
        var chromosomes_active_2 = parent2.active_chromosomes_list;
        var chromosomes_inactive_2 = parent1.inactive_chromosomes_list;

        var ch1 = null;
        var ch2 = null;

        if (Math.random() <= 0.5) {


        } else {

        }
    }

};