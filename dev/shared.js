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
    BackpackManager: BackpackManager,
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

    requireGlobal: function (command) {
        return eval(command);
    }

});
Logger.Log("Forestry API shared with name ForestryAPI", "API");