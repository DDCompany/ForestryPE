IDRegistry.genItemID("honeyDrop");
Item.createItem("honeyDrop", "Honey drop", {name: "honeyDrop", meta: 0}, {});

IDRegistry.genItemID("honeydew");
Item.createItem("honeydew", "Honeydew", {name: "honeydew", meta: 0}, {});

var COLUMN_0 = 340;
var COLUMN_1 = 535;
var COLUMN_2 = 735;
var LINE = 50;
var ANALYZER_FONT = {color: android.graphics.Color.WHITE, size: 20, shadow: 0.5};
var ANALYZER_FONT_BLUE = {color: android.graphics.Color.rgb(40, 133, 226), size: 20, shadow: 0.5};
var ANALYZER_FONT_RED = {color: android.graphics.Color.rgb(241, 58, 104), size: 20, shadow: 0.5};
var ANALYZER_FONT_GREEN = {color: android.graphics.Color.GREEN, size: 20, shadow: 0.5};
var temp = false;
var analyzerContainer = null;
var drawedBee = 0;
var drawedElements = {};

IDRegistry.genItemID("analyzer");
Item.createItem("analyzer", "Portable Analyzer", {name: "analyzer", meta: 0}, {stack: 1});

var updatableAnalyzer = {

    update: function () {
        if (analyzerContainer && temp) {
            if (analyzerContainer.isOpened()) {
                var slotHoney = analyzerContainer.getSlot("slotHoney");
                var slotScanning = analyzerContainer.getSlot("slotScanning");
                var slotPhase1 = analyzerContainer.getSlot("slotPhase1");
                var slotPhase2 = analyzerContainer.getSlot("slotPhase2");
                var slotPhase3 = analyzerContainer.getSlot("slotPhase3");

                if (slotScanning.id && !slotPhase1.id && !slotPhase2.id && !slotPhase3.id && drawedBee !== slotScanning.id && BeeRegistry.isBee(slotScanning.id)) {
                    var bee = BeeRegistry.getBeeFromItem(slotScanning.id, slotScanning.data);
                    if (bee.analyzed || (slotHoney.id === ItemID.honeyDrop || slotHoney.id === ItemID.honeydew)) {
                        slotHoney.count--;
                    } else {
                        return;
                    }
                    if (!bee.isSaved()) {
                        bee.save();
                    }
                    bee.analyzed = true;
                    var f = true;
                    if (slotPhase1.id === 0 && slotPhase2.id === 0 && slotPhase3.id === 0) {
                        f = false;
                    }
                    if (!f) {
                        slotPhase1.id = slotScanning.id;
                        slotPhase1.data = bee.unique;
                        slotPhase1.count = 1;
                        slotScanning.count = 0;
                    }
                } else if (slotPhase1.id && drawedBee != slotPhase1.id && BeeRegistry.isBee(slotPhase1.id)) {
                    if (slotPhase2.id || slotPhase3.id) {
                        var pos = Player.getPosition();
                        World.drop(pos.x, pos.y, pos.z, slotPhase1.id, slotPhase1.count, slotPhase1.data);
                        slotPhase1.count = 0;
                        return;
                    } else {
                        var bee = BeeRegistry.getBeeFromItem(slotPhase1.id, slotPhase1.data);
                        drawPage1(bee);
                        drawedBee = slotPhase1.id;
                    }
                } else if (slotPhase2.id && drawedBee !== slotPhase2.id && BeeRegistry.isBee(slotPhase2.id)) {
                    if (slotPhase1.id || slotPhase3.id) {
                        var pos = Player.getPosition();
                        World.drop(pos.x, pos.y, pos.z, slotPhase2.id, slotPhase2.count, slotPhase2.data);
                        slotPhase2.count = 0;
                        return;
                    } else {
                        var bee = BeeRegistry.getBeeFromItem(slotPhase2.id, slotPhase2.data);
                        drawPage2(bee);
                        drawedBee = slotPhase2.id;
                    }
                } else if (slotPhase3.id && drawedBee !== slotPhase3.id && BeeRegistry.isBee(slotPhase3.id)) {
                    if (slotPhase2.id || slotPhase1.id) {
                        var pos = Player.getPosition();
                        World.drop(pos.x, pos.y, pos.z, slotPhase3.id, slotPhase3.count, slotPhase3.data);
                        slotPhase3.count = 0;
                        return;
                    } else {
                        var bee = BeeRegistry.getBeeFromItem(slotPhase3.id, slotPhase3.data);
                        drawPage3(bee);
                        drawedBee = slotPhase3.id;
                    }
                } else if (drawedBee !== slotScanning.id && drawedBee !== slotPhase1.id && drawedBee !== slotPhase2.id && drawedBee !== slotPhase3.id) {
                    for (key in drawedElements) {
                        analyzerContainer.getGuiContent().elements[key] = null;
                    }
                    drawedElements = {};
                    drawedBee = 0;
                }
            } else {
                var content = analyzerContainer.getGuiContent();
                var pos = Player.getPosition();

                for (var key in content) {
                    content.elements[key].type === "slot" || (this.openedUI.dropSlot(key, pos.x + 0.5, pos.y + 0.5, pos.z + 0.5));
                }

                for (var key in drawedElements) {
                    content.elements[key] = null;
                }

                drawedElements = {};
                analyzerContainer = null;
                temp = false;
                drawedBee = 0;
            }
            !analyzerContainer || (analyzerContainer.validateAll());
        }
    }

};

Callback.addCallback("LevelLoaded", function () {
    Updatable.addUpdatable(updatableAnalyzer);
});

function drawPage1(bee) {
    var content = analyzerContainer.getGuiContent();

    drawedElements["textActive"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Active"
    };
    drawedElements["textInactive"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Inactive"
    };

    LINE += 32;

    drawedElements["textSpecies0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Species"
    };
    drawedElements["textSpecies1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: bee.getBeeType().dominant ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: bee.getActiveChromosome("SPECIES")
    };
    drawedElements["textSpecies2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: bee.getInactiveBeeType().dominant ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: bee.getInactiveChromosome("SPECIES")
    };

    LINE += 32;

    drawedElements["textLifespan0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Lifespan"
    };
    drawedElements["textLifespan1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: BeeRegistry.isDominant("SPECIES", bee.getActiveChromosome("LIFESPAN")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("LIFESPAN", bee.getActiveChromosome("LIFESPAN"))
    };
    drawedElements["textLifespan2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: BeeRegistry.isDominant("SPECIES", bee.getInactiveChromosome("LIFESPAN")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("LIFESPAN", bee.getInactiveChromosome("LIFESPAN"))
    };

    LINE += 32;

    drawedElements["textProduction0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Production"
    };
    drawedElements["textProduction1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: BeeRegistry.isDominant("SPEED", bee.getActiveChromosome("SPEED")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("SPEED", bee.getActiveChromosome("SPEED"))
    };
    drawedElements["textProduction2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: BeeRegistry.isDominant("SPEED", bee.getInactiveChromosome("SPEED")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("SPEED", bee.getInactiveChromosome("SPEED"))
    };

    LINE += 32;

    drawedElements["textFlowers0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Flower Type"
    };
    drawedElements["textFlowers1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: BeeRegistry.isDominant("FLOWERS", bee.getActiveChromosome("FLOWERS")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("FLOWERS", bee.getActiveChromosome("FLOWERS"))
    };
    drawedElements["textFlowers2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: BeeRegistry.isDominant("FLOWERS", bee.getInactiveChromosome("FLOWERS")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("FLOWERS", bee.getInactiveChromosome("FLOWERS"))
    };

    LINE += 32;

    drawedElements["textFertility0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Fertility"
    };
    drawedElements["textFertility1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: BeeRegistry.isDominant("FERTILITY", bee.getActiveChromosome("FERTILITY")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: bee.getActiveChromosome("FERTILITY")
    };
    drawedElements["textFertility2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: BeeRegistry.isDominant("FERTILITY", bee.getInactiveChromosome("FERTILITY")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: bee.getInactiveChromosome("FERTILITY")
    };

    LINE += 32;

    drawedElements["textTerritory0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Territory"
    };
    drawedElements["textTerritory1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: bee.getActiveChromosome("TERRITORY")
    };
    drawedElements["textTerritory2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: bee.getActiveChromosome("TERRITORY")
    };

    LINE += 32;

    drawedElements["textEffect0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Effect"
    };
    drawedElements["textEffect1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: BeeRegistry.isDominant("EFFECT", bee.getActiveChromosome("EFFECT")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("EFFECT", bee.getActiveChromosome("EFFECT"))
    };
    drawedElements["textEffect2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: BeeRegistry.isDominant("EFFECT", bee.getInactiveChromosome("EFFECT")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("EFFECT", bee.getActiveChromosome("EFFECT"))
    };

    LINE += 32;

    for (key in drawedElements) {
        content.elements[key] = drawedElements[key];
    }

    LINE = 50;
}

function drawPage2(bee) {
    var content = analyzerContainer.getGuiContent();

    drawedElements["textActive"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Active"
    };
    drawedElements["textInactive"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Inactive"
    };

    LINE += 32;

    drawedElements["textClimate0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Climate"
    };
    drawedElements["textClimate1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: BeeRegistry.getChromosomeValueName("CLIMATE", bee.getActiveChromosome("CLIMATE"))
    };
    drawedElements["textClimate2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: BeeRegistry.getChromosomeValueName("CLIMATE", bee.getInactiveChromosome("CLIMATE"))
    };

    LINE += 32;

    drawedElements["textClimateTol0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "   Tolerance"
    };
    drawedElements["textClimateTol1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: bee.getActiveChromosome("TEMPERATURE_TOLERANCE")
    };
    drawedElements["textClimateTol2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: bee.getInactiveChromosome("TEMPERATURE_TOLERANCE")
    };

    LINE += 32;

    drawedElements["textHumidity0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Humidity"
    };
    drawedElements["textHumidity1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: BeeRegistry.getChromosomeValueName("HUMIDITY", bee.getActiveChromosome("HUMIDITY"))
    };
    drawedElements["textHumidity2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: BeeRegistry.getChromosomeValueName("HUMIDITY", bee.getInactiveChromosome("HUMIDITY"))
    };

    LINE += 32;

    drawedElements["textHumidityTol0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "   Tolerance"
    };
    drawedElements["textHumidityTol1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: bee.getActiveChromosome("HUMIDITY_TOLERANCE")
    };
    drawedElements["textHumidityTol2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: bee.getInactiveChromosome("HUMIDITY_TOLERANCE")
    };

    LINE += 32;

    drawedElements["textDiurnal0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Diurnal"
    };
    drawedElements["textDiurnal1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: BeeRegistry.localize("Yes")
    };
    drawedElements["textDiurnal2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: BeeRegistry.localize("Yes")
    };

    LINE += 32;

    drawedElements["textNocturnal0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Nocturnal"
    };
    drawedElements["textNocturnal1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: bee.getActiveChromosome("NEVER_SLEEPS") === true ? BeeRegistry.localize("Yes") : BeeRegistry.localize("No")
    };
    drawedElements["textNocturnal2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: bee.getInactiveChromosome("NEVER_SLEEPS") === true ? BeeRegistry.localize("Yes") : BeeRegistry.localize("No")
    };

    LINE += 32;

    drawedElements["textFlyer0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Tolerant Flyer"
    };
    drawedElements["textFlyer1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: bee.getActiveChromosome("TOLERATES_RAIN") === true ? BeeRegistry.localize("Yes") : BeeRegistry.localize("No")
    };
    drawedElements["textFlyer2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: bee.getInactiveChromosome("TOLERATES_RAIN") === true ? BeeRegistry.localize("Yes") : BeeRegistry.localize("No")
    };

    LINE += 32;

    drawedElements["textCave0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: "Cave Dwelling"
    };
    drawedElements["textCave1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: bee.getActiveChromosome("CAVE_DWELLING") === true ? BeeRegistry.localize("Yes") : BeeRegistry.localize("No")
    };
    drawedElements["textCave2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: bee.getInactiveChromosome("CAVE_DWELLING") === true ? BeeRegistry.localize("Yes") : BeeRegistry.localize("No")
    };

    LINE += 32;

    var stock = bee.pristine ? "Pristine Stock" : "Ignoble Stock";
    var generation = bee.generation + " Generations in Captivity";
    drawedElements["textStock"] = {
        type: "text",
        x: 335 + ((590 - stock.length * (ANALYZER_FONT_GREEN.size / 2)) / 2),
        y: LINE,
        width: stock.length * (ANALYZER_FONT_GREEN.size / 2) + 30,
        height: 32,
        font: ANALYZER_FONT_GREEN,
        text: stock
    };
    LINE += 32;
    drawedElements["textGeneration"] = {
        type: "text",
        x: 335 + (590 - generation.length * (ANALYZER_FONT_GREEN.size / 2)) / 2,
        y: LINE,
        width: generation.length * (ANALYZER_FONT_GREEN.size / 2) + 32,
        height: 32,
        font: ANALYZER_FONT_GREEN,
        text: generation
    };

    for (key in drawedElements) {
        content.elements[key] = drawedElements[key];
    }

    LINE = 50;
}

function drawPage3(bee) {
    var content = analyzerContainer.getGuiContent();

    drawedElements["textProduce"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 220,
        height: 32,
        font: ANALYZER_FONT,
        text: "Possible Produce:"
    };

    LINE += 32;

    var produce = bee.getProduce();
    var t = 0;
    for (var key in produce) {
        drawedElements["slotProduce" + t] = {type: "slot", x: COLUMN_0 + (t * 60), y: LINE, size: 50, visual: true};
        t++;
    }

    LINE = 250;

    drawedElements["textSpecialty"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 220,
        height: 32,
        font: ANALYZER_FONT,
        text: "Possible Specialty:"
    };

    LINE += 32;

    var specialty = bee.getSpecialty();
    t = 0;
    for (var key in specialty) {
        drawedElements["slotSpecialty" + t] = {type: "slot", x: COLUMN_0 + (t * 60), y: LINE, size: 50, visual: true};
        t++;
    }

    for (key in drawedElements) {
        content.elements[key] = drawedElements[key];
    }
    t = 0;
    for (var key in produce) {
        var slot = analyzerContainer.getSlot("slotProduce" + t);
        slot.id = produce[key][0];
        slot.data = produce[key][1];
        slot.count = 1;
        t++;
    }

    t = 0;
    for (var key in specialty) {
        var slot = analyzerContainer.getSlot("slotSpecialty" + t);
        slot.id = specialty[key][0];
        slot.data = specialty[key][1];
        slot.count = 1;
        t++;
    }

    LINE = 50;
}

var analyzerObj = {
    standart: {
        header: {
            text: {
                text: "Portable Analyzer"
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
        {type: "bitmap", x: 335, y: 40, bitmap: "alyzer", scale: 2.8}
    ],
    elements: {
        "slotHoney": {type: "slot", x: 938, y: 40, size: 51, bitmap: "slot_honey"},
        "slotScanning": {type: "slot", x: 938, y: 91, size: 51, bitmap: "slot_q"},

        "slotPhase1": {type: "slot", x: 938, y: 178.4, size: 51, bitmap: "slot_p1"},
        "slotPhase2": {type: "slot", x: 938, y: 178.4 + 1 * 51, size: 51, bitmap: "slot_p2"},
        "slotPhase3": {type: "slot", x: 938, y: 178.4 + 2 * 51, size: 51, bitmap: "slot_p3"},
    }
};
var analyzerGUI = new UI.StandartWindow(analyzerObj);


Item.registerUseFunction("analyzer", function () {
    analyzerContainer = new UI.Container();
    analyzerContainer.openAs(analyzerGUI);
    temp = true;
});