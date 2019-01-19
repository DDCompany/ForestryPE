const PeatFiredManager = {
    fuel: {},

    addFuel: function (id, energy, burnTime) {
        if (energy <= 0) {
            Logger.Log("[ForestryAPI] Energy must be > 0! (Peat Fired Fuel Registration)", "ERROR");
            return;
        }

        if (burnTime <= 0) {
            Logger.Log("[ForestryAPI] Burn time must be > 0! (Peat Fired Fuel Registration)", "ERROR");
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