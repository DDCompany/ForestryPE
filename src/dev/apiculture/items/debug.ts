IDRegistry.genItemID("debugForestryGenome");
Item.createItem("debugForestryGenome", "forestry.item.debug_genome", {name: "stick"});

Item.registerUseFunction("debugForestryGenome", ({x, y, z}, item, block, player) => {
    const actor = new PlayerActor(player);
    const slot = actor.getInventorySlot(0);
    if (!BeeRegistry.isBee(slot.id)) {
        Debug.message(`'${IDRegistry.getNameByID(slot.id)}' is not a bee`);
        return;
    }

    const genome = BeeGenome.from(slot);
    genome.debug();
});