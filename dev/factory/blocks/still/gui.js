var stillGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: Translation.translate("Still")
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
        {type: "bitmap", x: 385, y: 110, bitmap: "still_background", scale: 3.2}
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
        "progressScale": {type: "scale", x: 625, y: 119.6, direction: 1, value: 0, bitmap: "still_scale", scale: 3.2},
        "liquidInputScale": {
            type: "scale",
            x: 467,
            y: 114,
            direction: 1,
            value: 0,
            bitmap: "liqued_background_2",
            scale: 3.2
        },
        "liquidOutputScale": {
            type: "scale",
            x: 755,
            y: 114,
            direction: 1,
            value: 0,
            bitmap: "liqued_background_2",
            scale: 3.2
        },

        "slotInputContainer": {type: "slot", x: 385, y: 165, bitmap: "slot_liquid"},

        "slotOutputContainer": {type: "slot", x: 833, y: 119.6, bitmap: "slot_container"},
        "slotOutputContainerFilled": {type: "slot", x: 833, y: 234.8, bitmap: "slot_liquid"},

    }
});