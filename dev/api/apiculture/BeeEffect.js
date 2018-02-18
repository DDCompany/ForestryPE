const BeeEffects = {
    effects: {},

    getApiaristArmorWearValue: function (ent) {
        let count = 0;
        if (Entity.getArmorSlot(ent, 0).id === ItemID.helmetApiarist) count++;
        if (Entity.getArmorSlot(ent, 1).id === ItemID.chestApiarist) count++;
        if (Entity.getArmorSlot(ent, 2).id === ItemID.leggingsApiarist) count++;
        if (Entity.getArmorSlot(ent, 3).id === ItemID.bootsApiarist) count++;

        return count;
    },

    doEffect: function (unique, beeHouse, coords, range) {
        let effect = this.effects[unique];

        if (effect && ((effect.requireWorking && !beeHouse.error && beeHouse.queen) || (!beeHouse.error && beeHouse.queen))) {
            let data = beeHouse.tile.data;

            if (typeof data.delay !== "number") data.delay = 0;

            if (data.delay >= effect.delay) {
                if (effect.doEffect) {
                    effect.doEffect(beeHouse, coords, range);
                    data.delay = 0;
                }
            } else data.delay++;

        }
    }
    ,

    registerEffect: function (unique, params) {
        this.effects[unique] = params;
    }
};