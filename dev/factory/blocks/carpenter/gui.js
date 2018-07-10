const carpenterGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: "Carpenter"
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
        {type: "bitmap", x: 556, y: 110, bitmap: "carpenter_background", scale: 3.2}
    ],
    elements: {
        "energyScale": {
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
            x: 662,
            y: 217,
            direction: 1,
            value: 0,
            bitmap: "centrifuge_background_scale",
            scale: 3.2
        },
        "liquidScale": {
            type: "scale",
            x: 828,
            y: 113,
            direction: 1,
            value: 0,
            bitmap: "liquid_background_2",
            scale: 3.2
        },

        "slotRecipe": {type: "slot", x: 606, y: 222, size: 51, visual: true},
        "slotSpecial": {type: "slot", x: 612, y: 119},

        "slotOutput": {type: "slot", x: 727, y: 233},
        "slotContainer": {type: "slot", x: 727, y: 119, bitmap: "slot_liquid"},

    }
});

{
    let index = 0;
    let content = carpenterGUI.getContent();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let slotName = "slotInput" + index;
            let staticIndex = index;

            content.elements[slotName] = {
                type: "slot", x: 385 + j * 60, y: 115 + i * 60, isValid: function (id, count, data, container) {
                    container.setSlot(slotName, id, 1, data);
                    return false;
                }, clicker: {
                    onClick: function (container) {
                        container.clearSlot(slotName);
                        let elementIns = container.getElement(slotName);
                        let clazz = elementIns.getClass();
                        let field = clazz.getDeclaredField("currentSelectedSlot");

                        field.setAccessible(true);
                        field.set(elementIns, elementIns);
                    }
                }
            };
            index++;
        }
    }

    index = 0;
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 9; j++) {
            content.elements["slotResources" + index] = {type: "slot", x: 335 + j * 60, y: 321 + i * 60};
            index++;
        }
    }
}

