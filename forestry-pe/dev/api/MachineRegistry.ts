class MachineRegistry {
    static readonly machines: Record<number, TileEntity.TileEntityPrototype> = {};
    static readonly uis: UI.StandartWindow[] = [];

    static registerConsumer(id: number, prototype: TileEntity.TileEntityPrototype, energyType?: EnergyType) {
        energyType = energyType || RF;

        if (!prototype.energyTick) {
            prototype.energyTick = () => {
            };
        }

        if (!prototype.energyReceive) {
            prototype.energyReceive = function (type: EnergyType, amount: number) {
                const add = Math.min(this.getMaxTransfer(), amount, this.getEnergyStorage() - this.data.energy);
                this.data.energy += add;
                return add;
            };
        }

        this.register(id, prototype, energyType);
    }

    static registerGenerator(id: number, prototype: TileEntity.TileEntityPrototype, energyType?: EnergyType) {
        energyType = energyType || RF;

        if (!prototype.energyTick) {
            prototype.energyTick = function (type: EnergyType, src: EnergyTileNode) {
                const out = Math.min(32, this.data.energy);
                this.data.energy -= out;
                this.data.energy += src.add(out);
            };
        }

        prototype.canReceiveEnergy = () => false;

        prototype.isEnergySource = () => true;

        this.register(id, prototype, energyType);
    }

    static register(id: number, prototype: TileEntity.TileEntityPrototype, energyType?: EnergyType) {
        energyType = energyType || RF;
        this.machines[id] = prototype;

        if (prototype.defaultValues) {
            prototype.defaultValues.energy = 0;
        } else {
            prototype.defaultValues = {energy: 0};
        }

        if (!prototype.getMaxTransfer)
            prototype.getMaxTransfer = () => 1100;

        if (!prototype.getEnergyStorage) {
            prototype.getEnergyStorage = () => 0
        }

        this.setupDefaults(prototype);
        this.setupWireConnection(id, energyType);
        ToolAPI.registerBlockMaterial(id, "stone", 1, true);
        Block.setDestroyTime(id, 1.5);
        TileEntity.registerPrototype(id, prototype);
        EnergyTileRegistry.addEnergyTypeForId(id, energyType);
    }

    static registerDefault(blockId: number, prototype: TileEntity.TileEntityPrototype) {
        this.setupDefaults(prototype);
        TileEntity.registerPrototype(blockId, prototype);
    }

    static setupDefaults(prototype: TileEntity.TileEntityPrototype) {
        if (!prototype.getScreenName) {
            prototype.getScreenName = () => "main";
        }

        if (!prototype.client) {
            prototype.client = {};
        }

        if (!prototype.client.containerEvents) {
            prototype.client.containerEvents = {};
        }

        if (prototype.updateLiquidScale) {
            throw new Error("updateLiquidScale is reserved by MachineRegistry");
        }

        prototype.updateLiquidScale = function (elementName: string, liquidName: string) {
            this.container.sendEvent("__updateLiquidScale", {
                elementName,
                liquidName,
                amount: this.liquidStorage.getRelativeAmount(liquidName)
            });
        };

        prototype.client.containerEvents.__updateLiquidScale = this.updateUiScaleEvent;
    }

    static setupWireConnection(id: number, energyType: EnergyType) {
        switch (energyType.name) {
            case EU.name:
                ICRender.getGroup("ic-wire").add(id, -1);
                return;
            case RF.name:
                ICRender.getGroup("rf-wire").add(id, -1);
                return;
            default:
                summonException("Energy type not supported");
        }
    }

    static addUiTitleTranslation(ui: UI.StandartWindow) {
        if (this.uis.indexOf(ui) === -1) {
            this.uis.push(ui);
        }
    }

    private static updateUiScaleEvent(container: ItemContainer, _: UI.Window | UI.StandartWindow | UI.StandardWindow | UI.TabbedWindow | null, __: UI.WindowContent, data: { elementName: string, liquidName: string, amount: number }) {
        const ui = container.getUiAdapter();
        const elementRect: android.graphics.Rect = ui.getBinding(data.elementName, "element_rect");
        if (elementRect) {
            const texture = LiquidRegistry.getLiquidUITexture(
                data.liquidName,
                elementRect.width(),
                elementRect.height(),
            );

            ui.setBinding(data.elementName, "texture", texture);
            ui.setBinding(data.elementName, "value", data.amount);
        }
    }
}

Callback.addCallback("LocalLevelLoaded", () => {
    for (const ui of MachineRegistry.uis) {
        const headerWindow = ui.getWindow("header");
        if (!headerWindow) {
            throw new Error("Header window not found");
        }

        // @ts-ignore
        const textDrawing = headerWindow.getContentProvider().drawing?.[2] as UI.TextDrawing;
        if (!textDrawing) {
            throw new Error("Text drawing not found");
        }

        // @ts-ignore
        const headerText = ui.getContent().standard?.header?.text?.text || ui.getContent().standart?.header?.text?.text;
        if (!headerText) {
            throw new Error("Title not set");
        }

        textDrawing.text = Translation.translate(headerText);
    }
});