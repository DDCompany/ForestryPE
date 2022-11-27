TileEntity.registerPrototype(BlockID.beeHouse, {
    useNetworkItemContainer: true,
    OUTPUT_SLOTS: ["slotProduct0", "slotProduct1", "slotProduct2", "slotProduct3", "slotProduct4", "slotProduct5", "slotProduct6"],

    defaultValues: {
        progress: 0,
        progressMax: 0,
        progressCycle: 0
    },

    tick() {
        if (!this.house) {
            this.house = new BeeHouse(this, {
                slotPrincess: "slot1",
                slotDrone: "slot2",
                produceSlots: this.OUTPUT_SLOTS,
                slotPrincessOut: this.OUTPUT_SLOTS,
                slotDronesOut: this.OUTPUT_SLOTS
            }, new ModifierList([{
                getProductionModifier() {
                    return 0.25;
                },

                getMutationModifier() {
                    return 0;
                },

                getGeneticDecay() {
                    return 0
                },

                getLifespanModifier() {
                    return 3
                }
            }]));
        }

        this.house.tick(ModifierList.EMPTY);

        let progressTexture: string;
        if (this.data.progress > this.data.progressMax * .8) {
            progressTexture = "forestry.for.apiary.scale_green";
        } else if (this.data.progress > this.data.progressMax * .5) {
            progressTexture = "forestry.for.apiary.scale_yellow";
        } else if (this.data.progress > this.data.progressMax * .3) {
            progressTexture = "forestry.for.apiary.scale_orange";
        } else {
            progressTexture = "forestry.for.apiary.scale_red";
        }
        this.container.setBinding("progressScale", "texture", progressTexture);
        this.container.setBinding("error", "text", this.house.error || "");

        this.container.setScale("progressScale", (this.data.progress / this.data.progressMax) || 0);
        this.container.validateAll();
        this.container.sendChanges();
    },

    getScreenName() {
        return "main";
    },

    getScreenByName() {
        return alvearyGUI;
    }
});