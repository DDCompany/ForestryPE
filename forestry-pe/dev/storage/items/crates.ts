IDRegistry.genItemID("crate");
Item.createItem("crate", "Crate", {name: "crate", meta: 0}, {});
Item.addCreativeGroup(GROUP_CRATES, GROUP_CRATES_NAME, [ItemID.crate]);

/**
 * Register a new crate containing the given item with {@link id} and {@link data}.
 */
function registerCrate(id: number, itemName: string, texture: string, data?: number) {
    data = data || 0;
    let crateId = "crate" + id + "_" + data;

    IDRegistry.genItemID(crateId);
    Item.createItem(crateId, "Crate (" + itemName + ")", {name: texture, meta: 0}, {});
    Item.addCreativeGroup(GROUP_CRATES, GROUP_CRATES_NAME, [ItemID[crateId]]);

    CarpenterManager.registerRecipe({
        input: {
            0: {id: id, data: data}, 1: {id: id, data: data}, 2: {id: id, data: data},
            3: {id: id, data: data}, 4: {id: id, data: data}, 5: {id: id, data: data},
            6: {id: id, data: data}, 7: {id: id, data: data}, 8: {id: id, data: data}
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
            id: id,
            count: 9,
            data: data
        }
    });

    Item.registerUseFunction(crateId, function (coords) {
        World.drop(coords.relative.x + 0.5, coords.relative.y + 0.1, coords.relative.z + 0.5, id, 9, 0);
        Player.decreaseCarriedItem(1);
    });
}

if (ForestryConfig.crateEnabled) {
    registerCrate(3, "Dirt", "crateDirt");
    registerCrate(87, "Netherrack", "crateNetherrack");
    registerCrate(112, "Netherbrick", "crateNetherbricks");
    registerCrate(372, "Nether wart", "crateNetherWart");
    registerCrate(ItemID.apatite, "Apatite", "crateApatite");
    registerCrate(BlockID.bog, "Bog", "crateBog");
    registerCrate(ItemID.ingotBronze, "Bronze ingot", "crateBronzeIngot");
    registerCrate(4, "Cobblestone", "crateCobblestone");
    registerCrate(ItemID.combStringy, "Stringy comb", "crateStringyComb");
    registerCrate(ItemID.combCocoa, "Cocoa comb", "crateCocoaComb");
    registerCrate(ItemID.combDripping, "Dripping comb", "crateDrippingComb");
    registerCrate(ItemID.combHoney, "Honey comb", "crateHoneyComb");
    registerCrate(ItemID.combFrozen, "Frozen comb", "crateFrozenComb");
    registerCrate(ItemID.combMellow, "Mellow comb", "crateMellowComb");
    registerCrate(ItemID.combMossy, "Mossy comb", "crateMossyComb");
    registerCrate(ItemID.combMysterious, "Mysterious comb", "crateMysteriousComb");
    registerCrate(ItemID.combParched, "Parched comb", "crateParchedComb");
    registerCrate(ItemID.combSilky, "Silky comb", "crateSilkyComb");
    registerCrate(ItemID.combSimmering, "Simmering comb", "crateSimmeringComb");
    registerCrate(ItemID.combWheaten, "Wheaten comb", "crateWheatenComb");
    registerCrate(ItemID.combIrradiated, "Irradiated comb", "crateIrradiatedComb");
    registerCrate(337, "Clay", "crateClay");
    registerCrate(13, "Gravel", "crateGravel");
    registerCrate(BlockID.humus, "Humus", "crateHumus");
    registerCrate(17, "Oak wood", "crateOakWood");
    registerCrate(263, "Charcoal", "crateCharcoal", 1);
    registerCrate(ItemID.ash, "Ash", "crateAsh");
    registerCrate(81, "Cactus", "crateCactus");
    registerCrate(1, "Stone", "crateStone");
    registerCrate(336, "Brick", "crateBrick");
    registerCrate(331, "Redstone", "crateRedstone");
    registerCrate(260, "Apple", "crateApple");
    registerCrate(VanillaItemID.lapis_lazuli, "Lapis lazuli", "crateLapisLazuli");
    registerCrate(ItemID.royalJelly, "Royal jelly", "crateRoyalJelly");
    registerCrate(ItemID.honeydew, "Honey dew", "crateHoneydew");
    registerCrate(110, "Mycelium", "crateMycelium");
    registerCrate(ItemID.mulch, "Mulch", "crateMulch");
    registerCrate(ItemID.refractoryWax, "Refractory wax", "crateRefractoryWax");
    registerCrate(ItemID.ingotTin, "Tin ingot", "crateTinIngot");
    registerCrate(12, "Sand", "crateSand");
    registerCrate(88, "Soul sand", "crateSoulSand");
    registerCrate(24, "Sandstone", "crateSandstone");
    registerCrate(357, "Cookie", "crateCookie");
    registerCrate(ItemID.propolis, "Propolis", "cratePropolis");
    registerCrate(ItemID.beeswax, "Wax", "crateWax");
    registerCrate(296, "Wheat", "crateWheat");
    registerCrate(ItemID.pollen1, "Pollen", "cratePollen");
    registerCrate(6, "Sapling", "crateSapling");
    registerCrate(348, "Glowstone dust", "crateGlowstone");
    registerCrate(295, "Seeds", "crateSeeds");
    registerCrate(ItemID.peat, "Peat", "cratePeat");
    registerCrate(338, "Sugar cane", "crateSugarCane");
    registerCrate(ItemID.phosphor, "Phosphor", "cratePhosphor");
    registerCrate(263, "Coal", "crateCoal");
}