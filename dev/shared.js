ModAPI.registerAPI("ForestryAPI", {

    Bee: Bee,
    BeeEffects: BeeEffects,
    BeeFrame: BeeFrame,
    BeeHouse: BeeHouse,
    BeeLogic: BeeLogic,
    BeeRegistry: BeeRegistry,
    BeeType: BeeType,
    ModifierList: ModifierList,
    BackpackRegistry: BackpackRegistry,
    BiomeHelper: BiomeHelper,
    Config: Config,
    ContainerHelper: ContainerHelper,
    ModelHelper: ModelHelper,
    Util: Util,
    Dictionary: Dictionary,
    ApiaryRegistry: ApiaryRegistry,

    BioGeneratorManager: BioGeneratorManager,
    CarpenterManager: CarpenterManager,
    CentrifugeManager: CentrifugeManager,
    FabricatorManager: FabricatorManager,
    FermenterManager: FermenterManager,
    SqueezerManager: SqueezerManager,

    requireGlobal: function (command) {
        return eval(command);
    }

});
Logger.Log("ForestryAPI shared", "API");