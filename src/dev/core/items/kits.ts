IDRegistry.genItemID("carton");
Item.createItem("carton", "forestry.item.carton", {name: "carton"});

IDRegistry.genItemID("kitPickaxe");
Item.createItem("kitPickaxe", "forestry.item.pickaxe_kit", {name: "kitPickaxe"}, {stack: 24});

IDRegistry.genItemID("kitShovel");
Item.createItem("kitShovel", "forestry.item.shovel_kit", {name: "kitShovel"}, {stack: 24});

Item.addCreativeGroup("kits", t("forestry.creative_group.kits"), [
    ItemID.kitPickaxe,
    ItemID.kitShovel,
]);

Callback.addCallback("ItemUse", ({x, y, z}, {id, count, data}, block, isExternal, player) => {
    if (id !== ItemID.kitPickaxe && id !== ItemID.kitShovel) {
        return;
    }

    const assembled = id === ItemID.kitPickaxe ? ItemID.forestryPickaxe : ItemID.forestryShovel;
    BlockSource.getDefaultForActor(player).spawnDroppedItem(x, y, z, assembled, 1, 0);

    if (--count === 0) {
        Entity.setCarriedItem(player, 0, 0, 0);
        return;
    }

    Entity.setCarriedItem(player, id, count, data);
});

Callback.addCallback("PreLoaded", () => {
    Recipes.addShapeless({id: ItemID.kitPickaxe, data: 0, count: 1},
        [{id: ItemID.forestryPickaxe, data: 0}, {id: ItemID.carton, data: 0}]);
    Recipes.addShapeless({id: ItemID.kitShovel, data: 0, count: 1},
        [{id: ItemID.forestryShovel, data: 0}, {id: ItemID.carton, data: 0}]);
});