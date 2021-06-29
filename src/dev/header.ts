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

function assert(condition: any, errorMessage: string) {
    if (!condition) {
        throw errorMessage;
    }
}

function capitalize(str: string) {
    if (!str.length) {
        return "";
    }

    if (str.length === 1) {
        return str[0].toUpperCase();
    }

    return str[0].toUpperCase() + str.substring(1);
}

//Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign !== 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target === null || target === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource !== null && nextSource !== undefined) {
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}