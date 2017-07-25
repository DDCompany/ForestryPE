function BeeType(type, princessID, droneID, queenID) {
    this.chromosomes_list = {};
    this.type = type;
    this.princessID = princessID;
    this.droneID = droneID;
    this.queenID = queenID;
    this.dominant = false;

    this.getChromosome = function (name) {
        return (typeof this.chromosomes_list[name] != "undefined" && typeof this.chromosomes_list[name] != "null") ? this.chromosomes_list[name] : BeeRegistry.chromosomes_list[name];
    };
}