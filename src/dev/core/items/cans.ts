IDRegistry.genItemID("can");
Item.createItem("can", "forestry.item.can", {name: "can"});
Item.addCreativeGroup("cans", t(`forestry.creative_group.cans`), [ItemID.can]);

IDRegistry.genItemID("capsuleWax");
Item.createItem("capsuleWax", "forestry.item.wax_capsule", {name: "capsuleWax"});
Item.addCreativeGroup("wax_capsules", t(`forestry.creative_group.wax_capsules`), [ItemID.capsuleWax]);

IDRegistry.genItemID("capsuleRefractory");
Item.createItem("capsuleRefractory", "forestry.item.refractory_capsule", {name: "capsuleRefractory"});
Item.addCreativeGroup("refractory_capsules", t(`forestry.creative_group.refractory_capsules`),
    [ItemID.capsuleRefractory]);

Callback.addCallback("PreLoaded", () => {
    let i = 1; //0 is empty capsule textures
    const startDate = Date.now();
    for (const key in LiquidRegistry.liquids) {
        const capitalizedKey = capitalize(key);
        const liquidName = capitalize(t(LiquidRegistry.liquids[key].name));
        [["can", "can", "cans"], ["capsuleWax", "wax_capsules", "wax_capsules"],
            ["capsuleRefractory", "refractory_capsule", "refractory_capsules"]]
            .map(([prefix, locale, textureDir]) => {
                TextureBakery.create({
                    path: `items-opaque/${textureDir}/${prefix}_${i}`,
                    layers: [
                        {
                            bitmap: LiquidRegistry.getLiquidUIBitmap(key, 16, 16),
                            mask: `capsules/${prefix}.contents`,
                        },
                        {
                            bitmap: `capsules/${prefix}.bottle`,
                        },
                    ],
                });

                const id = `${prefix}${capitalizedKey}`;
                IDRegistry.genItemID(id);
                Item.createItem(id, `forestry.item.${locale}`, {name: prefix, data: i});
                LiquidRegistry.registerItem(key, {id: ItemID[prefix], data: 0}, {id: ItemID[id], data: 0});

                Item.registerNameOverrideFunction(id, (item, translation) =>
                    `${translation}\n${Native.Color.GRAY}${liquidName}`);

                Item.addCreativeGroup(textureDir, t(`forestry.creative_group.${textureDir}`), [ItemID[id]]);
            });
        i++;
    }
    Logger.Log(`Registered ${(i - 1) * 3} textures in ${(Date.now() - startDate) / 1000}s`, "INFO");

    Recipes.addShaped({id: ItemID.can, count: 10, data: 0}, [
        " I ",
        "I I",
        " I ",
    ], ['I', ItemID.ingotTin, 0]);

    Recipes.addShaped({id: ItemID.capsuleWax, count: 3, data: 0}, [
        "WWW",
        " W ",
    ], ['W', ItemID.waxBees, 0]);

    Recipes.addShaped({id: ItemID.capsuleRefractory, count: 3, data: 0}, [
        "WWW",
        " W ",
    ], ['W', ItemID.waxRefractory, 0]);
});