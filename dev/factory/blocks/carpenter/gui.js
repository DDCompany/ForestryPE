const carpenterGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "forestry.gui.carpenter.title"
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
        {type: "bitmap", x: 335, y: 100, bitmap: "forestry.scales.energy_empty", scale: 3.2},
        {type: "bitmap", x: 556, y: 70, bitmap: "forestry.for.carpenter.bg", scale: 3.2}
    ],
    elements: {
        "energyScale": {
            type: "scale",
            x: 335,
            y: 100,
            direction: 1,
            value: 0,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 665,
            y: 179,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.carpenter.scale",
            scale: 3.2
        },
        "liquidScale": {
            type: "scale",
            x: 828,
            y: 73,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },

        "slotRecipe": {type: "slot", x: 606, y: 182, size: 51, visual: true},
        "slotSpecial": {type: "slot", x: 612, y: 79},

        "slotOutput": {type: "slot", x: 727, y: 193},
        "slotContainer": {type: "slot", x: 727, y: 79, bitmap: "forestry.slots.liquid"},

    }
});

{
    let content = carpenterGUI.getContent();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            content.elements["slotInput" + (i * 3 + j)] = {type: "slot", x: 385 + j * 60, y: 75 + i * 60};
        }
    }

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 9; j++) {
            content.elements["slotResources" + (i * 9 + j)] = {type: "slot", x: 335 + j * 60, y: 281 + i * 60};
        }
    }
}
MachineRegistry.addUiTitleTranslation(carpenterGUI);