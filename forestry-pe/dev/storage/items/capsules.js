IDRegistry.genItemID("waxCapsuleEmpty");
Item.createItem("waxCapsuleEmpty", "Wax Capsule", {name: "waxCapsuleEmpty", meta: 0});
Item.setLiquidClip(ItemID.waxCapsuleEmpty, true);
Item.addCreativeGroup(GROUP_WAX_CAPSULES, GROUP_WAX_CAPSULES_NAME, [ItemID.waxCapsuleEmpty]);

IDRegistry.genItemID("canEmpty");
Item.createItem("canEmpty", "Can", {name: "canEmpty", meta: 0});
Item.setLiquidClip(ItemID.canEmpty, true);
Item.addCreativeGroup(GROUP_CANS, GROUP_CANS_NAME, [ItemID.canEmpty]);

IDRegistry.genItemID("refractoryEmpty");
Item.createItem("refractoryEmpty", "Refractory Capsule", {name: "refractoryEmpty", meta: 0});
Item.setLiquidClip(ItemID.refractoryEmpty, true);
Item.addCreativeGroup(GROUP_REFRACTORY_CAPSULES, GROUP_REFRACTORY_CAPSULES_NAME, [ItemID.refractoryEmpty]);

function registerLiquidContainer(suffix, liquid, food, isNative, isHot) {
    if (!isNative) {
        let unique = "bucket" + suffix;
        IDRegistry.genItemID(unique);
        Item.createItem(unique, suffix + " Bucket", {name: unique, meta: 0}, {stack: 1});
        LiquidRegistry.registerItem(liquid, {id: 325, data: 0}, {id: ItemID[unique], data: 0});
        Item.addCreativeGroup(GROUP_BUCKETS, GROUP_BUCKETS_NAME, [ItemID[unique]]);
    }

    if (food) {
        if (!isHot) {
            let unique = "waxCapsule" + suffix;
            IDRegistry.genItemID(unique);
            Item.createFoodItem(unique, "Capsule (" + suffix + ")", {
                name: unique,
                meta: 0
            }, {food});

            LiquidRegistry.registerItem(liquid, {
                id: ItemID.waxCapsuleEmpty,
                data: 0
            }, {id: ItemID[unique], data: 0});
        }

        let canUnique = "can" + suffix;
        IDRegistry.genItemID(canUnique);
        Item.createFoodItem(canUnique, "Can (" + suffix + ")", {name: canUnique, meta: 0}, {food});

        let refractoryUnique = "refractory" + suffix;
        IDRegistry.genItemID(refractoryUnique);
        Item.createFoodItem(refractoryUnique, "Capsule (" + suffix + ")", {
            name: refractoryUnique,
            meta: 0
        }, {food});
    } else {
        if (!isHot) {
            let unique = "waxCapsule" + suffix;
            IDRegistry.genItemID(unique);
            Item.createItem(unique, "Capsule (" + suffix + ")", {name: unique, meta: 0});
            LiquidRegistry.registerItem(liquid, {
                id: ItemID.waxCapsuleEmpty,
                data: 0
            }, {id: ItemID[unique], data: 0});
        }

        let canUnique = "can" + suffix;
        IDRegistry.genItemID(canUnique);
        Item.createItem(canUnique, "Can (" + suffix + ")", {name: canUnique, meta: 0});

        let refractoryUnique = "refractory" + suffix;
        IDRegistry.genItemID(refractoryUnique);
        Item.createItem(refractoryUnique, "Capsule (" + suffix + ")", {name: refractoryUnique, meta: 0});
    }

    LiquidRegistry.registerItem(liquid, {id: ItemID.canEmpty, data: 0}, {id: ItemID["can" + suffix], data: 0});
    LiquidRegistry.registerItem(liquid, {id: ItemID.refractoryEmpty, data: 0}, {
        id: ItemID["refractory" + suffix],
        data: 0
    });

    if (!isHot)
        Item.addCreativeGroup(GROUP_WAX_CAPSULES, GROUP_WAX_CAPSULES_NAME, [ItemID["waxCapsule" + suffix]]);

    Item.addCreativeGroup(GROUP_CANS, GROUP_CANS_NAME, [ItemID["can" + suffix]]);
    Item.addCreativeGroup(GROUP_REFRACTORY_CAPSULES, GROUP_REFRACTORY_CAPSULES_NAME, [ItemID["refractory" + suffix]]);
}

registerLiquidContainer("Water", "water", 0, true);
registerLiquidContainer("Lava", "lava", 0, true, true);
registerLiquidContainer("Biomass", "biomass");
registerLiquidContainer("Ethanol", "ethanol");
registerLiquidContainer("Milk", "milk", 0, true);
registerLiquidContainer("Juice", "appleJuice", 2);
registerLiquidContainer("Honey", "honey", 2);
registerLiquidContainer("SeedOil", "seedOil", 0);

function pickupLiquidFromWorld(waterCanId, lavaCanId) {
    return (coords) => {
        let pos = Player.getPosition();
        if (World.getBlockID(coords.x, coords.y, coords.z) === 9)
            World.drop(pos.x, pos.y + 0.3, pos.z, waterCanId, 1, 0);
        else if (World.getBlockID(coords.x, coords.y, coords.z) === 11)
            World.drop(pos.x, pos.y + 0.3, pos.z, lavaCanId, 1, 0);
        else return;

        World.setBlock(coords.x, coords.y, coords.z, 0);
        Player.decreaseCarriedItem(1);
    };
}

Item.registerUseFunction("canEmpty", pickupLiquidFromWorld(ItemID.canWater, ItemID.canLava));
Item.registerUseFunction("refractoryEmpty", pickupLiquidFromWorld(ItemID.refractoryWater, ItemID.refractoryLava));
Item.registerUseFunction("waxCapsuleEmpty", coords => {
    if (World.getBlockID(coords.x, coords.y, coords.z) === 9) {
        let pos = Player.getPosition();
        World.drop(pos.x, pos.y + 0.3, pos.z, ItemID.waxCapsuleWater, 1, 0);
        World.setBlock(coords.x, coords.y, coords.z);
        Player.decreaseCarriedItem(1);
    }
});

Callback.addCallback("PostLoaded", () => {
    Recipes.addShaped({id: ItemID.waxCapsuleEmpty, count: 4, data: 0}, [
        "xxx",
    ], ['x', ItemID.beeswax, 0]);

    Recipes.addShaped({id: ItemID.canEmpty, count: 12, data: 0}, [
        " x ",
        "x x",
    ], ['x', ItemID.ingotTin, 0]);

    Recipes.addShaped({id: ItemID.refractoryEmpty, count: 4, data: 0}, [
        "xxx",
    ], ['x', ItemID.refractoryWax, 0]);

    let milkCapsules = [ItemID.canMilk, ItemID.refractoryMilk, ItemID.waxCapsuleMilk];

    for (let key in milkCapsules) {
        let capsuleId = milkCapsules[key];

        Recipes.addShaped({id: 354, count: 1, data: 0}, [
            "AAA",
            "BEB",
            "CCC"
        ], ['A', capsuleId, 0, 'B', 353, 0, 'C', 296, 0, 'E', 344, 0]);
    }
});