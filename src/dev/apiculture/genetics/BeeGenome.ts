class BeeGenome extends Genome {
    private constructor(species: string, extra: ItemExtraData) {
        super(`species.bee.${species}`, extra);
    }

    static from(item: ItemInstance) {
        const speciesUid = BeeRegistry.getSpeciesByItem(item.id);
        if (!speciesUid) {
            throw "Item is not a bee";
        }

        return new BeeGenome(speciesUid, item.extra);
    }

    getChromosomes() {
        return [
            BeeChromosomes.SPEED,
            BeeChromosomes.LIFESPAN,
            BeeChromosomes.FERTILITY,
            BeeChromosomes.TEMPERATURE_TOLERANCE,
            BeeChromosomes.NEVER_SLEEPS,
            BeeChromosomes.HUMIDITY_TOLERANCE,
            BeeChromosomes.TOLERATES_RAIN,
            BeeChromosomes.CAVE_DWELLING,
            BeeChromosomes.FLOWERING,
            BeeChromosomes.TERRITORY,
        ];
    }
}