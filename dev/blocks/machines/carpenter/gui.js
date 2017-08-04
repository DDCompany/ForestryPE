var carpenterGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: Translation.translate("Carpenter")
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
        {type: "bitmap", x: 385, y: 110, bitmap: "carpenter_background", scale: 3.2}
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
            x: 669.8,
            y: 218.8,
            direction: 1,
            value: 0,
            bitmap: "centrifuge_background_scale",
            scale: 3.2
        },
        "liquidScale": {
            type: "scale",
            x: 781.8,
            y: 113.2,
            direction: 1,
            value: 0,
            bitmap: "liqued_background_2",
            scale: 3.2
        },

        "slotOutput": {type: "slot", x: 612.2, y: 222, size: 51},
        "slotSpecial": {type: "slot", x: 618.6, y: 119.6},
        "slotContainer": {type: "slot", x: 705, y: 119.6, bitmap: "slot_liquid"},
        "slotEmptyContainer": {type: "slot", x: 705, y: 222, bitmap: "slot_container"}

    }
});