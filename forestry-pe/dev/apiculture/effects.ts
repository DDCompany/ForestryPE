function listEntitiesInRange(
    blockSource: BlockSource,
    coords: { x: number, y: number, z: number },
    range: { x: number, y: number, z: number },
    entityType: number = 0,
) {
    return blockSource.listEntitiesInAABB(
        coords.x - range.x / 2, coords.y - range.y / 2, coords.z - range.z / 2,
        coords.x + range.x / 2, coords.y + range.y / 2, coords.z + range.z / 2,
        entityType, entityType === 0,
    );
}

function getBlocksInRange(
    blockSource: BlockSource,
    coords: { x: number, y: number, z: number },
    range: { x: number, y: number, z: number },
    blockId: number,
    limit: number = -1,
) {
    const blocks: { x: number, y: number, z: number }[] = [];
    for (let x = coords.x - range.x / 2; x < coords.x + range.x / 2; x++) {
        for (let y = coords.y - range.y / 2; y < coords.y + range.y / 2; y++) {
            for (let z = coords.z - range.z / 2; z < coords.z + range.z / 2; z++) {
                const id = blockSource.getBlockId(x, y, z);
                if (id === blockId) {
                    blocks.push({x, y, z});
                    if (blocks.length === limit) return blocks;
                }
            }
        }
    }

    return blocks;
}

function getRandomPositionInRange(
    blockSource: BlockSource,
    coords: { x: number, y: number, z: number },
    range: { x: number, y: number, z: number },
) {
    return {
        x: Math.floor(coords.x + (Math.random() - 0.5) * range.x * 2),
        y: Math.floor(coords.y + (Math.random() - 0.5) * range.y * 2),
        z: Math.floor(coords.z + (Math.random() - 0.5) * range.z * 2),
    };
}

BeeEffects.registerEffect("aggress", {
    name: "bees.effect.aggress",
    delay: 40,
    requireWorking: false,
    isDominant: true,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range);
        for (const entity of all) {
            Entity.damageEntity(entity, 4 - BeeEffects.getApiaristArmorWearValue(entity));

            if (Entity.getHealth(entity) <= 0) {
                Entity.remove(entity);
            }
        }
    }
});

BeeEffects.registerEffect("beatific", {
    name: "bees.effect.beatific",
    delay: 20,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range);
        for (const entity of all) {
            Entity.addEffect(entity, EPotionEffect.REGENERATION, 100, 1, true, true);
        }
    }
});

BeeEffects.registerEffect("creeper", {
    name: "bees.effect.creeper",
    delay: 20,
    requireWorking: false,
    isDominant: true,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range);
        for (const entity of all) {
            //TODO: wtf?
            World.explode(coords.x, coords.y, coords.z, 3, false);
        }
    }
});

BeeEffects.registerEffect("exploration", {
    name: "bees.effect.explorer",
    delay: 80,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);
        for (const entity of all) {
            const actor = new PlayerActor(entity);
            actor.addExperience(2);
        }
    }
});

BeeEffects.registerEffect("glacial", {
    name: "bees.effect.freezing",
    delay: 200,
    doEffect(blockSource, coords, range, house) {
        switch (house.getClimate()) {
            case BiomeHelper.CLIMATE_HELLISH:
            case BiomeHelper.CLIMATE_HOT:
            case BiomeHelper.CLIMATE_WARM:
                return;
        }

        for (let i = 0; i < 10; i++) {
            const pos = getRandomPositionInRange(blockSource, coords, range);
            const id = blockSource.getBlockId(pos.x, pos.y, pos.z);
            const aboveId = blockSource.getBlockId(pos.x, pos.y + 1, pos.z);
            if (id === VanillaBlockID.water && aboveId === 0) {
                blockSource.setBlock(pos.x, pos.y, pos.z, VanillaBlockID.ice, 0);
            }
        }
    }
});

BeeEffects.registerEffect("heroic", {
    name: "bees.effect.heroic",
    delay: 40,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range);
        for (const entity of all) {
            Entity.damageEntity(entity, 2);
            if (Entity.getHealth(entity) <= 0) {
                Entity.remove(entity);
            }
        }
    }
});

BeeEffects.registerEffect("ignition", {
    name: "bees.effect.flammable",
    delay: 20,
    requireWorking: false,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);

        for (const entity of all) {
            let duration = 500;
            let chance = .5;

            switch (BeeEffects.getApiaristArmorWearValue(entity)) {
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

            if (Math.random() < chance) {
                Entity.setFire(entity, duration, false);
            }
        }
    }
});

BeeEffects.registerEffect("miasmic", {
    name: "bees.effect.poison",
    delay: 100,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);

        for (const entity of all) {
            let duration = 600;

            switch (BeeEffects.getApiaristArmorWearValue(entity)) {
                case 3:
                    duration = 150;
                    break;
                case 2:
                    duration = 300;
                    break;
                case 1:
                    duration = 450;
                    break;
            }

            Entity.addEffect(entity, EPotionEffect.POISON, duration, 1, true, true);
        }
    }
});

BeeEffects.registerEffect("misanthrope", {
    name: "bees.effect.ends",
    delay: 20,
    requireWorking: false,
    isDominant: true,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);
        for (const entity of all) {
            const damage = 4 - BeeEffects.getApiaristArmorWearValue(entity);
            Entity.damageEntity(entity, damage);
        }
    }
});

BeeEffects.registerEffect("radiactive", {
    name: "bees.effect.radiact",
    delay: 40,
    requireWorking: false,
    isDominant: true,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range);

        for (const ent of all) {
            Entity.damageEntity(ent, 8 - BeeEffects.getApiaristArmorWearValue(ent) * 2);
            if (Entity.getHealth(ent) <= 0) {
                Entity.remove(ent);
            }
        }

        const blocks = getBlocksInRange(blockSource, coords, range, VanillaBlockID.water, 20);
        for (const block of blocks) {
            blockSource.setBlock(block.x, block.y, block.z, 0, 0);
        }
    }
});

BeeEffects.registerEffect("drunkard", {
    name: "bees.effect.drunkard",
    delay: 20,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);
        for (const entity of all) {
            Entity.addEffect(entity, EPotionEffect.CONFUSION, 500, 1, true, true);
        }
    }
});

