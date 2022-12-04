function attackByBeehive(entity: number) {
    if (!ForestryConfig.hiveDamageOnAttack)
        return;

    if (!Game.getDifficulty() && !ForestryConfig.hiveDamageOnPeaceful)
        return;

    if (Util.random(0, 4) >= BeeEffects.getApiaristArmorWearValue(entity)) {
        Entity.damageEntity(entity, (Math.random() / 2.0 + 0.5) * 10)
    }
}

IDRegistry.genBlockID("beehiveForestry");
Block.createBlock("beehiveForestry", [
    {
        name: "forestry.block.forest_hive",
        texture: [["beehiveForest", 0], ["beehiveForest", 0], ["beehiveForest", 1]],
        inCreative: true,
    },
    {
        name: "forestry.block.meadows_hive",
        texture: [["beehiveMeadows", 0], ["beehiveMeadows", 0], ["beehiveMeadows", 1]],
        inCreative: true,
    },
    {
        name: "forestry.block.modest_hive",
        texture: [["beehiveModest", 0], ["beehiveModest", 0], ["beehiveModest", 1]],
        inCreative: true,
    },
    {
        name: "forestry.block.tropical_hive",
        texture: [["beehiveTropical", 0], ["beehiveTropical", 0], ["beehiveTropical", 1]],
        inCreative: true,
    },
    {
        name: "forestry.block.wintry_hive",
        texture: [["beehiveWintry", 0], ["beehiveWintry", 0], ["beehiveWintry", 1]],
        inCreative: true,
    },
    {
        name: "forestry.block.marshy_hive",
        texture: [["beehiveMarshy", 0], ["beehiveMarshy", 0], ["beehiveMarshy", 1]],
        inCreative: true,
    },
    {
        name: "forestry.block.ender_hive",
        texture: [["beehiveEnder", 0], ["beehiveEnder", 0], ["beehiveEnder", 1]],
        inCreative: true,
    },
]);

ToolAPI.addBlockMaterial("beehive", 1.5);
Block.setBlockMaterial(BlockID.beehiveForestry, "beehive", 1);

Item.addCreativeGroup("forestry_beehives", t("forestry.creative_group.beehives"), [
    BlockID.beehiveForestry,
]);

Block.registerDropFunction(BlockID.beehiveForestry, (coords, id, data, diggingLevel) => {
    if (diggingLevel) {
        let drop: ItemInstanceArray[] = [];
        let rand = Math.random();
        if (rand < 0.3) {
            drop.push([ItemID.princessValiant, 1, 0]);
        } else if (Math.random() < 0.8) {
            switch (data) {
                case 0:
                    if (Math.random() < 0.08) {
                        let bee = new Bee("Forest", BeeRegistry.BEETYPE_PRINCESS, true, "Forest");
                        (bee.inactive_chromosomes_list as any)["TOLERATES_RAIN"] = true;
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

        switch (data) {
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
            switch (data) {
                case 0:
                    if (Math.random() < 0.08) {
                        let bee = new Bee("Forest", BeeRegistry.BEETYPE_DRONE, true, "Forest");
                        (bee.inactive_chromosomes_list as any)["TOLERATES_RAIN"] = true;
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

Callback.addCallback("DestroyBlock", (coords, block, player) => {
    attackByBeehive(player);
});