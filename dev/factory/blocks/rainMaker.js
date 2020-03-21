IDRegistry.genItemID("rainMaker");
Item.createItem("rainMaker", "Rainmaker", {name: "rainMaker", meta: 0}, {});

Item.registerUseFunctionForID(ItemID.rainMaker, function (coords) {
    let relative = coords.relative;
    if (relative) {
        World.setBlock(relative.x, relative.y, relative.z, BlockID.rainmaker, 0);
        Player.decreaseCarriedItem(1);
    }
});

Block.setPrototype("rainmaker", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{
            name: "Rainmaker",
            texture: [["rainmaker", 1], ["rainmaker", 2], ["rainmaker", 5], ["rainmaker", 5], ["rainmaker", 0]],
            inCreative: false
        }]
    }

});

Block.registerDropFunctionForID(BlockID.rainmaker, function () {
    return [[ItemID.rainMaker, 1, 0]];
});

Block.setBlockShape(BlockID.rainmaker, {x: 0.3, y: 0, z: 0.3}, {x: 0.6, y: 0.6, z: 0.6});

BlockRenderer.addRenderCallback(BlockID.rainmaker, function (api, coords) {

    api.renderBoxId(coords.x, coords.y, coords.z, 0, 0, 0, 1, 0.07, 1, BlockID.rainmaker, 0);

    api.renderBoxId(coords.x, coords.y, coords.z, 0.4, 0.07, 0.4, 0.6, 0.97, 0.6, BlockID.rainmaker, 0);

    api.renderBoxId(coords.x, coords.y, coords.z, 0.1, 0.44, 0.44, 0.88, 0.57, 0.57, 35, 15);

    api.renderModel(coords.x, coords.y, coords.z, BlockRenderer.createTexturedBox(0.2, 0.15, 0.25, 0.3, 0.85, 0.75, [["rainmaker", 4], ["rainmaker", 4], ["rainmaker", 4], ["rainmaker", 4], ["rainmaker", 3]]));
    api.renderModel(coords.x, coords.y, coords.z, BlockRenderer.createTexturedBox(0.7, 0.15, 0.25, 0.8, 0.85, 0.75, [["rainmaker", 4], ["rainmaker", 4], ["rainmaker", 4], ["rainmaker", 4], ["rainmaker", 3]]));

});

BlockRenderer.enableCustomRender(BlockID.rainmaker);

IDRegistry.genItemID("iodineCapsule");
Item.createItem("iodineCapsule", "Iodine Capsule", {name: "iodineCapsule", meta: 0}, {});

IDRegistry.genItemID("dissipationCharge");
Item.createItem("dissipationCharge", "Dissipation Charge", {name: "dissipationCharge", meta: 0}, {});

Item.registerUseFunction("dissipationCharge", function (coords, item, block) {
    if (block.id === BlockID.rainmaker && World.getWeather().rain > 0) {
        World.setWeather({
            rain: 0,
            thunder: 0
        });
        item.count--;
        if (!item.count) {
            item.id = 0;
        }
        Player.setCarriedItem(item.id, item.count, 0);
    }
});

Item.registerUseFunction("iodineCapsule", function (coords, item, block) {
    if (block.id === BlockID.rainmaker && World.getWeather().rain === 0) {
        World.setWeather({
            rain: 1,
            thunder: 0
        });
        item.count--;
        if (!item.count) {
            item.id = 0;
        }
        Player.setCarriedItem(item.id, item.count, 0);
    }
});

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.rainmaker, count: 1, data: 0}, [
        "tgt",
        "gcg",
        "tgt"
    ], ['t', ItemID.gearTin, 0, 'g', 20, 0, 'c', ItemID.hardenedMachine, 0]);
});
