const moistenerGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: "Moistener"
            }
        },
        inventory: {
            standart: true
        },
        background: {
            standart: true
        }
    },
    drawing: [
        {type: "bitmap", x: 418, y: 90, bitmap: "forestry.for.moistener.bg", scale: 3.2},
        {type: "bitmap", x: 335, y: 90, bitmap: "forestry.bgs.liquid_1", scale: 3.2}

    ],
    elements: {
        "liquidScale": {
            type: "scale",
            x: 339,
            y: 94,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 655,
            y: 215,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.moistener.arrow_0",
            scale: 3.2
        },
        "progressScale2": {
            type: "scale",
            x: 656,
            y: 99,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.moistener.arrow_1",
            scale: 3.2
        },
        "progressScale3": {
            type: "scale",
            x: 745,
            y: 160,
            value: 0,
            bitmap: "forestry.for.moistener.arrow_2",
            scale: 3.2
        },

        "slotOutput_00": {type: "slot", x: 469, y: 90, size: 59},
        "slotOutput_01": {type: "slot", x: 529, y: 90, size: 59},
        "slotOutput_02": {type: "slot", x: 589, y: 90, size: 59},
        "slotOutput_03": {type: "slot", x: 469, y: 150, size: 59},
        "slotOutput_04": {type: "slot", x: 529, y: 150, size: 59},
        "slotOutput_05": {type: "slot", x: 589, y: 150, size: 59},

        "slotOutput_10": {type: "slot", x: 469, y: 224, size: 59},
        "slotOutput_11": {type: "slot", x: 529, y: 224, size: 59},
        "slotOutput_12": {type: "slot", x: 589, y: 224, size: 59},

        "slotOutput_20": {type: "slot", x: 681, y: 157, size: 59},

        "slotContainer": {type: "slot", x: 402, y: 102, size: 59, bitmap: "forestry.slots.liquid"},
        "slotEmptyContainer": {type: "slot", x: 402, y: 218, size: 59, bitmap: "forestry.slots.container"},

        "slotRecipe": {type: "slot", x: 799, y: 99, size: 59},
        "slotResult": {type: "slot", x: 799, y: 214, size: 59}
    }
});
MachineRegistry.addUiTitleTranslation(moistenerGUI);