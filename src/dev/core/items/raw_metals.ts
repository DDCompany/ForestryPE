IDRegistry.genItemID("metalRawCopper");
Item.createItem("metalRawCopper", "forestry.item.raw_copper", {name: "rawCopper"});

IDRegistry.genItemID("metalRawTin");
Item.createItem("metalRawTin", "forestry.item.raw_tin", {name: "rawTin"});

Item.addCreativeGroup("metalRaw", t("forestry.creative_group.raw_metals"), [
    ItemID.metalRawCopper,
    ItemID.metalRawTin,
]);

Callback.addCallback("PreLoaded", () => {
    Recipes.addShapeless({id: ItemID.metalRawCopper, count: 9, data: 0}, [{id: BlockID.blockRawCopper, data: 0}]);
    Recipes.addShapeless({id: ItemID.metalRawTin, count: 9, data: 0}, [{id: BlockID.blockRawTin, data: 0}]);
});