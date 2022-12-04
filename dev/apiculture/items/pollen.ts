IDRegistry.genItemID("pollen");
Item.createItem("pollen", "forestry.item.crystalline_pollen_cluster", {name: "pollen"}, {});

IDRegistry.genItemID("pollen1");
Item.createItem("pollen1", "forestry.item.pollen_cluster", {name: "pollen", data: 1}, {});

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: VanillaItemID.slime_ball, count: 1, data: 0}, [
        "pdp",
        "pdp",
        "pdp"
    ], ['p', ItemID.propolis, -1, 'd', ItemID.pollen1, -1]);
});