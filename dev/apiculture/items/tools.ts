ToolAPI.addToolMaterial("scoop", {
    durability: 10,
    level: 4,
    efficiency: 12,
    damage: 0,
});

const scoopToolType = {
    blockTypes: ["beehive"]
};

IDRegistry.genItemID("scoop");
Item.createItem("scoop", "forestry.item.scoop", {name: "scoop"}, {stack: 1});
ToolLib.setTool(ItemID.scoop, "scoop", scoopToolType);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: ItemID.scoop, count: 1, data: 0}, [
        "sws",
        "sss",
        " s "
    ], ['w', VanillaBlockID.wool, -1, 's', VanillaItemID.stick, -1]);
});