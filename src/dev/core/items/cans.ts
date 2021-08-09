IDRegistry.genItemID("can");
Item.createItem("can", "forestry.item.can", {name: "can"});

IDRegistry.genItemID("capsuleWax");
Item.createItem("capsuleWax", "forestry.item.wax_capsule", {name: "capsuleWax"});

IDRegistry.genItemID("capsuleRefractory");
Item.createItem("capsuleRefractory", "forestry.item.refractory_capsule", {name: "capsuleRefractory"});

Callback.addCallback("PreLoaded", () => {
    let i = 1; //0 is empty capsule textures
    for (const key in LiquidRegistry.liquids) {
        const capitalizedKey = capitalize(key);
        const liquidName = capitalize(t(LiquidRegistry.liquids[key].name));
        [["can", "can", "cans"], ["capsuleWax", "wax_capsule", "wax_capsules"],
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
            });
        i++;
    }

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