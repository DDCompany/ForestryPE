var centrifugeGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: Translation.translate("Centrifuge")
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
        {type: "bitmap", x: 335, y: 140, bitmap: "forestry_energy_bar_background", scale: 3.2},
        {type: "bitmap", x: 385, y: 120, bitmap: "centrifuge_background", scale: 3.2},
    ],
    elements: {
        "progressScale": {
            type: "scale",
            x: 490,
            y: 177,
            direction: 1,
            value: 0,
            bitmap: "centrifuge_background_scale",
            scale: 3.2
        },
        "progressEnergyScale": {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            value: 0,
            bitmap: "forestry_energy_bar",
            scale: 3.2
        },

        "slotInput": {type: "slot", x: 398, y: 178},

        "slotOutput0": {type: "slot", x: 600, y: 116},
        "slotOutput1": {type: "slot", x: 661, y: 116},
        "slotOutput2": {type: "slot", x: 722, y: 116},
        "slotOutput3": {type: "slot", x: 600, y: 177},
        "slotOutput4": {type: "slot", x: 661, y: 177},
        "slotOutput5": {type: "slot", x: 722, y: 177},
        "slotOutput6": {type: "slot", x: 600, y: 238},
        "slotOutput7": {type: "slot", x: 661, y: 238},
        "slotOutput8": {type: "slot", x: 722, y: 238}
    }
});