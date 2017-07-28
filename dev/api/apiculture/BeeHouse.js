function BeeHouse(tile, slots) {
    this.tile = tile;
    this.container = tile.container;
    this.slots = slots;
    this.queen = null;
    this.error = null;

    this.TOTAL_BREEDING_TIME = 100;
    this.CYCLE_TIME = 1;

    this.tick = function () {
        var slot1 = this.container.getSlot(this.slots.slotPrincess);
        var slot2 = this.container.getSlot(this.slots.slotDrone);

        if (!this.data) this.data = this.tile.data;
        if (slot1.count > 1) {
            World.drop(this.tile.x, this.tile.y + 1, this.tile.z, slot1.id, slot1.count - 1, slot1.data)
            slot1.count = 1;
        }

        if (BeeRegistry.getBeeTypeByID(slot1.id) === BeeRegistry.BEETYPE_PRINCESS && BeeRegistry.getBeeTypeByID(slot2.id) === BeeRegistry.BEETYPE_DRONE) {
            this.tickBreeding();
        } else if (BeeRegistry.getBeeTypeByID(slot1.id) === BeeRegistry.BEETYPE_QUEEN) {
            if (!this.queen) {
                this.queen = BeeRegistry.getBeeFromItem(slot1.id, slot1.data);
            }
            this.tickQueenWork()
        } else {
            this.data.progress = 0;
            this.data.progressMax = 0;
            this.queen = null;
        }

        this.container.validateAll();
    };

    this.tickBreeding = function () {
        var slot1 = this.container.getSlot(this.slots.slotPrincess);
        var slot2 = this.container.getSlot(this.slots.slotDrone);

        this.data.progress++;
        this.data.progressMax = this.TOTAL_BREEDING_TIME;

        if (this.data.progress >= this.data.progressMax) {
            this.queen = BeeLogic.mate(BeeRegistry.getBeeFromItem(slot1.id, slot1.data), BeeRegistry.getBeeFromItem(slot2.id, slot2.data));
            this.data.progressMax = this.queen.getActiveChromosome("LIFESPAN") * this.CYCLE_TIME;
            this.data.progress = this.data.progressMax;
            slot1.id = this.queen.item.id;
            slot1.data = this.queen.item.data;
            slot2.count--;
        }
    };

    this.tickQueenWork = function () {
        if (World.getThreadTime() % 128 === 0) {
            if (!BeeLogic.findFlowers(this.queen, {x: this.tile.x, y: this.tile.y, z: this.tile.z})) {
                this.error = Translation.translate("apiary.error.flowers");
            } else if (!this.queen.isValidClimate(this.tile.x, this.tile.y)) {
                this.error = Translation.translate("apiary.error.climate");
            } else if (!this.queen.isValidHumidity(this.tile.x, this.tile.y)) {
                this.error = Translation.translate("apiary.error.humidity");
            } else {
                this.error = null;
            }
        }

        if (this.error) return;
        if (!this.data.progressMax) this.data.progressMax = this.queen.getMaxHealth() * this.CYCLE_TIME;
        if (!this.queen.isSaved()) this.queen.save();

        this.data.progress = this.queen.health * this.CYCLE_TIME;
        this.data.progressCycle++;
        if (this.data.progressCycle >= this.CYCLE_TIME) {
            this.queen.health--;
            this.data.progressCycle = 0;
            ContainerHelper.putInSlots(BeeLogic.produce(this.queen), this.container, this.slots.produceSlots);
            if (this.queen.health <= 0) {
                ContainerHelper.putInSlotsObj(BeeLogic.spawnPrincess(this.queen).item, this.container, this.slots.slotPrincessOut);
                ContainerHelper.putInSlots(BeeRegistry.convertToItemArray(BeeLogic.spawnDrones(this.queen)), this.container, this.slots.slotDronesOut)
                this.container.getSlot(this.slots.slotPrincess).count = 0;
                this.queen.destroy();
                this.queen = null;
            }
        }
    };
}