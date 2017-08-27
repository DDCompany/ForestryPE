var swarmerGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: Translation.translate("Swarmer")
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
        {type: "bitmap", x: 335, y: 40, bitmap: "swarmer_background", scale: 3.2}
    ],
    elements: {
        "slot0": {type: "slot", x: 356, y: 100, bitmap: "apiary_slot"},
        "slot1": {type: "slot", x: 423, y: 58, bitmap: "apiary_slot"},
        "slot2": {type: "slot", x: 423, y: 142, bitmap: "apiary_slot"},
        "slot3": {type: "slot", x: 490, y: 100, bitmap: "apiary_slot"}
    }
});