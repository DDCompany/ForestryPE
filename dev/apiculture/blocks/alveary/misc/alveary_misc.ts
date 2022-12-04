IDRegistry.genBlockID("alvearyMisc");
Block.createBlock("alvearyMisc", [
    {name: "forestry.block.alveary_misc", texture: [["alveary_misc", 0]], inCreative: false}
]);
ToolAPI.registerBlockMaterial(BlockID.alvearyMisc, "wood");
ApiaryRegistry.register(BlockID.alvearyMisc);