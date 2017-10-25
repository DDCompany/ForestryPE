BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Суровая принцесса",
            en: "Austere princess"
        },
        drone: {
            ru: "Суровый трутень",
            en: "Austere drone"
        },
        queen: {
            ru: "Суровая королева",
            en: "Austere queen"
        }
    },
    mutations: [
        {
            species1: "Modest",
            species2: "Frugal",
            chance: 0.08,
            onMutate: function (house) {
                var climate = BiomeHelper.getBiomeClimate(World.getBiome(house.tile.x, house.tile.z));
                if ((climate === BiomeHelper.CLIMATE_HOT || climate === BiomeHelper.CLIMATE_HELLISH) && BiomeHelper.getBiomeHumidity(World.getBiome(house.tile.x, house.tile.z)) === BiomeHelper.HUMIDITY_ARID) return true;

                return false;
            }
        }
    ],
    species: "Austere",
    humidity: BiomeHelper.HUMIDITY_ARID,
    climate: BiomeHelper.CLIMATE_HOT,
    flowers: BeeRegistry.FLOWERS_CACTI,
    produce: [[ItemID.combParched, 0, 0.2], [ItemID.combPowdery, 0, 0.5]],
    chromosomes: {
        EFFECT: BeeEffects.EFFECT_CREEPER,
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_UP_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        NEVER_SLEEPS: true
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Карающая принцесса",
            en: "Avenging princess"
        },
        drone: {
            ru: "Карающий трутень",
            en: "Avenging drone"
        },
        queen: {
            ru: "Карающая королева",
            en: "Avenging queen"
        }
    },
    mutations: [
        {
            species1: "Vengeful",
            species2: "Vindictive",
            chance: 0.04
        }
    ],
    species: "Avenging",
    produce: [[ItemID.combIrradiated, 0, 0.4]],
    chromosomes: {EFFECT: BeeEffects.EFFECT_RADIOACT, TERRITORY: "15x13x15", LIFESPAN: BeeRegistry.LIFESPAN_LONGEST}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Обычная принцесса",
            en: "Common princess"
        },
        drone: {
            ru: "Обычный трутень",
            en: "Common drone"
        },
        queen: {
            ru: "Обычная королева",
            en: "Common queen"
        }
    },
    species: "Common",
    produce: [[ItemID.combHoney, 0, 0.35]],
    chromosomes: {LIFESPAN: BeeRegistry.LIFESPAN_SHORTER}
});

var mut1 = ["Forest", "Meadows", "Modest", "Tropical", "Wintry", "Marshy"];

for (var key in mut1) {
    for (var key2 in mut1) {
        if (mut1[key] !== mut1[key2]) {
            BeeRegistry.addMutation({
                species1: mut1[key],
                species2: mut1[key2],
                result: "Common",
                chance: 0.15
            });
        }
    }
}
BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Культивируемая принцесса",
            en: "Cultivated princess"
        },
        drone: {
            ru: "Культивируемый трутень",
            en: "Cultivated drone"
        },
        queen: {
            ru: "Культивируемая королева",
            en: "Cultivated queen"
        }
    },
    species: "Cultivated",
    produce: [[ItemID.combHoney, 0, 0.4]],
    chromosomes: {LIFESPAN: BeeRegistry.LIFESPAN_SHORTEST, TOLERATES_RAIN: true}
});

for (var key in mut1) {
    BeeRegistry.addMutation({
        species1: mut1[key],
        species2: "Common",
        result: "Cultivated",
        chance: 0.12
    });
}

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Демоническая принцесса",
            en: "Demonic princess"
        },
        drone: {
            ru: "Демонический трутень",
            en: "Demonic drone"
        },
        queen: {
            ru: "Демоническая королева",
            en: "Demonic queen"
        }
    },
    species: "Demonic",
    produce: [[ItemID.combSimmering, 0, 0.45], [348, 0, 0.15]],
    humidity: BiomeHelper.HUMIDITY_ARID,
    climate: BiomeHelper.CLIMATE_HELLISH,
    flowers: BeeRegistry.FLOWERS_NETHER,
    mutations: [
        {
            species1: "Sinister",
            species2: "Fiendish",
            chance: 0.25,
            onMutate: function (house) {
                var climate = BiomeHelper.getBiomeClimate(World.getBiome(house.tile.x, house.tile.z));
                if (climate === BiomeHelper.CLIMATE_HELLISH) return true;

                return false;
            }
        }
    ],
    chromosomes: {
        NEVER_SLEEPS: true,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        EFFECT: BeeEffects.EFFECT_FLAMMABLE,
        LIFESPAN: BeeRegistry.LIFESPAN_LONGER,
        TOLERATES_RAIN: true,
        SPEED: BeeRegistry.SPEED_SLOWER
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Добросовестная принцесса",
            en: "Diligent princess"
        },
        drone: {
            ru: "Добросовестный трутень",
            en: "Diligent drone"
        },
        queen: {
            ru: "Добросовестная королева",
            en: "Diligent queen"
        }
    },
    species: "Diligent",
    produce: [[ItemID.combStringy, 0, 0.2]],
    mutations: [
        {
            species1: "Common",
            species2: "Cultivated",
            chance: 0.1
        }
    ],
    chromosomes: {SPEED: BeeRegistry.SPEED_SLOWER, LIFESPAN: BeeRegistry.LIFESPAN_SHORT}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Райская принцесса",
            en: "Edenic princess"
        },
        drone: {
            ru: "Райский трутень",
            en: "Edenic drone"
        },
        queen: {
            ru: "Райская королева",
            en: "Edenic queen"
        }
    },
    species: "Edenic",
    mutations: [
        {
            species1: "Tropical",
            species2: "Exotic",
            chance: 0.08
        }
    ],
    produce: [[ItemID.combSilky, 0, 0.2]],
    humidity: BiomeHelper.HUMIDITY_DAMP,
    climate: BiomeHelper.CLIMATE_WARM,
    flowers: BeeRegistry.FLOWERS_JUNGLE,
    chromosomes: {
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        SPEED: BeeRegistry.SPEED_SLOWEST,
        LIFESPAN: BeeRegistry.LIFESPAN_LONGER,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_2,
        EFFECT: BeeEffects.EFFECT_EXPLORER
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Принцесса края",
            en: "Ender princess"
        },
        drone: {
            ru: "Трутень края",
            en: "Ender drone"
        },
        queen: {
            ru: "Королева края",
            en: "Ender queen"
        }
    },
    species: "Ender",
    produce: [[ItemID.combMysterious, 0, 0.3]],
    climate: BiomeHelper.CLIMATE_COLD,
    flowers: BeeRegistry.FLOWERS_ENDS,
    chromosomes: {
        EFFECT: BeeEffects.EFFECT_ENDS,
        TERRITORY: "11x8x11",
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_UP_1
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Экзотическая принцесса",
            en: "Exotic princess"
        },
        drone: {
            ru: "Экзотический трутень",
            en: "Exotic drone"
        },
        queen: {
            ru: "Экзотическая королева",
            en: "Exotic queen"
        }
    },
    species: "Exotic",
    produce: [[ItemID.combSilky, 0, 0.3]],
    climate: BiomeHelper.CLIMATE_WARM,
    humidity: BiomeHelper.HUMIDITY_DAMP,
    flowers: BeeRegistry.FLOWERS_JUNGLE,
    mutations: [
        {
            species1: "Austere",
            species2: "Tropical",
            chance: 0.12
        }
    ],
    chromosomes: {
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1,
        LIFESPAN: BeeRegistry.LIFESPAN_LONG
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Дьявольская принцесса",
            en: "Fiendish princess"
        },
        drone: {
            ru: "Дьявольский трутень",
            en: "Fiendish drone"
        },
        queen: {
            ru: "Дьявольская королева",
            en: "Fiendish queen"
        }
    },
    species: "Fiendish",
    produce: [[ItemID.combSimmering, 0, 0.55], [ItemID.ash, 0, 0.15]],
    climate: BiomeHelper.CLIMATE_HELLISH,
    humidity: BiomeHelper.HUMIDITY_ARID,
    flowers: BeeRegistry.FLOWERS_NETHER,
    mutations: [
        {
            species1: "Modest",
            species2: "Sinister",
            chance: 0.4,
            onMutate: function (house) {
                var climate = BiomeHelper.getBiomeClimate(World.getBiome(house.tile.x, house.tile.z));
                if (climate === BiomeHelper.CLIMATE_HELLISH) return true;

                return false;
            }
        },
        {
            species1: "Tropical",
            species2: "Sinister",
            chance: 0.4,
            onMutate: function (house) {
                var climate = BiomeHelper.getBiomeClimate(World.getBiome(house.tile.x, house.tile.z));
                if (climate === BiomeHelper.CLIMATE_HELLISH) return true;

                return false;
            }
        },
        {
            species1: "Cultivated",
            species2: "Sinister",
            chance: 0.4,
            onMutate: function (house) {
                var climate = BiomeHelper.getBiomeClimate(World.getBiome(house.tile.x, house.tile.z));
                if (climate === BiomeHelper.CLIMATE_HELLISH) return true;

                return false;
            }
        }
    ],
    chromosomes: {
        NEVER_SLEEPS: true,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        LIFESPAN: BeeRegistry.LIFESPAN_LONG,
        EFFECT: BeeEffects.EFFECT_AGGRESS
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Лесная принцесса",
            en: "Forest princess"
        },
        drone: {
            ru: "Лесной трутень",
            en: "Forest drone"
        },
        queen: {
            ru: "Лесная королева",
            en: "Forest queen"
        }
    },
    species: "Forest",
    produce: [[ItemID.combHoney, 0, 0.3]],
    chromosomes: {FERTILITY: 3}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Умеренная принцесса",
            en: "Frugal princess"
        },
        drone: {
            ru: "Умеренный трутень",
            en: "Frugal drone"
        },
        queen: {
            ru: "Умеренная королева",
            en: "Frugal queen"
        }
    },
    species: "Frugal",
    produce: [[ItemID.combParched, 0, 0.3]],
    climate: BiomeHelper.CLIMATE_HOT,
    humidity: BiomeHelper.HUMIDITY_ARID,
    flowers: BeeRegistry.FLOWERS_CACTI,
    mutations: [
        {
            species1: "Modest",
            species2: "Sinister",
            chance: 0.16,
            onMutate: function (house) {
                var climate = BiomeHelper.getBiomeClimate(World.getBiome(house.tile.x, house.tile.z));
                if (climate === BiomeHelper.CLIMATE_HOT) return true;

                return false;
            }
        },
        {
            species1: "Modest",
            species2: "Fiendish",
            chance: 0.1,
            onMutate: function (house) {
                var climate = BiomeHelper.getBiomeClimate(World.getBiome(house.tile.x, house.tile.z));
                if (climate === BiomeHelper.CLIMATE_HOT) return true;

                return false;
            }
        }
    ],
    chromosomes: {TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1, LIFESPAN: BeeRegistry.LIFESPAN_LONG}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Ледниковая принцесса",
            en: "Glacial princess"
        },
        drone: {
            ru: "Ледниковый трутень",
            en: "Glacial drone"
        },
        queen: {
            ru: "Ледниковая королева",
            en: "Glacial queen"
        }
    },
    species: "Glacial",
    produce: [[ItemID.combFrozen, 0, 0.2], [ItemID.iceShard, 0, 0.4]],
    climate: BiomeHelper.CLIMATE_ICY,
    mutations: [
        {
            species1: "Wintry",
            species2: "Icy",
            chance: 0.08
        }
    ],
    chromosomes: {
        EFFECT: BeeEffects.EFFECT_FREEZING,
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT,
        SPEED: BeeRegistry.SPEED_SLOWER
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Отшельническая принцесса",
            en: "Hermitic princess"
        },
        drone: {
            ru: "Отшельнический трутень",
            en: "Hermitic drone"
        },
        queen: {
            ru: "Отшельническая королева",
            en: "Hermitic queen"
        }
    },
    species: "Hermitic",
    produce: [[ItemID.combMellow, 0, 0.2]],
    flowers: BeeRegistry.FLOWERS_WHEAT,
    chromosomes: {HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Ледяная принцесса",
            en: "Icy princess"
        },
        drone: {
            ru: "Ледяной трутень",
            en: "Icy drone"
        },
        queen: {
            ru: "Ледяная королева",
            en: "Icy queen"
        }
    },
    species: "Icy",
    produce: [[ItemID.combFrozen, 0, 0.2], [ItemID.iceShard, 0, 0.2]],
    climate: BiomeHelper.CLIMATE_ICY,
    mutations: [
        {
            species1: "Industrious",
            species2: "Wintry",
            chance: 0.12
        }
    ],
    chromosomes: {
        EFFECT: BeeEffects.EFFECT_FREEZING,
        SPEED: BeeRegistry.SPEED_SLOW,
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Трудолюбивая принцесса",
            en: "Industrious princess"
        },
        drone: {
            ru: "Трудолюбивый трутень",
            en: "Industrious drone"
        },
        queen: {
            ru: "Трудолюбивая королева",
            en: "Industrious queen"
        }
    },
    species: "Industrious",
    produce: [[ItemID.combStringy, 0, 0.2], [ItemID.pollen1, 0, 0.15]],
    mutations: [
        {
            species1: "Diligent",
            species2: "Unweary",
            chance: 0.08
        }
    ],
    chromosomes: {SPEED: BeeRegistry.SPEED_SLOWER}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Заячья принцесса",
            en: "Leporine princess"
        },
        drone: {
            ru: "Заячий трутень",
            en: "Leporine drone"
        },
        queen: {
            ru: "Заячья королева",
            en: "Leporine queen"
        }
    },
    species: "Leporine",
    produce: [[ItemID.combSilky, 0, 0.3], [344, 0, 0.1]],
    mutations: [
        {
            species1: "Meadows",
            species2: "Forest",
            chance: 0.01
        }
    ],
    chromosomes: {HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Величественная принцесса",
            en: "Majestic princess"
        },
        drone: {
            ru: "Величественный трутень",
            en: "Majestic drone"
        },
        queen: {
            ru: "Величественная королева",
            en: "Majestic queen"
        }
    },
    species: "Majestic",
    produce: [[ItemID.combDripping, 0, 0.3]],
    mutations: [
        {
            species1: "Cultivated",
            species2: "Noble",
            chance: 0.08
        }
    ],
    chromosomes: {LIFESPAN: BeeRegistry.LIFESPAN_SHORTENED, FERTILITY: 4}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Болотная принцесса",
            en: "Marshy princess"
        },
        drone: {
            ru: "Болотный трутень",
            en: "Marshy drone"
        },
        queen: {
            ru: "Болотная королева",
            en: "Marshy queen"
        }
    },
    species: "Marshy",
    produce: [[ItemID.combMossy, 0, 0.3]],
    humidity: BiomeHelper.HUMIDITY_DAMP,
    flowers: BeeRegistry.FLOWERS_MUSHROOMS,
    chromosomes: {HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Луговая принцесса",
            en: "Meadows princess"
        },
        drone: {
            ru: "Луговой трутень",
            en: "Meadows drone"
        },
        queen: {
            ru: "Луговая королева",
            en: "Meadows queen"
        }
    },
    species: "Meadows",
    produce: [[ItemID.combHoney, 0, 0.3]],
    chromosomes: {}
});


BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Веселенькая принцесса",
            en: "Merry princess"
        },
        drone: {
            ru: "Веселенький трутень",
            en: "Merry drone"
        },
        queen: {
            ru: "Веселенькая королева",
            en: "Merry queen"
        }
    },
    species: "Merry",
    produce: [[ItemID.combFrozen, 0, 0.3], [ItemID.iceShard, 0, 0.2]],
    climate: BiomeHelper.CLIMATE_ICY,
    chromosomes: {
        EFFECT: BeeEffects.EFFECT_FREEZING,
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        NEVER_SLEEPS: true
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Скромная принцесса",
            en: "Modest princess"
        },
        drone: {
            ru: "Скромный трутень",
            en: "Modest drone"
        },
        queen: {
            ru: "Скромная королева",
            en: "Modest queen"
        }
    },
    species: "Modest",
    produce: [[ItemID.combParched, 0, 0.2]],
    climate: BiomeHelper.CLIMATE_HOT,
    humidity: BiomeHelper.HUMIDITY_ARID,
    flowers: BeeRegistry.FLOWERS_CACTI,
    chromosomes: {
        NEVER_SLEEPS: true,
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_UP_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1,
        SPEED: BeeRegistry.SPEED_SLOWER,
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Монашеская принцесса",
            en: "Monastic princess"
        },
        drone: {
            ru: "Монашеский трутень",
            en: "Monastic drone"
        },
        queen: {
            ru: "Монашеская королева",
            en: "Monastic queen"
        }
    },
    species: "Monastic",
    produce: [[ItemID.combWheaten, 0, 0.3], [ItemID.combMellow, 0, 0.1]],
    specialty: [[ItemID.combMellow, 0, 0.1]],
    flowers: BeeRegistry.FLOWERS_WHEAT,
    chromosomes: {HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Благородная принцесса",
            en: "Noble princess"
        },
        drone: {
            ru: "Благородный трутень",
            en: "Noble drone"
        },
        queen: {
            ru: "Благородная королева",
            en: "Noble queen"
        }
    },
    species: "Noble",
    produce: [[ItemID.combDripping, 0, 0.2]],
    mutations: [
        {
            species1: "Common",
            species2: "Cultivated",
            chance: 0.1
        }
    ],
    chromosomes: {SPEED: BeeRegistry.SPEED_SLOWER, LIFESPAN: BeeRegistry.LIFESPAN_SHORT}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Призрачная принцесса",
            en: "Phantasmal princess"
        },
        drone: {
            ru: "Призрачный трутень",
            en: "Phantasmal drone"
        },
        queen: {
            ru: "Призрачная королева",
            en: "Phantasmal queen"
        }
    },
    species: "Phantasmal",
    produce: [[ItemID.combMysterious, 0, 0.4]],
    climate: BiomeHelper.CLIMATE_COLD,
    flowers: BeeRegistry.FLOWERS_ENDS,
    chromosomes: {TERRITORY: "11x8x11", SPEED: BeeRegistry.SPEED_SLOWEST, LIFESPAN: BeeRegistry.LIFESPAN_LONGEST}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Сельская принцесса",
            en: "Rural princess"
        },
        drone: {
            ru: "Сельский трутень",
            en: "Rural drone"
        },
        queen: {
            ru: "Сельская королева",
            en: "Rural queen"
        }
    },
    species: "Rural",
    produce: [[ItemID.combWheaten, 0, 0.2]],
    flowers: BeeRegistry.FLOWERS_WHEAT,
    mutations: [
        {
            species1: "Meadows",
            species2: "Diligent",
            chance: 0.12
        }
    ],
    chromosomes: {}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Укромная принцесса",
            en: "Secluded princess"
        },
        drone: {
            ru: "Укромный трутень",
            en: "Secluded drone"
        },
        queen: {
            ru: "Укромная королева",
            en: "Secluded queen"
        }
    },
    species: "Secluded",
    produce: [[ItemID.combMellow, 0, 0.2]],
    flowers: BeeRegistry.FLOWERS_WHEAT,
    chromosomes: {HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Зловещая принцесса",
            en: "Sinister princess"
        },
        drone: {
            ru: "Зловещий трутень",
            en: "Sinister drone"
        },
        queen: {
            ru: "Зловещая королева",
            en: "Sinister queen"
        }
    },
    species: "Sinister",
    produce: [[ItemID.combSimmering, 0, 0.45]],
    climate: BiomeHelper.CLIMATE_HELLISH,
    humidity: BiomeHelper.HUMIDITY_ARID,
    flowers: BeeRegistry.FLOWERS_NETHER,
    mutations: [
        {
            species1: "Modest",
            species2: "Cultivated",
            chance: 0.6,
            onMutate: function (house) {
                var climate = BiomeHelper.getBiomeClimate(World.getBiome(house.tile.x, house.tile.z));
                if (climate === BiomeHelper.CLIMATE_HELLISH) return true;

                return false;
            }
        },
        {
            species1: "Tropical",
            species2: "Cultivated",
            chance: 0.6,
            onMutate: function (house) {
                var climate = BiomeHelper.getBiomeClimate(World.getBiome(house.tile.x, house.tile.z));
                if (climate === BiomeHelper.CLIMATE_HELLISH) return true;

                return false;
            }
        }
    ],
    chromosomes: {
        NEVER_SLEEPS: true,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        SPEED: BeeRegistry.SPEED_SLOWER,
        EFFECT: BeeEffects.EFFECT_AGGRESS
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Спектральная принцесса",
            en: "Spectral princess"
        },
        drone: {
            ru: "Спектральный трутень",
            en: "Spectral drone"
        },
        queen: {
            ru: "Спектральная королева",
            en: "Spectral queen"
        }
    },
    species: "Spectral",
    produce: [[ItemID.combMysterious, 0, 0.5]],
    climate: BiomeHelper.CLIMATE_COLD,
    flowers: BeeRegistry.FLOWERS_ENDS,
    chromosomes: {TERRITORY: "11x8x11", SPEED: BeeRegistry.SPEED_SLOWER, EFFECT: BeeEffects.EFFECT_AGGRESS}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Пьяная принцесса",
            en: "Tipsy princess"
        },
        drone: {
            ru: "Пьяный трутень",
            en: "Tipsy drone"
        },
        queen: {
            ru: "Пьяная королева",
            en: "Tipsy queen"
        }
    },
    species: "Tipsy",
    produce: [[ItemID.combFrozen, 0, 0.3], [ItemID.iceShard, 0, 0.2]],
    climate: BiomeHelper.CLIMATE_ICY,
    chromosomes: {
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_UP_1,
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        NEVER_SLEEPS: true,
        EFFECT: BeeEffects.EFFECT_DRUNKARD
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Тропическая принцесса",
            en: "Tropical princess"
        },
        drone: {
            ru: "Тропический трутень",
            en: "Tropical drone"
        },
        queen: {
            ru: "Тропическая королева",
            en: "Tropical queen"
        }
    },
    species: "Tropical",
    produce: [[ItemID.combSilky, 0, 0.2]],
    climate: BiomeHelper.CLIMATE_WARM,
    humidity: BiomeHelper.HUMIDITY_DAMP,
    flowers: BeeRegistry.FLOWERS_JUNGLE,
    chromosomes: {
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1,
        SPEED: BeeRegistry.SPEED_SLOWER,
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Неутомимая принцесса",
            en: "Unweary princess"
        },
        drone: {
            ru: "Неутомимый трутень",
            en: "Unweary drone"
        },
        queen: {
            ru: "Неутомимая королева",
            en: "Unweary queen"
        }
    },
    species: "Unweary",
    produce: [[ItemID.combSilky, 0, 0.2]],
    mutations: [
        {
            species1: "Cultivated",
            species2: "Diligent",
            chance: 0.08
        }
    ],
    chromosomes: {LIFESPAN: BeeRegistry.LIFESPAN_SHORTENED}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Доблестная принцесса",
            en: "Valiant princess"
        },
        drone: {
            ru: "Доблестный трутень",
            en: "Valiant drone"
        },
        queen: {
            ru: "Доблестная королева",
            en: "Valiant queen"
        }
    },
    species: "Valiant",
    produce: [[ItemID.combCocoa, 0, 0.3], [353, 0, 0.15]],
    specialty: [[353, 0, 0.15]],
    chromosomes: {
        LIFESPAN: BeeRegistry.LIFESPAN_LONG,
        SPEED: BeeRegistry.SPEED_SLOW,
        NEVER_SPLEEPS: true,
        CAVE_DWELLING: true
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Мстительная принцесса",
            en: "Vengeful princess"
        },
        drone: {
            ru: "Мстительный трутень",
            en: "Vengeful drone"
        },
        queen: {
            ru: "Мстительная королева",
            en: "Vengeful queen"
        }
    },
    species: "Vengeful",
    produce: [[ItemID.combIrradiated, 0, 0.4]],
    chromosomes: {EFFECT: BeeEffects.EFFECT_RADIOACT, TERRITORY: "15x13x15", LIFESPAN: BeeRegistry.LIFESPAN_LONGER}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Злопамятная принцесса",
            en: "Vindictive princess"
        },
        drone: {
            ru: "Злопамятный трутень",
            en: "Vindictive drone"
        },
        queen: {
            ru: "Злопамятная королева",
            en: "Vindictive queen"
        }
    },
    species: "Vindictive",
    produce: [[ItemID.combIrradiated, 0, 0.25]],
    chromosomes: {EFFECT: BeeEffects.EFFECT_RADIOACT, TERRITORY: "15x13x15", SPEED: BeeRegistry.SPEED_SLOWER}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Зимняя принцесса",
            en: "Wintry princess"
        },
        drone: {
            ru: "Зимний трутень",
            en: "Wintry drone"
        },
        queen: {
            ru: "Зимняя королева",
            en: "Wintry queen"
        }
    },
    species: "Wintry",
    produce: [[ItemID.combFrozen, 0, 0.3]],
    climate: BiomeHelper.CLIMATE_ICY,
    chromosomes: {
        EFFECT: BeeEffects.EFFECT_FREEZING,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_UP_1,
        SPEED: BeeRegistry.SPEED_SLOWER,
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT,
        FERTILITY: 4
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Императорская принцесса",
            en: "Imperial princess"
        },
        drone: {
            ru: "Императорский трутень",
            en: "Imperial drone"
        },
        queen: {
            ru: "Императорская королева",
            en: "Imperial queen"
        }
    },
    species: "Imperial",
    produce: [[ItemID.combDripping, 0, 0.2], [ItemID.royalJelly, 0, 0.15]],
    mutations: [
        {
            species1: "Noble",
            species2: "Majestic",
            chance: 0.08
        }
    ],
    chromosomes: {SPEED: BeeRegistry.SPEED_SLOWER, EFFECT: BeeEffects.EFFECT_BEATIFIC}
});