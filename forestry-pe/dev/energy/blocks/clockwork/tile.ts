MachineRegistry.registerGenerator(BlockID.engineClockwork, {
    useNetworkItemContainer: true,

    defaultValues: {
        heat: 0,
        delay: 40
    },

    click(id, count, data, coords, player) {
        this.data.delay = 40;
        this.data.heat = Math.min(this.data.heat + 100, 800);

        const actor = new PlayerActor(player);
        actor.setExhaustion(actor.getExhaustion() + 0.05);
        this.container.sendEvent("onHeatChange", {heat: this.data.heat});

        if (this.data.heat > 700) {
            Entity.damageEntity(player, 4);
        }
    },

    tick() {
        if (this.data.heat) {
            if (this.data.delay) {
                this.data.delay--;
                return;
            }

            this.data.heat -= 100;
            this.data.energy += 2;
        }

        this.container.sendChanges();
    },

    getEnergyStorage() {
        return 10;
    },

    client: {
        containerEvents: {
            onHeatChange(container, window, windowContent, data: { heat: number }) {
                Debug.message("Heat:" + data.heat);
            }
        }
    },
});