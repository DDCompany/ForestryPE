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
    RecipeRegistry: RecipeRegistry,
    Util: Util,
    Dictionary: Dictionary,

    requireGlobal: function (command) {
        return eval(command);
    }

});
Logger.Log("ForestryAPI shared", "API");