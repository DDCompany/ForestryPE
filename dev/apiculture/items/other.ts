IDRegistry.genItemID("honeyDrop");
Item.createItem("honeyDrop", "forestry.item.honey_drop", {name: "honeyDrop"}, {});
Item.setCategory(ItemID.honeyDrop, EItemCategory.MATERIAL);

IDRegistry.genItemID("honeydew");
Item.createItem("honeydew", "forestry.item.honeydew", {name: "honeydew"}, {});
Item.setCategory(ItemID.honeydew, EItemCategory.MATERIAL);

IDRegistry.genItemID("royalJelly");
Item.createItem("royalJelly", "forestry.item.royal_jelly", {name: "royalJelly"}, {});
Item.setCategory(ItemID.royalJelly, EItemCategory.MATERIAL);

IDRegistry.genItemID("waxCast");
Item.createItem("waxCast", "forestry.item.wax_cast", {name: "waxCast"}, {});
Item.setCategory(ItemID.waxCast, EItemCategory.MATERIAL);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: VanillaItemID.speckled_melon, count: 1, data: 0}, [
        "hdh",
        "hmh",
        "hdh"
    ], ['h', ItemID.honeyDrop, 0, 'd', ItemID.honeydew, 0, 'm', VanillaItemID.melon, 0]);

    Recipes.addShaped({id: ItemID.pulsatingMesh, count: 1, data: 0}, [
        "w w",
        " w ",
        "w w"
    ], ['w', ItemID.propolisPulse, -1]);

    Recipes.addShaped({id: ItemID.waxCast, count: 1, data: 0}, [
        "www",
        "w w",
        "www"
    ], ['w', ItemID.beeswax, -1]);
});