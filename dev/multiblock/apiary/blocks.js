IDRegistry.genBlockID("alveary");
Block.createBlock("alveary", [
    {name: "Alveary", texture: [["alveary_bottom", 0], ["alveary_bottom", 0], ["alveary_plain", 0]], inCreative: true}
]);

IDRegistry.genBlockID("alvearyFan");
Block.createBlock("alvearyFan", [
    {name: "Alveary Fan", texture: [["alveary_fan", 0]], inCreative: true}
]);

IDRegistry.genBlockID("alvearyHeater");
Block.createBlock("alvearyHeater", [
    {name: "Alveary Heater", texture: [["alveary_heater", 0]], inCreative: true}
]);

IDRegistry.genBlockID("alvearyHygroregulator");
Block.createBlock("alvearyHygroregulator", [
    {name: "Alveary Hygroregulator", texture: [["alveary_valve", 0]], inCreative: true}
]);

IDRegistry.genBlockID("alvearyStabiliser");
Block.createBlock("alvearyStabiliser", [
    {name: "Alveary Stabiliser", texture: [["alveary_stabiliser", 0]], inCreative: true}
]);

IDRegistry.genBlockID("swarmer");
Block.createBlock("swarmer", [
    {name: "Swarmer", texture: [["alveary_swarmer", 0]], inCreative: true}
]);

IDRegistry.genBlockID("alveary_misc");
Block.createBlock("alveary_misc", [
    {name: "alveary_misc", texture: [["alveary_misc", 0]], inCreative: false}
]);

var multiblock_apiary = [BlockID.alveary_misc, BlockID.alveary, BlockID.alvearyFan, BlockID.alvearyHeater, BlockID.alvearyHygroregulator, BlockID.alvearyStabiliser, BlockID.swarmer];

ToolAPI.registerBlockMaterialAsArray("wood", multiblock_apiary);
ToolAPI.registerBlockMaterial(BlockID.alveary_misc, "unbreaking");

Callback.addCallback("PostLoaded", function () {

    Recipes.addShaped({id: BlockID.alveary, count: 1, data: 0}, [
        "ddd",
        "dmd",
        "ddd"
    ], ['d', BlockID.impregnatedCasing, 0, 'm', ItemID.scentedPaneling, 0]);

    Recipes.addShaped({id: BlockID.alvearyFan, count: 1, data: 0}, [
        "i i",
        " m ",
        "igi"
    ], ['i', 265, 0, 'm', BlockID.alveary, 0, 'g', ItemID.thermionicTubeGold, 0]);

    Recipes.addShaped({id: BlockID.alvearyHeater, count: 1, data: 0}, [
        "gig",
        " m ",
        "sss"
    ], ['i', 265, 0, 'm', BlockID.alveary, 0, 'g', ItemID.thermionicTubeGold, 0, 's', 1, 0]);

    Recipes.addShaped({id: BlockID.swarmer, count: 1, data: 0}, [
        "gig",
        " m ",
        "gig"
    ], ['i', 266, 0, 'm', BlockID.alveary, 0, 'g', ItemID.thermionicTubeDiamond, 0]);

    Recipes.addShaped({id: BlockID.alvearyHygroregulator, count: 1, data: 0}, [
        "gig",
        "gmg",
        "gig"
    ], ['i', 265, 0, 'm', BlockID.alveary, 0, 'g', 20, 0]);

    Recipes.addShaped({id: BlockID.alvearyStabiliser, count: 1, data: 0}, [
        "g g",
        "gmg",
        "g g"
    ], ['m', BlockID.alveary, 0, 'g', 406, 0]);

});