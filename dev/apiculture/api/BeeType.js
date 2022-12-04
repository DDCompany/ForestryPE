/**
 * @param {string} type
 * @param {number} princessID
 * @param {number} droneID
 * @param {number} queenID
 * @param {Array} flowers
 * @param {number} humidity
 * @param {number} climate
 * @constructor
 */
function BeeType(type, princessID, droneID, queenID, flowers, humidity, climate) {
    this.chromosomes_list = {};
    this.type = type;
    this.princessID = princessID;
    this.droneID = droneID;
    this.queenID = queenID;
    this.dominant = false;
    this.produce = [];
    this.specialty = [];
    this.flowers = flowers;
    this.humidity = humidity;
    this.climate = climate;

    this.isValidTemperature = function (temperature) {
        return Habitat.isWithinLimit(temperature, this.climate, this.getChromosome("TEMPERATURE_TOLERANCE"));
    }
    this.isValidHumidity = function (humidity) {
        return Habitat.isWithinLimit(humidity, this.humidity, this.getChromosome("HUMIDITY_TOLERANCE"));
    }

    this.getChromosome = function (name) {
        return (typeof this.chromosomes_list[name] !== "undefined" && this.chromosomes_list[name] !== null) ? this.chromosomes_list[name] : BeeRegistry.chromosomes_list[name];
    };
}