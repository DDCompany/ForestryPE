IMPORT("energylib");
IMPORT("flags");
IMPORT("ToolType");
IMPORT("BackpackAPI");

const LOG_TAG = "ForestryPE";
const startTime = java.lang.System.currentTimeMillis();
const APATITE_GEN_BIOMES = [3, 131, 34, 162];
const EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
const RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
const AdaptedScriptEntity = ModAPI.requireGlobal("Entity");
const setLoadingTip = ModAPI.requireGlobal("MCSystem.setLoadingTip");
const Dimension = Native.Dimension;
const COMBS = [];

if (ForestryConfig.beekeepingMode > 4 || ForestryConfig.beekeepingMode < 0) {
    ForestryConfig.beekeepingMode = 1;
    log("Invalid beekeeping mode. Switched to '1'", "ERROR");
}

let BM_MUTATION_MODIFIER = 0;
let BM_LIFESPAN_MODIFIER = 0;
let BM_SPEED_MODIFIER = 0;
let BM_REDUCES_FERTILITY = true;
let BM_CAN_FATIGUE = true;

switch (ForestryConfig.beekeepingMode) {
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
    case 4:
        BM_MUTATION_MODIFIER = 0.2;
        BM_LIFESPAN_MODIFIER = 10.0;
        BM_SPEED_MODIFIER = 0.6;
        BM_REDUCES_FERTILITY = true;
        BM_CAN_FATIGUE = true;
}

Entity.getArmorSlot = function (ent) {
    return AdaptedScriptEntity.getArmor(ent);
};

function log(msg, tag) {
    Logger.Log("[" + LOG_TAG + "] " + msg, tag);
}

function summonException(msg) {
    throw new function () {
        this.toString = function () {
            return msg;
        }
    };
}