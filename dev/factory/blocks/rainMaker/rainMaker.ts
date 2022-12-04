IDRegistry.genBlockID("rainmaker");
Block.createBlock("rainmaker", [
    {name: "forestry.block.rainmaker", texture: [["rainmaker_pedestal", 0]], inCreative: true}
]);
RainMakerRenderer.setStaticRender(BlockID.rainmaker);
GROUP_ITEM_PIPE.add(BlockID.rainmaker, 0);

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: BlockID.rainmaker, count: 1, data: 0}, [
        "tgt",
        "gcg",
        "tgt"
    ], ['t', ItemID.gearTin, -1, 'g', VanillaBlockID.glass, -1, 'c', ItemID.hardenedMachine, -1]);
});
