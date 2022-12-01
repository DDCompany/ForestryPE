const directions = [
    {x: 1, y: 0, z: 0},
    {x: -1, y: 0, z: 0},
    {x: 0, y: 0, z: 1},
    {x: 0, y: 0, z: -1}
]

TileEntity.registerPrototype(BlockID.alveary_misc_center, {
    useNetworkItemContainer: true,
    OUTPUT_SLOTS: ["slotProduct0", "slotProduct1", "slotProduct2", "slotProduct3", "slotProduct4", "slotProduct5", "slotProduct6"],

    defaultValues: {
        progress: 0,
        progressMax: 0,
        progressCycle: 0
    },

    tick() {
        if (World.getThreadTime() % 40 === 0
            && ApiaryRegistry.isValidStructure(this.blockSource, this.x - 1, this.y - 2, this.z - 1)) {
            if (!this.data.valid) {
                for (const dir of directions) {
                    this.blockSource.setBlock(this.x + dir.x, this.y + dir.y, this.z + dir.z, BlockID.alveary_misc, 0);
                }
            }
            this.data.valid = true;
        } else if (World.getThreadTime() % 40 === 0) {
            if (this.data.valid) {
                for (const dir of directions) {
                    const x = this.x + dir.x;
                    const y = this.y + dir.y;
                    const z = this.z + dir.z;
                    if (this.blockSource.getBlockId(x, y, z) !== 0) {
                        this.blockSource.setBlock(x, y, z, BlockID.alveary, 0);
                    }
                }
            }
            this.data.valid = false;
        }

        if (this.data.valid) {
            if (!this.house) {
                this.house = new BeeHouse(this, {
                    slotPrincess: "slot1",
                    slotDrone: "slot2",
                    produceSlots: this.OUTPUT_SLOTS,
                    slotPrincessOut: this.OUTPUT_SLOTS,
                    slotDronesOut: this.OUTPUT_SLOTS
                }, ModifierList.EMPTY);

                this.house.getHumidity = () => this.humidity;
                this.house.getClimate = () => this.climate;
                this.house.canSeeSky = () => {
                    return this.blockSource.canSeeSky(this.x, this.y + 2, this.z);
                };
            }

            const Modifiers = new ModifierList([]);
            for (let xx = this.x - 1; xx < this.x + 3; xx++) {
                for (let yy = this.y - 2; yy < this.y + 3; yy++) {
                    for (let zz = this.z - 1; zz < this.z + 3; zz++) {
                        const block = this.blockSource.getBlockId(xx, yy, zz);
                        if (ApiaryRegistry.isApiaryComponent(block) && block !== BlockID.alveary_misc_center) {
                            const tile = World.getTileEntity(xx, yy, zz, this.blockSource);
                            if (tile) {
                                if (tile.getModifiers) Modifiers.modifiers.push(tile.getModifiers(this));
                                if (tile.alvearyTick) tile.alvearyTick(this);
                            }
                        }
                    }
                }
            }

            if (this.humidity !== undefined && this.climate !== undefined) this.house.tick(Modifiers);

            this.humidity = Habitat.getHumidityAt(this.blockSource, this.x, this.y, this.z);
            this.climate = Habitat.getTemperatureAt(this.blockSource, this.x, this.y, this.z);

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
        }
    },

    getScreenByName() {
        return alvearyGUI;
    }
});

TileEntity.registerPrototype(BlockID.alveary_misc, {
    useNetworkItemContainer: true,
    click(id, count, data, coords, player) {
        if (Entity.getSneaking(player)) {
            return false;
        }

        const blockSource = BlockSource.getDefaultForActor(player);
        if (!blockSource) {
            return false;
        }

        for (const dir of directions) {
            const x = this.x + dir.x;
            const y = this.y + dir.y;
            const z = this.z + dir.z;
            if (this.blockSource.getBlockID(x, y, z) === BlockID.alveary_misc_center) {
                const tile = World.getTileEntity(x, y, z, blockSource);
                if (tile) {
                    const client = Network.getClientForPlayer(player);
                    tile.container.openFor(client, "main");
                    break;
                }
            }
        }

        return true;
    }
});
