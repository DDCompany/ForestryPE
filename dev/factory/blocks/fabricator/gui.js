const fabricatorGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: "Thermionic Fabricator"
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
        {type: "bitmap", x: 335, y: 140, bitmap: "forestry.scales.energy_empty", scale: 3.2},
        {type: "bitmap", x: 385, y: 128, bitmap: "forestry.for.fabricator.bg", scale: 3.2}
    ],
    elements: {
        "energyScale": {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            value: 0,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "smeltingScale": {type: "scale", x: 404.2, y: 229, direction: 1, value: 0, bitmap: "forestry.slots.gray", scale: 3.2},
        "temperatureScale": {
            type: "scale",
            x: 497,
            y: 130,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.fabricator.scale",
            scale: 3.2
        },

        "slotGlass": {type: "slot", x: 402, y: 144.2, bitmap: "forestry.slots.gray", size: 51.2},
        "slotSpecial": {type: "slot", x: 787, y: 128},
        "slotResult": {type: "slot", x: 787, y: 243.2}
    }
});

{
    let index = 0;
    let content = fabricatorGUI.getContent();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let slotName = "slotInput" + index;
            let staticIndex = index;

            content.elements[slotName] = {
                type: "slot", x: 541 + j * 60, y: 128 + i * 60, isValid: function (id, count, data, container) {
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