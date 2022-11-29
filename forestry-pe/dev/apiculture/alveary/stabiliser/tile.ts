TileEntity.registerPrototype(BlockID.alvearyStabiliser, {
    useNetworkItemContainer: true,
    defaultValues: {},

    getModifiers() {
        return {
            getMutationModifier() {
                return 0;
            }
        };
    }
});