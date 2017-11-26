const fabricatorGUIObj = {
    standart: {
        header: {
            text: {
                text: Translation.translate("Thermionic Fabricator")
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
        {type: "bitmap", x: 385, y: 128, bitmap: "fabricator_background", scale: 3.2}
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
        "liquedGlassScale": {type: "scale", x: 404.2, y: 229, direction: 1, value: 0, bitmap: "slot_gray", scale: 3.2},
        "temperatureScale": {
            type: "scale",
            x: 497,
            y: 130,
            direction: 1,
            value: 0,
            bitmap: "fabricator_scale",
            scale: 3.2
        },

        "slotGlass": {type: "slot", x: 402, y: 144.2, bitmap: "slot_gray", size: 51.2},
        "slotDop": {type: "slot", x: 787, y: 128},
        "slotResult": {type: "slot", x: 787, y: 243.2},

        "slotInput0": {type: "slot", x: 541, y: 128},
        "slotInput1": {type: "slot", x: 603, y: 128},
        "slotInput2": {type: "slot", x: 663, y: 128},
        "slotInput3": {type: "slot", x: 541, y: 188},
        "slotInput4": {type: "slot", x: 603, y: 188},
        "slotInput5": {type: "slot", x: 663, y: 188},
        "slotInput6": {type: "slot", x: 541, y: 248},
        "slotInput7": {type: "slot", x: 603, y: 248},
        "slotInput8": {type: "slot", x: 663, y: 248}
    }
};


function initFabricatorSlots() {
    let temp = 0;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 9; j++) {
            fabricatorGUIObj.elements["slotResources" + temp] = {type: "slot", x: 353 + j * 60, y: 321.8 + i * 60};
            temp++;
        }
    }
}

initFabricatorSlots();

const fabricatorGUI = new UI.StandartWindow(fabricatorGUIObj);