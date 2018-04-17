var alvearyHygroregulatorGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: Translation.translate("Alveary Hygroregulator")
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
        {type: "bitmap", x: 335, y: 40, bitmap: "liquid_background", scale: 3.2},
    ],
    elements: {
        "liquidScale": {
            type: "scale",
            x: 338.2,
            y: 43.2,
            direction: 1,
            value: 0,
            bitmap: "liqued_background_2",
            scale: 3.2
        },
        "slotLiquid": {type: "slot", x: 400, y: 65, bitmap: "slot_liquid"},
        "slotContainer": {type: "slot", x: 400, y: 150, bitmap: "slot_container"}
    }
});