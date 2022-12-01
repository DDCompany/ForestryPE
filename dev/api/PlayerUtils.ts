class PlayerUtils {
    static decreaseCarriedItem(player: number, count: number = 1) {
        const actor = new PlayerActor(player);
        const slotId = actor.getSelectedSlot();
        const slot = actor.getInventorySlot(slotId);
        if (slot.count > count) {
            actor.setInventorySlot(slotId, slot.id, slot.count - count, slot.data, null);
        } else {
            actor.setInventorySlot(slotId, 0, 0, 0, null);
        }
    }
}