ModAPI.addAPICallback("RecipeViewer", function (api) {
    const RecipeViewer = api.Core;

    CarpenterManager.integrateWithRecipeViewer(RecipeViewer);
    CentrifugeManager.integrateWithRecipeViewer(RecipeViewer);
    BeeRegistry.integrateWithRecipeViewer(RecipeViewer);
    FermenterManager.integrateWithRecipeViewer(RecipeViewer);
    MoistenerManager.integrateWithRecipeViewer(RecipeViewer);
    PeatFiredManager.integrateWithRecipeViewer(RecipeViewer);

    log("Recipe Viewer Integration Activated", "INFO");
});