/* - BUCKETS - */
IDRegistry.genItemID("bucketBiomass");
Item.createItem("bucketBiomass", "Biomass bucket", {name: "bucketBiomass", meta: 0}, {stack: 1});

IDRegistry.genItemID("bucketEthanol");
Item.createItem("bucketEthanol", "Ethanol bucket", {name: "bucketEthanol", meta: 0}, {stack: 1});

/* - WAX CAPSULES - */
IDRegistry.genItemID("waxCapsuleEmpty");
Item.createItem("waxCapsuleEmpty", "Wax Capsule", {name: "waxCapsuleEmpty", meta: 0});

IDRegistry.genItemID("waxCapsuleWater");
Item.createItem("waxCapsuleWater", "Water wax Capsule", {name: "waxCapsuleWater", meta: 0});
Item.setLiquidClip(ItemID.waxCapsuleEmpty, true);

IDRegistry.genItemID("waxCapsuleJuice");
Item.createFoodItem("waxCapsuleJuice", "Juice wax Capsule", {name: "waxCapsuleJuice", meta: 0}, {food: 2});

IDRegistry.genItemID("waxCapsuleHoney");
Item.createFoodItem("waxCapsuleHoney", "Honey wax Capsule", {name: "waxCapsuleHoney", meta: 0}, {food: 2});

IDRegistry.genItemID("waxCapsuleSeedoil");
Item.createItem("waxCapsuleSeedoil", "Seedoil wax Capsule", {name: "waxCapsuleSeedoil", meta: 0});

IDRegistry.genItemID("waxCapsuleBiomass");
Item.createItem("waxCapsuleBiomass", "Biomass wax Capsule", {name: "waxCapsuleBiomass", meta: 0});

IDRegistry.genItemID("waxCapsuleEthanol");
Item.createItem("waxCapsuleEthanol", "Ethanol wax Capsule", {name: "waxCapsuleEthanol", meta: 0});

/* - CANS - */
IDRegistry.genItemID("canEmpty");
Item.createItem("canEmpty", "Can", {name: "canEmpty", meta: 0});

IDRegistry.genItemID("canWater");
Item.createItem("canWater", "Water Can", {name: "canWater", meta: 0});
Item.setLiquidClip(ItemID.canEmpty, true);

IDRegistry.genItemID("canLava");
Item.createItem("canLava", "Lava Can", {name: "canLava", meta: 0});

IDRegistry.genItemID("canJuice");
Item.createFoodItem("canJuice", "Juice Can", {name: "canJuice", meta: 0}, {food: 2});

IDRegistry.genItemID("canHoney");
Item.createFoodItem("canHoney", "Honey Can", {name: "canHoney", meta: 0}, {food: 2});

IDRegistry.genItemID("canSeedoil");
Item.createItem("canSeedoil", "Seedoil Can", {name: "canSeedoil", meta: 0});

IDRegistry.genItemID("canBiomass");
Item.createItem("canBiomass", "Biomass Can", {name: "canBiomass", meta: 0});

IDRegistry.genItemID("canEthanol");
Item.createItem("canEthanol", "Ethanol Can", {name: "canEthanol", meta: 0});


/* - REFRACTORY CAPSULES - */
IDRegistry.genItemID("refractoryEmpty");
Item.createItem("refractoryEmpty", "Refractory Capsule", {name: "refractoryEmpty", meta: 0});

IDRegistry.genItemID("refractoryWater");
Item.createItem("refractoryWater", "Water Capsule", {name: "refractoryWater", meta: 0});
Item.setLiquidClip(ItemID.refractoryEmpty, true);

IDRegistry.genItemID("refractoryLava");
Item.createItem("refractoryLava", "Lava Capsule", {name: "refractoryLava", meta: 0});

IDRegistry.genItemID("refractoryJuice");
Item.createFoodItem("refractoryJuice", "Juice Capsule", {name: "refractoryJuice", meta: 0}, {food: 2});

IDRegistry.genItemID("refractoryHoney");
Item.createFoodItem("refractoryHoney", "Honey Capsule", {name: "refractoryHoney", meta: 0}, {food: 2});

IDRegistry.genItemID("refractorySeedoil");
Item.createItem("refractorySeedoil", "Seedoil Capsule", {name: "refractorySeedoil", meta: 0});

IDRegistry.genItemID("refractoryBiomass");
Item.createItem("refractoryBiomass", "Biomass Capsule", {name: "refractoryBiomass", meta: 0});

IDRegistry.genItemID("refractoryEthanol");
Item.createItem("refractoryEthanol", "Ethanol Capsule", {name: "refractoryEthanol", meta: 0});


LiquidRegistry.registerItem("biomass", {id: 325, data: 0}, {id: ItemID.bucketBiomass, data: 0});
LiquidRegistry.registerItem("ethanol", {id: 325, data: 0}, {id: ItemID.bucketEthanol, data: 0});

LiquidRegistry.registerItem("water", {id: ItemID.waxCapsuleEmpty, data: 0}, {id: ItemID.waxCapsuleWater, data: 0});
LiquidRegistry.registerItem("appleJuice", {id: ItemID.waxCapsuleEmpty, data: 0}, {
    id: ItemID.waxCapsuleJuice,
    data: 0
});
LiquidRegistry.registerItem("honey", {id: ItemID.waxCapsuleEmpty, data: 0}, {
    id: ItemID.waxCapsuleHoney,
    data: 0
});
LiquidRegistry.registerItem("seedOil", {id: ItemID.waxCapsuleEmpty, data: 0}, {
    id: ItemID.waxCapsuleSeedoil,
    data: 0
});
LiquidRegistry.registerItem("biomass", {id: ItemID.waxCapsuleEmpty, data: 0}, {
    id: ItemID.waxCapsuleBiomass,
    data: 0
});
LiquidRegistry.registerItem("ethanol", {id: ItemID.waxCapsuleEmpty, data: 0}, {
    id: ItemID.waxCapsuleEthanol,
    data: 0
});

LiquidRegistry.registerItem("water", {id: ItemID.canEmpty, data: 0}, {id: ItemID.canWater, data: 0});
LiquidRegistry.registerItem("lava", {id: ItemID.canEmpty, data: 0}, {id: ItemID.canLava, data: 0});
LiquidRegistry.registerItem("appleJuice", {id: ItemID.canEmpty, data: 0}, {id: ItemID.canJuice, data: 0});
LiquidRegistry.registerItem("honey", {id: ItemID.canEmpty, data: 0}, {id: ItemID.canHoney, data: 0});
LiquidRegistry.registerItem("seedOil", {id: ItemID.canEmpty, data: 0}, {id: ItemID.canSeedoil, data: 0});
LiquidRegistry.registerItem("biomass", {id: ItemID.canEmpty, data: 0}, {id: ItemID.canBiomass, data: 0});
LiquidRegistry.registerItem("ethanol", {id: ItemID.canEmpty, data: 0}, {id: ItemID.canEthanol, data: 0});

LiquidRegistry.registerItem("water", {id: ItemID.refractoryEmpty, data: 0}, {id: ItemID.refractoryWater, data: 0});
LiquidRegistry.registerItem("lava", {id: ItemID.refractoryEmpty, data: 0}, {id: ItemID.refractoryLava, data: 0});
LiquidRegistry.registerItem("appleJuice", {id: ItemID.refractoryEmpty, data: 0}, {
    id: ItemID.refractoryJuice,
    data: 0
});
LiquidRegistry.registerItem("honey", {id: ItemID.refractoryEmpty, data: 0}, {
    id: ItemID.refractoryHoney,
    data: 0
});
LiquidRegistry.registerItem("seedOil", {id: ItemID.refractoryEmpty, data: 0}, {
    id: ItemID.refractorySeedoil,
    data: 0
});
LiquidRegistry.registerItem("biomass", {id: ItemID.refractoryEmpty, data: 0}, {
    id: ItemID.refractoryBiomass,
    data: 0
});
LiquidRegistry.registerItem("ethanol", {id: ItemID.refractoryEmpty, data: 0}, {
    id: ItemID.refractoryEthanol,
    data: 0
});

Item.registerUseFunction("canEmpty", function (coords) {
    let pos = Player.getPosition();
    if (World.getBlockID(coords.x, coords.y, coords.z) === 9) {
        World.drop(pos.x, pos.y + 0.3, pos.z, ItemID.canWater, 1, 0);
        World.setBlock(coords.x, coords.y, coords.z);
        Player.decreaseCarriedItem(1);
    } else if (World.getBlockID(coords.x, coords.y, coords.z) === 11) {
        World.drop(pos.x, pos.y + 0.3, pos.z, ItemID.canLava, 1, 0);
        World.setBlock(coords.x, coords.y, coords.z);
        Player.decreaseCarriedItem(1);
    }
});
Item.registerUseFunction("waxCapsuleEmpty", function (coords) {
    if (World.getBlockID(coords.x, coords.y, coords.z) === 9) {
        let pos = Player.getPosition();
        World.drop(pos.x, pos.y + 0.3, pos.z, ItemID.waxCapsuleWater, 1, 0);
        World.setBlock(coords.x, coords.y, coords.z);
        Player.decreaseCarriedItem(1);
    }
});
Item.registerUseFunction("refractoryEmpty", function (coords) {
    let pos = Player.getPosition();
    if (World.getBlockID(coords.x, coords.y, coords.z) === 9) {
        World.drop(pos.x, pos.y + 0.3, pos.z, ItemID.refractoryWater, 1, 0);
        World.setBlock(coords.x, coords.y, coords.z);
        Player.decreaseCarriedItem(1);
    } else if (World.getBlockID(coords.x, coords.y, coords.z) === 11) {
        World.drop(pos.x, pos.y + 0.3, pos.z, ItemID.refractoryLava, 1, 0);
        World.setBlock(coords.x, coords.y, coords.z);
        Player.decreaseCarriedItem(1);
    }
});

Callback.addCallback("PostLoaded", function () {

    Recipes.addShaped({id: ItemID.waxCapsuleEmpty, count: 4, data: 0}, [
        "xxx",
        "   ",
        "   "
    ], ['x', ItemID.beeswax, 0]);

    Recipes.addShaped({id: ItemID.canEmpty, count: 12, data: 0}, [
        " x ",
        "x x",
        "   "
    ], ['x', ItemID.ingotTin, 0]);

    Recipes.addShaped({id: ItemID.refractoryEmpty, count: 4, data: 0}, [
        "xxx",
        "   ",
        "   "
    ], ['x', ItemID.refractoryWax, 0]);

});