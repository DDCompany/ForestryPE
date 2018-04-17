var squeezerGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: Translation.translate("Squeezer")
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
        {type: "bitmap", x: 527, y: 180, bitmap: "furnace_bar_background", scale: 3.2},
        {type: "bitmap", x: 602, y: 105, bitmap: "liquid_background", scale: 3.2},
        {type: "bitmap", x: 732, y: 241, bitmap: "squeezer_fill", scale: 3.2},
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
        "liquidScale": {
            type: "scale",
            x: 605,
            y: 108,
            direction: 1,
            value: 0,
            bitmap: "liqued_background_2",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 527,
            y: 180,
            direction: 0,
            value: 0,
            bitmap: "furnace_bar_scale",
            scale: 3.2
        },

        "slotInput0": {type: "slot", x: 401, y: 177},
        "slotInput1": {type: "slot", x: 462, y: 177},

        "slotSpecial": {type: "slot", x: 667, y: 177},
        "slotContainer": {type: "slot", x: 667, y: 237, bitmap: "slot_container"},
        "slotContainerFilled": {type: "slot", x: 776, y: 235}
    }
});