var raintankGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: Translation.translate("Rain tank")
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
        {type: "bitmap", x: 335, y: 90, bitmap: "raintank_background", scale: 3.2},
    ],
    elements: {
        "liquidScale": {
            type: "scale",
            x: 338.2,
            y: 93.2,
            direction: 1,
            value: 0,
            bitmap: "liquid_background_3",
            scale: 3.2
        },

        "slotContainer": {type: "slot", x: 536.6, y: 96.4, bitmap: "slot_container"},
        "slotFullContainer": {type: "slot", x: 536.6, y: 211.6, bitmap: "slot_liquid"},
    }
});