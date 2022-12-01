MachineRegistry.registerConsumer(BlockID.centrifuge, {
    useNetworkItemContainer: true,

    defaultValues: {
        progress: 0,
        progressMax: 0,
        outputIDs: []
    },

    findWork() {
        let slot = this.container.getSlot("slotInput");
        let recipe = CentrifugeManager.getRecipe(slot.id, slot.data);

        if (recipe) {
            this.container.setSlot("slotRecipe", slot.id, 1, slot.data);
            this.data.progress = 1;
            this.data.progressMax = recipe.time || 20;

            let result = recipe.result;
            let newResult = [];

            for (let i in result) {
                let item = result[i];
                if (!item.chance || Math.random() < item.chance)
                    newResult.push(item);
            }
            this.data.outputIDs = newResult;

            this.container.setSlot("slotInput", slot.id, slot.count - 1, slot.data);
            this.container.validateSlot("slotInput");
        }
    },

    putResult() {
        let result = this.data.outputIDs;
        let notAdded = [];

        for (let i in result) {
            let item = result[i];
            let added = false;

            for (let j = 0; j < 9; j++) {
                const slotName = `slotOutput${j}`;
                let slot = this.container.getSlot(slotName);

                if (!slot.id) {
                    this.container.setSlot(slotName, item.id, 1, item.data);
                    added = true;
                    break;
                } else if (slot.id === item.id && slot.data === item.data && slot.count < Item.getMaxStack(slot.id)) {
                    this.container.setSlot(slotName, slot.id, slot.count + 1, slot.data);
                    added = true;
                    break;
                }
            }

            if (!added)
                notAdded.push(item);
        }

        this.data.outputIDs = notAdded;
        return !notAdded.length;
    },

    tick() {
        if (World.getThreadTime() % 5 !== 0)
            return;

        if (this.data.energy >= 160) {
            if (this.data.progress) {
                if (this.data.progress >= this.data.progressMax) {
                    if (this.putResult()) {
                        this.container.clearSlot("slotRecipe");
                        this.data.progress = 0;
                    }
                } else {
                    this.data.progress++;
                    this.data.energy -= 160;
                }
            } else this.findWork();
        }

        let progress = (this.data.progress / this.data.progressMax) || 0;
        this.container.setScale("progressScale", progress);
        this.container.setScale("progressScale2", progress);
        this.container.setScale("energyScale", this.data.energy / this.getEnergyStorage());
        this.container.sendChanges();
    },

    getEnergyStorage() {
        return 5000;
    },

    getMaxTransfer() {
        return 800;
    },

    getScreenByName() {
        return centrifugeGUI;
    }
});

{
    let slots: Record<string, SlotData> = {
        "slotInput": {
            input: true
        }
    };

    for (let i = 0; i < 9; i++) {
        slots[`slotOutput${i}`] = {
            output: true
        };
    }

    StorageInterface.createInterface(BlockID.centrifuge, {
        slots
    });
}