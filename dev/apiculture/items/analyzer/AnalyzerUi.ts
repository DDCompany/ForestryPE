const COLUMN_0 = 340;
const COLUMN_1 = 535;
const COLUMN_2 = 735;
const ANALYZER_FONT = {color: android.graphics.Color.WHITE, size: 20, shadow: 0.5};
const ANALYZER_FONT_BLUE = {color: android.graphics.Color.rgb(40, 133, 226), size: 20, shadow: 0.5};
const ANALYZER_FONT_RED = {color: android.graphics.Color.rgb(241, 58, 104), size: 20, shadow: 0.5};
const ANALYZER_FONT_GREEN = {color: android.graphics.Color.GREEN, size: 20, shadow: 0.5};

enum AnalyzerPage {
    GENOME = 1,
    HABITAT,
    PRODUCTION,
}

class AnalyzerUi {
    static window: UI.StandartWindow;

    static setup() {
        this.window = new UI.StandartWindow({
            standard: {
                header: {text: {text: "forestry.gui.analyzer.title"}},
                inventory: {standard: true},
                background: {standard: true}
            },
            drawing: [
                {type: "bitmap", x: 335, y: 40, bitmap: "forestry.for.alyzer.bg", scale: 2.8}
            ],
            elements: {
                "slotHoney": {type: "slot", x: 938, y: 40, size: 51, bitmap: "forestry.slots.honey"},
                "slotScanning": {type: "slot", x: 938, y: 91, size: 51, bitmap: "forestry.for.alyzer.slot_q"},

                "slotPhase1": {type: "slot", x: 938, y: 178.4, size: 51, bitmap: "forestry.for.alyzer.slot_1"},
                "slotPhase2": {type: "slot", x: 938, y: 178.4 + 51, size: 51, bitmap: "forestry.for.alyzer.slot_2"},
                "slotPhase3": {type: "slot", x: 938, y: 178.4 + 2 * 51, size: 51, bitmap: "forestry.for.alyzer.slot_3"},
            }
        });
        MachineRegistry.addUiTitleTranslation(this.window);
    }

    static clearPages() {
        const blackList = ["slotHoney", "slotScanning", "slotPhase1", "slotPhase2", "slotPhase3"];

        const elements = this.window.getContent().elements;
        for (const key in elements) {
            if (blackList.indexOf(key) == -1) {
                // @ts-ignore
                elements[key] = null;
            }
        }
    }

    static drawPage(page: AnalyzerPage, bee: Bee, container: ItemContainer) {
        this.clearPages();

        switch (page) {
            case AnalyzerPage.GENOME:
                this.drawGenomePage(bee, container);
                break;
            case AnalyzerPage.HABITAT:
                this.drawHabitatPage(bee);
                break;
            case AnalyzerPage.PRODUCTION:
                this.drawProductionPage(bee, container);
                break;
            default:
                throw new Error("Unknown analyzer page");
        }
    }

    private static drawGenomePage(bee: Bee, container: ItemContainer) {
        const active = Translation.translate("forestry.gui.analyzer.active");
        const inactive = Translation.translate("forestry.gui.analyzer.inactive");
        const elements = this.window.getContent().elements!!;
        let LINE = 50;

        elements["textActive"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: (active.length + 1) * (ANALYZER_FONT.size / 2) + 10,
            height: 32,
            font: ANALYZER_FONT,
            text: active
        };

        elements["slotActiveSpecies"] = {
            type: "slot",
            x: COLUMN_1 + ((active.length + 1) * (ANALYZER_FONT.size / 2)) + 10,
            y: LINE - 15,
            visual: true,
            size: 50,
            bitmap: "_default_slot_empty"
        };

        elements["textInactive"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: (inactive.length + 1) * (ANALYZER_FONT.size / 2) + 10,
            height: 32,
            font: ANALYZER_FONT,
            text: inactive
        };

        elements["slotInactiveSpecies"] = {
            type: "slot",
            x: COLUMN_2 + ((inactive.length + 1) * (ANALYZER_FONT.size / 2)) + 10,
            y: LINE - 15,
            visual: true,
            size: 50,
            bitmap: "_default_slot_empty"
        };

        LINE += 32;

        elements["textSpecies0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.species")
        };
        elements["textSpecies1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: bee.getBeeType().dominant ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("SPECIES", bee.getActiveChromosome("SPECIES")),
        };
        elements["textSpecies2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: bee.getInactiveBeeType().dominant ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("SPECIES", bee.getInactiveChromosome("SPECIES")),
        };

        LINE += 32;

        elements["textLifespan0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.lifespan")
        };
        elements["textLifespan1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("SPECIES", bee.getActiveChromosome("LIFESPAN")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("LIFESPAN", bee.getActiveChromosome("LIFESPAN"))
        };
        elements["textLifespan2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("SPECIES", bee.getInactiveChromosome("LIFESPAN")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("LIFESPAN", bee.getInactiveChromosome("LIFESPAN"))
        };

        LINE += 32;

        elements["textProduction0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.speed")
        };
        elements["textProduction1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("SPEED", bee.getActiveChromosome("SPEED")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("SPEED", bee.getActiveChromosome("SPEED"))
        };
        elements["textProduction2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("SPEED", bee.getInactiveChromosome("SPEED")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("SPEED", bee.getInactiveChromosome("SPEED"))
        };

        LINE += 32;

        elements["textFlowers0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.flowers")
        };
        elements["textFlowers1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("FLOWERS", bee.getFlowers()) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("FLOWERS", bee.getFlowers())
        };
        elements["textFlowers2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("FLOWERS", bee.getInactiveFlowers()) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("FLOWERS", bee.getInactiveFlowers())
        };

        LINE += 32;

        elements["textFertility0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.fertility")
        };
        elements["textFertility1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 35,
            height: 32,
            font: BeeRegistry.isDominant("FERTILITY", bee.getActiveChromosome("FERTILITY")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: `${bee.getActiveChromosome("FERTILITY")} x `
        };

        elements["imageFertility"] = {
            type: "image",
            x: COLUMN_1 + 40,
            y: LINE,
            bitmap: "forestry.for.alyzer.bee",
            scale: 2.5
        };

        elements["textFertility2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 35,
            height: 32,
            font: BeeRegistry.isDominant("FERTILITY", bee.getInactiveChromosome("FERTILITY")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: `${bee.getInactiveChromosome("FERTILITY")} x `
        };

        elements["imageFertility2"] = {
            type: "image",
            x: COLUMN_2 + 40,
            y: LINE,
            bitmap: "forestry.for.alyzer.bee",
            scale: 2.5
        };

        LINE += 32;

        elements["textTerritory0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.territory")
        };
        elements["textTerritory1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getActiveChromosome("TERRITORY")
        };
        elements["textTerritory2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getActiveChromosome("TERRITORY")
        };

        LINE += 32;

        elements["textEffect0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.effect")
        };
        elements["textEffect1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("EFFECT", bee.getActiveChromosome("EFFECT")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("EFFECT", bee.getActiveChromosome("EFFECT"))
        };
        elements["textEffect2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: BeeRegistry.isDominant("EFFECT", bee.getInactiveChromosome("EFFECT")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("EFFECT", bee.getInactiveChromosome("EFFECT"))
        };

        container.setSlot("slotActiveSpecies", bee.getBeeType().droneID, 1, 0);
        container.setSlot("slotInactiveSpecies", bee.getInactiveBeeType().droneID, 1, 0);
    }

    private static drawHabitatPage(bee: Bee) {
        const elements = this.window.getContent().elements!!;
        let LINE = 50;

        elements["textActive"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.active")
        };
        elements["textInactive"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.inactive")
        };

        LINE += 32;

        elements["textClimate0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.climate")
        };
        elements["textClimate1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("CLIMATE", bee.getClimate())
        };

        elements["textClimate2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("CLIMATE", bee.getInactiveClimate())
        };

        LINE += 32;

        elements["textClimateTol0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 180,
            height: 32,
            font: ANALYZER_FONT,
            text: `   ${Translation.translate("forestry.gui.analyzer.tolerance")}`
        };

        elements["textClimateTol1"] = {
            type: "text",
            x: COLUMN_1 + 38,
            y: LINE,
            width: 162,
            height: 32,
            font: BeeRegistry.isDominant("TOLERANCE", bee.getActiveChromosome("TEMPERATURE_TOLERANCE")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: bee.getClimateTolValue().toString(),
        };

        elements["imageClimateActive"] = {
            type: "image",
            x: COLUMN_1,
            y: LINE,
            bitmap: bee.getActiveChromosome("TEMPERATURE_TOLERANCE") === 0 ? "forestry.for.alyzer.tolerance_none" : (bee.getActiveChromosome("TEMPERATURE_TOLERANCE") < 6 ? "forestry.for.alyzer.tolerance_both" : (bee.getActiveChromosome("TEMPERATURE_TOLERANCE") < 11 ? "forestry.for.alyzer.tolerance_up" : "forestry.for.alyzer.tolerance_down")),
            scale: 2.5
        };

        elements["textClimateTol2"] = {
            type: "text",
            x: COLUMN_2 + 38,
            y: LINE,
            width: 162,
            height: 32,
            font: BeeRegistry.isDominant("TOLERANCE", bee.getInactiveChromosome("TEMPERATURE_TOLERANCE")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: bee.getInactiveClimateTolValue().toString(),
        };

        elements["imageClimateInactive"] = {
            type: "image",
            x: COLUMN_2,
            y: LINE,
            bitmap: bee.getInactiveChromosome("TEMPERATURE_TOLERANCE") === 0 ? "forestry.for.alyzer.tolerance_none" : (bee.getInactiveChromosome("TEMPERATURE_TOLERANCE") < 6 ? "forestry.for.alyzer.tolerance_both" : (bee.getInactiveChromosome("TEMPERATURE_TOLERANCE") < 11 ? "forestry.for.alyzer.tolerance_up" : "forestry.for.alyzer.tolerance_down")),
            scale: 2.5
        };

        LINE += 32;

        elements["textHumidity0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.humidity")
        };
        elements["textHumidity1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("HUMIDITY", bee.getHumidity())
        };
        elements["textHumidity2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: BeeRegistry.getChromosomeValueName("HUMIDITY", bee.getInactiveHumidity())
        };

        LINE += 32;

        elements["textHumidityTol0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 180,
            height: 32,
            font: ANALYZER_FONT,
            text: `  ${Translation.translate("forestry.gui.analyzer.tolerance")}`
        };
        elements["textHumidityTol1"] = {
            type: "text",
            x: COLUMN_1 + 38,
            y: LINE,
            width: 162,
            height: 32,
            font: BeeRegistry.isDominant("TOLERANCE", bee.getActiveChromosome("HUMIDITY_TOLERANCE")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: bee.getHumidityTolValue().toString(),
        };

        elements["imageHumidityActive"] = {
            type: "image",
            x: COLUMN_1,
            y: LINE,
            bitmap: bee.getActiveChromosome("HUMIDITY_TOLERANCE") === 0 ? "forestry.for.alyzer.tolerance_none" : (bee.getActiveChromosome("HUMIDITY_TOLERANCE") < 6 ? "forestry.for.alyzer.tolerance_both" : (bee.getActiveChromosome("HUMIDITY_TOLERANCE") < 11 ? "forestry.for.alyzer.tolerance_up" : "forestry.for.alyzer.tolerance_down")),
            scale: 2.5
        };

        elements["textHumidityTol2"] = {
            type: "text",
            x: COLUMN_2 + 38,
            y: LINE,
            width: 162,
            height: 32,
            font: BeeRegistry.isDominant("TOLERANCE", bee.getInactiveChromosome("HUMIDITY_TOLERANCE")) ? ANALYZER_FONT_RED : ANALYZER_FONT_BLUE,
            text: bee.getInactiveHumidityTolValue().toString(),
        };

        elements["imageHumidityInactive"] = {
            type: "image",
            x: COLUMN_2,
            y: LINE,
            bitmap: bee.getInactiveChromosome("HUMIDITY_TOLERANCE") === 0 ? "forestry.for.alyzer.tolerance_none" : (bee.getInactiveChromosome("HUMIDITY_TOLERANCE") < 6 ? "forestry.for.alyzer.tolerance_both" : (bee.getInactiveChromosome("HUMIDITY_TOLERANCE") < 11 ? "forestry.for.alyzer.tolerance_up" : "forestry.for.alyzer.tolerance_down")),
            scale: 2.5
        };

        LINE += 32;

        elements["textDiurnal0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.diurnal")
        };
        elements["textDiurnal1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: Translation.translate("forestry.gui.analyzer.yes")
        };
        elements["textDiurnal2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: Translation.translate("forestry.gui.analyzer.no")
        };

        LINE += 32;

        elements["textNocturnal0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.nocturnal")
        };
        elements["textNocturnal1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getActiveChromosome("NEVER_SLEEPS") === true ? Translation.translate("forestry.gui.analyzer.yes") : Translation.translate("forestry.gui.analyzer.no")
        };
        elements["textNocturnal2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getInactiveChromosome("NEVER_SLEEPS") === true ? Translation.translate("forestry.gui.analyzer.yes") : Translation.translate("forestry.gui.analyzer.no")
        };

        LINE += 32;

        elements["textFlyer0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.flyer")
        };
        elements["textFlyer1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getActiveChromosome("TOLERATES_RAIN") === true ? Translation.translate("forestry.gui.analyzer.yes") : Translation.translate("forestry.gui.analyzer.no")
        };
        elements["textFlyer2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getInactiveChromosome("TOLERATES_RAIN") === true ? Translation.translate("forestry.gui.analyzer.yes") : Translation.translate("forestry.gui.analyzer.no")
        };

        LINE += 32;

        elements["textCave0"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT,
            text: Translation.translate("forestry.gui.analyzer.cave")
        };
        elements["textCave1"] = {
            type: "text",
            x: COLUMN_1,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getActiveChromosome("CAVE_DWELLING") === true ? Translation.translate("forestry.gui.analyzer.yes") : Translation.translate("forestry.gui.analyzer.no")
        };
        elements["textCave2"] = {
            type: "text",
            x: COLUMN_2,
            y: LINE,
            width: 200,
            height: 32,
            font: ANALYZER_FONT_BLUE,
            text: bee.getInactiveChromosome("CAVE_DWELLING") === true ? Translation.translate("forestry.gui.analyzer.yes") : Translation.translate("forestry.gui.analyzer.no")
        };

        LINE += 32;

        const stock = bee.pristine ? Translation.translate("forestry.gui.analyzer.pristine") : Translation.translate("forestry.gui.analyzer.ignoble");
        const generation = t("forestry.gui.analyzer.generation", bee.generation);
        elements["textStock"] = {
            type: "text",
            x: 335 + ((590 - stock.length * (ANALYZER_FONT_GREEN.size / 2)) / 2),
            y: LINE,
            width: stock.length * (ANALYZER_FONT_GREEN.size / 2) + 50,
            height: 32,
            font: ANALYZER_FONT_GREEN,
            text: stock
        };
        LINE += 32;
        elements["textGeneration"] = {
            type: "text",
            x: 335 + (590 - generation.length * (ANALYZER_FONT_GREEN.size / 2)) / 2,
            y: LINE,
            width: generation.length * (ANALYZER_FONT_GREEN.size / 2) + 50,
            height: 32,
            font: ANALYZER_FONT_GREEN,
            text: generation
        };
    }

    private static drawProductionPage(bee: Bee, container: ItemContainer) {
        const elements = this.window.getContent().elements!!;
        let LINE = 50;

        elements["textProduce"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 500,
            height: 32,
            font: ANALYZER_FONT,
            text: `${Translation.translate("forestry.gui.analyzer.produce")}:`
        };

        LINE += 32;

        const produce = bee.getProduce();
        let t = 0;
        for (const key in produce) {
            elements[`slotProduce${t}`] = {
                type: "slot",
                x: COLUMN_0 + (t * 60),
                y: LINE,
                size: 50,
                visual: true,
                bitmap: "_default_slot_empty"
            };
            t++;
        }

        LINE = 250;

        elements["textSpecialty"] = {
            type: "text",
            x: COLUMN_0,
            y: LINE,
            width: 500,
            height: 32,
            font: ANALYZER_FONT,
            text: `${Translation.translate("forestry.gui.analyzer.specialty")}:`
        };

        LINE += 32;

        const specialty = bee.getSpecialty();
        t = 0;
        for (const key in specialty) {
            elements[`slotSpecialty${t}`] = {
                type: "slot",
                x: COLUMN_0 + (t * 60),
                y: LINE,
                size: 50,
                visual: true,
                bitmap: "_default_slot_empty"
            };
            t++;
        }

        t = 0;
        for (let key in produce) {
            container.setSlot(`slotProduce${t}`, produce[key][0], 1, produce[key][1])
            t++;
        }

        t = 0;
        for (const key in specialty) {
            container.setSlot(`slotSpecialty${t}`, specialty[key][0], 1, specialty[key][1])
            t++;
        }
    }
}

AnalyzerUi.setup();