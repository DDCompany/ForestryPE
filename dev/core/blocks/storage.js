Block.setPrototype("blockCharcoal", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [
            {
                name: "Charcoal Block",
                texture: [["block_charcoal", 0]],
                inCreative: true
            }
        ];
    }
});
Block.setBlockMaterial(BlockID.blockCharcoal, "stone", 1);

Block.setPrototype("blockAsh", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [
            {
                name: "Ash Block",
                texture: [["block_ash", 0]],
                inCreative: true
            }
        ];
    }
});
Block.setBlockMaterial(BlockID.blockAsh, "dirt", 1);

Block.setPrototype("ashBricks", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [
            {
                name: "Ash Bricks",
                texture: [["brick_ash", 0]],
                inCreative: true
            }
        ];
    }
});
Block.setBlockMaterial(BlockID.ashBricks, "stone", 1);

Callback.addCallback("PostLoaded", function () {
    Recipes.addShaped({id: BlockID.blockAsh, count: 1, data: 0}, [
        "iii",
        "iii",
        "iii"
    ], ['i', ItemID.ash, 0]);
    Recipes.addShapeless({id: ItemID.ash, count: 9, data: 0}, [{id: BlockID.blockAsh, data: 0}]);

    Recipes.addShaped({id: BlockID.ashBricks, count: 1, data: 0}, [
        "A#A",
        "# #",
        "A#A",
    ], ['A', ItemID.ash, 0, '#', 336, 0]);

    Recipes.addShaped({id: BlockID.blockCharcoal, count: 1, data: 0}, [
        "iii",
        "iii",
        "iii"
    ], ['i', 263, 1]);
    Recipes.addShapeless({id: 263, count: 9, data: 1}, [{id: BlockID.blockCharcoal, data: 0}]);
});

if (Config.oresBlocksEnabled) {
    Block.setPrototype("blockCopper", {
        type: Block.TYPE_BASE,

        getVariations: function () {
            return [
                {
                    name: "Copper Block",
                    texture: [["block_copper", 0]],
                    inCreative: true
                }
            ];
        }
    });
    Block.setBlockMaterial(BlockID.blockCopper, "stone", 1);

    Block.setPrototype("blockTin", {
        type: Block.TYPE_BASE,

        getVariations: function () {
            return [
                {
                    name: "Tin Block",
                    texture: [["block_tin", 0]],
                    inCreative: true
                }
            ];
        }
    });
    Block.setBlockMaterial(BlockID.blockTin, "stone", 1);

    Block.setPrototype("blockBronze", {
        type: Block.TYPE_BASE,

        getVariations: function () {
            return [
                {
                    name: "Bronze Block",
                    texture: [["block_bronze", 0]],
                    inCreative: true
                }
            ];
        }
    });
    Block.setBlockMaterial(BlockID.blockBronze, "stone", 1);

    Block.setPrototype("blockApatite", {
        type: Block.TYPE_BASE,

        getVariations: function () {
            return [
                {
                    name: "Apatite Block",
                    texture: [["block_apatite", 0]],
                    inCreative: true
                }
            ];
        }
    });
    Block.setBlockMaterial(BlockID.blockApatite, "stone", 1);

    Callback.addCallback("PostLoaded", function () {

        Recipes.addShaped({id: BlockID.blockCopper, count: 1, data: 0}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.ingotCopper, 0]);

        Recipes.addShaped({id: BlockID.blockTin, count: 1, data: 0}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.ingotTin, 0]);

        Recipes.addShaped({id: BlockID.blockBronze, count: 1, data: 0}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.ingotBronze, 0]);

        Recipes.addShaped({id: BlockID.blockApatite, count: 1, data: 0}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.apatite, 0]);

        Recipes.addShapeless({id: ItemID.ingotCopper, count: 9, data: 0}, [{id: BlockID.blockCopper, data: 0}]);
        Recipes.addShapeless({id: ItemID.ingotTin, count: 9, data: 0}, [{id: BlockID.blockTin, data: 0}]);
        Recipes.addShapeless({id: ItemID.ingotBronze, count: 9, data: 0}, [{id: BlockID.blockBronze, data: 0}]);
        Recipes.addShapeless({id: ItemID.apatite, count: 9, data: 0}, [{id: BlockID.blockApatite, data: 0}]);

    });
}