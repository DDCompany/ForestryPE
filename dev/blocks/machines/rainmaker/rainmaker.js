Block.setPrototype("rainmaker", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{
            name: "Rain Maker",
            texture: [["rainmaker", 1], ["rainmaker", 2], ["rainmaker", 5], ["rainmaker", 5], ["rainmaker", 0]],
            inCreative: true
        },
            {
                name: "rainmaker_misc_tile",
                texture: [["rainmaker", 4], ["rainmaker", 4], ["rainmaker", 4], ["rainmaker", 4], ["rainmaker", 3]]
            }];
    }

});

Block.setBlockShape(BlockID.rainmaker, {x: 0.3, y: 0, z: 0.3}, {x: 0.6, y: 0.6, z: 0.6});

var rainmaker_render = new TileRenderModel(BlockID.rainmaker, 0);
//plarform
rainmaker_render.addBoxF(0, 0, 0, 1, 0.07, 1, {id: BlockID.rainmaker, data: 0});
//main
rainmaker_render.addBoxF(0.4, 0.07, 0.4, 0.6, 0.97, 0.6, {id: BlockID.rainmaker, data: 0});
//rod
rainmaker_render.addBoxF(0.1, 0.44, 0.44, 0.88, 0.57, 0.57, {id: 35, data: 15});
//blades
rainmaker_render.addBoxF(0.2, 0.15, 0.25, 0.3, 0.85, 0.75, {id: BlockID.rainmaker, data: 1});
rainmaker_render.addBoxF(0.7, 0.15, 0.25, 0.8, 0.85, 0.75, {id: BlockID.rainmaker, data: 1});

IDRegistry.genItemID("iodineCapsule");
Item.createItem("iodineCapsule", "Iodine Capsule", {name: "iodineCapsule", meta: 0}, {});

IDRegistry.genItemID("dissipationCharge");
Item.createItem("dissipationCharge", "Dissipation charge", {name: "dissipationCharge", meta: 0}, {});

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
