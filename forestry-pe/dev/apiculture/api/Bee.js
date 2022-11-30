/**
 * @param species вид пчелы
 * @param beetype тип пчелы
 * @param save сохранять ли данные о ней
 * @param inactive_species неактивный вид
 * @constructor
 */
function Bee(species, beetype, save, inactive_species) {
    this.type = species;
    this.beetype = beetype;
    this.analyzed = false;
    this.unique = 0;
    this.active_chromosomes_list = {};
    this.inactive_chromosomes_list = {};
    this.pristine = true;
    this.generation = 0;

    /**
     * Добавляет пчелу в список сохранения
     * @type {Bee}
     */
    this.save = function () {
        if (this.isSaved()) return;
        this.unique = BeeRegistry.getBeeNextUniqueID();
        BeeSaver.bees["b" + this.unique] = this;
    };

    /**
     * Возвращает продукцию пчелы
     * @return {Array}
     */
    this.getProduce = function () {
        var arr = this.getBeeType().produce;
        var arr2 = this.getInactiveBeeType().produce;
        for (var key in arr2) {
            if (arr2[key]) {
                var skip = false;
                for (var key2 in arr) {
                    if (arr[key2]) {
                        if (arr[key2][0] == arr2[key][0] && arr[key2][1] == arr2[key][1]) {
                            skip = true;
                        }
                    }
                }

                if (!skip) {
                    arr.push(arr2[key]);
                }
            }
        }
        return arr;
    };

    /**
     * @return {Array} Массив цветов для активного вида
     */
    this.getFlowers = function () {
        return this.getBeeType().flowers;
    };

    /**
     * @return {Array} Массив цветов для неактивного вида
     */
    this.getInactiveFlowers = function () {
        return this.getInactiveBeeType().flowers;
    };

    /**
     * @return {number} Необходимую влажность для активного вида
     */
    this.getHumidity = function () {
        return this.getBeeType().humidity;
    };

    /**
     * @return {number} Необходимую влажность для неактивного вида
     */
    this.getInactiveHumidity = function () {
        return this.getInactiveBeeType().humidity;
    };

    /**
     * @return {number} Необходимую температуру для активного вида
     */
    this.getClimate = function () {
        return this.getBeeType().climate;
    };

    /**
     * @return {number} Необходимую температуру для неактивного вида
     */
    this.getInactiveClimate = function () {
        return this.getInactiveBeeType().climate;
    };

    /**
     * @return {number} Устойчивость к температуре для активного вида
     */
    this.getClimateTolValue = function () {
        return BeeRegistry.getToleranceValue(this.getActiveChromosome("TEMPERATURE_TOLERANCE"));
    };

    /**
     * @return {number} Устойчивость к температуре для неактивного вида
     */
    this.getInactiveClimateTolValue = function () {
        return BeeRegistry.getToleranceValue(this.getInactiveChromosome("TEMPERATURE_TOLERANCE"));
    };

    /**
     * @return {number} Устойчивость к влажности для активного вида
     */
    this.getHumidityTolValue = function () {
        return BeeRegistry.getToleranceValue(this.getActiveChromosome("HUMIDITY_TOLERANCE"));
    };

    /**
     * @return {number} Возвращает устойчивость к влажности для неактивного вида
     */
    this.getInactiveHumidityTolValue = function () {
        return BeeRegistry.getToleranceValue(this.getInactiveChromosome("HUMIDITY_TOLERANCE"));
    };

    /**
     * @return {BeeType} Тип пчелы для активного вида
     */
    this.getBeeType = function () {
        return BeeRegistry.getBeeByType(this.type);
    };

    /**
     * @return {BeeType} Тип пчелы для неактивного вида
     */
    this.getInactiveBeeType = function () {
        return BeeRegistry.getBeeByType(this.inactive_chromosomes_list["SPECIES"]);
    };

    /**
     * @return {Array} Спец. продукция
     */
    this.getSpecialty = function () {
        return this.getBeeType().specialty;
    };

    /**
     * @return {number} Сохраняются ли данные о пчеле
     */
    this.isSaved = function () {
        return this.unique !== 0;
    };

    /**
     * @param name Имя хромосомы
     * @return {*} Значение хромосомы для активного вида
     */
    this.getActiveChromosome = function (name) {
        return (typeof this.active_chromosomes_list[name] !== "undefined" && this.active_chromosomes_list[name] !== null) ? this.active_chromosomes_list[name] : BeeRegistry.bees[this.type].getChromosome(name);
    };

    /**
     * @param name Имя хромосомы
     * @return {*} Значение хромосомы для неактивного вида
     */
    this.getInactiveChromosome = function (name) {
        return (typeof this.inactive_chromosomes_list[name] !== "undefined" && this.inactive_chromosomes_list[name] !== null) ? this.inactive_chromosomes_list[name] : BeeRegistry.bees[this.inactive_chromosomes_list.SPECIES].getChromosome(name);
    };

    /**
     * @return {number} Продолжительность жизни(В циклах)
     */
    this.getMaxHealth = function () {
        return this.getActiveChromosome("LIFESPAN");
    };

    /**
     * @return {number}
     */
    this.getItemID = function () {
        switch (this.beetype) {
            case BeeRegistry.BEETYPE_QUEEN:
                return BeeRegistry.getQueenByType(this.type);
            case BeeRegistry.BEETYPE_DRONE:
                return BeeRegistry.getDroneByType(this.type);
            case BeeRegistry.BEETYPE_PRINCESS:
                return BeeRegistry.getPrincessByType(this.type);
        }

        throw new Error("Unknown bee type");
    };

    this.getSaveScope = function () {
        var scope = {};
        scope["type"] = this.type;
        scope["beetype"] = this.beetype;
        scope["analyzed"] = this.analyzed;
        scope["unique"] = this.unique;
        scope["active_chromosomes_list"] = this.active_chromosomes_list;
        scope["inactive_chromosomes_list"] = this.inactive_chromosomes_list;
        scope["pristine"] = this.pristine;
        scope["generation"] = this.generation;
        scope["health"] = this.health;
        if (this.mate) {
            scope["mate"] = this.mate;
        }

        return scope;
    };

    /**
     * Удаляет информацию о пчеле из сохранений
     */
    this.destroy = function () {
        if (!this.isSaved()) return;
        delete BeeSaver.bees["b" + this.unique];
    };

    /**
     * @param value климат
     * @return {boolean} пригоден ли климат для пчелы
     */
    this.isValidClimate = function (value) {
        return Habitat.isWithinLimit(value, this.getBeeType().climate, this.getActiveChromosome("TEMPERATURE_TOLERANCE"));
    };

    /**
     * @param value влажность
     * @return {boolean} пригодна ли влажность для пчелы
     */
    this.isValidHumidity = function (value) {
        return Habitat.isWithinLimit(value, this.getBeeType().humidity, this.getActiveChromosome("HUMIDITY_TOLERANCE"));
    };

    if (species) {
        this.active_chromosomes_list["SPECIES"] = species;
        this.inactive_chromosomes_list["SPECIES"] = inactive_species ? inactive_species : species;
        if (save || typeof save === "undefined") {
            this.save();
        }
        this.health = this.getMaxHealth();
    }
}