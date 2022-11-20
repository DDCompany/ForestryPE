interface ForestryAPI {
    RainSubstrateRecipes: RainSubstrateRecipes;

    MachineRegistry: MachineRegistry;

    ContainerHelper: ContainerHelper;

    Config: ForestryConfig;

    HiveGenerator: HiveGenerator;

    ModelHelper: ModelHelper;

    BiomeHelper: BiomeHelper;

    Util: Util;

    ChestManager: ChestManager;

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
    Bee,
    BeeEffects,
    BeeFrame,
    BeeHouse,
    BeeLogic,
    BeeRegistry,
    BeeType,
    ModifierList,
    MachineRegistry,
    BiomeHelper,
    HiveGenerator,
    Config: ForestryConfig,
    ContainerHelper,
    ModelHelper,
    Util,
    ApiaryRegistry,
    ChestManager,
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
    RainSubstrateRecipes,
    Combs: COMBS,
    registerCrate,

    requireGlobal(command: string): any {
        return eval(command);
    }
} as ForestryAPI);

log("API shared with name ForestryAPI", "API");
log("Load time: " + ((java.lang.System.currentTimeMillis() - startTime) / 1000) + "s", "INFO");