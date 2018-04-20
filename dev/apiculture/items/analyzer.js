IDRegistry.genItemID("analyzer");
Item.createItem("analyzer", "Portable Analyzer", {name: "analyzer", meta: 0}, {stack: 1});

let COLUMN_0 = 340;
let COLUMN_1 = 535;
let COLUMN_2 = 735;
let LINE = 50;
let ANALYZER_FONT = {color: android.graphics.Color.WHITE, size: 20, shadow: 0.5};
let ANALYZER_FONT_BLUE = {color: android.graphics.Color.rgb(40, 133, 226), size: 20, shadow: 0.5};
let ANALYZER_FONT_RED = {color: android.graphics.Color.rgb(241, 58, 104), size: 20, shadow: 0.5};
let ANALYZER_FONT_GREEN = {color: android.graphics.Color.GREEN, size: 20, shadow: 0.5};
let temp = false;
let analyzerContainer = null;
let drawedBee = 0;
let drawedElements = {};

const updatableAnalyzer = {

    update: function () {
        if (analyzerContainer && temp) {
            if (analyzerContainer.isOpened()) {
                let slotHoney = analyzerContainer.getSlot("slotHoney");
                let slotScanning = analyzerContainer.getSlot("slotScanning");
                let slotPhase1 = analyzerContainer.getSlot("slotPhase1");
                let slotPhase2 = analyzerContainer.getSlot("slotPhase2");
                let slotPhase3 = analyzerContainer.getSlot("slotPhase3");

                if (slotScanning.id && !slotPhase1.id && !slotPhase2.id && !slotPhase3.id && drawedBee !== slotScanning.id && BeeRegistry.isBee(slotScanning.id)) {
                    let bee = BeeRegistry.getBeeFromItem(slotScanning.id, slotScanning.data);
                    if (!bee.analyzed && (slotHoney.id === ItemID.honeyDrop || slotHoney.id === ItemID.honeydew)) {
                        slotHoney.count--;
                    } else if (!bee.analyzed) {
                        return;
                    }
                    if (!bee.isSaved()) {
                        bee.save();
                    }
                    bee.analyzed = true;
                    let f = true;
                    if (slotPhase1.id === 0 && slotPhase2.id === 0 && slotPhase3.id === 0) {
                        f = false;
                    }
                    if (!f) {
                        slotPhase1.id = slotScanning.id;
                        slotPhase1.data = bee.unique;
                        slotPhase1.count = 1;
                        slotScanning.count = 0;
                    }
                } else if (slotPhase1.id && drawedBee !== slotPhase1.id && BeeRegistry.isBee(slotPhase1.id)) {
                    let bee = BeeRegistry.getBeeFromItem(slotPhase1.id, slotPhase1.data);
                    if (bee.analyzed) {
                        if (slotPhase2.id || slotPhase3.id) {
                            let pos = Player.getPosition();
                            World.drop(pos.x, pos.y, pos.z, slotPhase1.id, slotPhase1.count, slotPhase1.data);
                            slotPhase1.count = 0;
                            return;
                        } else {
                            drawPage1(bee);
                            drawedBee = slotPhase1.id;
                        }
                    }
                } else if (slotPhase2.id && drawedBee !== slotPhase2.id && BeeRegistry.isBee(slotPhase2.id)) {
                    let bee = BeeRegistry.getBeeFromItem(slotPhase2.id, slotPhase2.data);
                    if (bee.analyzed) {
                        if (slotPhase1.id || slotPhase3.id) {
                            let pos = Player.getPosition();
                            World.drop(pos.x, pos.y, pos.z, slotPhase2.id, slotPhase2.count, slotPhase2.data);
                            slotPhase2.count = 0;
                            return;
                        } else {
                            drawPage2(bee);
                            drawedBee = slotPhase2.id;
                        }
                    }
                } else if (slotPhase3.id && drawedBee !== slotPhase3.id && BeeRegistry.isBee(slotPhase3.id)) {
                    let bee = BeeRegistry.getBeeFromItem(slotPhase3.id, slotPhase3.data);
                    if (bee.analyzed) {
                        if (slotPhase2.id || slotPhase1.id) {
                            let pos = Player.getPosition();
                            World.drop(pos.x, pos.y, pos.z, slotPhase3.id, slotPhase3.count, slotPhase3.data);
                            slotPhase3.count = 0;
                            return;
                        } else {
                            drawPage3(bee);
                            drawedBee = slotPhase3.id;
                        }
                    }
                } else if ((drawedBee !== slotScanning.id && drawedBee !== slotPhase1.id && drawedBee !== slotPhase2.id && drawedBee !== slotPhase3.id) || (!drawedBee && drawedElements !== {})) {
                    for (key in drawedElements) {
                        analyzerContainer.getGuiContent().elements[key] = null;
                    }
                    drawedElements = {};
                    drawedBee = 0;
                }
            } else if (temp) {
                let pos = Player.getPosition();

                analyzerContainer.dropSlot("slotHoney", pos.x + 0.5, pos.y + 0.5, pos.z + 0.5);
                analyzerContainer.dropSlot("slotScanning", pos.x + 0.5, pos.y + 0.5, pos.z + 0.5);
                analyzerContainer.dropSlot("slotPhase1", pos.x + 0.5, pos.y + 0.5, pos.z + 0.5);
                analyzerContainer.dropSlot("slotPhase2", pos.x + 0.5, pos.y + 0.5, pos.z + 0.5);
                analyzerContainer.dropSlot("slotPhase3", pos.x + 0.5, pos.y + 0.5, pos.z + 0.5);

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
    let content = analyzerContainer.getGuiContent();

    let active = Translation.translate("analyzer.active");
    let inactive = Translation.translate("analyzer.inactive");

    drawedElements["textActive"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: (active.length + 1) * (ANALYZER_FONT.size / 2) + 10,
        height: 32,
        font: ANALYZER_FONT,
        text: active
    };

    drawedElements["slotActiveSpecies"] = {
        type: "slot",
        x: COLUMN_1 + ((active.length + 1) * (ANALYZER_FONT.size / 2)) + 10,
        y: LINE - 15,
        visual: true,
        size: 50,
        bitmap: "slot_empty"
    };

    drawedElements["textInactive"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: (inactive.length + 1) * (ANALYZER_FONT.size / 2) + 10,
        height: 32,
        font: ANALYZER_FONT,
        text: inactive
    };

    drawedElements["slotInactiveSpecies"] = {
        type: "slot",
        x: COLUMN_2 + ((inactive.length + 1) * (ANALYZER_FONT.size / 2)) + 10,
        y: LINE - 15,
        visual: true,
        size: 50,
        bitmap: "slot_empty"
    };

    LINE += 32;

    drawedElements["textSpecies0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.species")
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
        text: Translation.translate("analyzer.lifespan")
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
        text: Translation.translate("analyzer.speed")
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
        text: Translation.translate("analyzer.flowers")
    };
    drawedElements["textFlowers1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: BeeRegistry.isDominant("FLOWERS", bee.getFlowers()) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("FLOWERS", bee.getFlowers())
    };
    drawedElements["textFlowers2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: BeeRegistry.isDominant("FLOWERS", bee.getInactiveFlowers()) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("FLOWERS", bee.getInactiveFlowers())
    };

    LINE += 32;

    drawedElements["textFertility0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.fertility")
    };
    drawedElements["textFertility1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 35,
        height: 32,
        font: BeeRegistry.isDominant("FERTILITY", bee.getActiveChromosome("FERTILITY")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: bee.getActiveChromosome("FERTILITY") + " x "
    };

    drawedElements["imageFertility"] = {type: "image", x: COLUMN_1 + 40, y: LINE, bitmap: "analyzer_bee", scale: 2.5};

    drawedElements["textFertility2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 35,
        height: 32,
        font: BeeRegistry.isDominant("FERTILITY", bee.getInactiveChromosome("FERTILITY")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: bee.getInactiveChromosome("FERTILITY") + " x "
    };

    drawedElements["imageFertility2"] = {type: "image", x: COLUMN_2 + 40, y: LINE, bitmap: "analyzer_bee", scale: 2.5};

    LINE += 32;

    drawedElements["textTerritory0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.territory")
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
        text: Translation.translate("analyzer.effect")
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
        text: BeeRegistry.getChromosomeValueName("EFFECT", bee.getInactiveChromosome("EFFECT"))
    };

    LINE += 32;

    for (key in drawedElements) {
        content.elements[key] = drawedElements[key];
    }
    let slotSpeciesActive = analyzerContainer.getSlot("slotActiveSpecies");
    let slotSpeciesInactive = analyzerContainer.getSlot("slotInactiveSpecies");

    slotSpeciesActive.id = bee.getBeeType().droneID;
    slotSpeciesActive.count = 1;
    slotSpeciesInactive.id = bee.getInactiveBeeType().droneID;
    slotSpeciesInactive.count = 1;

    LINE = 50;
}


function drawPage2(bee) {
    let content = analyzerContainer.getGuiContent();

    drawedElements["textActive"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.active")
    };
    drawedElements["textInactive"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.inactive")
    };

    LINE += 32;

    drawedElements["textClimate0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.climate")
    };
    drawedElements["textClimate1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("CLIMATE", bee.getClimate())
    };

    drawedElements["textClimate2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("CLIMATE", bee.getInactiveClimate())
    };

    LINE += 32;

    drawedElements["textClimateTol0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 180,
        height: 32,
        font: ANALYZER_FONT,
        text: "   " + Translation.translate("analyzer.tolerance")
    };

    drawedElements["textClimateTol1"] = {
        type: "text",
        x: COLUMN_1 + 38,
        y: LINE,
        width: 162,
        height: 32,
        font: BeeRegistry.isDominant("TOLERANCE", bee.getActiveChromosome("TEMPERATURE_TOLERANCE")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: "{" + bee.getClimateTolValue() + "}"
    };

    drawedElements["imageClimateActive"] = {
        type: "image",
        x: COLUMN_1,
        y: LINE,
        bitmap: bee.getActiveChromosome("TEMPERATURE_TOLERANCE") === 0 ? "analyzer_tol_none" : (bee.getActiveChromosome("TEMPERATURE_TOLERANCE") < 6 ? "analyzer_tol_both" : (bee.getActiveChromosome("TEMPERATURE_TOLERANCE") < 11 ? "analyzer_tol_up" : "analyzer_tol_down")),
        scale: 2.5
    };

    drawedElements["textClimateTol2"] = {
        type: "text",
        x: COLUMN_2 + 38,
        y: LINE,
        width: 162,
        height: 32,
        font: BeeRegistry.isDominant("TOLERANCE", bee.getInactiveChromosome("TEMPERATURE_TOLERANCE")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: "{" + bee.getInactiveClimateTolValue() + "}"
    };

    drawedElements["imageClimateInactive"] = {
        type: "image",
        x: COLUMN_2,
        y: LINE,
        bitmap: bee.getInactiveChromosome("TEMPERATURE_TOLERANCE") === 0 ? "analyzer_tol_none" : (bee.getInactiveChromosome("TEMPERATURE_TOLERANCE") < 6 ? "analyzer_tol_both" : (bee.getInactiveChromosome("TEMPERATURE_TOLERANCE") < 11 ? "analyzer_tol_up" : "analyzer_tol_down")),
        scale: 2.5
    };

    LINE += 32;

    drawedElements["textHumidity0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.humidity")
    };
    drawedElements["textHumidity1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("HUMIDITY", bee.getHumidity())
    };
    drawedElements["textHumidity2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: BeeRegistry.getChromosomeValueName("HUMIDITY", bee.getInactiveHumidity())
    };

    LINE += 32;

    drawedElements["textHumidityTol0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 180,
        height: 32,
        font: ANALYZER_FONT,
        text: "  " + Translation.translate("analyzer.tolerance")
    };
    drawedElements["textHumidityTol1"] = {
        type: "text",
        x: COLUMN_1 + 38,
        y: LINE,
        width: 162,
        height: 32,
        font: BeeRegistry.isDominant("TOLERANCE", bee.getActiveChromosome("HUMIDITY_TOLERANCE")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: "{" + bee.getHumidityTolValue() + "}"
    };

    drawedElements["imageHumidityActive"] = {
        type: "image",
        x: COLUMN_1,
        y: LINE,
        bitmap: bee.getActiveChromosome("HUMIDITY_TOLERANCE") === 0 ? "analyzer_tol_none" : (bee.getActiveChromosome("HUMIDITY_TOLERANCE") < 6 ? "analyzer_tol_both" : (bee.getActiveChromosome("HUMIDITY_TOLERANCE") < 11 ? "analyzer_tol_up" : "analyzer_tol_down")),
        scale: 2.5
    };

    drawedElements["textHumidityTol2"] = {
        type: "text",
        x: COLUMN_2 + 38,
        y: LINE,
        width: 162,
        height: 32,
        font: BeeRegistry.isDominant("TOLERANCE", bee.getInactiveChromosome("HUMIDITY_TOLERANCE")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
        text: "{" + bee.getInactiveHumidityTolValue() + "}"
    };

    drawedElements["imageHumidityInactive"] = {
        type: "image",
        x: COLUMN_2,
        y: LINE,
        bitmap: bee.getInactiveChromosome("HUMIDITY_TOLERANCE") === 0 ? "analyzer_tol_none" : (bee.getInactiveChromosome("HUMIDITY_TOLERANCE") < 6 ? "analyzer_tol_both" : (bee.getInactiveChromosome("HUMIDITY_TOLERANCE") < 11 ? "analyzer_tol_up" : "analyzer_tol_down")),
        scale: 2.5
    };

    LINE += 32;

    drawedElements["textDiurnal0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.diurnal")
    };
    drawedElements["textDiurnal1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: Translation.translate("analyzer.yes")
    };
    drawedElements["textDiurnal2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: Translation.translate("analyzer.no")
    };

    LINE += 32;

    drawedElements["textNocturnal0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.nocturnal")
    };
    drawedElements["textNocturnal1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: bee.getActiveChromosome("NEVER_SLEEPS") === true ? Translation.translate("analyzer.yes") : Translation.translate("analyzer.no")
    };
    drawedElements["textNocturnal2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: bee.getInactiveChromosome("NEVER_SLEEPS") === true ? Translation.translate("analyzer.yes") : Translation.translate("analyzer.no")
    };

    LINE += 32;

    drawedElements["textFlyer0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.flyer")
    };
    drawedElements["textFlyer1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: bee.getActiveChromosome("TOLERATES_RAIN") === true ? Translation.translate("analyzer.yes") : Translation.translate("analyzer.no")
    };
    drawedElements["textFlyer2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: bee.getInactiveChromosome("TOLERATES_RAIN") === true ? Translation.translate("analyzer.yes") : Translation.translate("analyzer.no")
    };

    LINE += 32;

    drawedElements["textCave0"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.cave")
    };
    drawedElements["textCave1"] = {
        type: "text",
        x: COLUMN_1,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: bee.getActiveChromosome("CAVE_DWELLING") === true ? Translation.translate("analyzer.yes") : Translation.translate("analyzer.no")
    };
    drawedElements["textCave2"] = {
        type: "text",
        x: COLUMN_2,
        y: LINE,
        width: 200,
        height: 32,
        font: ANALYZER_FONT_BLUE,
        text: bee.getInactiveChromosome("CAVE_DWELLING") === true ? Translation.translate("analyzer.yes") : Translation.translate("analyzer.no")
    };

    LINE += 32;

    let stock = bee.pristine ? Translation.translate("analyzer.pristine") : Translation.translate("analyzer.ignoble");
    let generation = bee.generation + " " + Translation.translate("analyzer.generation");
    drawedElements["textStock"] = {
        type: "text",
        x: 335 + ((590 - stock.length * (ANALYZER_FONT_GREEN.size / 2)) / 2),
        y: LINE,
        width: stock.length * (ANALYZER_FONT_GREEN.size / 2) + 50,
        height: 32,
        font: ANALYZER_FONT_GREEN,
        text: stock
    };
    LINE += 32;
    drawedElements["textGeneration"] = {
        type: "text",
        x: 335 + (590 - generation.length * (ANALYZER_FONT_GREEN.size / 2)) / 2,
        y: LINE,
        width: generation.length * (ANALYZER_FONT_GREEN.size / 2) + 50,
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
    let content = analyzerContainer.getGuiContent();

    drawedElements["textProduce"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 500,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.produce") + ":"
    };

    LINE += 32;

    let produce = bee.getProduce();
    let t = 0;
    for (let key in produce) {
        drawedElements["slotProduce" + t] = {
            type: "slot",
            x: COLUMN_0 + (t * 60),
            y: LINE,
            size: 50,
            visual: true,
            bitmap: "slot_empty"
        };
        t++;
    }

    LINE = 250;

    drawedElements["textSpecialty"] = {
        type: "text",
        x: COLUMN_0,
        y: LINE,
        width: 500,
        height: 32,
        font: ANALYZER_FONT,
        text: Translation.translate("analyzer.specialty") + ":"
    };

    LINE += 32;

    let specialty = bee.getSpecialty();
    t = 0;
    for (let key in specialty) {
        drawedElements["slotSpecialty" + t] = {
            type: "slot",
            x: COLUMN_0 + (t * 60),
            y: LINE,
            size: 50,
            visual: true,
            bitmap: "slot_empty"
        };
        t++;
    }

    for (let key in drawedElements) {
        content.elements[key] = drawedElements[key];
    }
    t = 0;
    for (let key in produce) {
        let slot = analyzerContainer.getSlot("slotProduce" + t);
        slot.id = produce[key][0];
        slot.data = produce[key][1];
        slot.count = 1;
        t++;
    }

    t = 0;
    for (let key in specialty) {
        let slot = analyzerContainer.getSlot("slotSpecialty" + t);
        slot.id = specialty[key][0];
        slot.data = specialty[key][1];
        slot.count = 1;
        t++;
    }

    LINE = 50;
}

const analyzerObj = {
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
        "slotPhase2": {type: "slot", x: 938, y: 178.4 + 51, size: 51, bitmap: "slot_p2"},
        "slotPhase3": {type: "slot", x: 938, y: 178.4 + 2 * 51, size: 51, bitmap: "slot_p3"},
    }
};
const analyzerGUI = new UI.StandartWindow(analyzerObj);

Item.registerUseFunction("analyzer", function () {
    analyzerContainer = new UI.Container();
    analyzerContainer.openAs(analyzerGUI);
    temp = true;
});