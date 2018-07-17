if (ForestryConfig.crateEnabled === true) {
    IDRegistry.genItemID("crate");
    Item.createItem("crate", "Crate", {name: "crate", meta: 0}, {});

    function registerCrate(id, n, texture, d) {
        let name = id;
        let data = d ? d : 0;
        IDRegistry.genItemID("crate" + name);
        Item.createItem("crate" + name, "Crate (" + n + ")", {name: texture, meta: 0}, {});

        CarpenterManager.registerRecipe({
            input: {
                "slot0": {id: id, data: data}, "slot1": {id: id, data: data}, "slot2": {id: id, data: data},
                "slot3": {id: id, data: data}, "slot4": {id: id, data: data}, "slot5": {id: id, data: data},
                "slot6": {id: id, data: data}, "slot7": {id: id, data: data}, "slot8": {id: id, data: data}
            },
            liquid: "water",
            liquidAmount: 0.1,
            dop: {
                id: ItemID.crate,
                data: 0,
                dec: true
            },
            result: {
                id: ItemID["crate" + name],
                count: 1,
                data: 0
            }
        });

        CarpenterManager.registerRecipe({
            input: {"slot4": {id: ItemID["crate" + name], data: 0}},
            result: {
                id: id,
                count: 9,
                data: data
            }
        });

        Item.registerUseFunction("crate" + name, function (coords, item) {
            World.drop(coords.relative.x + 0.5, coords.relative.y + 0.1, coords.relative.z + 0.5, id, 9, 0);
            Player.decreaseCarriedItem(1);
        });
    }

    registerCrate(3, "Dirt", "crateDirt");
    registerCrate(87, "Netherrack", "crateNetherrack");
    registerCrate(112, "Netherbrick", "crateNetherbricks");
    registerCrate(372, "Nether wart", "crateNetherWart");
    registerCrate(ItemID.apatite, "Apatite", "crateApatite");
    registerCrate(BlockID.bog, "Bog", "crateBog");
    registerCrate(ItemID.bronzeIngot, "Bronze ingot", "crateBronzeIngot");
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
    registerCrate(351, "Lapis lazuli", "crateLapisLazuli", 4);
    registerCrate(ItemID.latex, "Latex", "crateLatex");
    registerCrate(ItemID.matter, "Matter", "crateMatter");
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
    registerCrate(ItemID.rubber, "Rubber", "crateRubber");
    registerCrate(6, "Sapling", "crateSapling");
    registerCrate(348, "Glowstone dust", "crateGlowstone");
    registerCrate(295, "Seeds", "crateSeeds");
    registerCrate(ItemID.peat, "Peat", "cratePeat");
    registerCrate(338, "Sugar cane", "crateSugarCane");
    registerCrate(ItemID.scrap, "Scrap", "crateScrap");
    registerCrate(ItemID.phosphor, "Phosphor", "cratePhosphor");
    registerCrate(263, "Coal", "crateCoal");
}