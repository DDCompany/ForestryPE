/*
 *  ___               _            ___ ___
 * | __|__ _ _ ___ __| |_ _ _ _  _| _ \ __|
 * | _/ _ \ '_/ -_|_-<  _| '_| || |  _/ _|
 * |_|\___/_| \___/__/\__|_|  \_, |_| |___|
 *                            |__/
 *
 * Github Repository: https://github.com/DDCompany/ForestryPE
 * Issues Tracker: https://github.com/DDCompany/ForestryPE/issues
 *
 * Terms of use:
 *  - Forbidden to distribute the library on third-party sources
      without links to the official group (https://vk.com/forestry_pe)
 *  - Forbidden to change the code of this mod
 *  - Forbidden to explicitly copy the code to other libraries or mods
 *  - Using the mod you automatically agree to the conditions described above
 *
 * Warning!
 * All ideas and textures belong to the original author - https://github.com/ForestryMC/ForestryMC
 *
 * Port by DDCompany (https://vk.com/forestry_pe)
 */

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