class AlleleRegistry {
    private static readonly alleles: Record<string, Allele<any>> = {};

    static registerAlleles(alleles: Record<string, Allele<any>>) {
        for (let key in alleles) {
            const allele = alleles[key];
            this.registerAllele(allele);
        }

        return alleles;
    }

    static registerAllele(allele: Allele<any>) {
        assert(!this.hasAllele(allele.uid), `Allele already registered: ${allele.uid}`);
        Logger.Log("INFO", allele.toString());
        this.alleles[allele.uid] = allele;
    }

    static getAllele(uid: string) {
        return this.alleles[uid] || null;
    }

    static hasAllele(uid: string) {
        return this.getAllele(uid) !== null;
    }
}

interface ITerritory {
    x: number,
    y: number,
    z: number
}

const AlleleBoolean = {
    TRUE: new Allele<boolean>("boolean.true", true, true),
    FALSE: new Allele<boolean>("boolean.false", false, false),
};
AlleleRegistry.registerAlleles(AlleleBoolean);

const AlleleFertility = {
    LOW: new Allele<number>("fertility.low", 1, true),
    NORMAL: new Allele<number>("fertility.normal", 2, true),
    HIGH: new Allele<number>("fertility.high", 3),
    MAXIMUM: new Allele<number>("fertility.maximum", 4),
};
AlleleRegistry.registerAlleles(AlleleFertility);

const AlleleLifespan = {
    SHORTEST: new Allele<number>("lifespan.shortest", 10),
    SHORTER: new Allele<number>("lifespan.shorter", 20, true),
    SHORT: new Allele<number>("lifespan.short", 30, true),
    SHORTENED: new Allele<number>("lifespan.shortened", 35, true),
    NORMAL: new Allele<number>("lifespan.normal", 40),
    ELONGATED: new Allele<number>("lifespan.elongated", 45, true),
    LONG: new Allele<number>("lifespan.long", 50),
    LONGER: new Allele<number>("lifespan.longer", 60),
    LONGEST: new Allele<number>("lifespan.longest", 70),
};
AlleleRegistry.registerAlleles(AlleleLifespan);

const AlleleSpeed = {
    SLOWEST: new Allele<number>("speed.slowest", .3, true),
    SLOWER: new Allele<number>("speed.slower", .6, true),
    SLOW: new Allele<number>("speed.slow", .8, true),
    NORMAL: new Allele<number>("speed.normal", 1),
    FAST: new Allele<number>("speed.fast", 1.2, true),
    FASTER: new Allele<number>("speed.faster", 1.4),
    FASTEST: new Allele<number>("speed.fastest", 1.7),
};
AlleleRegistry.registerAlleles(AlleleSpeed);

const AlleleTolerance = {
    NONE: new Allele<number>("tolerance.none", 0),
    BOTH_1: new Allele<number>("tolerance.both_1", 1, true),
    BOTH_2: new Allele<number>("tolerance.both_2", 2),
    BOTH_3: new Allele<number>("tolerance.both_3", 3),
    BOTH_4: new Allele<number>("tolerance.both_4", 4),
    BOTH_5: new Allele<number>("tolerance.both_5", 5),
    UP_1: new Allele<number>("tolerance.up_1", 6, true),
    UP_2: new Allele<number>("tolerance.up_2", 7),
    UP_3: new Allele<number>("tolerance.up_3", 8),
    UP_4: new Allele<number>("tolerance.up_4", 9),
    UP_5: new Allele<number>("tolerance.up_5", 10),
    DOWN_1: new Allele<number>("tolerance.down_1", 11, true),
    DOWN_2: new Allele<number>("tolerance.down_2", 12),
    DOWN_3: new Allele<number>("tolerance.down_3", 13),
    DOWN_4: new Allele<number>("tolerance.down_4", 14),
    DOWN_5: new Allele<number>("tolerance.down_5", 15),
};
AlleleRegistry.registerAlleles(AlleleTolerance);

const AlleleFlowering = {
    SLOWEST: new Allele<number>("flowering.slowest", 5, true),
    SLOWER: new Allele<number>("flowering.slower", 10),
    SLOW: new Allele<number>("flowering.slow", 15),
    AVERAGE: new Allele<number>("flowering.average", 20),
    FAST: new Allele<number>("flowering.fast", 15),
    FASTER: new Allele<number>("flowering.faster", 30),
    FASTEST: new Allele<number>("flowering.fastest", 35),
    MAXIMUM: new Allele<number>("flowering.maximum", 99, true),
};
AlleleRegistry.registerAlleles(AlleleFlowering);

const AlleleTerritory = {
    AVERAGE: new Allele<ITerritory>("territory.average", {x: 9, y: 6, z: 9}),
    LARGE: new Allele<ITerritory>("territory.large", {x: 11, y: 8, z: 11}),
    LARGER: new Allele<ITerritory>("territory.larger", {x: 13, y: 12, z: 13}),
    LARGEST: new Allele<ITerritory>("territory.largest", {x: 15, y: 13, z: 15}),
};
AlleleRegistry.registerAlleles(AlleleTerritory);