const alvearyGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "forestry.gui.apiary.title"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        {type: "bitmap", x: 335, y: 50, bitmap: "forestry.for.alveary.bg", scale: 3.2}
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

        "slot1": {
            type: "slot",
            x: 370,
            y: 106,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slot2": {
            type: "slot",
            x: 370,
            y: 189.2,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },

        "slotProduct0": {
            type: "slot",
            x: 648.4,
            y: 64,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct1": {
            type: "slot",
            x: 581.2,
            y: 107.6,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct2": {
            type: "slot",
            x: 715.2,
            y: 107.6,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct3": {
            type: "slot",
            x: 648.2,
            y: 149.2,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct4": {
            type: "slot",
            x: 581.2,
            y: 190.8,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct5": {
            type: "slot",
            x: 648.4,
            y: 232.4,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "slotProduct6": {
            type: "slot",
            x: 715.6,
            y: 190.8,
            size: 70.4,
            bitmap: "_default_slot_empty",
            isTransparentBackground: true
        },
        "error": {
            type: "text",
            x: 345,
            y: 320,
            width: 500,
            height: 30,
            text: "",
        },
    }
});
MachineRegistry.addUiTitleTranslation(alvearyGUI);