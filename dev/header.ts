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
IMPORT("BackpackAPI");
IMPORT("StorageInterface");
IMPORT("BlockEngine");
IMPORT("ToolLib");

const EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
const RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
const GROUP_ITEM_PIPE = ICRender.getGroup("item-pipe");