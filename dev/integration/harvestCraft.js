ModAPI.addAPICallback("HarvestAPI", function () {
    let list = [
        {
            //berries
            juiceAmount: 0.008,
            list: [
                "cranberry",
                "blackberry",
                "blueberry",
                "raspberry",
                "strawberry"
            ]
        },
        {
            //fruits
            juiceAmount: 0.2,
            list: [
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
            list: [
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
            list: [
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
        }
    ];

    let plants = [];

    for (let i in list) {
        let listItem = list[i];

        for (let k in listItem.list) {
            let crop = listItem.list[k];

            SqueezerManager.registerRecipe({
                input: [
                    {
                        id: ItemID[crop]
                    }
                ],
                liquid: "appleJuice",
                liquidAmount: listItem.juiceAmount
            });

            if (ItemID[crop + "_seed"]) {
                SqueezerManager.registerRecipe({
                    input: [
                        {
                            id: ItemID[crop + "_seed"]
                        }
                    ],
                    liquid: "seedOil",
                    liquidAmount: 0.01
                });
            }

            plants.push(crop);
        }
    }

    let grains = [
        "barley",
        "oats",
        "rye"
    ];

    for (let i in grains) {
        let grain = grains[i];

        MoistenerManager.registerFuel({
            inputItem: {
                id: ItemID[grain]
            },
            outputItem: {
                id: ItemID.mouldyWheat
            },
            time: 300
        });

        MoistenerManager.registerFuel({
            inputItem: {
                id: ItemID[grain + "_seed"]
            },
            outputItem: {
                id: 110
            },
            time: 5000
        });

        SqueezerManager.registerRecipe({
            input: [
                {
                    id: ItemID[grain + "_seed"]
                }
            ],
            liquid: "seedOil",
            liquidAmount: 0.01
        });

        plants.push(grain);
    }

    let nuts = [
        {
            seedOilAmount: 0.12,
            list: [
                "cropnut"
            ]
        },
        {
            seedOilAmount: 0.15,
            list: [
                "almond",
                "cashew",
                "cherry"
            ]
        }
    ];

    for (let i in nuts) {
        let listItem = nuts[i];
        for (let k in listItem) {
            let nut = listItem[k];
            SqueezerManager.registerRecipe({
                input: [
                    {
                        id: ItemID[nut]
                    }
                ],
                liquid: "seedOil",
                time: 20,
                liquidAmount: listItem.seedOilAmount
            });

            if (ItemID[nut + "_seed"]) {
                SqueezerManager.registerRecipe({
                    input: [
                        {
                            id: ItemID[nut + "_seed"]
                        }
                    ],
                    liquid: "seedOil",
                    time: 20,
                    liquidAmount: 0.01
                });
            }
        }
    }

    for (let i in plants) {
        FermenterManager.addRecipe({
            id: ItemID[plants[i]],
            liquidAmount: 0.5,
            liquid: "biomass"
        });
    }

    log("HC Integration Activated", "INFO")
});