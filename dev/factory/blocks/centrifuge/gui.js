const centrifugeGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: "Centrifuge"
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
        {type: "bitmap", x: 385, y: 120, bitmap: "centrifuge_background", scale: 3.2},
    ],
    elements: {
        "progressScale": {
            type: "scale",
            x: 487,
            y: 178,
            direction: 1,
            value: 0,
            bitmap: "centrifuge_background_scale",
            scale: 3.2
        },
        "progressScale2": {
            type: "scale",
            x: 564,
            y: 178,
            direction: 1,
            value: 0,
            bitmap: "centrifuge_background_scale",
            scale: 3.2
        },
        "energyScale": {
            type: "scale",
            x: 335,
            y: 140,
            direction: 1,
            value: 0,
            bitmap: "forestry_energy_bar",
            scale: 3.2
        },

        "slotInput": {type: "slot", x: 398, y: 181, size: 52},
        "slotRecipe": {type: "slot", x: 505, y: 181, size: 52, visual: true}
    }
});

{
    let content = centrifugeGUI.getContent();
    let x = 620;
    let y = 116;
    for (let i = 0; i < 9; i++) {
        content.elements["slotOutput" + i] = {type: "slot", x: x, y: y};
        x += 61;
        if(x >= 800) {
            x = 620;
            y += 61;
        }
    }
}