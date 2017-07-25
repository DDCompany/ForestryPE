TileEntity.registerPrototype(BlockID.apiary, {

    defaultValues: {},

    tick: function () {
        var slot0 = this.container.getSlot("slot0");
        var slot1 = this.container.getSlot("slot1");
        var slot2 = this.container.getSlot("slot2");

        if (slot0.id && slot1.id) {
            var parent1 = BeeRegistry.getBeeFromItem(slot0.id, slot0.data);
            var parent2 = BeeRegistry.getBeeFromItem(slot1.id, slot1.data);

            var queen = BeeLogic.mate(parent1, parent2);
            slot2.id = queen.item.id;
            slot2.data = queen.item.data;
            slot2.count = 1;

            slot0.count--;
            slot1.count--;
        }

        this.container.validateAll();
    },

    getGuiScreen: function () {
        return apiaryGUI;
    }

});