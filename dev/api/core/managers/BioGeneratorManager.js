const BioGeneratorManager = {
    fuel: {},

    registerBiogeneratorFuel: function (fluid, fuel) {
        this.fuel[fluid] = fuel;
    },

    getBiogeneratorFuel: function (fluid) {
        return this.fuel[fluid];
    }

};