const alvearyHygroregulatorGUI = new UI.StandartWindow({
    standard: {
        header: {
            text: {
                text: "forestry.gui.alveary_hygroregulator.title"
            }
        },
        inventory: {
            standard: true
        },
        background: {
            standard: true
        }
    },
    drawing: [
        {type: "bitmap", x: 335, y: 40, bitmap: "forestry.bgs.liquid_1", scale: 3.2},
    ],
    elements: {
        "liquidScale": {
            type: "scale",
            x: 338.2,
            y: 43.2,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },
        "slotLiquid": {type: "slot", x: 400, y: 65, bitmap: "forestry.slots.liquid"},
        "slotContainer": {type: "slot", x: 400, y: 150, bitmap: "forestry.slots.container"}
    }
});
MachineRegistry.addUiTitleTranslation(alvearyHygroregulatorGUI);