interface AnalyzersSaverScope {
    nextId: number;
    containers: Record<string, ItemContainer>;
}

class AnalyzerManager {
    private static nextId = 1;
    private static containers: Record<string, ItemContainer> = {};

    static setupClient() {
        ItemContainer.registerScreenFactory("forestry_pe.analyzer", () => {
            return AnalyzerUi.window;
        });

        ItemContainer.addClientEventListener("forestry_pe.analyzer", "clearUi", () => {
            AnalyzerUi.clearPages();
        });

        ItemContainer.addClientEventListener("forestry_pe.analyzer", "drawPage", (container, window, content, data) => {
            const bee = BeeRegistry.getBeeFromScope(data.bee);
            AnalyzerUi.drawPage(data.page, bee, container);
        });
    }

    /**
     * Opens the analyzer interface for the {@link player} if they are holding an analyzer.
     */
    static openUiFor(player: number) {
        const actor = new PlayerActor(player);
        const selectedSlot = actor.getSelectedSlot();
        const item = actor.getInventorySlot(selectedSlot);
        if (item.id !== ItemID.analyzer) {
            return;
        }

        //The item's data is used as unique id for the container
        //Zero if id has not been generated yet
        if (!item.data) {
            item.data = this.nextId++;
            actor.setInventorySlot(selectedSlot, item.id, item.count, item.data, item.extra as ItemExtraData);
        }

        //InnerCore does not support storing keys as numbers in save files
        let container = this.containers[`c${item.data}`];
        if (!container) {
            container = new ItemContainer();
            this.setupContainer(container);
            this.containers[`c${item.data}`] = container;
        }

        const client = Network.getClientForPlayer(player);
        if (client) {
            container.openFor(client, "main");
        }
    }

    static getContainer(analyzerId: number): ItemContainer | null {
        return this.containers[`c${analyzerId}`];
    }

    static getState(): AnalyzersSaverScope {
        return {
            nextId: this.nextId,
            containers: this.containers,
        };
    }

    static resetState() {
        this.nextId = 1;
        this.containers = {};
    }

    static restoreState(scope: AnalyzersSaverScope) {
        this.nextId = scope.nextId;
        this.containers = scope.containers;

        for (const key in this.containers) {
            this.setupContainer(this.containers[key]);
        }
    }

    private static setupContainer(container: ItemContainer) {
        container.setClientContainerTypeName("forestry_pe.analyzer");

        const pageBySlot: Record<string, AnalyzerPage> = {
            slotPhase1: AnalyzerPage.GENOME,
            slotPhase2: AnalyzerPage.HABITAT,
            slotPhase3: AnalyzerPage.PRODUCTION,
        };

        container.addServerOpenListener(() => {
            for (const key of Object.keys(pageBySlot)) {
                const slot = container.getSlot(key);
                if (slot.id) {
                    const bee = BeeRegistry.getBeeFromItem(slot.id, slot.data);
                    if (bee.analyzed) {
                        container.sendEvent("drawPage", {page: pageBySlot[key], bee: bee.getSaveScope()});
                    }
                    return;
                }
            }
        });

        container.setGlobalAddTransferPolicy((container, name, id, count) => {
            if (name !== "slotHoney") {
                //Only allow one item to be scanned at a time
                const slots = ["slotScanning", "slotPhase1", "slotPhase2", "slotPhase3"];
                for (const slotName of slots) {
                    if (container.getSlot(slotName).id !== 0) {
                        return 0;
                    }
                }
            }

            const slot = container.getSlot(name);
            return Math.min(slot.count + count, Item.getMaxStack(id)) - slot.count;
        });

        container.setGlobalDirtySlotListener((container, name, slot) => {
            const {id, data} = slot;

            if (!id) { //If player consume item from slot
                if (name !== "slotHoney") {
                    container.sendEvent("clearUi", {});
                }

                return;
            } else if (name === "slotHoney") {
                container.validateSlot("slotHoney");
                return;
            }

            if (name === "slotScanning") {
                AnalyzerManager.tryScan(container);
                return;
            }

            const bee = BeeRegistry.getBeeFromItem(id, data);
            if (!bee.analyzed) {
                return;
            }

            const page = pageBySlot[name];
            if (!page) {
                throw new Error(`Page not found for '${name}'`);
            }

            container.sendEvent("drawPage", {page, bee: bee.getSaveScope()});
        });
    }

    private static tryScan(container: ItemContainer) {
        const {id, count, data, extra} = container.getSlot("slotScanning");
        if (!id || !BeeRegistry.isBee(id)) {
            return;
        }

        const bee = BeeRegistry.getBeeFromItem(id, data);
        if (!bee.analyzed) {
            if (this.consumeHoney(container)) {
                bee.analyzed = true;
                bee.save();
            } else return;
        }

        container.setSlot("slotScanning", 0, 0, 0);
        container.setSlot("slotPhase1", id, count, bee.unique, extra);
        container.sendChanges();
    }

    private static consumeHoney(container: ItemContainer): boolean {
        const slot = container.getSlot("slotHoney");
        if (slot.id !== ItemID.honeyDrop && slot.id !== ItemID.honeydew) {
            return false;
        }

        container.setSlot("slotHoney", slot.id, slot.count - 1, slot.data, slot.extra as ItemExtraData);
        container.validateSlot("slotHoney");
        return true;
    }
}

Callback.addCallback("LevelLeft", () => {
    AnalyzerManager.resetState();
});

Saver.addSavesScope("ForestryPEAnalyzers",
    function read(scope: AnalyzersSaverScope) {
        if (scope) {
            AnalyzerManager.restoreState(scope);
        }
    },

    function save(): AnalyzersSaverScope {
        return AnalyzerManager.getState();
    }
);

AnalyzerManager.setupClient();

Item.registerUseFunction(ItemID.analyzer, (coords, item, block, player) => {
    AnalyzerManager.openUiFor(player);
});