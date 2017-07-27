var ContainerHelper = {

    putInSlots: function (toPut, container, slots) {
        for (var key in toPut) {
            var count = toPut[key][2];
            for (var key2 in slots) {
                if (!count) break;
                var slot = container.getSlot(slots[key2]);
                if (slot.id === toPut[key][0] && slot.data === toPut[key][1] && slot.count < Item.getMaxStack(slot.id)) {
                    var f = Math.min(count, Item.getMaxStack(slot.id) - slot.count);
                    count -= f;
                    slot.count += f;
                } else if (slot.id === 0) {
                    slot.id = toPut[key][0];
                    slot.data = toPut[key][1];
                    slot.count = toPut[key][2];
                    count = 0;
                }
            }
        }
    },

    putInSlotsObj: function (toPut, container, slots) {
        this.putInSlots([[toPut.id, toPut.data, toPut.count || 1]], container, slots);
    }

};