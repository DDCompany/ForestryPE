TileEntity.registerPrototype(BlockID.apiary, {
    OUTPUT_SLOTS: ["slotProduct0", "slotProduct1", "slotProduct2", "slotProduct3", "slotProduct4", "slotProduct5", "slotProduct6"],

    defaultValues: {
        progress: 0,
        progressMax: 0,
        progressCycle: 0
    },

    created() {
        this.data.biome_override = World.getBiome(this.x, this.z);
    },

    tick() {
        var content = this.container.getGuiContent();

        if (!this.house) {
            var self = this;
            this.house = new BeeHouse(this, {
                slotPrincess: "slot1",
                slotDrone: "slot2",
                produceSlots: this.OUTPUT_SLOTS,
                slotPrincessOut: this.OUTPUT_SLOTS,
                slotDronesOut: this.OUTPUT_SLOTS
            }, new ModifierList([{
                getProductionModifier() {
                    return 0.1;
                }
            }]));

            this.house.getHumidity = () => BiomeHelper.getBiomeHumidity(self.data.biome_override);

            this.house.getClimate = () => BiomeHelper.getBiomeClimate(self.data.biome_override);
        }
        var modifiers = new ModifierList([]);
        if (this.house.queen) {
            for (var i = 0; i < 3; i++) {
                var slot = this.container.getSlot("slotFrame" + i);
                if (slot.id && BeeFrame.isFrame(slot.id)) {
                    var frame = BeeFrame.frames[slot.id];
                    modifiers.modifiers.push(frame.modifier);
                    if (this.data.progressCycle === 0) slot = frame.onFrameUsed(slot, this.house);
                    if (slot.data > frame.durability) {
                        slot.count = 0;
                    }
                }
            }
        }

        this.house.tick(modifiers);

        if (content) {
            var healthScale = content.elements["progressScale"];
            if (this.data.progress <= (this.data.progressMax * 0.8) && this.data.progress >= (this.data.progressMax * 0.5)) {
                healthScale.bitmap = "forestry.for.apiary.scale_yellow";
            } else if (this.data.progress <= (this.data.progressMax * 0.5) && this.data.progress >= (this.data.progressMax * 0.3)) {
                healthScale.bitmap = "forestry.for.apiary.scale_orange";
            } else if (this.data.progress <= (this.data.progressMax * 0.3)) {
                healthScale.bitmap = "forestry.for.apiary.scale_red";
            } else {
                healthScale.bitmap = "forestry.for.apiary.scale_green";
            }
        }

        if (this.house.error && content && (!content.elements["error"] || content.elements["error"].text !== this.house.error)) {
            content.elements["error"] = {type: "text", x: 345, y: 320, width: 500, height: 30, text: this.house.error};
        } else if (!this.house.error && content && content.elements["error"]) {
            content.elements["error"] = null;
        }

        this.container.setScale("progressScale", this.data.progress / this.data.progressMax);
        this.container.validateAll();
    },

    getGuiScreen() {
        return apiaryGUI;
    }
});

{
    let slots = {
        "slot1": {
            input: true,
            isValid(item) {
                let type = BeeRegistry.getBeeTypeByID(item.id);
                return type === BeeRegistry.BEETYPE_PRINCESS || type === BeeRegistry.BEETYPE_QUEEN;
            }
        },
        "slot2": {
            input: true,
            isValid(item) {
                return BeeRegistry.getBeeTypeByID(item.id) === BeeRegistry.BEETYPE_DRONE;
            }
        },
    };

    for (let i = 0; i < 7; i++) {
        slots["slotProduct" + i] = {
            output: true
        };
    }

    StorageInterface.createInterface(BlockID.apiary, {
        slots
    });
}