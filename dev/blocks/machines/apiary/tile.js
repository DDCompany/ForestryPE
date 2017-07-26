TileEntity.registerPrototype(BlockID.apiary, {

    TOTAL_BREEDING_TIME: 100,
    CYCLE_TIME: 5,
    OUTPUT_SLOTS: ["slotProduct0", "slotProduct1", "slotProduct2", "slotProduct3", "slotProduct4", "slotProduct5", "slotProduct6"],

    defaultValues: {
        progress: 0,
        progressMax: 0,
        progressCycle: 0
    },

    created: function () {
        this.data.biome_override = World.getBiome(this.x, this.z);
    },

    tick: function () {
        var slot1 = this.container.getSlot("slot1");
        var slot2 = this.container.getSlot("slot2");
        var content = this.container.getGuiContent();

        if (BeeRegistry.getBeeTypeByID(slot1.id) == BeeRegistry.BEETYPE_PRINCESS && BeeRegistry.getBeeTypeByID(slot2.id) == BeeRegistry.BEETYPE_DRONE) {
            this.tickBreeding();
        } else if (BeeRegistry.getBeeTypeByID(slot1.id) == BeeRegistry.BEETYPE_QUEEN) {
            if (!this.bee) {
                this.bee = BeeRegistry.getBeeFromItem(slot1.id, slot1.data);
            }
            this.tickWork();
        } else {
            this.data.progress = 0;
            this.data.progressMax = 0;
            this.bee = null;
        }

        if (content) {
            var healthImage = content.elements["progressScale"];
            if (this.data.progress <= (this.data.progressMax * 0.8) && this.data.progress >= (this.data.progressMax * 0.5)) {
                healthImage.bitmap = "apiary_scale_yellow";
            } else if (this.data.progress <= (this.data.progressMax * 0.5) && this.data.progress >= (this.data.progressMax * 0.3)) {
                healthImage.bitmap = "apiary_scale_orange";
            } else if (this.data.progress <= (this.data.progressMax * 0.3)) {
                healthImage.bitmap = "apiary_scale_red";
            } else {
                healthImage.bitmap = "apiary_scale_green";
            }
        }

        if (this.error && content && (!content.elements["error"] || content.elements["error"].text != this.error)) {
            content.elements["error"] = {type: "text", x: 345, y: 320, width: 500, height: 30, text: this.error};
        } else if (!this.error && content && content.elements["error"]) {
            content.elements["error"] = null;
        }

        this.container.setScale("progressScale", this.data.progress / this.data.progressMax);
        this.container.validateAll();
    },

    tickWork: function () {
        if (World.getThreadTime() % 128 == 0) {
            if (!BeeLogic.findFlowers(this.bee, {x: this.x, y: this.y, z: this.z})) {
                this.error = Translation.translate("apiary.error.flowers");
            } else {
                this.error = null;
            }
        }

        if (this.error) return;
        if (!this.data.progressMax) this.data.progressMax = this.bee.getMaxHealth() * this.CYCLE_TIME;
        if (!this.bee.isSaved()) this.bee.save();

        this.data.progress = this.bee.health * this.CYCLE_TIME;
        this.data.progressCycle++;
        if (this.data.progressCycle >= this.CYCLE_TIME) {
            this.bee.health--;
            this.data.progressCycle = 0;
            ContainerHelper.putInSlots(BeeLogic.produce(this.bee), this.container, this.OUTPUT_SLOTS);
            if (this.bee.health <= 0) {
                ContainerHelper.putInSlotsObj(BeeLogic.spawnPrincess(this.bee).item, this.container, this.OUTPUT_SLOTS)
                this.container.getSlot("slot1").count = 0;
            }
        }
    },

    tickBreeding: function () {
        var slot1 = this.container.getSlot("slot1");
        var slot2 = this.container.getSlot("slot2");

        this.data.progress++;
        this.data.progressMax = this.TOTAL_BREEDING_TIME;

        if (this.data.progress >= this.data.progressMax) {
            this.bee = BeeLogic.mate(BeeRegistry.getBeeFromItem(slot1.id, slot1.data), BeeRegistry.getBeeFromItem(slot2.id, slot2.data));
            this.data.progressMax = this.bee.getActiveChromosome("LIFESPAN") * this.CYCLE_TIME;
            this.data.progress = this.data.progressMax;
            slot1.id = this.bee.item.id;
            slot1.data = this.bee.item.data;
            slot2.count--;
        }
    },

    getGuiScreen: function () {
        return apiaryGUI;
    }

});