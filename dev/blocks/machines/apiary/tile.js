TileEntity.registerPrototype(BlockID.apiary, {

    TOTAL_BREEDING_TIME: 100,
    CYCLE_TIME: 1,

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
            alert("b" + slot1.id);
            alert("c" + BeeRegistry.getBeeTypeByID(slot1.id));
            if (!this.bee) {
                this.bee = BeeRegistry.getBeeFromItem(slot1.id, slot1.data);
            }
            this.data.progress = this.bee.getMaxHealth();
            this.tickWork();
        } else {
            this.data.progress = 0;
            this.data.progressMax = 0;
            this.bee = null;
        }

        if (content) {
            var healthImage = this.container.getGuiContent().elements["progressScale"];
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

        //!this.container.getGuiContent() || (this.container.getGuiContent().elements["progressScale"].bitmap = "apiary_scale_red");

        this.container.setScale("progressScale", this.data.progress / this.data.progressMax);
        this.container.validateAll();
    },

    tickWork: function () {
        this.data.progress = this.bee.health * this.CYCLE_TIME;
        this.data.progressCycle++;
        if (this.data.progressCycle >= this.CYCLE_TIME) {

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