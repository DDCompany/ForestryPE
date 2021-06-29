abstract class Genome {
    private readonly _chromosomes: Record<string, Chromosome>;

    protected constructor(species: string, extra: ItemExtraData | null) {
        this._chromosomes = {};
        this.loadFrom(species, extra || new ItemExtraData());
    }

    abstract getChromosomes(): string[];

    getChromosome(name: string) {
        return this._chromosomes[name] || null;
    }

    debug() {
        Debug.big(this._chromosomes);
    }

    private loadFrom(speciesUid: string, extra: ItemExtraData) {
        const chromosomes = this.getChromosomes();
        const speciesChromosome = JSON.parse(extra.getString("cSpecies", "[]"));
        let [primarySpeciesUid, secondarySpeciesUid] = speciesChromosome;
        const primarySpeciesAllele = (AlleleRegistry.getAllele(primarySpeciesUid) ||
            AlleleRegistry.getAllele(speciesUid)) as AlleleSpecies;
        const secondarySpeciesAllele = (AlleleRegistry.getAllele(secondarySpeciesUid) ||
            AlleleRegistry.getAllele(speciesUid)) as AlleleSpecies;
        this._chromosomes.species = new Chromosome(primarySpeciesAllele, secondarySpeciesAllele);

        for (let key in chromosomes) {
            const chromosomeName = chromosomes[key];
            const value = JSON.parse(extra.getString(`c${chromosomeName}`, null));
            const [primaryUid, secondaryUid] = value || [];
            const primary = AlleleRegistry.getAllele(primaryUid) ||
                primarySpeciesAllele.defaultTemplate[chromosomeName];
            const secondary = AlleleRegistry.getAllele(secondaryUid) ||
                secondarySpeciesAllele.defaultTemplate[chromosomeName];
            this._chromosomes[chromosomeName] = new Chromosome(primary, secondary);
        }
    }
}