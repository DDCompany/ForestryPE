MachineRegistry.registerConsumer(BlockID.centrifuge, {
    defaultValues: {
        progress: 0,
        progressMax: 0,
        outputIDs: []
    },

    findWork() {
        let slot = this.container.getSlot("slotInput");
        let recipe = CentrifugeManager.getRecipe(slot.id, slot.data);

        if (recipe) {
            let slotRecipe = this.container.getSlot("slotRecipe");
            slotRecipe.id = slot.id;
            slotRecipe.data = slot.data;
            slotRecipe.count = 1;

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

            slot.count--;
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
                let slot = this.container.getSlot("slotOutput" + j);

                if (!slot.id) {
                    slot.id = item.id;
                    slot.data = item.data;
                    slot.count = 1;
                    added = true;
                    break;
                } else if (slot.id === item.id && slot.data === item.data && slot.count < Item.getMaxStack(slot.id)) {
                    slot.count++;
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
                        let slotRecipe = this.container.getSlot("slotRecipe");
                        slotRecipe.id = 0;
                        slotRecipe.data = 0;

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
    },

    getEnergyStorage() {
        return 5000;
    },

    getMaxTransfer() {
        return 800;
    },

    getGuiScreen() {
        return centrifugeGUI;
    }
});

{
    let slots = {
        "slotInput": {
            input: true
        }
    };

    for (let i = 0; i < 9; i++) {
        slots["slotOutput" + i] = {
            output: true
        };
    }

    StorageInterface.createInterface(BlockID.centrifuge, {
        slots
    });
}