ModAPI.addAPICallback("HarvestAPI", () => {
    const juiceValues = [
        {
            //berries
            juiceAmount: 0.008,
            items: [
                "cranberry",
                "blackberry",
                "blueberry",
                "raspberry",
                "strawberry",
            ]
        },
        {
            //fruits
            juiceAmount: 0.2,
            items: [
                "pineapple",
                "cactusfruit",
                "cantaloupe",
                "grape",
                "kiwi",
                "chili_pepper"
            ]
        },
        {
            //Tree Fruits
            juiceAmount: 0.2,
            items: [
                "banana",
                "dragonfruit",
                "lemon",
                "lime",
                "orange",
                "papaya",
                "peach",
                "pear",
                "plum",
                "pomegranate",
                "starfruit",
                "apricot",
                "date",
                "fig",
                "grapefruit",
                "persimmon",
                "avocado",
                "coconut",
            ]
        },
        {
            //Vegetables
            juiceAmount: 0.1,
            items: [
                "asparagus",
                "bean",
                "beet",
                "broccoli",
                "cauliflower",
                "celery",
                "leek",
                "lettuce",
                "onion",
                "parsnip",
                "radish",
                "rutabaga",
                "scallion",
                "soybean",
                "sweetpotato",
                "turnip",
                "artichoke",
                "bellpepper",
                "brusselsprout",
                "cabbage",
                "corn",
                "cucumber",
                "eggplant",
                "okra",
                "peas",
                "rhubarb",
                "tomato",
                "wintersquash",
                "zucchini",
                "bambooshoot",
                "spinach"
            ]
        },
    ];

    const plants = [];

    for (const {items, juiceAmount} of juiceValues) {
        for (const crop in items) {
            SqueezerManager.registerRecipe({
                input: [
                    {id: ItemID[crop]},
                ],
                liquid: "appleJuice",
                liquidAmount: juiceAmount,
            });

            const seedId = ItemID[`${crop}_seed`];
            if (seedId) {
                SqueezerManager.registerRecipe({
                    input: [
                        {id: seedId},
                    ],
                    liquid: "seedOil",
                    liquidAmount: 0.01,
                });
            }

            plants.push(crop);
        }
    }

    const grains = [
        "barley",
        "oats",
        "rye"
    ];

    for (let grain of grains) {
        const seedId = ItemID[grain + "_seed"];

        MoistenerManager.registerFuel({
            inputItem: {
                id: ItemID[grain],
            },
            outputItem: {
                id: ItemID.mouldyWheat,
            },
            time: 300,
        });

        MoistenerManager.registerFuel({
            inputItem: {
                id: seedId,
            },
            outputItem: {
                id: 110,
            },
            time: 5000,
        });

        SqueezerManager.registerRecipe({
            input: [
                {id: seedId},
            ],
            liquid: "seedOil",
            liquidAmount: 0.01,
        });

        plants.push(grain);
    }

    const nuts = [
        {
            seedOilAmount: 0.12,
            items: [
                "cropnut",
            ]
        },
        {
            seedOilAmount: 0.15,
            items: [
                "almond",
                "cashew",
                "cherry",
            ]
        }
    ];

    for (const {items, seedOilAmount} of nuts) {
        for (const nut in items) {
            SqueezerManager.registerRecipe({
                input: [
                    {
                        id: ItemID[nut]
                    }
                ],
                liquid: "seedOil",
                time: 20,
                liquidAmount: seedOilAmount
            });

            const seedId = ItemID[`${nut}_seed`];
            if (seedId) {
                SqueezerManager.registerRecipe({
                    input: [
                        {id: seedId},
                    ],
                    liquid: "seedOil",
                    time: 20,
                    liquidAmount: 0.01,
                });
            }
        }
    }

    for (const plant in plants) {
        for (const liquid in fermenterLiquids) {
            FermenterManager.addRecipe({
                id: ItemID[plant],
                inputLiquid: liquid,
                modifier: fermenterLiquids[liquid as keyof typeof fermenterLiquids],
                liquidAmount: 0.5,
                liquid: "biomass",
            });
        }
    }
});