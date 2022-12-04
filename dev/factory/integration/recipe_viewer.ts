ModAPI.addAPICallback("RecipeViewer", ({Core}) => {
    CarpenterManager.integrateWithRecipeViewer(Core);
    CentrifugeManager.integrateWithRecipeViewer(Core);
    FermenterManager.integrateWithRecipeViewer(Core);
    MoistenerManager.integrateWithRecipeViewer(Core);
    PeatFiredManager.integrateWithRecipeViewer(Core);
    BioGeneratorManager.integrateWithRecipeViewer(Core);
    StillManager.integrateWithRecipeViewer(Core);
    SqueezerManager.integrateWithRecipeViewer(Core);
});