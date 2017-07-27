TileEntity.registerPrototype(BlockID.apiary, {

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

        var content = this.container.getGuiContent();

        if (!this.house) {
            this.house = new BeeHouse(this, {
                slotPrincess: "slot1",
                slotDrone: "slot2",
                produceSlots: this.OUTPUT_SLOTS,
                slotPrincessOut: this.OUTPUT_SLOTS
            })
        }

        this.house.tick();

        if (content) {
            var healthScale = content.elements["progressScale"];
            if (this.data.progress <= (this.data.progressMax * 0.8) && this.data.progress >= (this.data.progressMax * 0.5)) {
                healthScale.bitmap = "apiary_scale_yellow";
            } else if (this.data.progress <= (this.data.progressMax * 0.5) && this.data.progress >= (this.data.progressMax * 0.3)) {
                healthScale.bitmap = "apiary_scale_orange";
            } else if (this.data.progress <= (this.data.progressMax * 0.3)) {
                healthScale.bitmap = "apiary_scale_red";
            } else {
                healthScale.bitmap = "apiary_scale_green";
            }
        }

        /*if(content && this.errorToDraw != undefined){
            this.drawErr(this.errorToDraw, content);
            this.errorToDraw = undefined;
        }*/

        if (this.house.error && content && (!content.elements["error"] || content.elements["error"].text != this.house.error)) {
            content.elements["error"] = {type: "text", x: 345, y: 320, width: 500, height: 30, text: this.house.error};
        } else if (!this.house.error && content && content.elements["error"]) {
            content.elements["error"] = null;
        }

        this.container.setScale("progressScale", this.data.progress / this.data.progressMax);

        /*var slot1 = this.container.getSlot("slot1");
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
        this.container.validateAll();*/
    },

    getGuiScreen: function () {
        return apiaryGUI;
    }

});