var raintankGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: "Rain Tank"
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
        {type: "bitmap", x: 335, y: 90, bitmap: "forestry.for.raintank.bg", scale: 3.2},
    ],
    elements: {
        "liquidScale": {
            type: "scale",
            x: 338.2,
            y: 93.2,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_3",
            scale: 3.2
        },

        "slotContainer": {type: "slot", x: 536.6, y: 96.4, bitmap: "forestry.slots.container"},
        "slotFullContainer": {type: "slot", x: 536.6, y: 211.6, bitmap: "forestry.slots.liquid"},
    }
});