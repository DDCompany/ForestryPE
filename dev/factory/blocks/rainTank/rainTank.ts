if (ForestryConfig.rainTankEnabled) {
    IDRegistry.genBlockID("rainTank");
    Block.createBlock("rainTank", [
        {
            name: "forestry.block.rain_tank",
            texture: [["rainTank", 0], ["rainTank", 0], ["rainTank", 1]],
            inCreative: true,
        },
    ]);
    GROUP_ITEM_PIPE.add(BlockID.rainTank, -1);

    Callback.addCallback("PostLoaded", () => {
        Recipes.addShaped({id: BlockID.rainTank, count: 1, data: 0}, [
            "igi",
            "isi",
            "igi"
        ], ['i', VanillaItemID.iron_ingot, -1, 'g', VanillaBlockID.glass, -1, 's', ItemID.sturdyMachine, -1]);
    });
}