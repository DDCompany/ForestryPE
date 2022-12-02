const stillGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "forestry.gui.still.title"
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
        {type: "bitmap", x: 335, y: 140, bitmap: "forestry.scales.energy_empty", scale: 3.2},
        {type: "bitmap", x: 385, y: 110, bitmap: "forestry.for.still.bg", scale: 3.2}
    ],
    elements: {
        "progressEnergyScale": {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            value: 0,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 625,
            y: 119.6,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.still.scale",
            scale: 3.2
        },
        "liquidInputScale": {
            type: "scale",
            x: 467,
            y: 114,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "liquidOutputScale": {
            type: "scale",
            x: 755,
            y: 114,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },

        "slotInputContainer": {type: "slot", x: 385, y: 165, bitmap: "forestry.slots.liquid"},

        "slotOutputContainer": {type: "slot", x: 833, y: 119.6, bitmap: "forestry.slots.container"},
        "slotOutputContainerFilled": {type: "slot", x: 833, y: 234.8, bitmap: "forestry.slots.liquid"},

    }
});
MachineRegistry.addUiTitleTranslation(stillGUI);