for (const [name, fullName] of combNames) {
    IDRegistry.genItemID(fullName);
    Item.createItem(fullName, `forestry.item.${name}_comb`, {name: fullName, meta: 0}, {});
}

Item.addCreativeGroup("combs", t("forestry.creative_group.combs"), [
    736, //honey_comb
    ...combNames.map(value => ItemID[value[1]]),
]);