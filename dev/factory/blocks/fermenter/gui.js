const fermenterGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: "Fermenter"
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
        {type: "bitmap", x: 385, y: 122, bitmap: "fermenter_background", scale: 3.2},
    ],
    elements: {
        "progressEnergyScale": {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            value: 0,
            bitmap: "forestry_energy_bar",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 532.2,
            y: 166.8,
            direction: 1,
            value: 0,
            bitmap: "fermenter_scale_0",
            scale: 3.2
        },
        "reagentScale": {
            type: "scale",
            x: 609,
            y: 211.6,
            direction: 1,
            value: 0,
            bitmap: "fermenter_scale_1",
            scale: 3.2
        },

        "liquidInputScale": {
            type: "scale",
            x: 455.4,
            y: 125.2,
            direction: 1,
            value: 0,
            bitmap: "liquid_background_2",
            scale: 3.2
        },
        "liquidOutputScale": {
            type: "scale",
            x: 647.4,
            y: 125.2,
            direction: 1,
            value: 0,
            bitmap: "liquid_background_2",
            scale: 3.2
        },

        "slotInputContainer": {type: "slot", x: 385, y: 186, bitmap: "slot_liquid"},
        "slotPlant": {type: "slot", x: 567.4, y: 138, bitmap: "slot_gray", size: 51.2},
        "slotReagent": {type: "slot", x: 535.4, y: 246.8, bitmap: "slot_gray", size: 51.2},
        "slotContainer": {type: "slot", x: 711.4, y: 131, bitmap: "slot_container"},
        "slotFilledContainer": {type: "slot", x: 711.4, y: 246.8},
    }
});