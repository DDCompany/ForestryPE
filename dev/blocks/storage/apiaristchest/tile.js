TileEntity.registerPrototype(BlockID.apiaristchest, {

    defaultValues: {},

    tick: function () {

        for (var i = 0; i < 125; i++) {
            if (!BeeRegistry.isBee(this.container.getSlot("slot" + i).id)) {
                this.container.dropSlot("slot" + i, this.x + 0.5, this.y + 1, this.z + 0.5);
            }
        }

    },

    getGuiScreen: function () {
        return apiaristChestGUI;
    }

});