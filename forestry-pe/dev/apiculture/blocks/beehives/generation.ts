HiveGenerator.register({
    chance: ForestryConfig.genForestChance,
    species: "Forest",

    generate(x, z) {
        return HiveGenerator.genTreeHive(x, z, BlockID.beehiveForestry, 0);
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genMeadowsChance,
    species: "Meadows",

    generate(x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 1, [[2, 0], [3, 0]]);
        return true;
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genModestChance,
    species: "Modest",

    generate(x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 2, [[2, 0], [3, 0], [12, -1], [24, -1]]);
        return true;
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genTropicalChance,
    species: "Tropical",

    generate(x, z) {
        return HiveGenerator.genTreeHive(x, z, BlockID.beehiveForestry, 3);
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genWintryChance,
    species: "Wintry",

    generate(x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 4, [[2, 0], [3, 0]]);
        return true;
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genMarshyChance,
    species: "Marshy",

    generate(x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 5);
        return true;
    }
});

HiveGenerator.register({
    chance: ForestryConfig.genEnderChance,
    dimension: EDimension.END,

    generate(x, z) {
        HiveGenerator.genHive(x, z, BlockID.beehiveForestry, 6);
        return true;
    }
});