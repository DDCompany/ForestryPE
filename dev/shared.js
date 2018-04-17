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
    Config: ForestryConfig,
    ContainerHelper: ContainerHelper,
    ModelHelper: ModelHelper,
    Util: Util,
    ApiaryRegistry: ApiaryRegistry,
    BackpackManager: BackpackManager,
    BioGeneratorManager: BioGeneratorManager,
    CarpenterManager: CarpenterManager,
    CentrifugeManager: CentrifugeManager,
    FabricatorManager: FabricatorManager,
    FermenterManager: FermenterManager,
    SqueezerManager: SqueezerManager,
    FactoryManager: FactoryManager,

    generateOre: generateOre,

    requireGlobal: function (command) {
        return eval(command);
    }

});
Logger.Log("Forestry API shared with name ForestryAPI", "API");