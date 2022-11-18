IDRegistry.genBlockID("rainmaker");
Block.createBlock("rainmaker", [
    {name: "Rainmaker", texture: [["rainmaker_pedestal", 0]], inCreative: true}
]);

{
    const render = new ICRender.Model();
    const model = BlockRenderer.createModel();
    BlockRenderer.setStaticICRender(BlockID.rainmaker, 0, render);

    //Pedestal
    model.addBox(
        0, 0, 0,
        1, 1 / 16, 1,
        [
            ["rainmaker_pedestal", 1], ["rainmaker_pedestal", 0], ["rainmaker_pedestal", 2], ["rainmaker_pedestal", 2],
            ["rainmaker_pedestal", 3],
        ],
    );

    //Column
    model.addBox(
        6 / 16, 1 / 16, 6 / 16,
        10 / 16, 1, 10 / 16,
        [
            ["rainmaker_column", 0], ["rainmaker_column", 0], ["rainmaker_column", 2], ["rainmaker_column", 2],
            ["rainmaker_column", 1],
        ],
    );

    //Extension
    model.addBox(
        1 / 16, 7 / 16, 7 / 16,
        15 / 16, 9 / 16, 9 / 16,
        [
            ["rainmaker_extension", 0], ["rainmaker_extension", 0], ["rainmaker_extension", 1], ["rainmaker_extension", 1],
            ["rainmaker_extension", 0],
        ],
    );

    //Left Blade
    model.addBox(
        3 / 16, 2 / 16, 4 / 16,
        4 / 16, 14 / 16, 12 / 16,
        [
            ["rainmaker_blade", 0], ["rainmaker_blade", 0], ["rainmaker_blade", 0], ["rainmaker_blade", 0],
            ["rainmaker_blade", 1], ["rainmaker_blade", 2],
        ],
    );

    //Right Blade
    model.addBox(
        13 / 16, 2 / 16, 4 / 16,
        14 / 16, 14 / 16, 12 / 16,
        [
            ["rainmaker_blade", 0], ["rainmaker_blade", 0], ["rainmaker_blade", 0], ["rainmaker_blade", 0],
            ["rainmaker_blade", 2], ["rainmaker_blade", 1],
        ],
    );

    render.addEntry(model);
}

Item.registerUseFunction(ItemID.dissipationCharge, (coords, item, block, player) => {
    if (block.id === BlockID.rainmaker && Entity.getDimension(player) === EDimension.NORMAL && World.getWeather().rain > 0) {
        World.setWeather({
            rain: 0,
            thunder: 0
        });
        Player.decreaseCarriedItem(1);
    }
});

Item.registerUseFunction(ItemID.iodineCapsule, (coords, item, block, player) => {
    if (block.id === BlockID.rainmaker && Entity.getDimension(player) === EDimension.NORMAL && World.getWeather().rain === 0) {
        World.setWeather({
            rain: 1,
            thunder: 0
        });
        Player.decreaseCarriedItem(1);
    }
});

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.rainmaker, count: 1, data: 0}, [
        "tgt",
        "gcg",
        "tgt"
    ], ['t', ItemID.gearTin, 0, 'g', 20, 0, 'c', ItemID.hardenedMachine, 0]);
});
