if (ForestryConfig.oresBlocksEnabled) {
    IDRegistry.genBlockID("blockCopper");
    Block.createBlock("blockCopper", [
        {name: "forestry.block.copper_block", texture: [["block_copper", 0]], inCreative: true},
    ]);
    ToolAPI.registerBlockMaterial(BlockID.blockCopper, "stone", 1);

    IDRegistry.genBlockID("blockTin");
    Block.createBlock("blockTin", [
        {name: "forestry.block.tin_block", texture: [["block_tin", 0]], inCreative: true},
    ]);
    ToolAPI.registerBlockMaterial(BlockID.blockTin, "stone", 1);

    IDRegistry.genBlockID("blockBronze");
    Block.createBlock("blockBronze", [
        {name: "forestry.block.bronze_block", texture: [["block_bronze", 0]], inCreative: true},
    ]);
    ToolAPI.registerBlockMaterial(BlockID.blockBronze, "stone", 1);

    IDRegistry.genBlockID("blockApatite");
    Block.createBlock("blockApatite", [
        {name: "forestry.block.apatite_block", texture: [["block_apatite", 0]], inCreative: true},
    ]);
    ToolAPI.registerBlockMaterial(BlockID.blockApatite, "stone", 1);

    Item.addCreativeGroup("forestry_ore_blocks", t("forestry.creative_group.ore_blocks"), [
        BlockID.blockCopper,
        BlockID.blockTin,
        BlockID.blockBronze,
        BlockID.blockApatite,
    ]);

    Callback.addCallback("PostLoaded", () => {
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