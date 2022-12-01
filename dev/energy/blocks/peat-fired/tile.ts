MachineRegistry.registerGenerator(BlockID.enginePeat, {
    useNetworkItemContainer: true,

    defaultValues: {
        burn: 0,
        burnMax: 0,
        ashValue: 0,
        energyOut: 0
    },

    addAsh() {
        for (let i = 0; i < 4; i++) {
            const slotName = `slotAsh${i}`;
            let slot = this.container.getSlot(slotName);
            if (slot.id === 0) {
                this.container.setSlot(slotName, ItemID.ash, 1, 0)
                return true;
            } else if (slot.id === ItemID.ash && slot.data === 0 && slot.count < 64) {
                this.container.setSlot(slotName, ItemID.ash, slot.count + 1, 0)
                return true;
            }
        }

        return false;
    },

    tick() {
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
                this.container.setSlot("slotFuel", slotFuel.id, slotFuel.count - 1, slotFuel.data);
                this.container.validateAll();
            }
        }

        this.container.setScale("burnScale", ((this.data.burnMax - this.data.burn) / this.data.burnMax) || 0);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.container.sendChanges();
    },

    getEnergyStorage() {
        return 200000;
    },

    getScreenByName() {
        return guiPeatFiredEngine;
    },
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