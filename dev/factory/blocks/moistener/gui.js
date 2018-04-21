var moistenerGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: Translation.translate("Moistener")
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
        {type: "bitmap", x: 335, y: 90, bitmap: "moistener_background", scale: 3.2},
    ],
    elements: {
        "liquidScale": {
            type: "scale",
            x: 339,
            y: 94,
            direction: 1,
            value: 0,
            bitmap: "liquid_background_2",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 645,
            y: 215,
            direction: 1,
            value: 0,
            bitmap: "moistener_arrow_0",
            scale: 3.2
        },
        "progressScale2": {
            type: "scale",
            x: 646,
            y: 99,
            direction: 1,
            value: 0,
            bitmap: "moistener_arrow_1",
            scale: 3.2
        },
        "progressScale3": {type: "scale", x: 735, y: 160, value: 0, bitmap: "moistener_arrow_2", scale: 3.2},

        "slotOutput_t0": {type: "slot", x: 459, y: 90, size: 59},
        "slotOutput_t1": {type: "slot", x: 519, y: 90, size: 59},
        "slotOutput_t2": {type: "slot", x: 579, y: 90, size: 59},
        "slotOutput_t3": {type: "slot", x: 459, y: 150, size: 59},
        "slotOutput_t4": {type: "slot", x: 519, y: 150, size: 59},
        "slotOutput_t5": {type: "slot", x: 579, y: 150, size: 59},

        "slotOutput_b0": {type: "slot", x: 459, y: 224, size: 59},
        "slotOutput_b1": {type: "slot", x: 519, y: 224, size: 59},
        "slotOutput_b2": {type: "slot", x: 579, y: 224, size: 59},

        "slotContainer": {type: "slot", x: 395, y: 102, size: 59, bitmap: "slot_liquid"},
        "slotEmptyContainer": {type: "slot", x: 395, y: 218, size: 59, bitmap: "slot_container"},

        "slotProcessing": {type: "slot", x: 671, y: 157, size: 59},
        "slotRecipe": {type: "slot", x: 789, y: 99, size: 59},
        "slotResult": {type: "slot", x: 789, y: 214, size: 59}
    }
});