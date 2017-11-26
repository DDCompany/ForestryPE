const guiBiogasEngine = new UI.StandartWindow({
    standart: {
        header: {text: {text: Translation.translate("Biogas generator")}},
        inventory: {standart: true},
        background: {standart: true}
    },

    drawing: [
        {type: "bitmap", x: 335, y: 140, bitmap: "forestry_energy_bar_background", scale: 3.2},
        {type: "bitmap", x: 385, y: 110, bitmap: "biogas_background", scale: 3.2},
    ],

    elements: {
        "progressEnergyScale": {type: "scale", x: 335, y: 140, direction: 1, bitmap: "forestry_energy_bar", scale: 3.2},
        "lavaScale": {type: "scale", x: 650, y: 113, direction: 1, value: 0, bitmap: "liqued_background_2", scale: 3.2},
        "liquidScale": {
            type: "scale",
            x: 593,
            y: 112,
            direction: 1,
            value: 0,
            bitmap: "liqued_background_2",
            scale: 3.2
        },
        "burnScale": {
            type: "scale",
            x: 442.6,
            y: 186.8,
            direction: 1,
            value: 0,
            bitmap: "engine_peat_scale",
            scale: 3.2
        },
        "warmUpScale": {type: "scale", x: 477.8, y: 202.8, direction: 1, value: 0, bitmap: "biogas_scale", scale: 3.2},

        "slotContainer": {type: "slot", x: 714.6, y: 126, bitmap: "slot_liquid"},
        "slotEmptyContainer": {type: "slot", x: 714.6, y: 234.8, bitmap: "slot_container"}

    }
});