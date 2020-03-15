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
            let slotName = "slotInput" + (i * 3 + j);

            content.elements[slotName] = {
                type: "slot", x: 385 + j * 60, y: 75 + i * 60, isValid: function (id, count, data, container) {
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
        }
    }

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 9; j++) {
            content.elements["slotResources" + (i * 9 + j)] = {type: "slot", x: 335 + j * 60, y: 281 + i * 60};
        }
    }
}

