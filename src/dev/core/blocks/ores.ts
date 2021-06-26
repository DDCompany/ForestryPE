Block.createSpecialType({
    base: 1,
    solid: true,
    destroytime: 3,
    explosionres: 5,
    sound: "stone",
}, "forestry_ore");

IDRegistry.genBlockID("oreCopper");
Block.createBlock("oreCopper", [
    {name: `forestry.block.copper_ore`, texture: [["oreCopper", 0]], inCreative: true},
], "forestry_ore");
Block.setBlockMaterial("oreCopper", "stone", 2);
Block.setDestroyLevel("oreCopper", 2);

IDRegistry.genBlockID("oreTin");
Block.createBlock("oreTin", [
    {name: `forestry.block.tin_ore`, texture: [["oreTin", 0]], inCreative: true},
], "forestry_ore");
Block.setBlockMaterial("oreTin", "stone", 2);
Block.setDestroyLevel("oreTin", 2);

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
    BlockID.oreTin,
    BlockID.oreApatite,
]);