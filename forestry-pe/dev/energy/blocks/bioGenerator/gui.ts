const biogeneratorGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "Bio Generator"
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
        {type: "bitmap", x: 456, y: 110, bitmap: "forestry.for.biogen.bg", scale: 3.2},
    ],
    elements: {
        "progressEnergyScale": {
            type: "scale",
            x: 647,
            y: 180.4,
            bitmap: "forestry.for.biogen.energy_scale",
            scale: 3.2
        },
        "liquidScale": {type: "scale", x: 459, y: 114, direction: 1, bitmap: "forestry.bgs.liquid_2", scale: 3.2},

        "slotContainer": {type: "slot", x: 385, y: 180, bitmap: "forestry.slots.liquid"},
    }
});
MachineRegistry.addUiTitleTranslation(biogeneratorGUI);