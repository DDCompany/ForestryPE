MachineRegistry.registerGenerator(BlockID.engineBiogas, {
    useNetworkItemContainer: true,

    defaultValues: {
        liquidStored: 0,
        energyOut: 0,
        burnTime: 0,
        temperature: false,
        liquidNow: 0,
        burnMax: 0,
        temperatureRem: 0
    },

    init() {
        this.liquidStorage.setLimit(null, 10);
    },

    getBurnTimeForLiquid(liq: string) {
        return liq === "biomass" ? 1250 :
            (liq === "seedOil" ? 2500 :
                (liq === "appleJuice" ? 2500 :
                    (liq === "honey" ? 2500 : 0)));
    },

    getEnergyOutForLiquid(liq: string) {
        return liq === "biomass" ? 50 :
            (liq === "seedOil" ? 30 :
                (liq === "appleJuice" ? 10 :
                    (liq === "honey" ? 20 : 0)));
    },

    addEmptyContainer(empty: ItemInstance) {
        let slot = this.container.getSlot("slotEmptyContainer");

        if (slot.id === 0) {
            this.container.setSlot("slotEmptyContainer", empty.id, 1, empty.data);
            return true;
        } else if (slot.id == empty.id && slot.data == empty.data && slot.count + 1 != Item.getMaxStack(slot.id)) {
            this.container.setSlot("slotEmptyContainer", slot.id, slot.count + 1, slot.data);
            return true;
        }

        return false;
    },

    tick() {
        if (this.data.liquidStored) {
            this.updateLiquidScale("liquidScale", this.data.liquidStored);
        }

        if (this.data.temperature && !this.data.liquidNow) {
            if (this.data.temperatureRem >= 200) {
                this.data.temperatureRem = 0;
                this.data.temperature = false;
            } else {
                this.data.temperatureRem++;
            }
        }

        const slotContainer = this.container.getSlot("slotContainer");
        if (slotContainer.id && this.liquidStorage.getAmount("lava") + 1 <= 10) {
            let empty = LiquidRegistry.getEmptyItem(slotContainer.id, slotContainer.data);

            if (empty && empty.liquid === "lava" && this.addEmptyContainer(empty)) {
                this.liquidStorage.addLiquid("lava", 1);
                this.container.setSlot("slotContainer", slotContainer.id, slotContainer.count - 1, slotContainer.data);
            }
        }

        if (!this.data.liquidStored || (this.data.liquidStored && this.liquidStorage.getAmount(this.data.liquidStored) + 1 <= 10)) {
            let empty = LiquidRegistry.getEmptyItem(slotContainer.id, slotContainer.data);

            if (empty) {
                let liq;
                if (empty.liquid === "biomass") {
                    liq = "biomass";
                } else if (empty.liquid === "seedOil") {
                    liq = "seedOil";
                } else if (empty.liquid === "appleJuice") {
                    liq = "appleJuice";
                } else if (empty.liquid === "honey") {
                    liq = "honey";
                }

                if (liq && (!this.data.liquidStored || this.data.liquidStored === liq)) {
                    if (this.addEmptyContainer(empty)) {
                        this.liquidStorage.addLiquid(liq, 1);
                        this.data.liquidStored = liq;
                        this.container.setSlot("slotContainer", slotContainer.id, slotContainer.count - 1, slotContainer.data);
                    }
                }
            }
        }

        if (this.data.liquidNow) {
            if (this.data.temperature) {
                if (this.data.burnTime <= 0) {
                    this.data.liquidNow = 0;
                    this.data.burnTime = 0;
                } else {
                    if (this.data.energy + this.data.energyOut <= this.getEnergyStorage()) {
                        this.data.energy += this.data.energyOut;
                    } else if (this.data.energy !== this.getEnergyStorage()) {
                        this.data.energy = this.getEnergyStorage() - this.data.energy;
                    }
                    this.data.burnTime--;
                }
            } else if (this.liquidStorage.getAmount("lava") >= 0.25) {
                this.liquidStorage.getLiquid("lava", 0.25);
                this.data.temperature = true;
            }
        } else if (this.liquidStorage.getAmount("lava") >= 0.25 && this.data.energy < this.getEnergyStorage() && !this.data.liquidNow && this.data.liquidStored && this.liquidStorage.getAmount(this.data.liquidStored) >= 1) {
            this.liquidStorage.getLiquid(this.data.liquidStored, 1);
            this.data.liquidNow = this.data.liquidStored;
            this.data.burnTime = this.getBurnTimeForLiquid(this.data.liquidNow);
            this.data.burnMax = this.getBurnTimeForLiquid(this.data.liquidNow);
            this.data.energyOut = this.getEnergyOutForLiquid(this.data.liquidNow);
        }

        this.updateLiquidScale("lavaScale", "lava");
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("burnScale", (this.data.burnTime / this.data.burnMax) || 0);
        this.container.validateAll();
        this.container.sendChanges();
    },

    getEnergyStorage() {
        return 300000;
    },

    getScreenByName() {
        return guiBiogasEngine;
    }
});

StorageInterface.createInterface(BlockID.engineBiogas, {
    slots: {
        "slotContainer": {
            input: true
        },
        "slotEmptyContainer": {
            output: true
        },
    },

    // canReceiveLiquid: function (liquid) {
    //     if (liquid === "lava") {
    //         alert("0");
    //         return true;
    //     }
    //
    //     let tileData = this.tileEntity.data;
    //
    //     if (tileData.liquidStored
    //         && this.tileEntity.liquidStorage.getAmount(tileData.liquidStored)) {
    //         alert("1");
    //         return tileData.liquidStored === liquid;
    //     } else if (this.tileEntity.getBurnTimeForLiquid(liquid) > 0) {
    //         tileData.liquidStored = liquid;
    //         alert("2");
    //         return true;
    //     }
    //
    //     return false;
    // }, //TODO: add after StorageInterface update
});