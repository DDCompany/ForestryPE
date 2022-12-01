Block.setPrototype("blockWax", {
    type: Block.TYPE_BASE,

    getVariations() {
        return [
            {
                name: "Wax Block",
                texture: [["block_wax", 0]],
                inCreative: true
            }
        ];
    }
});
Block.setBlockMaterial(BlockID.blockWax, "dirt", 1);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.blockWax, count: 1, data: 0}, [
        "iii",
        "iii",
        "iii"
    ], ['i', ItemID.beeswax, 0]);
    Recipes.addShapeless({id: ItemID.beeswax, count: 9, data: 0}, [{id: BlockID.blockWax, data: 0}]);
});

if (ForestryConfig.combsBlocksEnabled) {
    Block.setPrototype("blockComb", {
        type: Block.TYPE_BASE,

        getVariations() {
            return [
                {
                    name: "Cocoa Comb Block",
                    texture: [["comb_block_cocoa", 0]],
                    inCreative: true
                },
                {
                    name: "Dripping Comb Block",
                    texture: [["comb_block_dripping", 0]],
                    inCreative: true
                },
                {
                    name: "Honey Comb Block",
                    texture: [["comb_block_honey", 0]],
                    inCreative: true
                },
                {
                    name: "Frozen Comb Block",
                    texture: [["comb_block_frozen", 0]],
                    inCreative: true
                },
                {
                    name: "Mellow Comb Block",
                    texture: [["comb_block_mellow", 0]],
                    inCreative: true
                },
                {
                    name: "Mossy Comb Block",
                    texture: [["comb_block_mossy", 0]],
                    inCreative: true
                },
                {
                    name: "Mysterious Comb Block",
                    texture: [["comb_block_mysterious", 0]],
                    inCreative: true
                },
                {
                    name: "Parched Comb Block",
                    texture: [["comb_block_parched", 0]],
                    inCreative: true
                },
                {
                    name: "Powdery Comb Block",
                    texture: [["comb_block_powdery", 0]],
                    inCreative: true
                },
                {
                    name: "Silky Comb Block",
                    texture: [["comb_block_silky", 0]],
                    inCreative: true
                },
                {
                    name: "Simmering Comb Block",
                    texture: [["comb_block_simmering", 0]],
                    inCreative: true
                },
                {
                    name: "Stringy Comb Block",
                    texture: [["comb_block_stringy", 0]],
                    inCreative: true
                },
                {
                    name: "Wheaten Comb Block",
                    texture: [["comb_block_wheaten", 0]],
                    inCreative: true
                },
                {
                    name: "Irradiated Comb Block",
                    texture: [["comb_block_irradiated", 0]],
                    inCreative: true
                },
            ];
        }
    });
    Block.setBlockMaterial(BlockID.blockComb, "stone", 1);

    Item.addCreativeGroup(GROUP_COMB_BLOCKS, GROUP_COMB_BLOCKS_NAME, [BlockID.blockComb]);

    Callback.addCallback("PostLoaded", () => {
        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 0}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combCocoa, 0]);
        Recipes.addShapeless({id: ItemID.combCocoa, count: 9, data: 0}, [{id: BlockID.blockComb, data: 0}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 1}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combDripping, 0]);
        Recipes.addShapeless({id: ItemID.combDripping, count: 9, data: 0}, [{id: BlockID.blockComb, data: 1}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 2}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combHoney, 0]);
        Recipes.addShapeless({id: ItemID.combHoney, count: 9, data: 0}, [{id: BlockID.blockComb, data: 2}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 3}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combFrozen, 0]);
        Recipes.addShapeless({id: ItemID.combFrozen, count: 9, data: 0}, [{id: BlockID.blockComb, data: 3}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 4}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combMellow, 0]);
        Recipes.addShapeless({id: ItemID.combMellow, count: 9, data: 0}, [{id: BlockID.blockComb, data: 4}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 5}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combMossy, 0]);
        Recipes.addShapeless({id: ItemID.combMossy, count: 9, data: 0}, [{id: BlockID.blockComb, data: 5}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 6}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combMysterious, 0]);
        Recipes.addShapeless({id: ItemID.combMysterious, count: 9, data: 0}, [{id: BlockID.blockComb, data: 6}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 7}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combParched, 0]);
        Recipes.addShapeless({id: ItemID.combParched, count: 9, data: 0}, [{id: BlockID.blockComb, data: 7}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 8}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combPowdery, 0]);
        Recipes.addShapeless({id: ItemID.combPowdery, count: 9, data: 0}, [{id: BlockID.blockComb, data: 8}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 9}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combSilky, 0]);
        Recipes.addShapeless({id: ItemID.combSilky, count: 9, data: 0}, [{id: BlockID.blockComb, data: 9}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 10}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combSimmering, 0]);
        Recipes.addShapeless({id: ItemID.combSimmering, count: 9, data: 0}, [{id: BlockID.blockComb, data: 10}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 11}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combStringy, 0]);
        Recipes.addShapeless({id: ItemID.combStringy, count: 9, data: 0}, [{id: BlockID.blockComb, data: 11}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 12}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combWheaten, 0]);
        Recipes.addShapeless({id: ItemID.combWheaten, count: 9, data: 0}, [{id: BlockID.blockComb, data: 12}]);

        Recipes.addShaped({id: BlockID.blockComb, count: 1, data: 13}, [
            "iii",
            "iii",
            "iii"
        ], ['i', ItemID.combIrradiated, 0]);
        Recipes.addShapeless({id: ItemID.combIrradiated, count: 9, data: 0}, [{id: BlockID.blockComb, data: 13}]);
    });
}