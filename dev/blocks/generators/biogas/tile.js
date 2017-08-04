MachineRegistry.register(BlockID.engineBiogas, {
    defaultValues: {
        liquidStored: 0,
        energyOut: 0,
        burnTime: 0,
        temperature: false,
        liquidNow: 0,
        burnMax: 0,
        temperatureRem: 0
    },

    isGenerator: function () {
        return true;
    },

    getTransportSlots: function () {
        return {input: ["slotContainer"], output: ["slotEmptyContainer"]};
    },

    init: function () {
        this.liquidStorage.setLimit(null, 10);
    },

    getGuiScreen: function () {
        return guiBiogasEngine;
    },

    getBurnTimeForLiquid: function (liq) {
        return liq == "forestryBiomass" ? 1250 :
            (liq == "forestrySeedoil" ? 2500 :
                (liq == "forestryJuice" ? 2500 :
                    (liq == "forestryHoney" ? 2500 : 0)));
    },

    getEnergyOutForLiquid: function (liq) {
        return liq == "forestryBiomass" ? 12 :
            (liq == "forestrySeedoil" ? 8 :
                (liq == "forestryJuice" ? 3 :
                    (liq == "forestryHoney" ? 3 : 0)));
    },

    addEmptyContainer: function (empty) {
        var slotEmptyContainer = this.container.getSlot("slotEmptyContainer");

        if (slotEmptyContainer.id == 0) {
            slotEmptyContainer.id = empty.id;
            slotEmptyContainer.data = empty.data;
            slotEmptyContainer.count = 1;
            return true;
        } else if (slotEmptyContainer.id == empty.id && slotEmptyContainer.data == empty.data && slotEmptyContainer.count + 1 != Item.getMaxStack(slotEmptyContainer.id)) {
            slotEmptyContainer.count++;
            return true;
        }

        return false;
    },

    tick: function () {
        var slotContainer = this.container.getSlot("slotContainer");

        if (this.data.liquidStored) {
            this.liquidStorage.updateUiScale("liquidScale", this.data.liquidStored);
            if (!this.liquidStorage.getAmount(this.data.liquidStored)) {
                this.data.liquidStored = 0;
            }
        }

        if (this.data.temperature && !this.data.liquidNow) {
            if (this.data.temperatureRem >= 200) {
                this.data.temperatureRem = 0;
                this.data.temperature = false;
            } else {
                this.data.temperatureRem++;
            }
        }

        if (slotContainer.id && this.liquidStorage.getAmount("lava") + 1 <= 10) {
            var empty = LiquidRegistry.getEmptyItem(slotContainer.id, slotContainer.data);

            if (empty && empty.liquid == "lava" && this.addEmptyContainer(empty)) {
                this.liquidStorage.addLiquid("lava", 1);
                slotContainer.count--;
            }
        }

        if (!this.data.liquidStored || (this.data.liquidStored && this.liquidStorage.getAmount(this.data.liquidStored) + 1 <= 10)) {
            var empty = LiquidRegistry.getEmptyItem(slotContainer.id, slotContainer.data);

            if (empty) {
                var liq = 0;
                if (empty.liquid == "forestryBiomass") {
                    liq = "forestryBiomass";
                } else if (empty.liquid == "forestrySeedoil") {
                    liq = "forestrySeedoil";
                } else if (empty.liquid == "forestryJuice") {
                    liq = "forestryJuice";
                } else if (empty.liquid == "forestryHoney") {
                    liq = "forestryHoney";
                }

                if (liq && (!this.data.liquidStored || this.data.liquidStored == liq)) {
                    if (this.addEmptyContainer(empty)) {
                        this.liquidStorage.addLiquid(liq, 1);
                        this.data.liquidStored = liq;
                        slotContainer.count--;
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
                    } else if (this.data.energy != this.getEnergyStorage()) {
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

        this.liquidStorage.updateUiScale("lavaScale", "lava");
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
        this.container.setScale("burnScale", this.data.burnTime / this.data.burnMax);

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