var apiaristChestObj = {
    standart: {
        header: {
            text: {
                text: Translation.translate("Apiarist chest")
            }
        },
        inventory: {
            standart: true
        },
        background: {
            standart: true
        },
        minHeight: 14 * 61
    },
    drawing: [],
    elements: {}
};

var slotsInRow = 0;
var xp = 320;
var yp = 40;
for (var i = 0; i < 125; i++) {
    apiaristChestObj.elements["slot" + i] = {type: "slot", x: xp, y: yp};
    xp += 61;
    slotsInRow++;
    if (slotsInRow == 10) {
        xp = 320;
        yp += 61;
        slotsInRow = 0;
    }
}
var apiaristChestGUI = new UI.StandartWindow(apiaristChestObj);