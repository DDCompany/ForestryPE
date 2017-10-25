MachineRegistry.register(BlockID.biogenerator, {
        defaultValues: {
            progress: 0
        },

        getTransportSlots: function () {
            return {input: ["slotContainer"], output: ["slotEmptyContainer"]};
        },

        init: function () {
            this.liquidStorage.setLimit(null, 10);
        },

        getGuiScreen: function () {
            return biogeneratorGUI;
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
            if (slotContainer.id) {
                var empty = LiquidRegistry.getEmptyItem(slotContainer.id, slotContainer.data);

                if (empty && (empty.liquid == "forestryEthanol" && this.liquidStorage.getAmount("forestryEthanol") + 1 <= 10)) {
                    if (this.addEmptyContainer(empty)) {
                        slotContainer.count--;
                        this.liquidStorage.addLiquid("forestryEthanol", 1);
                    }
                }
            }

            if (this.liquidStorage.getAmount("forestryEthanol") >= 0.001 && this.data.energy + 16 <= this.getEnergyStorage()) {
                this.data.energy += 16;
                this.data.progress++;
                if (this.data.progress > 4) {
                    this.data.progress = 0;
                    this.liquidStorage.getLiquid("forestryEthanol", 0.001);
                }
            }

            this.liquidStorage.updateUiScale("liquidScale", "forestryEthanol");
            this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());

            this.container.validateAll();

        },

        isGenerator: function () {
            return true;
        },

        getEnergyStorage: function () {
            return 30000;
        },

        energyTick: function (type, src) {
            var out = Math.min(32, this.data.energy);
            this.data.energy += src.add(out) - out;
        }
    });