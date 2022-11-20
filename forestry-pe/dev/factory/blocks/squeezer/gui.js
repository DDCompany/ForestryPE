const squeezerGUI = new UI.StandartWindow({
    standart: {
        header: {
            text: {
                text: "Squeezer"
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
        {type: "bitmap", x: 335, y: 110, bitmap: "forestry.scales.energy_empty", scale: 3.2},
        {type: "bitmap", x: 400, y: 75, bitmap: "forestry.for.squeezer.bg", scale: 3.2},
        {type: "bitmap", x: 610, y: 145, bitmap: "forestry.scales.furnace_empty", scale: 3.2},
        {type: "bitmap", x: 696, y: 80, bitmap: "forestry.bgs.liquid_1", scale: 3.2},
        {type: "bitmap", x: 765, y: 155, bitmap: "forestry.for.squeezer.arrow", scale: 3.2}
    ],
    elements: {
        "energyScale": {
            type: "scale",
            x: 335,
            y: 110,
            direction: 1,
            value: 0,
            bitmap: "forestry.scales.energy_full",
            scale: 3.2
        },
        "progressScale": {
            type: "scale",
            x: 610,
            y: 145,
            value: 0,
            bitmap: "forestry.scales.furnace_full",
            scale: 3.2
        },
        "liquidScale": {
            type: "scale",
            x: 699,
            y: 84,
            direction: 1,
            value: 0,
            bitmap: "forestry.bgs.liquid_2",
            scale: 3.2
        },

        "slotSpecial": {type: "slot", x: 615, y: 205},
        "slotEmptyContainer": {type: "slot", x: 760, y: 80, bitmap: "forestry.slots.container"},
        "slotContainer": {type: "slot", x: 760, y: 210, bitmap: "forestry.slots.liquid"}
    }
});
MachineRegistry.addUiTitleTranslation(squeezerGUI);

{
    const content = squeezerGUI.getContent();
    let x = 412;
    let y = 87;
    for (let i = 0; i < 9; i++) {
        content.elements[`slot${i}`] = {type: "slot", x, y, bitmap: "forestry.slots.gray", size: 54};
        x += 60;
        if(x >= 560) {
            x = 412;
            y += 60;
        }
    }
}