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
        {type: "bitmap", x: 335, y: 90, bitmap: "forestry.for.apiary.bg_left", scale: 3.2},
        {type: "bitmap", x: 462, y: 50, bitmap: "forestry.for.apiary.bg_right", scale: 3.2}
    ],
    elements: {
        "progressScale": {
            type: "scale",
            x: 351,
            y: 109,
            direction: 1,
            value: 0,
            invert: true,
            bitmap: "forestry.for.apiary.scale_green",
            scale: 3.2
        },

        "slot1": {type: "slot", x: 370, y: 106, size: 70.4, bitmap: "_default_slot_empty", isTransparentBackground: true},
        "slot2": {type: "slot", x: 370, y: 189.2, size: 70.4, bitmap: "_default_slot_empty", isTransparentBackground: true},

        "slotProduct0": {
            type: "slot",
            x: 628.4,
            y: 64,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct1": {
            type: "slot",
            x: 561.2,
            y: 107.6,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct2": {
            type: "slot",
            x: 695.2,
            y: 107.6,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct3": {
            type: "slot",
            x: 628.2,
            y: 149.2,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct4": {
            type: "slot",
            x: 561.2,
            y: 190.8,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct5": {
            type: "slot",
            x: 628.4,
            y: 232.4,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct6": {
            type: "slot",
            x: 695.6,
            y: 190.8,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },

        "slotFrame0": {type: "slot", x: 478, y: 66, size: 51, bitmap: "forestry.slots.gray"},
        "slotFrame1": {type: "slot", x: 478, y: 159, size: 51, bitmap: "forestry.slots.gray"},
        "slotFrame2": {type: "slot", x: 478, y: 252, size: 51, bitmap: "forestry.slots.gray"},
    }
});