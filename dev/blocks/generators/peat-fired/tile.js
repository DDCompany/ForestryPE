MachineRegistry.register(BlockID.enginePeat, {
    defaultValues: {
        burn: 0,
        burnMax: 0,
        ashValue: 0,
        energyOut: 0
    },

    getTransportSlots: function () {
        return {input: ["slotFuel"], output: ["slotAsh0", "slotAsh1", "slotAsh2", "slotAsh3"]};
    },

    getGuiScreen: function () {
        return guiPeatFiredEngine;
    },

    isGenerator: function () {
        return true;
    },

    getFuelValue: function (id) {
        if (id == 0) {
            return 0;
        } else if (id == ItemID.peat) {
            return 5000;
        } else if (id == ItemID.bituminousPeat) {
            return 6000;
        }
    },

    getEnergyOutputValue: function (id) {
        if (id == 0) {
            return 0;
        } else if (id == ItemID.peat) {
            return 3;
        } else if (id == ItemID.bituminousPeat) {
            return 5;
        }
    },

    addAsh: function () {

        for (var i = 0; i < 4; i++) {
            var slot = this.container.getSlot("slotAsh" + i);
            if (slot.id == 0) {
                slot.id = ItemID.ash;
                slot.data = 0;
                slot.count = 1;
                return true;
            } else if (slot.id == ItemID.ash && slot.data == 0 && slot.count < 64) {
                slot.count++;
                return true;
            }
        }
        return false;
    },

    tick: function () {
        var slotFuel = this.container.getSlot("slotFuel");
        if (this.data.burn) {
            if (this.data.burn >= this.data.burnMax) {
                if (this.data.ashValue < 2 || this.addAsh()) {
                    this.data.burnMax = 0;
                    this.data.burn = 0;
                    this.data.energyOut = 0;
                    if (this.data.ashValue >= 2) {
                        this.data.ashValue = 0;
                    } else {
                        this.data.ashValue++;
                    }
                }
            } else {
                if (this.data.energy + this.data.energyOut <= this.getEnergyStorage()) {
                    this.data.energy += this.data.energyOut;
                }
                this.data.burn++;
            }
        } else if (this.data.energy < this.getEnergyStorage()) {
            var burnm = this.getFuelValue(slotFuel.id);
            if (burnm) {
                this.data.energyOut = this.getEnergyOutputValue(slotFuel.id);
                this.data.burnMax = burnm;
                this.data.burn++;
                slotFuel.count--;
            }
        }

        this.container.setScale("burnScale", this.data.burn / this.data.burnMax);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());

        this.container.validateAll();
    },

    getEnergyStorage: function () {
        return 5000;
    },

    energyTick: function (type, src) {
        var out = Math.min(32, this.data.energy);
        this.data.energy -= out;
        this.data.energy += src.add(out);
    }
});