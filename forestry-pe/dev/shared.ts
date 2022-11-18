interface ForestryAPI {
    PeatFiredManager: PeatFiredManager;

    BioGeneratorManager: BioGeneratorManager;

    CarpenterManager: CarpenterManager;

    CentrifugeManager: CentrifugeManager;

    FabricatorManager: FabricatorManager;

    FermenterManager: FermenterManager;

    SqueezerManager: SqueezerManager;

    FactoryManager: FactoryManager;

    StillManager: StillManager;

    MoistenerManager: MoistenerManager;

    /**
     * An array with all honeycomb IDs. Used to register recipes with any type of honeycomb (for example, a beekeeper's chest).
     *
     * Your items must be added before the *PostLoaded* callback, otherwise they will not be used.
     */
    Combs: number[];

    registerCrate: typeof registerCrate;

    requireGlobal(command: string): any;
}

ModAPI.registerAPI("ForestryAPI", {
    Bee: Bee,
    BeeEffects: BeeEffects,
    BeeFrame: BeeFrame,
    BeeHouse: BeeHouse,
    BeeLogic: BeeLogic,
    BeeRegistry: BeeRegistry,
    BeeType: BeeType,
    ModifierList: ModifierList,
    BiomeHelper: BiomeHelper,
    HiveGenerator: HiveGenerator,
    Config: ForestryConfig,
    ContainerHelper: ContainerHelper,
    ModelHelper: ModelHelper,
    Util: Util,
    ApiaryRegistry: ApiaryRegistry,
    ChestManager: ChestManager,
    PeatFiredManager,
    BioGeneratorManager,
    CarpenterManager,
    CentrifugeManager,
    FabricatorManager,
    FermenterManager,
    SqueezerManager,
    FactoryManager,
    StillManager,
    MoistenerManager,
    Combs: COMBS,
    registerCrate,

    requireGlobal(command: string): any {
        return eval(command);
    }
} as ForestryAPI);

log("API shared with name ForestryAPI", "API");
log("Load time: " + ((java.lang.System.currentTimeMillis() - startTime) / 1000) + "s", "INFO");