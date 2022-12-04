ModAPI.addAPICallback("RecipeViewer", ({Core}) => {
    BeeRegistry.integrateWithRecipeViewer(Core);
});