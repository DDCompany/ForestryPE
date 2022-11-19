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
        {type: "bitmap", x: 335, y: 160, bitmap: "forestry.scales.energy_empty", scale: 3.2},
        {type: "bitmap", x: 385, y: 122, bitmap: "forestry.for.fermenter.bg", scale: 3.2},
    ],
    elements: {
        "energyScale": {
            type: "scale",
            x: 335,
            y: 160,
            direction: 1,
            value: 0,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 532,
            y: 166,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.fermenter.scale_green",
            scale: 3.2
        },
        "reagentScale": {
            type: "scale",
            x: 609,
            y: 211,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.fermenter.scale_red",
            scale: 3.2
        },

        "liquidInputScale": {
            type: "scale",
            x: 455.2,
            y: 125,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "liquidOutputScale": {
            type: "scale",
            x: 646.2,
            y: 125,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },

        "slotInput": {type: "slot", x: 567, y: 138, bitmap: "forestry.slots.gray", size: 51.2},
        "slotFuel": {type: "slot", x: 535, y: 246, bitmap: "forestry.slots.gray", size: 51.2},

        "slotInputContainer": {type: "slot", x: 385, y: 186, bitmap: "forestry.slots.liquid"},
        "slotContainer": {type: "slot", x: 711, y: 131, bitmap: "forestry.slots.container"},
        "slotFilledContainer": {type: "slot", x: 711, y: 246},
    }
});
MachineRegistry.addUiTitleTranslation(fermenterGUI);