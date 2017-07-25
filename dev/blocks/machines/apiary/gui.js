var apiaryGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: Translation.translate("Apiary")
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
        {type: "bitmap", x: 335, y: 90, bitmap: "apiary_parents", scale: 3.2},
        {type: "bitmap", x: 462, y: 50, bitmap: "apiary_output", scale: 3.2}
    ],
    elements: {
        "progressScale": {
            type: "scale",
            x: 351,
            y: 109,
            direction: 1,
            value: 0,
            invert: true,
            bitmap: "apiary_scale_green",
            scale: 3.2
        },

        "slot1": {type: "slot", x: 370, y: 106, size: 70.4, bitmap: "apiary_slot"},
        "slot2": {type: "slot", x: 370, y: 189.2, size: 70.4, bitmap: "apiary_slot"},

        "slotProduct0": {type: "slot", x: 628.4, y: 64, size: 70.4, bitmap: "apiary_slot"},
        "slotProduct1": {type: "slot", x: 561.2, y: 107.6, size: 70.4, bitmap: "apiary_slot"},
        "slotProduct2": {type: "slot", x: 695.2, y: 107.6, size: 70.4, bitmap: "apiary_slot"},
        "slotProduct3": {type: "slot", x: 628.2, y: 149.2, size: 70.4, bitmap: "apiary_slot"},
        "slotProduct4": {type: "slot", x: 561.2, y: 190.8, size: 70.4, bitmap: "apiary_slot"},
        "slotProduct5": {type: "slot", x: 628.4, y: 232.4, size: 70.4, bitmap: "apiary_slot"},
        "slotProduct6": {type: "slot", x: 695.6, y: 190.8, size: 70.4, bitmap: "apiary_slot"},

        "slotFrame0": {type: "slot", x: 478, y: 66, size: 51, bitmap: "slot_gray"},
        "slotFrame1": {type: "slot", x: 478, y: 159, size: 51, bitmap: "slot_gray"},
        "slotFrame2": {type: "slot", x: 478, y: 252, size: 51, bitmap: "slot_gray"},
    }
});