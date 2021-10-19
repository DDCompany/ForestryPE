interface IGenerationOptions {
    blockId: number,
    chunkX: number,
    chunkZ: number,
    lowestY: number,
    highestY: number,
    amountVeins: number
    maxVeinSize: number,
    chance?: number;
}

function randomCoords(random: java.util.Random, chunkX: number, chunkZ: number, minY: number, maxY: number) {
    return {
        x: chunkX * 16 + random.nextInt(16),
        y: minY + random.nextInt(maxY - minY),
        z: chunkZ * 16 + random.nextInt(16),
    };
}

function generateMinable(random: java.util.Random, seed: number, options: IGenerationOptions) {
    if (options.chance && Math.random() > options.chance) {
        return;
    }

    const {blockId, chunkZ, chunkX, lowestY, highestY, amountVeins, maxVeinSize} = options;
    for (let i = 0; i < amountVeins; i++) {
        const coords = randomCoords(random, chunkX, chunkZ, lowestY, highestY);
        const veinSize = 1 + random.nextInt(maxVeinSize);
        GenerationUtils.generateOre(coords.x, coords.y, coords.z, blockId, 0, veinSize, false,
            seed);
    }
}

function createOreDropFunction(rawMetalId: number): Block.DropFunction {
    assert(rawMetalId, "Metal Id must be valid item");
    return (coords, id, data, level, enchant) => {
        if (level < 2) {
            return [];
        }

        return [[rawMetalId, 1 + enchant.fortune, 0]];
    };
}

Block.createSpecialType({
    base: 1,
    solid: true,
    destroytime: 1.75,
    explosionres: 5,
    lightopacity: 15,
    translucency: 0,
    sound: "stone",
}, "forestry_ore");

Block.createSpecialType({
    base: 1,
    solid: true,
    destroytime: 3.5,
    explosionres: 5,
    lightopacity: 15,
    translucency: 0,
    sound: "stone",
}, "forestry_deepslate_ore");

IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper", [
    {name: `forestry.block.copper_ore`, texture: [["oreCopper", 0]], inCreative: true},
], "forestry_ore");
Block.setBlockMaterial("oreCopper", "stone", 2);
Block.setDestroyLevel("oreCopper", 2);

IDRegistry.genBlockID("oreDeepslateCopper");
Block.createBlock("oreDeepslateCopper", [
    {name: `forestry.block.deepslate_copper_ore`, texture: [["oreCopper", 1]], inCreative: true},
], "forestry_deepslate_ore");
Block.setBlockMaterial("oreDeepslateCopper", "stone", 2);
Block.setDestroyLevel("oreDeepslateCopper", 2);

IDRegistry.genBlockID("oreTin");
Block.createBlock("oreTin", [
    {name: `forestry.block.tin_ore`, texture: [["oreTin", 0]], inCreative: true},
], "forestry_ore");
Block.setBlockMaterial("oreTin", "stone", 2);
Block.setDestroyLevel("oreTin", 2);

IDRegistry.genBlockID("oreDeepslateTin");
Block.createBlock("oreDeepslateTin", [
    {name: `forestry.block.deepslate_tin_ore`, texture: [["oreTin", 1]], inCreative: true},
], "forestry_deepslate_ore");
Block.setBlockMaterial("oreDeepslateTin", "stone", 2);
Block.setDestroyLevel("oreDeepslateTin", 2);

IDRegistry.genBlockID("oreApatite");
Block.createBlock("oreApatite", [
    {name: `forestry.block.apatite_ore`, texture: [["oreApatite", 0]], inCreative: true},
], "forestry_ore");
Block.setBlockMaterial("oreApatite", "stone", 2);
Block.setDestroyLevel("oreApatite", 2);

Block.registerDropFunction("oreApatite", ({x, y, z}, id, data, level, {fortune, silk}, item, region) => {
    if (level < 2) {
        return [];
    }

    if (silk) {
        return [[BlockID.oreApatite, 1, 0]];
    }

    const amount = (2 + random(5)) * (random(fortune + 2) + 1);
    region.spawnExpOrbs(x, y, z, random(1, 5));
    return [[ItemID.apatite, amount, 0]];
});

Item.addCreativeGroup("ores", t("forestry.creative_group.ores"), [
    BlockID.oreCopper,
    BlockID.oreDeepslateCopper,
    BlockID.oreTin,
    BlockID.oreDeepslateTin,
    BlockID.oreApatite,
]);

Callback.addCallback("PreLoaded", () => {
    Block.registerDropFunction("oreCopper", createOreDropFunction(ItemID.metalRawCopper));
    Block.registerDropFunction("oreDeepslateCopper", createOreDropFunction(ItemID.metalRawCopper));
    Block.registerDropFunction("oreTin", createOreDropFunction(ItemID.metalRawTin));
    Block.registerDropFunction("oreDeepslateTin", createOreDropFunction(ItemID.metalRawTin));
});

function addOreGeneration(actionName: string, options: Omit<IGenerationOptions, "chunkX" | "chunkZ">) {
    Flags.addUniqueAction(actionName, () => {
        Callback.addCallback("GenerateChunk", (chunkX, chunkZ, random, seed) => {
            generateMinable(random, seed, {
                ...options,
                chunkZ,
                chunkX,
            });
        });
    });
}

{
    const copperGen = CoreConfig.worldGen.copper;
    if (copperGen.enabled) {
        addOreGeneration("oreGenCopper", {
            blockId: BlockID.oreCopper,
            lowestY: copperGen.lowestY,
            highestY: copperGen.highestY,
            amountVeins: copperGen.veins,
            maxVeinSize: copperGen.veinSize,
        });
    }

    const tinGen = CoreConfig.worldGen.tin;
    if (tinGen.enabled) {
        addOreGeneration("oreGenTin", {
            blockId: BlockID.oreTin,
            lowestY: tinGen.lowestY,
            highestY: tinGen.highestY,
            amountVeins: tinGen.veins,
            maxVeinSize: tinGen.veinSize,
        });
    }

    const apatiteGen = CoreConfig.worldGen.apatite;
    if (apatiteGen.enabled) {
        addOreGeneration("oreGenApatite", {
            blockId: BlockID.oreApatite,
            lowestY: apatiteGen.lowestY,
            highestY: apatiteGen.highestY,
            chance: apatiteGen.chance,
            maxVeinSize: apatiteGen.veinSize,
            amountVeins: 1,
        });
    }

    const deepslateCopper = CoreConfig.worldGen.deepslateCopper;
    if (deepslateCopper.enabled) {
        addOreGeneration("oreGenDeepslateCopper", {
            blockId: BlockID.oreDeepslateCopper,
            lowestY: deepslateCopper.lowestY,
            highestY: deepslateCopper.highestY,
            maxVeinSize: deepslateCopper.veinSize,
            amountVeins: deepslateCopper.veins,
        });
    }

    const deepslateTin = CoreConfig.worldGen.deepslateTin;
    if (deepslateTin.enabled) {
        addOreGeneration("oreGenDeepslateTin", {
            blockId: BlockID.oreDeepslateTin,
            lowestY: deepslateTin.lowestY,
            highestY: deepslateTin.highestY,
            maxVeinSize: deepslateTin.veinSize,
            amountVeins: deepslateTin.veins,
        });
    }
}