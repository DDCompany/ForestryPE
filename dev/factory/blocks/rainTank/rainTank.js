if (ForestryConfig.rainTankEnabled) {
    Block.setPrototype("rainTank", {
        type: Block.TYPE_BASE,

        getVariations() {
            return [{
                name: "Rain Tank",
                texture: [["rainTank", 0], ["rainTank", 0], ["rainTank", 1]],
                inCreative: true
            }];
        }

    });

    Callback.addCallback("PostLoaded", () => {
        Recipes.addShaped({id: BlockID.rainTank, count: 1, data: 0}, [
            "igi",
            "isi",
            "igi"
        ], ['i', 265, 0, 'g', 20, 0, 's', ItemID.sturdyMachine, 0]);
    });

    GROUP_ITEM_PIPE.add(BlockID.rainTank, -1);
}