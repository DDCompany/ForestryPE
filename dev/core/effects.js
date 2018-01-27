BeeEffects.registerEffect("aggress", {
    delay: 40,
    requireWorking: false,

    doEffect: function (beeHouse, coords, range) {
        let all = Entity.getAllInRange(coords, range.x);

        for (let key in all) {
            let ent = all[key];
            Entity.damageEntity(ent, 4 - BeeEffects.getApiaristArmorWearValue(ent));

            if (Entity.getHealth(ent) <= 0) {
                Entity.remove(ent);
            }
        }
    }
});

BeeEffects.registerEffect("beatific", {
    delay: 20,

    doEffect: function (beeHouse, coords, range) {
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            Entity.addEffect(Player.get(), Native.PotionEffect.regeneration, 100, 1, true, true);
        }
    }
});

BeeEffects.registerEffect("creeper", {
    delay: 20,
    requireWorking: false,

    doEffect: function (beeHouse, coords, range) {
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            World.explode(coords.x, coords.y, coords.z, 3, false);
        }
    }
});

BeeEffects.registerEffect("exploration", {
    delay: 80,

    doEffect: function (beeHouse, coords, range) {
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            Player.addExperience(2);
        }
    }
});

BeeEffects.registerEffect("glacial", {
    delay: 200,

    doEffect: function (beeHouse, coords, range) {
        for (let i = 0; i < 10; i++) {
            let blocks = Util.getBlocksInRange(coords, range, {id: 9, data: 0}, true);
            for (let key in blocks) {
                let block = blocks[key];
                World.setBlock(block.x, block.y, block.z, 79);
            }
        }
    }
});

BeeEffects.registerEffect("heroic", {
    delay: 40,

    doEffect: function (beeHouse, coords, range) {
        let all = Entity.getAllInRange(coords, range.x);
        for (let key in all) {
            let ent = all[key];
            Entity.damageEntity(ent, 2);
            if (Entity.getHealth(ent) <= 0) {
                Entity.remove(ent);
            }
        }
    }
});

BeeEffects.registerEffect("ignition", {
    delay: 20,
    requireWorking: false,

    doEffect: function (beeHouse, coords, range) {
        let all = Entity.getAllInRange(coords, range.x);

        for (let key in all) {
            let duration = 500;
            let chance = .5;
            let ent = all[key];

            switch (BeeEffects.getApiaristArmorWearValue(ent)) {
                case 3:
                    chance = .05;
                    duration = 50;
                    break;
                case 2:
                    chance = .2;
                    duration = 200;
                    break;
                case 1:
                    chance = .35;
                    duration = 350;
                    break;
            }

            if (Math.random() < chance) Entity.setFire(ent, duration);
        }
    }
});

BeeEffects.registerEffect("miasmic", {
    delay: 100,

    doEffect: function (beeHouse, coords, range) {
        let all = Entity.getAllInRange(coords, range.x);

        for (let key in all) {
            let duration = 600;
            let ent = all[key];

            switch (BeeEffects.getApiaristArmorWearValue(ent)) {
                case 3:
                    duration = parseInt(600 / 4);
                    break;
                case 2:
                    duration = parseInt(600 / 2);
                    break;
                case 1:
                    duration = parseInt(600 * 3 / 4);
                    break;
            }

            Entity.addEffect(ent, Native.PotionEffect.poison, duration, 1, true, true);
        }
    }
});

BeeEffects.registerEffect("misanthrope", {
    delay: 20,
    requireWorking: false,

    doEffect: function (beeHouse, coords, range) {
        let damage = 4 - BeeEffects.getApiaristArmorWearValue(Player.get());
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            Entity.damageEntity(Player.get(), damage);
        }
    }
});

BeeEffects.registerEffect("radiactive", {
    delay: 40,
    requireWorking: false,

    doEffect: function (beeHouse, coords, range) {
        let all = Entity.getAllInRange(coords, range.x);

        for (let key in all) {
            let ent = all[key];
            Entity.damageEntity(ent, 8 - BeeEffects.getApiaristArmorWearValue(ent) * 2);

            if (Entity.getHealth(ent) <= 0) {
                Entity.remove(ent);
            }
        }

        for (let i = 0; i < 20; i++) {
            let block = Util.getBlocksInRange(coords, range, {id: 9, data: 0}, true);
            if (World.getTileEntity(block.x, block.y, block.z) === null) {
                World.setBlock(block.x, block.y, block.z, 0);
                return;
            }
        }
    }
});

BeeEffects.registerEffect("drunkard", {
    delay: 20,

    doEffect: function (beeHouse, coords, range) {
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            Entity.addEffect(Player.get(), 9, 500, 1, true, true);
        }
    }
});

