const guiPeatFiredEngine = new UI.StandartWindow({
    standard: {
        header: {text: {text: "Peat-fired Engine"}},
        inventory: {standard: true},
        background: {standard: true}
    },

    drawing: [
        {type: "bitmap", x: 335, y: 140, bitmap: "forestry.scales.energy_empty", scale: 3.2},
        {type: "bitmap", x: 385, y: 110, bitmap: "forestry.for.peat-fired.bg", scale: 3.2},
    ],

    elements: {
        "progressEnergyScale": {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "burnScale": {
            type: "scale",
            x: 394.6,
            y: 142,
            direction: 1,
            bitmap: "forestry.scales.green_flame_full",
            scale: 3.2
        },

        "slotFuel": {type: "slot", x: 385, y: 196.4},

        "slotAsh0": {type: "slot", x: 557, y: 161},
        "slotAsh1": {type: "slot", x: 615, y: 161},
        "slotAsh2": {type: "slot", x: 557, y: 218},
        "slotAsh3": {type: "slot", x: 615, y: 218},
    }
});
MachineRegistry.addUiTitleTranslation(guiPeatFiredEngine);