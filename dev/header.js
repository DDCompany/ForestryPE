/*
  ______                  _                _____  ______
 |  ____|                | |              |  __ \|  ____|
 | |__ ___  _ __ ___  ___| |_ _ __ _   _  | |__) | |__
 |  __/ _ \| '__/ _ \/ __| __| '__| | | | |  ___/|  __|
 | | | (_) | | |  __/\__ \ |_| |  | |_| | | |    | |____
 |_|  \___/|_|  \___||___/\__|_|   \__, | |_|    |______|
                                    __/ |
                                   |___/
Forestry PE by Dmitriy Medvedev(https://vk.com/id331953744)
*/

importLib("energylib", "*");
importLib("flags", "*");
importLib("ToolType", "*");
IMPORT("BackpackAPI");

const startTime = java.lang.System.currentTimeMillis();
const APATITE_GEN_BIOMES = [3, 131, 34, 162];
const EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
const RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
const AdaptedScriptEntity = ModAPI.requireGlobal("Entity");
const setLoadingTip = ModAPI.requireGlobal("MCSystem.setLoadingTip");
const Dimension = Native.Dimension;
const COMBS = [];

let BM_MUTATION_MODIFIER = 0.2;
let BM_LIFESPAN_MODIFIER = 10;
let BM_SPEED_MODIFIER = 0.6;
let BM_REDUCES_FERTILITY = true;
let BM_CAN_FATIGUE = true;

let BeekeepingMode = __config__.getNumber("beekeeping.mode");

switch (BeekeepingMode) {
    case 0:
        BM_MUTATION_MODIFIER = 2.0;
        BM_LIFESPAN_MODIFIER = 1.0;
        BM_SPEED_MODIFIER = 1.0;
        BM_REDUCES_FERTILITY = false;
        BM_CAN_FATIGUE = false;
        break;
    case 1:
        BM_MUTATION_MODIFIER = 1.0;
        BM_LIFESPAN_MODIFIER = 1.0;
        BM_SPEED_MODIFIER = 1.0;
        BM_REDUCES_FERTILITY = false;
        BM_CAN_FATIGUE = true;
        break;
    case 2:
        BM_MUTATION_MODIFIER = 0.75;
        BM_LIFESPAN_MODIFIER = 1.5;
        BM_SPEED_MODIFIER = 1.0;
        BM_REDUCES_FERTILITY = false;
        BM_CAN_FATIGUE = true;
        break;
    case 3:
        BM_MUTATION_MODIFIER = 0.5;
        BM_LIFESPAN_MODIFIER = 5.0;
        BM_SPEED_MODIFIER = 0.8;
        BM_REDUCES_FERTILITY = true;
        BM_CAN_FATIGUE = true;
        break;
}

Entity.getArmorSlot = function (ent) {
    return AdaptedScriptEntity.getArmor(ent);
};