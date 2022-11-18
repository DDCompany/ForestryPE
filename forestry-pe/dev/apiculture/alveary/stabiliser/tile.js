TileEntity.registerPrototype(BlockID.alvearyStabiliser, {

    defaultValues: {},

    tick: function () {

    },

    getModifiers: function () {
        return {
            getMutationModifier: function () {
                return 0;
            }
        };
    }

});