function Bee(species, beetype, save, inactive_species) {
    this.type = species;
    this.beetype = beetype;
    this.analyzed = false;
    this.unique = 0;
    this.item = {};
    this.active_chromosomes_list = {};
    this.inactive_chromosomes_list = {};
    this.pristine = true;
    this.generation = 0;

    this.save = function () {
        this.unique = BeeRegistry.getBeeNextUniqueID();
        BeeSaver.bees[this.unique] = this;
        !this.item.id || (this.item.data = this.unique);
    };

    this.getProduce = function () {
        var arr = this.getBeeType().produce;
        var arr2 = this.getInactiveBeeType().produce;
        for (var key in arr2) {
            var skip = false;
            for (var key2 in arr) {
                if (arr[key][0] == arr2[key2][0] && arr[key][1] == arr2[key2][1]) {
                    skip = true;
                }
            }

            if (!skip) {
                arr.push(arr2[key]);
            }
        }
        return arr;
    };

    this.getFlowers = function () {
        return this.getBeeType().flowers;
    };

    this.getInactiveFlowers = function () {
        return this.getInactiveBeeType().flowers;
    };

    this.getHumidity = function () {
        return this.getBeeType().humidity;
    };

    this.getInactiveHumidity = function () {
        return this.getInactiveBeeType().humidity;
    };

    this.getClimate = function () {
        return this.getBeeType().climate;
    };

    this.getInactiveClimate = function () {
        return this.getInactiveBeeType().climate;
    };

    this.getClimateTolValue = function () {
        return BeeRegistry.getToleranceValue(this.getActiveChromosome("TEMPERATURE_TOLERANCE"));
    };

    this.getInactiveClimateTolValue = function () {
        return BeeRegistry.getToleranceValue(this.getInactiveChromosome("TEMPERATURE_TOLERANCE"));
    };

    this.getHumidityTolValue = function () {
        return BeeRegistry.getToleranceValue(this.getActiveChromosome("HUMIDITY_TOLERANCE"));
    };

    this.getInactiveHumidityTolValue = function () {
        return BeeRegistry.getToleranceValue(this.getInactiveChromosome("HUMIDITY_TOLERANCE"));
    };

    this.getBeeType = function () {
        return BeeRegistry.getBeeByType(this.type);
    };

    this.getInactiveBeeType = function () {
        return BeeRegistry.getBeeByType(this.inactive_chromosomes_list["SPECIES"]);
    };

    this.getSpecialty = function () {
        return this.getBeeType().specialty;
    };

    this.isSaved = function () {
        return this.unique;
    };

    this.getActiveChromosome = function (name) {
        return (typeof this.active_chromosomes_list[name] !== "undefined" && typeof this.active_chromosomes_list[name] !== "null") ? this.active_chromosomes_list[name] : BeeRegistry.bees[this.type].getChromosome(name);
    };

    this.getInactiveChromosome = function (name) {
        return (typeof this.inactive_chromosomes_list[name] !== "undefined" && typeof this.inactive_chromosomes_list[name] !== "null") ? this.inactive_chromosomes_list[name] : BeeRegistry.bees[this.inactive_chromosomes_list.SPECIES].getChromosome(name);
    };

    this.getSaveScope = function () {
        var scope = {};
        for (var key in this) {
            typeof this[key] === "function" || (scope[key] = this[key]);
        }

        return scope;
    };

    this.readSaveScope = function (scope) {
        for (var key in scope) this[key] = scope[key];

        return this;
    };

    this.getMaxHealth = function () {
        return this.getActiveChromosome("LIFESPAN");
    };

    this.refreshItem = function () {
        if (this.beetype === BeeRegistry.BEETYPE_QUEEN) {
            this.item.id = BeeRegistry.getQueenByType(this.type);
            this.item.data = this.unique;
        } else if (this.beetype === BeeRegistry.BEETYPE_DRONE) {
            this.item.id = BeeRegistry.getDroneByType(this.type);
            this.item.data = this.unique;
        } else if (this.beetype === BeeRegistry.BEETYPE_PRINCESS) {
            this.item.id = BeeRegistry.getPrincessByType(this.type);
            this.item.data = this.unique;
        }
    };

    if (species) {
        this.active_chromosomes_list["SPECIES"] = species;
        this.inactive_chromosomes_list["SPECIES"] = inactive_species ? inactive_species : species;
        if (save || typeof save === "undefined") {
            this.save();
        }

        this.refreshItem();

        this.health = this.getMaxHealth();
    }

}