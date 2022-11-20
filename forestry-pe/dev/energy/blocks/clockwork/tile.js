MachineRegistry.registerGenerator(BlockID.engineClockwork, {
    defaultValues: {
        heat: 0,
        delay: 40
    },

    click() {
        this.data.delay = 40;
        this.data.heat = Math.min(this.data.heat + 100, 800);
        Player.setExhaustion(Player.getExhaustion() + 0.05);
        Debug.message("Heat:" + this.data.heat)

        if (this.data.heat > 700) {
            Entity.damageEntity(Player.get(), 4);
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
    },

    getEnergyStorage() {
        return 10;
    }
});