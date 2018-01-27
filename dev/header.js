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

const EU = EnergyTypeRegistry.assureEnergyType("Eu", 1);
const RF = EnergyTypeRegistry.assureEnergyType("RF", 0.25);
const AdaptedScriptEntity = ModAPI.requireGlobal("Entity");

Entity.getArmorSlot = function (ent) {
    return AdaptedScriptEntity.getArmor(ent);
}