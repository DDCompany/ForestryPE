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
    BioGeneratorManager: BioGeneratorManager,
    CarpenterManager: CarpenterManager,
    CentrifugeManager: CentrifugeManager,
    FabricatorManager: FabricatorManager,
    FermenterManager: FermenterManager,
    SqueezerManager: SqueezerManager,
    FactoryManager: FactoryManager,
    StillManager: StillManager,
    MoistenerManager: MoistenerManager,
    Combs: COMBS,

    generateOre: generateOre,
    registerLiquidContainer: registerLiquidContainer,
    pickupLiquidFromWorld: pickupLiquidFromWorld,
    registerCrate: registerCrate,

    requireGlobal: function (command) {
        return eval(command);
    }
});
log("API shared with name ForestryAPI", "API");
log("Load time: " + ((java.lang.System.currentTimeMillis() - startTime) / 1000) + "s", "INFO");