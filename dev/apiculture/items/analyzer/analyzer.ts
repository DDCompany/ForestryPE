IDRegistry.genItemID("analyzer");
Item.createItem("analyzer", "forestry.item.portable_analyzer", {name: "analyzer"}, {stack: 1});

ItemUtils.addContainsTooltip(ItemID.analyzer, (item: ItemInstance) => {
    return AnalyzerManager.getContainer(item.data);
});