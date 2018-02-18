/**
 *
 * @param tile TileEntity блока пасеки
 * @param slots слоты
 * @param {ModifierList} houseModifierList модификаторы пасеки
 * @constructor
 */
function BeeHouse(tile, slots, houseModifierList) {
    this.tile = tile;
    this.slots = slots;
    this.queen = null;
    this.error = null;
    this.houseModifierList = houseModifierList;

    /**
     * Время спаривания
     * @type {number}
     */
    this.TOTAL_BREEDING_TIME = 100;
    /**
     * Время одного цикла
     * @type {number}
     */
    this.CYCLE_TIME = 550;

    /**
     * Вызывать каждый тик
     * @param {ModifierList} modifiersList
     */
    this.tick = function (modifiersList) {
        let slot1 = this.getPrincessSlot(this.slots.slotPrincess);
        let slot2 = this.getDroneSlot(this.slots.slotDrone);

        if (!this.data) this.data = this.tile.data;
        if (slot1.count > 1) {
            World.drop(this.tile.x, this.tile.y + 1, this.tile.z, slot1.id, slot1.count - 1, slot1.data);
            slot1.count = 1;
        }

        if (BeeRegistry.getBeeTypeByID(slot1.id) === BeeRegistry.BEETYPE_PRINCESS && BeeRegistry.getBeeTypeByID(slot2.id) === BeeRegistry.BEETYPE_DRONE) {
            this.tickBreeding();
        } else if (BeeRegistry.getBeeTypeByID(slot1.id) === BeeRegistry.BEETYPE_QUEEN) {
            if (!this.queen) {
                this.queen = BeeRegistry.getBeeFromItem(slot1.id, slot1.data);
            }

            BeeEffects.doEffect(this.queen.getActiveChromosome("EFFECT"), this, {
                x: this.tile.x,
                y: this.tile.y,
                z: this.tile.z
            }, BeeRegistry.rangeToObject(this.queen.getActiveChromosome("TERRITORY")));

            this.tickQueenWork(modifiersList);
        } else {
            this.data.progress = 0;
            this.data.progressMax = 0;
            this.queen = null;
            if (tile.data.delay) tile.data.delay = 0;
        }

        this.getContainer().validateAll();
    };

    /**
     * Спаривание пчёл
     */
    this.tickBreeding = function () {
        let slot1 = this.getPrincessSlot(this.slots.slotPrincess);
        let slot2 = this.getDroneSlot(this.slots.slotDrone);

        this.data.progress++;
        this.data.progressMax = this.TOTAL_BREEDING_TIME;

        if (this.data.progress >= this.data.progressMax) {
            this.queen = BeeLogic.mate(BeeRegistry.getBeeFromItem(slot1.id, slot1.data), BeeRegistry.getBeeFromItem(slot2.id, slot2.data));
            slot1.id = this.queen.getItemID();
            slot1.data = this.queen.unique;
            slot2.count--;
        }
    };

    /**
     * Процесс работы королевы
     * @param {ModifierList} modifiersList
     */
    this.tickQueenWork = function (modifiersList) {
        if (World.getThreadTime() % 128 === 0) {
            if (!BeeLogic.findFlowers(this.queen, {x: this.tile.x, y: this.tile.y, z: this.tile.z})) {
                this.error = Translation.translate("apiary.error.flowers");
            } else if (!this.queen.isValidClimate(this.getClimate())) {
                this.error = Translation.translate("apiary.error.climate");
            } else if (!this.queen.isValidHumidity(this.getHumidity())) {
                this.error = Translation.translate("apiary.error.humidity");
            } else if (!GenerationUtils.canSeeSky(this.tile.x, this.tile.y + 1, this.tile.z) && !modifiersList.isSelfLighted() && !this.houseModifierList.isSelfLighted() && !this.queen.getActiveChromosome("CAVE_DWELLING")) {
                this.error = Translation.translate("apiary.error.sky");
            } else if (World.getWeather().rain > 0 && !modifiersList.isSealed() && !houseModifierList.isSealed() && !this.queen.getActiveChromosome("TOLERATES_RAIN")) {
                this.error = Translation.translate("apiary.error.rain");
            } else if (!World.__inworld.getLightLevel(this.tile.x, this.tile.y, this.tile.z) >= 15 && !this.queen.getActiveChromosome("NEVER_SLEEPS")) {
                this.error = Translation.translate("apiary.error.night");
            } else {
                this.error = null;
            }
        }

        if (this.error) return;
        if (!this.data.progressMax) this.data.progressMax = this.queen.getMaxHealth() * this.CYCLE_TIME;
        if (!this.queen.isSaved()) {
            this.queen.save();
            this.setSlot(this.slots.slotPrincess, {id: this.queen.getItemID(), data: this.queen.unique, count: 1});
        }

        this.data.progress = this.queen.health * this.CYCLE_TIME;
        this.data.progressCycle++;

        if (this.data.progressCycle >= this.CYCLE_TIME * modifiersList.getLifespanModifier(this) * this.houseModifierList.getLifespanModifier(this) * BM_LIFESPAN_MODIFIER) {
            this.queen.health--;
            this.data.progressCycle = 0;
            ContainerHelper.putInSlots(BeeLogic.produce(this.queen, modifiersList.getProductionModifier(this), this.houseModifierList.getProductionModifier(this)), this.getContainer(), this.slots.produceSlots);
            if (this.queen.health <= 0) {
                ContainerHelper.putInSlots(BeeRegistry.convertToItemArray(BeeLogic.spawnAll(this.queen, modifiersList, this.houseModifierList, this)), this.getContainer(), this.slots.slotDronesOut);
                this.setSlot(this.slots.slotPrincess, {id: 0, data: 0, count: 0});
                this.data.progressMax = 0;
                Callback.invokeCallback("onQueenDeath", this);
                this.queen.destroy();
                this.queen = null;
            }
        } else {
            Callback.invokeCallback("onQueenCycle", this);
        }
    };

    //Функции для перегрузки

    this.getPrincessSlot = function (slotname) {
        return this.getContainer().getSlot(slotname);
    };

    this.getDroneSlot = function (slotname) {
        return this.getContainer().getSlot(slotname);
    };

    this.getContainer = function () {
        return this.tile.container;
    };

    this.setSlot = function (name, item) {
        let slot = this.getContainer().getSlot(name);
        slot.id = item.id;
        slot.data = item.data;
        slot.count = item.count;
    };

    this.getHumidity = function () {
        return BiomeHelper.getBiomeHumidity(World.getBiome(this.tile.x, this.tile.z));
    };

    this.getClimate = function () {
        return BiomeHelper.getBiomeClimate(World.getBiome(this.tile.x, this.tile.z));
    };
}
