HiveGenerator.register({
    chance: ForestryConfig.genForestChance,
    biomes: [4, 132, 27, 155, 29, 157],
    dimension: Dimension.NORMAL,

    generate(x, z) {
        return HiveGenerator.genTreeHive(x, z, BlockID.beehiveForestry, 0);
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genMeadowsChance,
    biomes: [1],
    dimension: Dimension.NORMAL,

    generate(x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 1, [[2, 0], [3, 0]]);
        return true;
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genModestChance,
    biomes: [2],
    dimension: Dimension.NORMAL,

    generate(x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 2, [[2, 0], [3, 0], [12, -1], [24, -1]]);
        return true;
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genTropicalChance,
    biomes: [21, 149],
    dimension: Dimension.NORMAL,

    generate(x, z) {
        return HiveGenerator.genTreeHive(x, z, BlockID.beehiveForestry, 3);
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genWintryChance,
    biomes: [12, 140, 30, 26],
    dimension: Dimension.NORMAL,

    generate(x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 4, [[2, 0], [3, 0]]);
        return true;
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genMarshyChance,
    biomes: [6, 134],
    dimension: Dimension.NORMAL,

    generate(x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 5);
        return true;
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genEnderChance,
    dimension: Dimension.END,

    generate(x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 6);
        return true;
    }
});