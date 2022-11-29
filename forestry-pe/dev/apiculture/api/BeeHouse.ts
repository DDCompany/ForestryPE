interface BeeHouseData {
    progress: number;
    progressMax: number;
    progressCycle: number;
}

class BeeHouse {
    static readonly CYCLE_TIME = 550;
    static readonly TOTAL_BREEDING_TIME = 100;

    queen: Bee | null = null;
    error: string | null = null;

    private data: BeeHouseData;

    constructor(
        readonly tile: TileEntity.TileEntityPrototype,
        readonly slots: {
            slotPrincess: string,
            slotDrone: string,
            produceSlots: string[],
            slotPrincessOut: string[],
            slotDronesOut: string[],
        },
        readonly houseModifierList: ModifierList = ModifierList.EMPTY,
    ) {
        this.data = tile.data;
    }

    tick(modifiersList: ModifierList) {
        const slotPrincess = this.getPrincessSlot();
        const slotDrone = this.getDroneSlot();

        if (!this.data) this.data = this.tile.data;
        if (slotPrincess.count > 1) {
            this.tile.blockSource.spawnDroppedItem(
                this.tile.x, this.tile.y + 1, this.tile.z,
                slotPrincess.id, slotPrincess.count - 1, slotPrincess.data
            );
            this.tile.container.setSlot(this.slots.slotPrincess, slotPrincess.id, 1, slotPrincess.data);
        }

        if (BeeRegistry.getBeeTypeByID(slotPrincess.id) === BeeRegistry.BEETYPE_PRINCESS
            && BeeRegistry.getBeeTypeByID(slotDrone.id) === BeeRegistry.BEETYPE_DRONE) {
            this.tickBreeding();
        } else if (BeeRegistry.getBeeTypeByID(slotPrincess.id) === BeeRegistry.BEETYPE_QUEEN) {
            let queen = this.queen!!;
            if (!queen) {
                queen = BeeRegistry.getBeeFromItem(slotPrincess.id, slotPrincess.data);
                this.queen = queen;
            }

            BeeEffects.doEffect(
                queen.getActiveChromosome("EFFECT"),
                this,
                this.tile.blockSource,
                {
                    x: this.tile.x,
                    y: this.tile.y,
                    z: this.tile.z
                },
                BeeRegistry.rangeToObject(queen.getActiveChromosome("TERRITORY"))
            );

            this.tickQueenWork(modifiersList);
        } else {
            this.data.progress = 0;
            this.data.progressMax = 0;
            this.queen = null;
            if (this.tile.data.delay) {
                this.tile.data.delay = 0;
            }
        }

        this.getContainer().validateAll();
    }

    tickBreeding() {
        const slotPrincessName = this.slots.slotPrincess;
        const slotDroneName = this.slots.slotDrone;
        const slotPrincess = this.getPrincessSlot();
        const slotDrone = this.getDroneSlot();

        this.data.progress++;
        this.data.progressMax = BeeHouse.TOTAL_BREEDING_TIME;

        if (this.data.progress >= this.data.progressMax) {
            this.queen = BeeLogic.mate(
                BeeRegistry.getBeeFromItem(slotPrincess.id, slotPrincess.data),
                BeeRegistry.getBeeFromItem(slotDrone.id, slotDrone.data),
            );
            const container = this.tile.container;
            container.setSlot(slotPrincessName, this.queen.getItemID()!!, 1, this.queen.unique);
            container.setSlot(slotDroneName, slotDrone.id, slotDrone.count - 1, slotDrone.data);
        }
    }

    tickQueenWork(modifiersList: ModifierList) {
        if (!this.queen) {
            throw new Error("Queen is null");
        }

        if (World.getThreadTime() % 128 === 0) {
            const tileCoords = {x: this.tile.x, y: this.tile.y, z: this.tile.z};
            if (!BeeLogic.findFlowers(this.tile.blockSource, this.queen, tileCoords)) {
                this.error = Translation.translate("apiary.error.flowers");
            } else if (!this.queen.isValidClimate(this.getClimate())) {
                this.error = Translation.translate("apiary.error.climate");
            } else if (!this.queen.isValidHumidity(this.getHumidity())) {
                this.error = Translation.translate("apiary.error.humidity");
            } else if (!this.canSeeSky()
                && !modifiersList.isSelfLighted(this)
                && !this.houseModifierList.isSelfLighted(this)
                && !this.queen.getActiveChromosome("CAVE_DWELLING")) {
                this.error = Translation.translate("apiary.error.sky");
            } else if (World.getWeather().rain > 0
                && !modifiersList.isSealed(this)
                && !this.houseModifierList.isSealed(this)
                && !this.queen.getActiveChromosome("TOLERATES_RAIN")) {
                this.error = Translation.translate("apiary.error.rain");
            } else if (!(World.getWorldTime() % 24000 >= 1000 && World.getWorldTime() % 24000 <= 13000)
                && !this.queen.getActiveChromosome("NEVER_SLEEPS")) {
                this.error = Translation.translate("apiary.error.night");
            } else {
                this.error = null;
            }
        }

        if (this.error) return;
        if (!this.data.progressMax) this.data.progressMax = this.queen.getMaxHealth() * BeeHouse.CYCLE_TIME;
        if (!this.queen.isSaved()) {
            // @ts-ignore
            this.queen.save();
            this.setSlot(this.slots.slotPrincess, {id: this.queen.getItemID()!!, data: this.queen.unique, count: 1});
        }

        this.data.progress = this.queen.health!! * BeeHouse.CYCLE_TIME;
        this.data.progressCycle++;

        if (this.data.progressCycle >= BeeHouse.CYCLE_TIME * modifiersList.getLifespanModifier(this) * this.houseModifierList.getLifespanModifier(this) * BM_LIFESPAN_MODIFIER) {
            this.queen.health!!--;
            this.data.progressCycle = 0;
            ContainerHelper.putInSlots(BeeLogic.produce(this.queen, modifiersList.getProductionModifier(this), this.houseModifierList.getProductionModifier(this)), this.getContainer(), this.slots.produceSlots);

            if (this.queen.health!! <= 0) {
                ContainerHelper.putInSlots(BeeRegistry.convertToItemArray(BeeLogic.spawnAll(this.queen, modifiersList, this.houseModifierList, this)) as [], this.getContainer(), this.slots.slotDronesOut);
                this.setSlot(this.slots.slotPrincess, {id: 0, data: 0, count: 0});
                Callback.invokeCallback("onQueenDeath", this);
                this.queen.destroy();
                this.queen = null;
            }
        } else {
            Callback.invokeCallback("onQueenCycle", this);
        }
    };

    getPrincessSlot() {
        return this.getContainer().getSlot(this.slots.slotPrincess);
    }

    getDroneSlot() {
        return this.getContainer().getSlot(this.slots.slotDrone);
    }

    getHumidity(): Humidity {
        return Habitat.getHumidityAt(this.tile.blockSource, this.tile.x, this.tile.y, this.tile.z);
    }

    getClimate(): Temperature {
        return Habitat.getTemperatureAt(this.tile.blockSource, this.tile.x, this.tile.y, this.tile.z);
    }

    canSeeSky() {
        return this.tile.blockSource.canSeeSky(this.tile.x, this.tile.y + 1, this.tile.z);
    }

    setSlot(name: string, item: ItemInstance) {
        this.getContainer().setSlot(name, item.id, item.count, item.data);
    };

    getContainer() {
        return this.tile.container;
    }
}