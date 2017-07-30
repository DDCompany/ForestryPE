function BeeType(type, princessID, droneID, queenID, flowers, humidity, climate, effect) {
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
    this.effect = effect;

    this.getChromosome = function (name) {
        return (typeof this.chromosomes_list[name] !== "undefined" && this.chromosomes_list[name] !== null) ? this.chromosomes_list[name] : BeeRegistry.chromosomes_list[name];
    };
}