const guiPeatFiredEngine = new UI.StandartWindow({
    standart: {
        header: {text: {text: "Peat-fired generator"}},
        inventory: {standart: true},
        background: {standart: true}
    },

    drawing: [
        {type: "bitmap", x: 335, y: 140, bitmap: "forestry_energy_bar_background", scale: 3.2},
        {type: "bitmap", x: 385, y: 110, bitmap: "engine_peat_background", scale: 3.2},
    ],

    elements: {
        "progressEnergyScale": {type: "scale", x: 335, y: 140, direction: 1, bitmap: "forestry_energy_bar", scale: 3.2},
        "burnScale": {
            type: "scale",
            x: 394.6,
            y: 142,
            direction: 1,
            bitmap: "engine_peat_scale",
            scale: 3.2
        },

        "slotFuel": {type: "slot", x: 385, y: 196.4},

        "slotAsh0": {type: "slot", x: 557, y: 161},
        "slotAsh1": {type: "slot", x: 615, y: 161},
        "slotAsh2": {type: "slot", x: 557, y: 218},
        "slotAsh3": {type: "slot", x: 615, y: 218},
    }
});