IDRegistry.genBlockID("fabricator");
Block.createBlockWithRotation("fabricator", [
    {
        name: "forestry.block.thermionic_fabricator",
        texture: [["fabricator_bottom", 0], ["fabricator_top", 0], ["fabricator_side", 0], ["fabricator_front", 0], ["fabricator_side", 0]],
        inCreative: true,
    },
]);
GROUP_ITEM_PIPE.add(BlockID.fabricator, -1);

Item.addCreativeGroup("forestryMachine", t("forestry.creative_group.machines"), [
    BlockID.fabricator,
]);

Recipes.addShaped({id: BlockID.fabricator, count: 1, data: 0}, [
    "cgc",
    "g g",
    "cbc"
], ['c', VanillaItemID.gold_ingot, -1, 'g', VanillaBlockID.glass, -1, 'b', VanillaBlockID.chest, -1]);