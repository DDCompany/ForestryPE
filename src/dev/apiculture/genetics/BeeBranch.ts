class BeeBranch extends Branch {
    private static readonly defaultTemplate = {
        [BeeChromosomes.SPEED]: AlleleSpeed.SLOWEST,
        [BeeChromosomes.LIFESPAN]: AlleleLifespan.SHORTER,
        [BeeChromosomes.FERTILITY]: AlleleFertility.NORMAL,
        [BeeChromosomes.TEMPERATURE_TOLERANCE]: AlleleTolerance.NONE,
        [BeeChromosomes.NEVER_SLEEPS]: AlleleBoolean.FALSE,
        [BeeChromosomes.HUMIDITY_TOLERANCE]: AlleleTolerance.NONE,
        [BeeChromosomes.TOLERATES_RAIN]: AlleleBoolean.FALSE,
        [BeeChromosomes.CAVE_DWELLING]: AlleleBoolean.FALSE,
        [BeeChromosomes.FLOWERING]: AlleleFlowering.SLOWEST,
        [BeeChromosomes.TERRITORY]: AlleleTerritory.AVERAGE,
    };

    constructor(uid: string, scientific: string, template: Record<string, Allele<any>> = {}) {
        super(uid, scientific, Object.assign({}, BeeBranch.defaultTemplate, template));
    }
}

const BeeBranches = {
    HONEY: new BeeBranch("honey", "Apis"),
    NOBLE: new BeeBranch("noble", "Probapis"),
    INDUSTRIOUS: new BeeBranch("industrious", "Industrapis"),
    HEROIC: new BeeBranch("heroic", "Herapis"),
    INFERNAL: new BeeBranch("infernal", "Diapis", {
        [BeeChromosomes.TEMPERATURE_TOLERANCE]: AlleleTolerance.DOWN_2,
        [BeeChromosomes.NEVER_SLEEPS]: AlleleBoolean.TRUE,
        [BeeChromosomes.FLOWERING]: AlleleFlowering.AVERAGE,
    }),
    AUSTERE: new BeeBranch("austere", "Modapis", {
        [BeeChromosomes.TEMPERATURE_TOLERANCE]: AlleleTolerance.BOTH_1,
        [BeeChromosomes.HUMIDITY_TOLERANCE]: AlleleTolerance.DOWN_1,
        [BeeChromosomes.NEVER_SLEEPS]: AlleleBoolean.TRUE,
    }),
    TROPICAL: new BeeBranch("tropical", "Caldapis", {
        [BeeChromosomes.TEMPERATURE_TOLERANCE]: AlleleTolerance.UP_1,
        [BeeChromosomes.HUMIDITY_TOLERANCE]: AlleleTolerance.UP_1,
    }),
    END: new BeeBranch("end", "Finapis", {
        [BeeChromosomes.FERTILITY]: AlleleFertility.LOW,
        [BeeChromosomes.SPEED]: AlleleSpeed.SLOWER,
        [BeeChromosomes.LIFESPAN]: AlleleLifespan.LONGER,
        [BeeChromosomes.TEMPERATURE_TOLERANCE]: AlleleTolerance.UP_1,
        [BeeChromosomes.TERRITORY]: AlleleTerritory.LARGE,
        [BeeChromosomes.NEVER_SLEEPS]: AlleleBoolean.TRUE,
    }),
    FROZEN: new BeeBranch("frozen", "Coagapis", {
        [BeeChromosomes.TEMPERATURE_TOLERANCE]: AlleleTolerance.UP_1,
        [BeeChromosomes.HUMIDITY_TOLERANCE]: AlleleTolerance.BOTH_1,
    }),
    VENGEFUL: new BeeBranch("vengeful", "Punapis", {
        [BeeChromosomes.TERRITORY]: AlleleTerritory.LARGEST,
    }),
    FESTIVE: new BeeBranch("festive", "Festapis", {
        [BeeChromosomes.SPEED]: AlleleSpeed.SLOWER,
        [BeeChromosomes.TEMPERATURE_TOLERANCE]: AlleleTolerance.BOTH_2,
        [BeeChromosomes.HUMIDITY_TOLERANCE]: AlleleTolerance.BOTH_1,
        [BeeChromosomes.LIFESPAN]: AlleleLifespan.NORMAL,
    }),
    AGRARIAN: new BeeBranch("agrarian", "Rustapis", {
        [BeeChromosomes.SPEED]: AlleleSpeed.SLOWER,
        [BeeChromosomes.LIFESPAN]: AlleleLifespan.SHORTER,
        [BeeChromosomes.FLOWERING]: AlleleFlowering.FASTER,
    }),
    BOGGY: new BeeBranch("boggy", "Paludapis", {
        [BeeChromosomes.FLOWERING]: AlleleFlowering.SLOWER,
        [BeeChromosomes.TEMPERATURE_TOLERANCE]: AlleleTolerance.BOTH_1,
    }),
    MONASTIC: new BeeBranch("monastic", "Monapis", {
        [BeeChromosomes.SPEED]: AlleleSpeed.SLOWER,
        [BeeChromosomes.LIFESPAN]: AlleleLifespan.LONG,
        [BeeChromosomes.FERTILITY]: AlleleFertility.LOW,
        [BeeChromosomes.FLOWERING]: AlleleFlowering.FASTER,
        [BeeChromosomes.HUMIDITY_TOLERANCE]: AlleleTolerance.BOTH_1,
        [BeeChromosomes.TEMPERATURE_TOLERANCE]: AlleleTolerance.BOTH_1,
        [BeeChromosomes.CAVE_DWELLING]: AlleleBoolean.TRUE,
    }),
};