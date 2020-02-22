MachineRegistry.registerGenerator(BlockID.enginePeat, {
    defaultValues: {
        burn: 0,
        burnMax: 0,
        ashValue: 0,
        energyOut: 0
    },

    addAsh: function () {
        for (let i = 0; i < 4; i++) {
            let slot = this.container.getSlot("slotAsh" + i);
            if (slot.id === 0) {
                slot.id = ItemID.ash;
                slot.data = 0;
                slot.count = 1;
                return true;
            } else if (slot.id === ItemID.ash && slot.data === 0 && slot.count < 64) {
                slot.count++;
                return true;
            }
        }
        return false;
    },

    tick: function () {
        let slotFuel = this.container.getSlot("slotFuel");

        if (this.data.burn) {

            if (this.data.burn >= this.data.burnMax) {
                this.data.burnMax = 0;
                this.data.burn = 0;
                this.data.energyOut = 0;
            } else {
                if (this.data.energy + this.data.energyOut <= this.getEnergyStorage()) {
                    this.data.energy += this.data.energyOut;
                }

                if (this.data.ashValue >= 7500) {
                    this.addAsh();
                    this.data.ashValue = 0;
                } else this.data.ashValue++;

                this.data.burn++;

            }
        } else if (this.data.energy < this.getEnergyStorage()) {
            let fuel = PeatFiredManager.getFuel(slotFuel.id);
            if (fuel) {
                this.data.energyOut = fuel.energy;
                this.data.burnMax = fuel.burnTime;
                this.data.burn++;
                slotFuel.count--;
                this.container.validateAll();
            }
        }

        this.container.setScale("burnScale", (this.data.burnMax - this.data.burn) / this.data.burnMax);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
    },

    getEnergyStorage: function () {
        return 200000;
    },

    getGuiScreen: function () {
        return guiPeatFiredEngine;
    }
});

StorageInterface.createInterface(BlockID.enginePeat, {
    slots: {
        "slotFuel": {
            input: true
        },
        "slotAsh0": {
            output: true
        },
        "slotAsh1": {
            output: true
        },
        "slotAsh2": {
            output: true
        },
        "slotAsh3": {
            output: true
        },
    }
});