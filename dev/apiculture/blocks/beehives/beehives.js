function attackByBeehive() {
    if (!ForestryConfig.hiveDamageOnAttack)
        return;

    if (!Game.getDifficulty() && !ForestryConfig.hiveDamageOnPeaceful)
        return;

    if (Util.random(0, 4) >= BeeEffects.getApiaristArmorWearValue(Player.get())) {
        Entity.damageEntity(Player.get(), (Math.random() / 2.0 + 0.5) * 10)
    }
}

ToolAPI.addBlockMaterial("beehive", 1.5);
Block.setPrototype("beehive", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [
            {
                name: "Forest Hive",
                texture: [["beehiveForest", 0], ["beehiveForest", 0], ["beehiveForest", 1]],
                inCreative: true
            },
            {
                name: "Meadows Hive",
                texture: [["beehiveMeadows", 0], ["beehiveMeadows", 0], ["beehiveMeadows", 1]],
                inCreative: true
            },
            {
                name: "Modest Hive",
                texture: [["beehiveModest", 0], ["beehiveModest", 0], ["beehiveModest", 1]],
                inCreative: true
            },
            {
                name: "Tropical Hive",
                texture: [["beehiveTropical", 0], ["beehiveTropical", 0], ["beehiveTropical", 1]],
                inCreative: true
            },
            {
                name: "Wintry Hive",
                texture: [["beehiveWintry", 0], ["beehiveWintry", 0], ["beehiveWintry", 1]],
                inCreative: true
            },
            {
                name: "Marshy Hive",
                texture: [["beehiveMarshy", 0], ["beehiveMarshy", 0], ["beehiveMarshy", 1]],
                inCreative: true
            },
            {
                name: "Ender Hive",
                texture: [["beehiveEnder", 0], ["beehiveEnder", 0], ["beehiveEnder", 1]],
                inCreative: true
            }
        ];
    }
});

Item.addCreativeGroup(GROUP_BEEHIVES, GROUP_BEEHIVES_NAME, [BlockID.beehive]);

Block.registerDropFunction("beehive", function (coords, id, data, diggingLevel) {
    attackByBeehive();
    if (diggingLevel) {
        let drop = [];
        let rand = Math.random();
        if (rand < 0.3) {
            drop.push([ItemID.princessValiant, 1, 0]);
        } else if (Math.random() < 0.8) {
            switch (parseInt(data)) {
                case 0:
                    if (Math.random() < 0.08) {
                        let bee = new Bee("Forest", BeeRegistry.BEETYPE_PRINCESS, true);
                        bee.inactive_chromosomes_list["TOLERATES_RAIN"] = true;
                        drop.push([bee.getItemID(), 1, bee.unique]);
                    } else {
                        drop.push([ItemID.princessForest, 1, 0]);
                    }
                    break;
                case 1:
                    drop.push([ItemID.princessMeadows, 1, 0]);
                    break;
                case 2:
                    drop.push([ItemID.princessModest, 1, 0]);
                    break;
                case 3:
                    drop.push([ItemID.princessTropical, 1, 0]);
                    break;
                case 4:
                    drop.push([ItemID.princessWintry, 1, 0]);
                    break;
                case 5:
                    drop.push([ItemID.princessMarshy, 1, 0]);
                    break;
                case 6:
                    drop.push([ItemID.princessEnder, 1, 0]);
                    break;
            }
        }

        switch (parseInt(data)) {
            case 0:
                if (Math.random() < 0.8) {
                    drop.push([ItemID.combHoney, 1, 0]);
                }
                break;
            case 1:
                if (Math.random() < 0.8) {
                    drop.push([ItemID.combHoney, 1, 0]);
                }
                break;
            case 2:
                if (Math.random() < 0.8) {
                    drop.push([ItemID.combParched, 1, 0]);
                }
                break;
            case 3:
                if (Math.random() < 0.8) {
                    drop.push([ItemID.combSilky, 1, 0]);
                }
                break;
            case 4:
                if (Math.random() < 0.8) {
                    drop.push([ItemID.combFrozen, 1, 0]);
                }
                break;
            case 5:
                if (Math.random() < 0.8) {
                    drop.push([ItemID.combMossy, 1, 0]);
                }
                break;
            case 6:
                if (Math.random() < 0.9) {
                    drop.push([ItemID.combMysterious, 1, 0]);
                }
                break;
        }

        if (rand < 0.03) {
            drop.push([ItemID.droneValiant, 1, 0]);
        } else if (rand < 0.8) {
            let droneCount = Math.floor(1 + Math.random() * 2);
            switch (parseInt(data)) {
                case 0:
                    if (Math.random() < 0.08) {
                        let bee = new Bee("Forest", BeeRegistry.BEETYPE_DRONE, true);
                        bee.inactive_chromosomes_list["TOLERATES_RAIN"] = true;
                        drop.push([bee.getItemID(), 1, bee.unique]);
                    } else {
                        drop.push([ItemID.droneForest, droneCount, 0]);
                    }
                    break;
                case 1:
                    drop.push([ItemID.droneMeadows, droneCount, 0]);
                    break;
                case 2:
                    drop.push([ItemID.droneModest, droneCount, 0]);
                    break;
                case 3:
                    drop.push([ItemID.droneTropical, droneCount, 0]);
                    break;
                case 4:
                    drop.push([ItemID.droneWintry, droneCount, 0]);
                    break;
                case 5:
                    drop.push([ItemID.droneMarshy, droneCount, 0]);
                    break;
                case 6:
                    drop.push([ItemID.droneEnder, droneCount, 0]);
                    break;
            }
        }

        return drop;
    }

    return [];
});
Block.setBlockMaterial(BlockID.beehive, "beehive", 1);

HiveGenerator.register({
    chance: ForestryConfig.genForestChance,
    biomes: [4, 132, 27, 155, 29, 157],
    dimension: Dimension.NORMAL,

    generate: function (x, z) {
        return HiveGenerator.genTreeHive(x, z, BlockID.beehive, 0);
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genMeadowsChance,
    biomes: [1],
    dimension: Dimension.NORMAL,

    generate: function (x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehive, 1, [[2, 0], [3, 0]]);
        return true;
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genModestChance,
    biomes: [2],
    dimension: Dimension.NORMAL,

    generate: function (x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehive, 2, [[2, 0], [3, 0], [12, -1], [24, -1]]);
        return true;
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genTropicalChance,
    biomes: [21, 149],
    dimension: Dimension.NORMAL,

    generate: function (x, z) {
        return HiveGenerator.genTreeHive(x, z, BlockID.beehive, 3);
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genWintryChance,
    biomes: [12, 140, 30, 26],
    dimension: Dimension.NORMAL,

    generate: function (x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehive, 4, [[2, 0], [3, 0]]);
        return true;
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genMarshyChance,
    biomes: [6, 134],
    dimension: Dimension.NORMAL,

    generate: function (x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehive, 5);
        return true;
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genEnderChance,
    dimension: Dimension.END,

    generate: function (x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehive, 6);
        return true;
    }
});

