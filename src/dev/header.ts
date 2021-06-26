/*
 *    ______                  _               _____  ______
 *   |  ____|                | |             |  __ \\|  ____|
 *   | |__ ___  _ __ ___  ___| |_ _ __ _   _ | |__) | |__
 *   |  __/ _ \\|'__/ _ \\/ __| __| '__| | | | |  ___/|  __|
 *   | | | (_) ||| __/\\__ \\ |_| |  | |_| | | |    | |____
 *   |_| \\___/|_ \\___||___/\\__|_| \\__, | |_|    |______|
 *                                    __/ |
 *                                   |___/
 *
 * Terms of use:
 *  - Forbidden to distribute the library on third-party sources
 *    without links to the official group (https://vk.com/forestry_pe)
 *  - Forbidden to change the code of this mod
 *  - Forbidden to explicitly copy the code to other libraries or mods
 *  - Using the mod you automatically agree to the conditions described above
 *
 * Warning!
 * All ideas and textures belong to the original author - https://github.com/ForestryMC/ForestryMC
 *
 * Port by DDCompany (https://vk.com/forestry_pe)
 */

IMPORT("ToolLib");

function random(min: number, max?: number) {
    if (max === undefined) {
        max = min;
        min = 0;
    }

    return Math.random() * (max - min) + min;
}