IDRegistry.genItemID("waxCapsuleEmpty");
Item.createItem("waxCapsuleEmpty", "Wax Capsule", {name: "waxCapsuleEmpty", meta: 0});
Item.setLiquidClip(ItemID.waxCapsuleEmpty, true);

IDRegistry.genItemID("canEmpty");
Item.createItem("canEmpty", "Can", {name: "canEmpty", meta: 0});
Item.setLiquidClip(ItemID.canEmpty, true);

IDRegistry.genItemID("refractoryEmpty");
Item.createItem("refractoryEmpty", "Refractory Capsule", {name: "refractoryEmpty", meta: 0});
Item.setLiquidClip(ItemID.refractoryEmpty, true);

function registerLiquidContainer(suffix, liquid, food, isNative, isHot) {
    if (!isNative) {
        IDRegistry.genItemID("bucket" + suffix);
        Item.createItem("bucket" + suffix, suffix + " bucket", {name: "bucket" + suffix, meta: 0}, {stack: 1});
        LiquidRegistry.registerItem(liquid, {id: 325, data: 0}, {id: ItemID["bucket" + suffix], data: 0});
    }

    if (food) {
        if (!isHot) {
            IDRegistry.genItemID("waxCapsule" + suffix);
            Item.createFoodItem("waxCapsule" + suffix, suffix + " wax Capsule", {name: "waxCapsule" + suffix, meta: 0}, {food: food});
            LiquidRegistry.registerItem(liquid, {id: ItemID.waxCapsuleEmpty, data: 0}, {id: ItemID["waxCapsule" + suffix], data: 0});
        }

        IDRegistry.genItemID("can" + suffix);
        Item.createFoodItem("can" + suffix, suffix + " Can", {name: "can" + suffix, meta: 0});

        IDRegistry.genItemID("refractory" + suffix);
        Item.createFoodItem("refractory" + suffix, suffix + " Capsule", {name: "refractory" + suffix, meta: 0}, {food: food});
    } else {
        if (!isHot) {
            IDRegistry.genItemID("waxCapsule" + suffix);
            Item.createItem("waxCapsule" + suffix, suffix + " wax Capsule", {name: "waxCapsule" + suffix, meta: 0});
            LiquidRegistry.registerItem(liquid, {id: ItemID.waxCapsuleEmpty, data: 0}, {id: ItemID["waxCapsule" + suffix], data: 0});
        }

        IDRegistry.genItemID("can" + suffix);
        Item.createItem("can" + suffix, suffix + " Can", {name: "can" + suffix, meta: 0});

        IDRegistry.genItemID("refractory" + suffix);
        Item.createItem("refractory" + suffix, suffix + " Capsule", {name: "refractory" + suffix, meta: 0});
    }

    LiquidRegistry.registerItem(liquid, {id: ItemID.canEmpty, data: 0}, {id: ItemID["can" + suffix], data: 0});
    LiquidRegistry.registerItem(liquid, {id: ItemID.refractoryEmpty, data: 0}, {id: ItemID["refractory" + suffix], data: 0});
}

registerLiquidContainer("Water", "water", 0, true);
registerLiquidContainer("Lava", "lava", 0, true, true);
registerLiquidContainer("Biomass", "biomass");
registerLiquidContainer("Ethanol", "ethanol");
registerLiquidContainer("Milk", "milk", 0, true);
registerLiquidContainer("Juice", "appleJuice", 2, true);
registerLiquidContainer("Honey", "honey", 2, true);
registerLiquidContainer("Seedoil", "seedOil", 0, true);

function pickupLiquidFromWorld(coords) {
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
}

Item.registerUseFunction("canEmpty", pickupLiquidFromWorld);
Item.registerUseFunction("refractoryEmpty", pickupLiquidFromWorld);
Item.registerUseFunction("waxCapsuleEmpty", function (coords) {
    if (World.getBlockID(coords.x, coords.y, coords.z) === 9) {
        let pos = Player.getPosition();
        World.drop(pos.x, pos.y + 0.3, pos.z, ItemID.waxCapsuleWater, 1, 0);
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