setLoadingTip("Energy Module Loading...");

const BioGeneratorManager = {
    fuel: {},

    addFuel: function (fluid, fuel) {
        this.fuel[fluid] = fuel;
    },

    getFuel: function (fluid) {
        return this.fuel[fluid];
    }
};