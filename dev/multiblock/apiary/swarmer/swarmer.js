IDRegistry.genBlockID("swarmer");
Block.createBlock("swarmer", [
    {name: "Swarmer", texture: [["alveary_swarmer", 0]], inCreative: true}
]);

ToolAPI.registerBlockMaterial(BlockID.swarmer, "wood");
ApiaryRegistry.register(BlockID.swarmer);

Callback.addCallback("PostLoaded", function () {

    Recipes.addShaped({id: BlockID.swarmer, count: 1, data: 0}, [
        "gig",
        " m ",
        "gig"
    ], ['i', 266, 0, 'm', BlockID.alveary, 0, 'g', ItemID.thermionicTubeDiamond, 0]);

});