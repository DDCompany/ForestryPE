IDRegistry.genItemID("analyzer");
Item.createItem("analyzer", "Portable Analyzer", {name: "analyzer", meta: 0}, {stack: 1});

ItemUtils.addContainsTooltip(ItemID.analyzer, (item: ItemInstance) => {
    return AnalyzerManager.getContainer(item.data);
});