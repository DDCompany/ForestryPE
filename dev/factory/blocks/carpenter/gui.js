const carpenterGUI = new UI.StandartWindow({
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
            x: 780,
            y: 113.2,
            direction: 1,
            value: 0,
            bitmap: "liquid_background_2",
            scale: 3.2
        },

        "slotOutput": {type: "slot", x: 612.2, y: 222, size: 51},
        "slotSpecial": {type: "slot", x: 618.6, y: 119.6},
        "slotContainer": {type: "slot", x: 705, y: 119.6, bitmap: "slot_liquid"},

    }
});

function initCarpenterSlots() {
    let tmp = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            carpenterGUI.content.elements["slotInput" + tmp] = {type: "slot", x: 385 + j * 60, y: 115 + i * 60};
            tmp++;
        }
    }

    tmp = 0;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 9; j++) {
            carpenterGUI.content.elements["slotResources" + tmp] = {type: "slot", x: 353 + j * 60, y: 321.8 + i * 60};
            tmp++;
        }
    }
}

initCarpenterSlots();

