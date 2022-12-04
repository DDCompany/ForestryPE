ModAPI.addAPICallback("ICore", ({Integration}) => {
    for (const key in BeeRegistry.bees) {
        const bee = BeeRegistry.bees[key as keyof typeof BeeRegistry.bees] as BeeType;
        Integration.addToRecyclerBlacklist(bee.princessID);
        Integration.addToRecyclerBlacklist(bee.droneID);
        Integration.addToRecyclerBlacklist(bee.queenID);
    }
});