TileEntity.registerPrototype(BlockID.rainmaker, {
    useNetworkItemContainer: true,

    defaultValues: {
        progress: 0,
        charge: 0,
        recipe: null,
        isCharged: false,
    },

    tick() {
        const data = this.data;
        const recipe: RainSubstrate = data.recipe;
        if (recipe) {
            data.progress += recipe.speed;

            if (data.progress >= .5 && !data.isCharged) {
                data.charge++;
                data.isCharged = true;
            }

            if (data.progress >= 1) {
                data.progress = 0;
                data.isCharged = false;

                if (data.charge === 7) {
                    data.charge = 0;
                    data.progress = 0;
                    data.recipe = null;

                    if (recipe.isReverse) {
                        World.setWeather({
                            rain: 0,
                            thunder: 0
                        });
                    } else {
                        World.setWeather({
                            rain: 1,
                            thunder: 0
                        });
                    }

                    for (let i = 0; i < 5; i++) {
                        const dx = .5 + Math.random() - .5;
                        const dz = .5 + Math.random() - .5;

                        Debug.addParticle(EParticleType.SMOKE2,
                            this.x + dx, this.y + .1, this.z + dz,
                            0, 0, 0, 0,
                        );
                    }
                }
            }

            this.sendPacket("updateRender", {progress: data.progress, charge: data.charge});
        } else {
            const slot = this.container.getSlot("slotSubstrate");
            if (slot.id > 0 && this.tryUseItem(slot.id)) {
                this.container.setSlot("slotSubstrate", slot.id, slot.count - 1, slot.data);
                this.container.validateSlot("slotSubstrate");
            }
        }

        this.container.sendChanges();
    },

    click(id, count, data, coords, player) {
        if (this.data.recipe || Entity.getDimension(player) !== EDimension.NORMAL) {
            return;
        }

        if (this.tryUseItem(id)) {
            PlayerUtils.decreaseCarriedItem(player);
        }
    },

    tryUseItem(id: number) {
        const recipe = RainSubstrateRecipes.findById(id);
        if (recipe) {
            this.data.recipe = recipe;
            this.data.charge = 1;
            return true;
        }

        return false;
    },

    client: {
        events: {
            updateRender(payload: { progress: number, charge: number }) {
                RainMakerRenderer.mapAtCoords(this.x, this.y, this.z, payload.progress, payload.charge);
            }
        }
    },
});

StorageInterface.createInterface(BlockID.rainmaker, {
    slots: {
        "slotSubstrate": {
            input: true,
            isValid: item => RainSubstrateRecipes.findById(item.id) !== null
        }
    }
});