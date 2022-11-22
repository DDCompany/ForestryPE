IDRegistry.genBlockID("moistener");
FactoryManager.register("moistener", "Moistener",
    [["moistener_top", 0], ["moistener_top", 0], ["moistener", 0], ["moistener", 0], ["moistener_side", 0], ["moistener_side", 0]], true);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.moistener, count: 1, data: 0}, [
        "gsg",
        "sbs",
        "gsg"
    ], ['b', BlockID.fermenter, -1, 'g', ItemID.gearCopper, -1, 's', 20, -1]);
});

GROUP_ITEM_PIPE.add(BlockID.moistener, -1);