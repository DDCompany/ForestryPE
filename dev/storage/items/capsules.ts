IDRegistry.genItemID("waxCapsuleEmpty");
Item.createItem("waxCapsuleEmpty", "forestry.item.wax_capsule", {name: "waxCapsuleEmpty"});
Item.setCategory(ItemID.waxCapsuleEmpty, EItemCategory.MATERIAL);
Item.setLiquidClip(ItemID.waxCapsuleEmpty, true);
Item.addCreativeGroup("capsuleWax", t("forestry.creative_group.wax_capsules"), [
    ItemID.waxCapsuleEmpty,
]);

IDRegistry.genItemID("canEmpty");
Item.createItem("canEmpty", "forestry.item.can", {name: "canEmpty"});
Item.setCategory(ItemID.canEmpty, EItemCategory.MATERIAL);
Item.setLiquidClip(ItemID.canEmpty, true);
Item.addCreativeGroup("capsule", t("forestry.creative_group.cans"), [
    ItemID.canEmpty,
]);

IDRegistry.genItemID("refractoryEmpty");
Item.createItem("refractoryEmpty", "forestry.item.refractory_capsule", {name: "refractoryEmpty"});
Item.setCategory(ItemID.refractoryEmpty, EItemCategory.MATERIAL);
Item.setLiquidClip(ItemID.refractoryEmpty, true);
Item.addCreativeGroup("capsuleRefractory", t("forestry.creative_group.refractory_capsules"), [
    ItemID.refractoryEmpty,
]);

function registerLiquidContainer(liquid: string, food: number = 0, isNative?: boolean, isHot?: boolean) {
    const liquidName = LiquidRegistry.getLiquidName(liquid);
    const suffix = liquid.charAt(0).toUpperCase() + liquid.slice(1);
    if (!isNative) {
        let unique = `bucket${suffix}`;
        IDRegistry.genItemID(unique);
        Item.createItem(unique, "forestry.item.bucket", {name: unique}, {stack: 1});
        Item.setCategory(ItemID[unique], EItemCategory.MATERIAL);
        LiquidRegistry.registerItem(liquid, {id: 325, data: 0}, {id: ItemID[unique], data: 0});
        ItemUtils.addStaticTooltip(ItemID[unique], liquidName);

        Item.addCreativeGroup("bucket", t("forestry.creative_group.buckets"), [
            ItemID[unique],
        ]);
    }

    if (food) {
        if (!isHot) {
            let unique = `waxCapsule${suffix}`;
            IDRegistry.genItemID(unique);
            Item.createFoodItem(unique, "forestry.item.wax_capsule", {
                name: unique,
                meta: 0
            }, {food});
            Item.setCategory(ItemID[unique], EItemCategory.MATERIAL);
            ItemUtils.addStaticTooltip(ItemID[unique], liquidName);

            LiquidRegistry.registerItem(liquid, {
                id: ItemID.waxCapsuleEmpty,
                data: 0
            }, {id: ItemID[unique], data: 0});

            Item.addCreativeGroup("capsuleWax", t("forestry.creative_group.wax_capsules"), [
                ItemID[unique],
            ]);
        }

        let canUnique = `can${suffix}`;
        IDRegistry.genItemID(canUnique);
        Item.createFoodItem(canUnique, "forestry.item.can", {name: canUnique}, {food});
        Item.setCategory(ItemID[canUnique], EItemCategory.MATERIAL);
        ItemUtils.addStaticTooltip(ItemID[canUnique], liquidName);

        let refractoryUnique = `refractory${suffix}`;
        IDRegistry.genItemID(refractoryUnique);
        Item.createFoodItem(refractoryUnique, "forestry.item.refractory_capsule", {
            name: refractoryUnique,
            meta: 0
        }, {food});
        Item.setCategory(ItemID[refractoryUnique], EItemCategory.MATERIAL);
        ItemUtils.addStaticTooltip(ItemID[refractoryUnique], liquidName);
    } else {
        if (!isHot) {
            let unique = `waxCapsule${suffix}`;
            IDRegistry.genItemID(unique);
            Item.createItem(unique, "forestry.item.wax_capsule", {name: unique});
            LiquidRegistry.registerItem(liquid, {
                id: ItemID.waxCapsuleEmpty,
                data: 0
            }, {id: ItemID[unique], data: 0});
            Item.setCategory(ItemID[unique], EItemCategory.MATERIAL);
            ItemUtils.addStaticTooltip(ItemID[unique], liquidName);

            Item.addCreativeGroup("capsuleWax", t("forestry.creative_group.wax_capsules"), [
                ItemID[unique],
            ]);
        }

        let canUnique = `can${suffix}`;
        IDRegistry.genItemID(canUnique);
        Item.createItem(canUnique, "forestry.item.can", {name: canUnique});
        Item.setCategory(ItemID[canUnique], EItemCategory.MATERIAL);
        ItemUtils.addStaticTooltip(ItemID[canUnique], liquidName);

        let refractoryUnique = `refractory${suffix}`;
        IDRegistry.genItemID(refractoryUnique);
        Item.createItem(refractoryUnique, "forestry.item.refractory_capsule", {name: refractoryUnique});
        Item.setCategory(ItemID[refractoryUnique], EItemCategory.MATERIAL);
        ItemUtils.addStaticTooltip(ItemID[refractoryUnique], liquidName);
    }

    LiquidRegistry.registerItem(liquid, {id: ItemID.canEmpty, data: 0}, {id: ItemID[`can${suffix}`], data: 0});
    LiquidRegistry.registerItem(liquid, {id: ItemID.refractoryEmpty, data: 0}, {
        id: ItemID[`refractory${suffix}`],
        data: 0
    });

    Item.addCreativeGroup("capsule", t("forestry.creative_group.cans"), [
        ItemID[`can${suffix}`],
    ]);
    Item.addCreativeGroup("capsuleRefractory", t("forestry.creative_group.refractory_capsules"), [
        ItemID[`refractory${suffix}`],
    ]);
}

registerLiquidContainer("water", 0, true);
registerLiquidContainer("lava", 0, true, true);
registerLiquidContainer("biomass");
registerLiquidContainer("ethanol");
registerLiquidContainer("milk", 0, true);
registerLiquidContainer("appleJuice", 2);
registerLiquidContainer("honey", 2);
registerLiquidContainer("seedOil", 0);

function pickupLiquidFromWorld(waterCanId: number, lavaCanId: number): Callback.ItemUseLocalFunction {
    return (coords, item, block, player) => {
        const pos = Entity.getPosition(player);
        const blockSource = BlockSource.getDefaultForActor(player);
        if (!blockSource) return;

        const blockID = blockSource.getBlockId(coords.x, coords.y, coords.z);
        const capsuleId = {
            9: waterCanId,
            11: lavaCanId,
        }[blockID];

        if (!capsuleId) return;

        blockSource.spawnDroppedItem(pos.x, pos.y + 0.3, pos.z, capsuleId, 1, 0);
        blockSource.setBlock(coords.x, coords.y, coords.z, 0, 0);
        PlayerUtils.decreaseCarriedItem(player);
    };
}

Item.registerUseFunction("canEmpty", pickupLiquidFromWorld(ItemID.canWater, ItemID.canLava));
Item.registerUseFunction("refractoryEmpty", pickupLiquidFromWorld(ItemID.refractoryWater, ItemID.refractoryLava));
Item.registerUseFunction("waxCapsuleEmpty", (coords, item, block, player) => {
    const blockSource = BlockSource.getDefaultForActor(player);
    if (blockSource && blockSource.getBlockId(coords.x, coords.y, coords.z) === 9) {
        const pos = Entity.getPosition(player);
        blockSource.spawnDroppedItem(pos.x, pos.y + 0.3, pos.z, ItemID.waxCapsuleWater, 1, 0);
        blockSource.setBlock(coords.x, coords.y, coords.z, 0, 0);
        PlayerUtils.decreaseCarriedItem(player);
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