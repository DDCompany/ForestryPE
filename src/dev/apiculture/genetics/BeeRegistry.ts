interface IBeeTemplate {
    [BeeChromosomes.SPEED]?: Allele<number>
    [BeeChromosomes.LIFESPAN]?: Allele<number>
    [BeeChromosomes.FERTILITY]?: Allele<number>
    [BeeChromosomes.TEMPERATURE_TOLERANCE]?: Allele<number>
    [BeeChromosomes.NEVER_SLEEPS]?: Allele<boolean>
    [BeeChromosomes.HUMIDITY_TOLERANCE]?: Allele<number>
    [BeeChromosomes.TOLERATES_RAIN]?: Allele<boolean>
    [BeeChromosomes.CAVE_DWELLING]?: Allele<boolean>
    [BeeChromosomes.FLOWERING]?: Allele<number>
    [BeeChromosomes.TERRITORY]?: Allele<ITerritory>
}

interface IBeeSpecies {
    uid: string,
    binomial: string,
    branch: BeeBranch,
    dominant?: boolean,
    products?: []
    template?: IBeeTemplate
}

class BeeRegistry {
    private static readonly speciesById: Record<number, string> = {};

    static registerSpecies(species: IBeeSpecies) {
        assert("uid" in species, "Invalid uid");
        assert("binomial" in species, "Invalid binomial");
        assert("branch" in species, "Invalid bee branch");

        const {uid, dominant, products, template, binomial, branch} = species;
        const capitalizedUid = capitalize(species.uid);
        ["queen", "drone", "princess"].map(prefix => {
            const id = `${prefix}${capitalizedUid}`;
            IDRegistry.genItemID(id);
            Item.createItem(id, `forestry.${prefix}.${species.uid}`, {name: id});
            this.speciesById[ItemID[id]] = uid;
        });

        const allele = new AlleleBeeSpecies(uid, dominant, products || [], binomial, branch, template || {});
        AlleleRegistry.registerAllele(allele);
    }

    static getSpeciesAllele(uid: string) {
        return AlleleRegistry.getAllele(`species.bee.${uid}`);
    }

    static getSpeciesByItem(id: number) {
        return this.speciesById[id] || null;
    }

    static isBee(itemId: number) {
        return !!this.speciesById[itemId];
    }
}

BeeRegistry.registerSpecies({
    uid: "forest",
    binomial: "nigrocincta",
    branch: BeeBranches.HONEY,
    template: {
        [BeeChromosomes.FLOWERING]: AlleleFlowering.SLOW,
        [BeeChromosomes.FERTILITY]: AlleleFertility.HIGH,
    },
});