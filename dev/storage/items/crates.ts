IDRegistry.genItemID("crate");
Item.createItem("crate", "forestry.item.crate", {name: "crate"}, {});
Item.setCategory(ItemID.crate, EItemCategory.MATERIAL);
Item.addCreativeGroup("forestryCrate", t("forestry.creative_group.crates"), [
    ItemID.crate,
]);

/**
 * Register a new crate containing the given item with {@link id} and {@link data}.
 */
function registerCrate(id: number, texture: string, data?: number) {
    data = data || 0;
    let crateId = "crate" + id + "_" + data;

    IDRegistry.genItemID(crateId);
    Item.createItem(crateId, "forestry.item.crate", {name: texture}, {});
    Item.setCategory(ItemID[crateId], EItemCategory.MATERIAL);
    ItemUtils.addTooltip(ItemID[crateId], () => t(Item.getName(id, data || 0)));

    Item.addCreativeGroup("forestryCrate", t("forestry.creative_group.crates"), [
        ItemID[crateId],
    ]);

    CarpenterManager.registerRecipe({
        input: {
            0: {id, data}, 1: {id, data}, 2: {id, data},
            3: {id, data}, 4: {id, data}, 5: {id, data},
            6: {id, data}, 7: {id, data}, 8: {id, data},
        },
        liquid: "water",
        liquidAmount: 0.1,
        special: {
            id: ItemID.crate,
            data: 0,
            dec: true
        },
        result: {
            id: ItemID[crateId],
            count: 1,
            data: 0
        }
    });

    CarpenterManager.registerRecipe({
        input: {4: {id: ItemID[crateId], data: 0}},
        result: {
            id,
            count: 9,
            data
        }
    });

    Item.registerUseFunction(crateId, (coords, item, block, player) => {
        const blockSource = BlockSource.getDefaultForActor(player);
        if (blockSource) {
            const relative = coords.relative;
            blockSource.spawnDroppedItem(
                relative.x + 0.5,
                relative.y + 0.1,
                relative.z + 0.5,
                id, 9, 0,
            );
            PlayerUtils.decreaseCarriedItem(player);
        }
    });
}

if (ForestryConfig.crateEnabled) {
    registerCrate(3, "crateDirt");
    registerCrate(87, "crateNetherrack");
    registerCrate(112, "crateNetherbricks");
    registerCrate(372, "crateNetherWart");
    registerCrate(ItemID.apatite, "crateApatite");
    registerCrate(BlockID.bog, "crateBog");
    registerCrate(ItemID.ingotBronze, "crateBronzeIngot");
    registerCrate(4, "crateCobblestone");
    registerCrate(ItemID.combStringy, "crateStringyComb");
    registerCrate(ItemID.combCocoa, "crateCocoaComb");
    registerCrate(ItemID.combDripping, "crateDrippingComb");
    registerCrate(ItemID.combHoney, "crateHoneyComb");
    registerCrate(ItemID.combFrozen, "crateFrozenComb");
    registerCrate(ItemID.combMellow, "crateMellowComb");
    registerCrate(ItemID.combMossy, "crateMossyComb");
    registerCrate(ItemID.combMysterious, "crateMysteriousComb");
    registerCrate(ItemID.combParched, "crateParchedComb");
    registerCrate(ItemID.combSilky, "crateSilkyComb");
    registerCrate(ItemID.combSimmering, "crateSimmeringComb");
    registerCrate(ItemID.combWheaten, "crateWheatenComb");
    registerCrate(ItemID.combIrradiated, "crateIrradiatedComb");
    registerCrate(337, "crateClay");
    registerCrate(13, "crateGravel");
    registerCrate(BlockID.humus, "crateHumus");
    registerCrate(17, "crateOakWood");
    registerCrate(263, "crateCharcoal", 1);
    registerCrate(ItemID.ash, "crateAsh");
    registerCrate(81, "crateCactus");
    registerCrate(1, "crateStone");
    registerCrate(336, "crateBrick");
    registerCrate(331, "crateRedstone");
    registerCrate(260, "crateApple");
    registerCrate(VanillaItemID.lapis_lazuli, "crateLapisLazuli");
    registerCrate(ItemID.royalJelly, "crateRoyalJelly");
    registerCrate(ItemID.honeydew, "crateHoneydew");
    registerCrate(110, "crateMycelium");
    registerCrate(ItemID.mulch, "crateMulch");
    registerCrate(ItemID.refractoryWax, "crateRefractoryWax");
    registerCrate(ItemID.ingotTin, "crateTinIngot");
    registerCrate(12, "crateSand");
    registerCrate(88, "crateSoulSand");
    registerCrate(24, "crateSandstone");
    registerCrate(357, "crateCookie");
    registerCrate(ItemID.propolis, "cratePropolis");
    registerCrate(ItemID.beeswax, "crateWax");
    registerCrate(296, "crateWheat");
    registerCrate(ItemID.pollen1, "cratePollen");
    registerCrate(6, "crateSapling");
    registerCrate(348, "crateGlowstone");
    registerCrate(295, "crateSeeds");
    registerCrate(ItemID.peat, "cratePeat");
    registerCrate(338, "crateSugarCane");
    registerCrate(ItemID.phosphor, "cratePhosphor");
    registerCrate(263, "crateCoal");
}