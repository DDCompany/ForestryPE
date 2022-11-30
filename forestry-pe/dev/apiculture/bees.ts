BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Суровая принцесса",
            en: "Austere princess"
            , zh: "[FR]苦行公主蜂"
        },
        drone: {
            ru: "Суровый трутень",
            en: "Austere drone"
            , zh: "[FR]苦行雄蜂"
        },
        queen: {
            ru: "Суровая королева",
            en: "Austere queen"
            , zh: "[FR]苦行蜂后"
        }
    },
    mutations: [
        {
            species1: "Modest",
            species2: "Frugal",
            chance: 0.08,
            onMutate(house: BeeHouse) {
                const climate = house.getClimate();
                return (climate === Temperature.HOT || climate === Temperature.HELLISH)
                    && house.getHumidity() === Humidity.ARID;
            }
        }
    ],
    species: "Austere",
    hasGlint: true,
    humidity: Humidity.ARID,
    climate: Temperature.HOT,
    flowers: BeeRegistry.FLOWERS_CACTI,
    produce: [[ItemID.combParched, 0, 0.2], [ItemID.combPowdery, 0, 0.5]],
    chromosomes: {
        EFFECT: "creeper",
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_UP_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        NEVER_SLEEPS: true
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Карающая принцесса",
            en: "Avenging princess",
            zh: "[FR]复仇公主蜂"
        },
        drone: {
            ru: "Карающий трутень",
            en: "Avenging drone",
            zh: "[FR]复仇雄蜂"
        },
        queen: {
            ru: "Карающая королева",
            en: "Avenging queen",
            zh: "[FR]复仇蜂后"
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
    hastGlint: true,
    produce: [[ItemID.combIrradiated, 0, 0.4]],
    chromosomes: {EFFECT: "radiactive", TERRITORY: "15x13x15", LIFESPAN: BeeRegistry.LIFESPAN_LONGEST}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Обычная принцесса",
            en: "Common princess", zh: "[FR]寻常公主蜂"
        },
        drone: {
            ru: "Обычный трутень",
            en: "Common drone", zh: "[FR]寻常雄蜂"
        },
        queen: {
            ru: "Обычная королева",
            en: "Common queen", zh: "[FR]寻常蜂后"
        }
    },
    species: "Common",
    produce: [[ItemID.combHoney, 0, 0.35]],
    chromosomes: {LIFESPAN: BeeRegistry.LIFESPAN_SHORTER}
});

let mut1 = ["Forest", "Meadows", "Modest", "Tropical", "Wintry", "Marshy"];

for (let key in mut1) {
    for (let key2 in mut1) {
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
            en: "Cultivated princess",
            zh: "[FR]田野公主蜂"
        },
        drone: {
            ru: "Культивируемый трутень",
            en: "Cultivated drone",
            zh: "[FR]田野雄蜂"
        },
        queen: {
            ru: "Культивируемая королева",
            en: "Cultivated queen",
            zh: "[FR]田野蜂后"
        }
    },
    species: "Cultivated",
    produce: [[ItemID.combHoney, 0, 0.4]],
    chromosomes: {LIFESPAN: BeeRegistry.LIFESPAN_SHORTEST, TOLERATES_RAIN: true}
});

for (let key in mut1) {
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
            en: "Demonic princess",
            zh: "[FR]恶魔公主蜂"
        },
        drone: {
            ru: "Демонический трутень",
            en: "Demonic drone",
            zh: "[FR]恶魔雄蜂"
        },
        queen: {
            ru: "Демоническая королева",
            en: "Demonic queen",
            zh: "[FR]恶魔蜂后"
        }
    },
    species: "Demonic",
    hasGlint: true,
    produce: [[ItemID.combSimmering, 0, 0.45], [348, 0, 0.15]],
    humidity: Humidity.ARID,
    climate: Temperature.HELLISH,
    flowers: BeeRegistry.FLOWERS_NETHER,
    mutations: [
        {
            species1: "Sinister",
            species2: "Fiendish",
            chance: 0.25,
            onMutate(house: BeeHouse) {
                return house.getClimate() === Temperature.HELLISH;
            }
        }
    ],
    chromosomes: {
        NEVER_SLEEPS: true,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        EFFECT: "ignition",
        LIFESPAN: BeeRegistry.LIFESPAN_LONGER,
        TOLERATES_RAIN: true,
        SPEED: BeeRegistry.SPEED_SLOWER
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Добросовестная принцесса",
            en: "Diligent princess",
            zh: "[FR]勤奋公主蜂"
        },
        drone: {
            ru: "Добросовестный трутень",
            en: "Diligent drone",
            zh: "[FR]勤奋雄蜂"
        },
        queen: {
            ru: "Добросовестная королева",
            en: "Diligent queen",
            zh: "[FR]勤奋蜂后"
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
            en: "Edenic princess",
            zh: "[FR]伊甸公主蜂"
        },
        drone: {
            ru: "Райский трутень",
            en: "Edenic drone",
            zh: "[FR]伊甸雄蜂"
        },
        queen: {
            ru: "Райская королева",
            en: "Edenic queen",
            zh: "[FR]伊甸蜂后"
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
    hasGlint: true,
    humidity: Humidity.DAMP,
    climate: Temperature.WARM,
    flowers: BeeRegistry.FLOWERS_JUNGLE,
    chromosomes: {
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1,
        SPEED: BeeRegistry.SPEED_SLOWEST,
        LIFESPAN: BeeRegistry.LIFESPAN_LONGER,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_2,
        EFFECT: "exploration"
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Принцесса края",
            en: "Ender princess",
            zh: "[FR]末影公主蜂"
        },
        drone: {
            ru: "Трутень края",
            en: "Ender drone",
            zh: "[FR]末影雄蜂"
        },
        queen: {
            ru: "Королева края",
            en: "Ender queen",
            zh: "[FR]末影蜂后"
        }
    },
    species: "Ender",
    produce: [[ItemID.combMysterious, 0, 0.3]],
    climate: Temperature.COLD,
    flowers: BeeRegistry.FLOWERS_ENDS,
    chromosomes: {
        EFFECT: "misanthrope",
        TERRITORY: "11x8x11",
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_UP_1
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Экзотическая принцесса",
            en: "Exotic princess",
            zh: "[FR]异国公主蜂"
        },
        drone: {
            ru: "Экзотический трутень",
            en: "Exotic drone",
            zh: "[FR]异国雄蜂"
        },
        queen: {
            ru: "Экзотическая королева",
            en: "Exotic queen",
            zh: "[FR]异国蜂后"
        }
    },
    species: "Exotic",
    produce: [[ItemID.combSilky, 0, 0.3]],
    climate: Temperature.WARM,
    humidity: Humidity.DAMP,
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
            en: "Fiendish princess",
            zh: "[FR]残忍公主蜂"
        },
        drone: {
            ru: "Дьявольский трутень",
            en: "Fiendish drone",
            zh: "[FR]残忍雄蜂"
        },
        queen: {
            ru: "Дьявольская королева",
            en: "Fiendish queen",
            zh: "[FR]残忍蜂后"
        }
    },
    species: "Fiendish",
    produce: [[ItemID.combSimmering, 0, 0.55], [ItemID.ash, 0, 0.15]],
    climate: Temperature.HELLISH,
    humidity: Humidity.ARID,
    flowers: BeeRegistry.FLOWERS_NETHER,
    mutations: [
        {
            species1: "Modest",
            species2: "Sinister",
            chance: 0.4,
            onMutate(house: BeeHouse) {
                return house.getClimate() === Temperature.HELLISH;
            }
        },
        {
            species1: "Tropical",
            species2: "Sinister",
            chance: 0.4,
            onMutate(house: BeeHouse) {
                return house.getClimate() === Temperature.HELLISH;
            }
        },
        {
            species1: "Cultivated",
            species2: "Sinister",
            chance: 0.4,
            onMutate(house: BeeHouse) {
                return house.getClimate() === Temperature.HELLISH;
            }
        }
    ],
    chromosomes: {
        NEVER_SLEEPS: true,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        LIFESPAN: BeeRegistry.LIFESPAN_LONG,
        EFFECT: "aggress"
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Лесная принцесса",
            en: "Forest princess",
            zh: "[FR]森林公主蜂"
        },
        drone: {
            ru: "Лесной трутень",
            en: "Forest drone",
            zh: "[FR]森林雄蜂"
        },
        queen: {
            ru: "Лесная королева",
            en: "Forest queen",
            zh: "[FR]森林蜂后"
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
            en: "Frugal princess",
            zh: "[FR]节俭公主蜂"
        },
        drone: {
            ru: "Умеренный трутень",
            en: "Frugal drone",
            zh: "[FR]节俭雄蜂"
        },
        queen: {
            ru: "Умеренная королева",
            en: "Frugal queen",
            zh: "[FR]节俭蜂后"
        }
    },
    species: "Frugal",
    produce: [[ItemID.combParched, 0, 0.3]],
    climate: Temperature.HOT,
    humidity: Humidity.ARID,
    flowers: BeeRegistry.FLOWERS_CACTI,
    mutations: [
        {
            species1: "Modest",
            species2: "Sinister",
            chance: 0.16,
            onMutate(house: BeeHouse) {
                return house.getClimate() === Temperature.HOT;
            }
        },
        {
            species1: "Modest",
            species2: "Fiendish",
            chance: 0.1,
            onMutate(house: BeeHouse) {
                return house.getClimate() === Temperature.HOT;
            }
        }
    ],
    chromosomes: {TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1, LIFESPAN: BeeRegistry.LIFESPAN_LONG}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Ледниковая принцесса",
            en: "Glacial princess",
            zh: "[FR]冰河公主蜂"
        },
        drone: {
            ru: "Ледниковый трутень",
            en: "Glacial drone",
            zh: "[FR]冰河雄蜂"
        },
        queen: {
            ru: "Ледниковая королева",
            en: "Glacial queen",
            zh: "[FR]冰河蜂后"
        }
    },
    species: "Glacial",
    hasGlint: true,
    produce: [[ItemID.combFrozen, 0, 0.2], [ItemID.iceShard, 0, 0.4]],
    climate: Temperature.ICY,
    mutations: [
        {
            species1: "Wintry",
            species2: "Icy",
            chance: 0.08
        }
    ],
    chromosomes: {
        EFFECT: "glacial",
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT,
        SPEED: BeeRegistry.SPEED_SLOWER
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Отшельническая принцесса",
            en: "Hermitic princess",
            zh: "[FR]遁世公主蜂"
        },
        drone: {
            ru: "Отшельнический трутень",
            en: "Hermitic drone",
            zh: "[FR]遁世雄蜂"
        },
        queen: {
            ru: "Отшельническая королева",
            en: "Hermitic queen",
            zh: "[FR]遁世蜂后"
        }
    },
    species: "Hermitic",
    hasGlint: true,
    produce: [[ItemID.combMellow, 0, 0.2]],
    flowers: BeeRegistry.FLOWERS_WHEAT,
    chromosomes: {HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Ледяная принцесса",
            en: "Icy princess",
            zh: "[FR]严寒公主蜂"
        },
        drone: {
            ru: "Ледяной трутень",
            en: "Icy drone",
            zh: "[FR]严寒雄蜂"
        },
        queen: {
            ru: "Ледяная королева",
            en: "Icy queen",
            zh: "[FR]严寒蜂后"
        }
    },
    species: "Icy",
    produce: [[ItemID.combFrozen, 0, 0.2], [ItemID.iceShard, 0, 0.2]],
    climate: Temperature.ICY,
    mutations: [
        {
            species1: "Industrious",
            species2: "Wintry",
            chance: 0.12
        }
    ],
    chromosomes: {
        EFFECT: "glacial",
        SPEED: BeeRegistry.SPEED_SLOW,
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Трудолюбивая принцесса",
            en: "Industrious princess",
            zh: "[FR]敬业公主蜂"
        },
        drone: {
            ru: "Трудолюбивый трутень",
            en: "Industrious drone",
            zh: "[FR]敬业雄蜂"
        },
        queen: {
            ru: "Трудолюбивая королева",
            en: "Industrious queen",
            zh: "[FR]敬业蜂后"
        }
    },
    species: "Industrious",
    hasGlint: true,
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
            en: "Leporine princess",
            zh: "[FR]狂野公主蜂"
        },
        drone: {
            ru: "Заячий трутень",
            en: "Leporine drone",
            zh: "[FR]狂野雄蜂"
        },
        queen: {
            ru: "Заячья королева",
            en: "Leporine queen",
            zh: "[FR]狂野蜂后"
        }
    },
    species: "Leporine",
    hasGlint: true,
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
            en: "Majestic princess",
            zh: "[FR]庄严公主蜂"
        },
        drone: {
            ru: "Величественный трутень",
            en: "Majestic drone",
            zh: "[FR]庄严雄蜂"
        },
        queen: {
            ru: "Величественная королева",
            en: "Majestic queen",
            zh: "[FR]庄严蜂后"
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
            en: "Marshy princess",
            zh: "[FR]沼泽公主蜂"
        },
        drone: {
            ru: "Болотный трутень",
            en: "Marshy drone",
            zh: "[FR]沼泽雄蜂"
        },
        queen: {
            ru: "Болотная королева",
            en: "Marshy queen",
            zh: "[FR]沼泽蜂后"
        }
    },
    species: "Marshy",
    produce: [[ItemID.combMossy, 0, 0.3]],
    humidity: Humidity.DAMP,
    flowers: BeeRegistry.FLOWERS_MUSHROOMS,
    chromosomes: {},
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Луговая принцесса",
            en: "Meadows princess",
            zh: "[FR]草原公主蜂"
        },
        drone: {
            ru: "Луговой трутень",
            en: "Meadows drone",
            zh: "[FR]草原雄蜂"
        },
        queen: {
            ru: "Луговая королева",
            en: "Meadows queen",
            zh: "[FR]草原蜂后"
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
            en: "Merry princess",
            zh: "[FR]欢乐公主蜂"
        },
        drone: {
            ru: "Веселенький трутень",
            en: "Merry drone",
            zh: "[FR]欢乐雄蜂"
        },
        queen: {
            ru: "Веселенькая королева",
            en: "Merry queen",
            zh: "[FR]欢乐蜂后"
        }
    },
    species: "Merry",
    hasGlint: true,
    produce: [[ItemID.combFrozen, 0, 0.3], [ItemID.iceShard, 0, 0.2]],
    climate: Temperature.ICY,
    chromosomes: {
        EFFECT: "glacial",
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        NEVER_SLEEPS: true
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Скромная принцесса",
            en: "Modest princess",
            zh: "[FR]温和公主蜂"
        },
        drone: {
            ru: "Скромный трутень",
            en: "Modest drone",
            zh: "[FR]温和雄蜂"
        },
        queen: {
            ru: "Скромная королева",
            en: "Modest queen",
            zh: "[FR]温和蜂后"
        }
    },
    species: "Modest",
    produce: [[ItemID.combParched, 0, 0.2]],
    climate: Temperature.HOT,
    humidity: Humidity.ARID,
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
            en: "Monastic princess",
            zh: "[FR]僧侣公主蜂"
        },
        drone: {
            ru: "Монашеский трутень",
            en: "Monastic drone",
            zh: "[FR]僧侣雄蜂"
        },
        queen: {
            ru: "Монашеская королева",
            en: "Monastic queen",
            zh: "[FR]僧侣蜂后"
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
            en: "Noble princess",
            zh: "[FR]高尚公主蜂"
        },
        drone: {
            ru: "Благородный трутень",
            en: "Noble drone",
            zh: "[FR]高尚雄蜂"
        },
        queen: {
            ru: "Благородная королева",
            en: "Noble queen",
            zh: "[FR]高尚蜂后"
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
            en: "Phantasmal princess",
            zh: "[FR]幻影公主蜂"
        },
        drone: {
            ru: "Призрачный трутень",
            en: "Phantasmal drone",
            zh: "[FR]幻影雄蜂"
        },
        queen: {
            ru: "Призрачная королева",
            en: "Phantasmal queen",
            zh: "[FR]幻影蜂后"
        }
    },
    species: "Phantasmal",
    hasGlint: true,
    produce: [[ItemID.combMysterious, 0, 0.4]],
    climate: Temperature.COLD,
    flowers: BeeRegistry.FLOWERS_ENDS,
    chromosomes: {TERRITORY: "11x8x11", SPEED: BeeRegistry.SPEED_SLOWEST, LIFESPAN: BeeRegistry.LIFESPAN_LONGEST}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Сельская принцесса",
            en: "Rural princess",
            zh: "[FR]田园公主蜂"
        },
        drone: {
            ru: "Сельский трутень",
            en: "Rural drone",
            zh: "[FR]田园雄蜂"
        },
        queen: {
            ru: "Сельская королева",
            en: "Rural queen",
            zh: "[FR]田园蜂后"
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
            en: "Secluded princess",
            zh: "[FR]归隐公主蜂"
        },
        drone: {
            ru: "Укромный трутень",
            en: "Secluded drone",
            zh: "[FR]归隐雄蜂"
        },
        queen: {
            ru: "Укромная королева",
            en: "Secluded queen",
            zh: "[FR]归隐蜂后"
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
            en: "Sinister princess",
            zh: "[FR]邪恶公主蜂"
        },
        drone: {
            ru: "Зловещий трутень",
            en: "Sinister drone",
            zh: "[FR]邪恶雄蜂"
        },
        queen: {
            ru: "Зловещая королева",
            en: "Sinister queen",
            zh: "[FR]邪恶蜂后"
        }
    },
    species: "Sinister",
    produce: [[ItemID.combSimmering, 0, 0.45]],
    climate: Temperature.HELLISH,
    humidity: Humidity.ARID,
    flowers: BeeRegistry.FLOWERS_NETHER,
    mutations: [
        {
            species1: "Modest",
            species2: "Cultivated",
            chance: 0.6,
            onMutate(house: BeeHouse) {
                return house.getClimate() === Temperature.HELLISH;
            }
        },
        {
            species1: "Tropical",
            species2: "Cultivated",
            chance: 0.6,
            onMutate(house: BeeHouse) {
                return house.getClimate() === Temperature.HELLISH;
            }
        }
    ],
    chromosomes: {
        NEVER_SLEEPS: true,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        SPEED: BeeRegistry.SPEED_SLOWER,
        EFFECT: "aggress"
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Спектральная принцесса",
            en: "Spectral princess",
            zh: "[FR]幽灵公主蜂"
        },
        drone: {
            ru: "Спектральный трутень",
            en: "Spectral drone",
            zh: "[FR]幽灵雄蜂"
        },
        queen: {
            ru: "Спектральная королева",
            en: "Spectral queen",
            zh: "[FR]幽灵蜂后"
        }
    },
    species: "Spectral",
    produce: [[ItemID.combMysterious, 0, 0.5]],
    climate: Temperature.COLD,
    flowers: BeeRegistry.FLOWERS_ENDS,
    chromosomes: {TERRITORY: "11x8x11", SPEED: BeeRegistry.SPEED_SLOWER, EFFECT: "aggress"}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Пьяная принцесса",
            en: "Tipsy princess",
            zh: "[FR]醉酒公主蜂"
        },
        drone: {
            ru: "Пьяный трутень",
            en: "Tipsy drone",
            zh: "[FR]醉酒雄蜂"
        },
        queen: {
            ru: "Пьяная королева",
            en: "Tipsy queen",
            zh: "[FR]醉酒蜂后"
        }
    },
    species: "Tipsy",
    hasGlint: true,
    produce: [[ItemID.combFrozen, 0, 0.3], [ItemID.iceShard, 0, 0.2]],
    climate: Temperature.ICY,
    chromosomes: {
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_2,
        NEVER_SLEEPS: true,
        EFFECT: "drunkard"
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Тропическая принцесса",
            en: "Tropical princess",
            zh: "[FR]热带公主蜂"
        },
        drone: {
            ru: "Тропический трутень",
            en: "Tropical drone",
            zh: "[FR]热带雄蜂"
        },
        queen: {
            ru: "Тропическая королева",
            en: "Tropical queen",
            zh: "[FR]热带蜂后"
        }
    },
    species: "Tropical",
    produce: [[ItemID.combSilky, 0, 0.2]],
    climate: Temperature.WARM,
    humidity: Humidity.DAMP,
    flowers: BeeRegistry.FLOWERS_JUNGLE,
    chromosomes: {
        HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_UP_1,
        TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_UP_1,
        SPEED: BeeRegistry.SPEED_SLOWER,
        LIFESPAN: BeeRegistry.LIFESPAN_SHORT
    }
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Неутомимая принцесса",
            en: "Unweary princess",
            zh: "[FR]不倦公主蜂"
        },
        drone: {
            ru: "Неутомимый трутень",
            en: "Unweary drone",
            zh: "[FR]不倦雄蜂"
        },
        queen: {
            ru: "Неутомимая королева",
            en: "Unweary queen",
            zh: "[FR]不倦蜂后"
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
            en: "Valiant princess",
            zh: "[FR]勇者公主蜂"
        },
        drone: {
            ru: "Доблестный трутень",
            en: "Valiant drone",
            zh: "[FR]勇者雄蜂"
        },
        queen: {
            ru: "Доблестная королева",
            en: "Valiant queen",
            zh: "[FR]勇者蜂后"
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
            en: "Vengeful princess",
            zh: "[FR]报仇公主蜂"
        },
        drone: {
            ru: "Мстительный трутень",
            en: "Vengeful drone",
            zh: "[FR]报仇雄蜂"
        },
        queen: {
            ru: "Мстительная королева",
            en: "Vengeful queen",
            zh: "[FR]报仇蜂后"
        }
    },
    species: "Vengeful",
    produce: [[ItemID.combIrradiated, 0, 0.4]],
    chromosomes: {EFFECT: "radiactive", TERRITORY: "15x13x15", LIFESPAN: BeeRegistry.LIFESPAN_LONGER}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Злопамятная принцесса",
            en: "Vindictive princess",
            zh: "[FR]记恨公主蜂"
        },
        drone: {
            ru: "Злопамятный трутень",
            en: "Vindictive drone",
            zh: "[FR]记恨雄蜂"
        },
        queen: {
            ru: "Злопамятная королева",
            en: "Vindictive queen",
            zh: "[FR]记恨蜂后"
        }
    },
    species: "Vindictive",
    produce: [[ItemID.combIrradiated, 0, 0.25]],
    chromosomes: {EFFECT: "radiactive", TERRITORY: "15x13x15", SPEED: BeeRegistry.SPEED_SLOWER}
});

BeeRegistry.registerBee({
    localize: {
        princess: {
            ru: "Зимняя принцесса",
            en: "Wintry princess",
            zh: "[FR]凛冬公主蜂"
        },
        drone: {
            ru: "Зимний трутень",
            en: "Wintry drone",
            zh: "[FR]凛冬雄蜂"
        },
        queen: {
            ru: "Зимняя королева",
            en: "Wintry queen",
            zh: "[FR]凛冬蜂后"
        }
    },
    species: "Wintry",
    produce: [[ItemID.combFrozen, 0, 0.3]],
    climate: Temperature.ICY,
    chromosomes: {
        EFFECT: "glacial",
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
            en: "Imperial princess",
            zh: "[FR]帝皇公主蜂"
        },
        drone: {
            ru: "Императорский трутень",
            en: "Imperial drone",
            zh: "[FR]帝皇雄蜂"
        },
        queen: {
            ru: "Императорская королева",
            en: "Imperial queen",
            zh: "[FR]帝皇蜂后"
        }
    },
    species: "Imperial",
    hasGlint: true,
    produce: [[ItemID.combDripping, 0, 0.2], [ItemID.royalJelly, 0, 0.15]],
    mutations: [
        {
            species1: "Noble",
            species2: "Majestic",
            chance: 0.08
        }
    ],
    chromosomes: {SPEED: BeeRegistry.SPEED_SLOWER, EFFECT: "beatific"}
});