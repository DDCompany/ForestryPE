function BeeHouse(tile, slots, houseModifierList) {
    this.tile = tile;
    this.container = tile.container;
    this.slots = slots;
    this.queen = null;
    this.error = null;
    this.houseModifierList = houseModifierList;

    this.TOTAL_BREEDING_TIME = 100;
    this.CYCLE_TIME = 10;

    this.tick = function (modifiersList) {
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
            this.tickQueenWork(modifiersList)
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

    this.tickQueenWork = function (modifiersList) {
        if (World.getThreadTime() % 128 === 0) {
            if (!BeeLogic.findFlowers(this.queen, {x: this.tile.x, y: this.tile.y, z: this.tile.z})) {
                this.error = Translation.translate("apiary.error.flowers");
            } else if (!this.queen.isValidClimate(this.tile.x, this.tile.y)) {
                this.error = Translation.translate("apiary.error.climate");
            } else if (!this.queen.isValidHumidity(this.tile.x, this.tile.y)) {
                this.error = Translation.translate("apiary.error.humidity");
            } else if (!World.canSeeSky(this.tile.x, this.tile.y + 1, this.tile.z) && !modifiersList.isSelfLighted() && !this.houseModifierList.isSelfLighted() && !this.queen.getActiveChromosome("CAVE_DWELLING")) {
                this.error = Translation.translate("apiary.error.sky");
            } else if (World.getWeather().rain > 0 && !modifiersList.isSealed() && !houseModifierList.isSealed() && !this.queen.getActiveChromosome("TOLERATES_RAIN")) {
                this.error = Translation.translate("apiary.error.rain");
            } else if (!(World.__inworld.getLightLevel(this.tile.x, this.tile.y + 1, this.tile.z) >= 15) && !this.queen.getActiveChromosome("NEVER_SLEEPS")) {
                this.error = Translation.translate("apiary.error.night");
            } else {
                this.error = null;
            }
        }

        if (this.error) return;
        if (!this.data.progressMax) this.data.progressMax = this.queen.getMaxHealth() * this.CYCLE_TIME;
        if (!this.queen.isSaved()) this.queen.save();

        this.data.progress = this.queen.health * this.CYCLE_TIME;
        this.data.progressCycle++;

        if (this.data.progressCycle >= this.CYCLE_TIME * modifiersList.getLifespanModifier(this, 1) * this.houseModifierList.getLifespanModifier(this, 1)) {
            this.queen.health--;
            this.data.progressCycle = 0;
            BeeEffects.doEffect(this.queen.getBeeType().effect, {
                x: this.tile.x,
                y: this.tile.y,
                z: this.tile.z
            }, BeeRegistry.rangeToObject(this.queen.getActiveChromosome("TERRITORY")));
            ContainerHelper.putInSlots(BeeLogic.produce(this.queen, modifiersList.getProductionModifier(this, 1), this.houseModifierList.getProductionModifier(this, 1)), this.container, this.slots.produceSlots);
            if (this.queen.health <= 0) {
                ContainerHelper.putInSlots(BeeRegistry.convertToItemArray(BeeLogic.spawnPrincess(this.queen, modifiersList, this.houseModifierList, this)), this.container, this.slots.slotPrincessOut);
                ContainerHelper.putInSlots(BeeRegistry.convertToItemArray(BeeLogic.spawnDrones(this.queen, modifiersList, this.houseModifierList, this)), this.container, this.slots.slotDronesOut)
                this.container.getSlot(this.slots.slotPrincess).count = 0;
                Callback.invokeCallback("onQueenDeath", this.house);
                this.queen.destroy();
                this.queen = null;
            }
        } else {
            Callback.invokeCallback("onQueenCycle", this.house);
        }
    };
}
