BeeRegistry.registerBee({
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
    species: "Forest",
    produce: [[ItemID.combHoney, 0, 0.3]],
    chromosomes: {FERTILITY: 3}
});

BeeRegistry.registerBee({
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
    species: "Hermitic",
    hasGlint: true,
    produce: [[ItemID.combMellow, 0, 0.2]],
    flowers: BeeRegistry.FLOWERS_WHEAT,
    chromosomes: {HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1}
});

BeeRegistry.registerBee({
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
    species: "Marshy",
    produce: [[ItemID.combMossy, 0, 0.3]],
    humidity: Humidity.DAMP,
    flowers: BeeRegistry.FLOWERS_MUSHROOMS,
    chromosomes: {},
});

BeeRegistry.registerBee({
    species: "Meadows",
    produce: [[ItemID.combHoney, 0, 0.3]],
    chromosomes: {}
});

BeeRegistry.registerBee({
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
    species: "Monastic",
    produce: [[ItemID.combWheaten, 0, 0.3], [ItemID.combMellow, 0, 0.1]],
    specialty: [[ItemID.combMellow, 0, 0.1]],
    flowers: BeeRegistry.FLOWERS_WHEAT,
    chromosomes: {HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1}
});

BeeRegistry.registerBee({
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
    species: "Phantasmal",
    hasGlint: true,
    produce: [[ItemID.combMysterious, 0, 0.4]],
    climate: Temperature.COLD,
    flowers: BeeRegistry.FLOWERS_ENDS,
    chromosomes: {TERRITORY: "11x8x11", SPEED: BeeRegistry.SPEED_SLOWEST, LIFESPAN: BeeRegistry.LIFESPAN_LONGEST}
});

BeeRegistry.registerBee({
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
    species: "Secluded",
    produce: [[ItemID.combMellow, 0, 0.2]],
    flowers: BeeRegistry.FLOWERS_WHEAT,
    chromosomes: {HUMIDITY_TOLERANCE: BeeRegistry.TOLERANCE_BOTH_1, TEMPERATURE_TOLERANCE: BeeRegistry.TOLERANCE_DOWN_1}
});

BeeRegistry.registerBee({
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
    species: "Spectral",
    produce: [[ItemID.combMysterious, 0, 0.5]],
    climate: Temperature.COLD,
    flowers: BeeRegistry.FLOWERS_ENDS,
    chromosomes: {TERRITORY: "11x8x11", SPEED: BeeRegistry.SPEED_SLOWER, EFFECT: "aggress"}
});

BeeRegistry.registerBee({
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
    species: "Vengeful",
    produce: [[ItemID.combIrradiated, 0, 0.4]],
    chromosomes: {EFFECT: "radiactive", TERRITORY: "15x13x15", LIFESPAN: BeeRegistry.LIFESPAN_LONGER}
});

BeeRegistry.registerBee({
    species: "Vindictive",
    produce: [[ItemID.combIrradiated, 0, 0.25]],
    chromosomes: {EFFECT: "radiactive", TERRITORY: "15x13x15", SPEED: BeeRegistry.SPEED_SLOWER}
});

BeeRegistry.registerBee({
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