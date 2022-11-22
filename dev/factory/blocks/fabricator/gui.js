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
        {type: "bitmap", x: 335, y: 100, bitmap: "forestry.scales.energy_empty", scale: 3.2},
        {type: "bitmap", x: 385, y: 88, bitmap: "forestry.for.fabricator.bg", scale: 3.2}
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
        "smeltingScale": {
            type: "scale",
            x: 404,
            y: 189,
            direction: 1,
            value: 0,
            bitmap: "forestry.slots.gray",
            scale: 3.2
        },
        "temperatureScale": {
            type: "scale",
            x: 497,
            y: 90,
            direction: 1,
            value: 0,
            bitmap: "forestry.for.fabricator.scale",
            scale: 3.2
        },

        "slotGlass": {type: "slot", x: 402, y: 104, bitmap: "forestry.slots.gray", size: 51},
        "slotSpecial": {type: "slot", x: 787, y: 88},
        "slotResult": {type: "slot", x: 787, y: 203}
    }
});
MachineRegistry.addUiTitleTranslation(fabricatorGUI);

{
    const content = fabricatorGUI.getContent();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const slotName = `slotInput${i * 3 + j}`;

            content.elements[slotName] = {
                type: "slot", x: 541 + j * 60, y: 88 + i * 60, isValid: (id, count, data, container) => {
                    container.setSlot(slotName, id, 1, data);
                    return false;
                }, clicker: {
                    onClick: container => {
                        container.clearSlot(slotName);
                        const elementIns = container.getElement(slotName);
                        const clazz = elementIns.getClass();
                        const field = clazz.getDeclaredField("currentSelectedSlot");

                        field.setAccessible(true);
                        field.set(elementIns, elementIns);
                    }
                }
            };
        }
    }

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 9; j++) {
            content.elements[`slotResources${i * 9 + j}`] = {type: "slot", x: 335 + j * 60, y: 281 + i * 60};
        }
    }
}