var BeeEffects = {
    EFFECT_NONE: 0,
    EFFECT_AGGRESS: 1,
    EFFECT_BEATIFIC: 2,
    EFFECT_CREEPER: 3,
    EFFECT_EXPLORER: 4,
    EFFECT_FREEZING: 5,
    EFFECT_HEROIC: 6,
    EFFECT_FLAMMABLE: 7,
    EFFECT_POISON: 8,
    EFFECT_ENDS: 9,
    EFFECT_RADIOACT: 10,
    EFFECT_DRUNKARD: 11,

    getApiaristArmorWearValue: function () {
        var count = 0;
        if (Player.getArmorSlot(0).id === ItemID.helmetApiarist) count++;
        if (Player.getArmorSlot(1).id === ItemID.chestApiarist) count++;
        if (Player.getArmorSlot(2).id === ItemID.leggingsApiarist) count++;
        if (Player.getArmorSlot(3).id === ItemID.bootsApiarist) count++;
        return count;
    },

    doAggress: function (coords, range) {
        var all = Entity.getAllInRange(coords, range.x);
        var damage = 4 - this.getApiaristArmorWearValue();
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            Entity.damageEntity(Player.get(), damage);
        }
        for (var key in all) {
            Entity.damageEntity(all[key], 4);
            if (Entity.getHealth(all[key]) <= 0) {
                Entity.remove(all[key]);
            }
        }
    },
    doBeatific: function (coords, range) {
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            Entity.addEffect(Player.get(), Native.PotionEffect.regeneration, 200, 1, true, true);
        }
    },
    doCreeper: function (coords, range) {
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            var value = this.getApiaristArmorWearValue();
            var damage = 0;

            if (value == 3) {
                damage = 5;
            } else if (value == 2) {
                damage = 10;
            } else if (value == 1) {
                damage = 15;
            } else if (value == 0) {
                damage = 20;
            }

            World.playSoundAtEntity(Player.get(), "random.explode", 1, 1);
            Entity.damageEntity(Player.get(), damage);
        }
    },
    doExplorer: function (coords, range) {
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            Player.addExperience(10);
        }
    },
    doFreezing: function (coords, range) {
        var blocks = Util.getBlocksInRange(coords, range, {id: 9, data: 0});
        for (var key in blocks) {
            var block = blocks[key];
            World.setBlock(block.x, block.y, block.z, 79);
        }
    },
    doHeroic: function (coords, range) {
        var all = Entity.getAllInRange(coords, range.x);
        for (var key in all) {
            Entity.damageEntity(all[key], 2);
            if (Entity.getHealth(all[key]) <= 0) {
                Entity.remove(all[key]);
            }
        }
    },
    doFlammable: function (coords, range) {
        var all = Entity.getAllInRange(coords, range.x);
        var duration = 500;
        var chance = .5;
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            var wear = this.getApiaristArmorWearValue();

            if (wear == 3) {
                chance = .05;
                duration = 50;
            } else if (wear == 2) {
                chance = .2;
                duration = 200;
            } else if (wear == 1) {
                chance = .35;
                duration = 350;
            }

            if (Math.random() < chance) Entity.setFire(Player.get(), duration);
        }
        for (var key in all) {
            if (Math.random() < .5) Entity.setFire(all[key], 500);
        }
    },
    doPoison: function (coords, range) {
        var all = Entity.getAllInRange(coords, range.x);
        var duration = 600;
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            var wear = this.getApiaristArmorWearValue();

            if (wear == 3) {
                duration = parseInt(600 / 4);
            } else if (wear == 2) {
                duration = parseInt(600 / 2);
            } else if (wear == 1) {
                duration = parseInt(600 * 3 / 4);
            }

            Entity.addEffect(Player.get(), Native.PotionEffect.poison, duration, 1, true, true);
        }
        for (var key in all) {
            Entity.addEffect(all[key], Native.PotionEffect.poison, duration, 1, true, true);
        }
    },
    doEnds: function (coords, range) {
        var damage = 4 - this.getApiaristArmorWearValue();
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            Entity.damageEntity(Player.get(), damage);
        }
    },
    doRadiact: function (coords, range) {
        var damage = 8 - (this.getApiaristArmorWearValue() * 2);
        var blocks = Util.getBlocksInRange(coords, range, {id: 9, data: 0});
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            Entity.damageEntity(Player.get(), damage);
        }
        for (var key in blocks) {
            var block = blocks[key];
            World.setBlock(block.x, block.y, block.z, 0);
        }
    },
    doDrunkard: function (coords, range) {
        if (Entity.getDistanceBetweenCoords(Entity.getPosition(Player.get()), coords) <= range.x) {
            Entity.addEffect(Player.get(), 9, 500, 1, true, true);
        }
    },
    doEffect: function (effect, coords, range) {
        switch (parseInt(effect)) {
            case BeeEffects.EFFECT_AGGRESS:
                this.doAggress(coords, range);
                break;
            case BeeEffects.EFFECT_BEATIFIC:
                this.doBeatific(coords, range);
                break;
            case BeeEffects.EFFECT_CREEPER:
                this.doCreeper(coords, range);
                break;
            case BeeEffects.EFFECT_EXPLORER:
                this.doExplorer(coords, range);
                break;
            case BeeEffects.EFFECT_FREEZING:
                this.doFreezing(coords, range);
                break;
            case BeeEffects.EFFECT_HEROIC:
                this.doHeroic(coords, range);
                break;
            case BeeEffects.EFFECT_FLAMMABLE:
                this.doFlammable(coords, range);
                break;
            case BeeEffects.EFFECT_POISON:
                this.doPoison(coords, range);
                break;
            case BeeEffects.EFFECT_ENDS:
                this.doEnds(coords, range);
                break;
            case BeeEffects.EFFECT_RADIOACT:
                this.doRadiact(coords, range);
                break;
            case BeeEffects.EFFECT_DRUNKARD:
                this.doDrunkard(coords, range);
                break;
        }
    }
};