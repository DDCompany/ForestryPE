const PeatFiredManager = {
    fuel: {},

    addFuel: function (id, energy, burnTime) {
        if (energy <= 0) {
            summonException("Energy must be > 0! (Peat Fired Fuel Registration)");
            return;
        }

        if (burnTime <= 0) {
            summonException("Burn time must be > 0! (Peat Fired Fuel Registration)");
            return;
        }

        this.fuel[id] = {
            energy: energy,
            burnTime: burnTime
        }
    },

    getFuel: function (id) {
        return this.fuel[id];
    }
};