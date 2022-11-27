function listEntitiesInRange(
    blockSource: BlockSource,
    coords: { x: number, y: number, z: number },
    range: { x: number, y: number, z: number },
    entityType: number = 0,
) {
    return blockSource.listEntitiesInAABB(
        coords.x - range.x, coords.y - range.y, coords.z - range.z,
        coords.x + range.x, coords.y + range.y, coords.z + range.z,
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
    for (let x = coords.x - range.x; x < coords.x + range.x; x++) {
        for (let y = coords.y - range.y; y < coords.y + range.y; y++) {
            for (let z = coords.z - range.z; z < coords.z + range.z; z++) {
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

BeeEffects.registerEffect("aggress", {
    delay: 40,
    requireWorking: false,
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
    delay: 20,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range);
        for (const entity of all) {
            Entity.addEffect(entity, EPotionEffect.REGENERATION, 100, 1, true, true);
        }
    }
});

BeeEffects.registerEffect("creeper", {
    delay: 20,
    requireWorking: false,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range);
        for (const entity of all) {
            //TODO: wtf?
            World.explode(coords.x, coords.y, coords.z, 3, false);
        }
    }
});

BeeEffects.registerEffect("exploration", {
    delay: 80,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);
        for (const entity of all) {
            const actor = new PlayerActor(entity);
            actor.addExperience(2);
        }
    }
});

//TODO: wtf?
BeeEffects.registerEffect("glacial", {
    delay: 200,
    doEffect(blockSource, coords, range) {
        const waterBlocks = getBlocksInRange(blockSource, coords, range, VanillaBlockID.water, 10);
        for (const block of waterBlocks) {
            blockSource.setBlock(block.x, block.y, block.z, VanillaBlockID.ice, 0);
        }
    }
});

//TODO: wtf?
BeeEffects.registerEffect("heroic", {
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

//TODO: wtf?
BeeEffects.registerEffect("misanthrope", {
    delay: 20,
    requireWorking: false,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);
        for (const entity of all) {
            const damage = 4 - BeeEffects.getApiaristArmorWearValue(entity);
            Entity.damageEntity(entity, damage);
        }
    }
});

//TODO: maybe randomly?
BeeEffects.registerEffect("radiactive", {
    delay: 40,
    requireWorking: false,
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
    delay: 20,
    doEffect(blockSource, coords, range) {
        const all = listEntitiesInRange(blockSource, coords, range, EEntityType.PLAYER);
        for (const entity of all) {
            Entity.addEffect(entity, EPotionEffect.CONFUSION, 500, 1, true, true);
        }
    }
});

