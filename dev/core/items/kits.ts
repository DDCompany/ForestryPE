IDRegistry.genItemID("carton");
Item.createItem("carton", "forestry.item.carton", {name: "carton"}, {});

IDRegistry.genItemID("kitPickaxe");
Item.createItem("kitPickaxe", "forestry.item.pickaxe_kit", {name: "kitPickaxe"}, {stack: 24});

IDRegistry.genItemID("kitShovel");
Item.createItem("kitShovel", "forestry.item.shovel_kit", {name: "kitShovel"}, {stack: 24});

function crateUseKitCallback(itemId: number): Callback.ItemUseLocalFunction {
    return (coords, item, block, player) => {
        const blockSource = BlockSource.getDefaultForActor(player);
        if (!blockSource) {
            return;
        }

        const relative = coords.relative;
        blockSource.spawnDroppedItem(
            relative.x + 0.5,
            relative.y + 0.1,
            relative.z + 0.5,
            itemId, 1, 0,
        )
        PlayerUtils.decreaseCarriedItem(player);
    }
}

Item.registerUseFunction("kitPickaxe", crateUseKitCallback(ItemID.forestryBronzePickaxe));
Item.registerUseFunction("kitShovel", crateUseKitCallback(ItemID.forestryBronzeShovel));

Callback.addCallback("PostLoaded", () => {
    Recipes.addShapeless({id: ItemID.kitPickaxe, data: 0, count: 1},
        [{id: ItemID.forestryBronzePickaxe, data: 0}, {id: ItemID.carton, data: 0}]);
    Recipes.addShapeless({id: ItemID.kitShovel, data: 0, count: 1},
        [{id: ItemID.forestryBronzeShovel, data: 0}, {id: ItemID.carton, data: 0}]);
});