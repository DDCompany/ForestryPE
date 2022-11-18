IMPORT("EnergyNet");
IMPORT("flags");
IMPORT("ToolLib");
IMPORT("BackpackAPI");
IMPORT("StorageInterface");

const LOG_TAG = "ForestryPE";
const GROUP_ITEM_PIPE = ICRender.getGroup("item-pipe");
const startTime = java.lang.System.currentTimeMillis();
const APATITE_GEN_BIOMES = [3, 131, 34, 162];
const EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
const RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
const setLoadingTip = ModAPI.requireGlobal("MCSystem.setLoadingTip");
const Dimension = Native.Dimension;
const COMBS: number[] = [];

function log(msg: string, tag: string) {
    Logger.Log("[" + LOG_TAG + "] " + msg, tag);
}

function summonException(msg: string): never {
    throw new Error(msg);
}

function values<T>(obj: Record<string, T>): T[] {
    let result = [], key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            result.push(obj[key]);
        }
    }

    return result;
}

interface ChancedRecipeItem {
    id: number;

    data?: number;

    count?: number;

    chance?: number;
}

interface RecipeItem {
    id: number;

    data?: number;

    count?: number;
}

interface SingleRecipeItem {
    id: number;

    data?: number;
}