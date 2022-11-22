interface ChestTileEntity extends TileEntity.TileEntityPrototype {
    isValid: (id: number, data: number) => boolean;
}

class ChestManager {
    static register(
        unique: string,
        name: string,
        textures: [string, number][],
        inCreative: boolean,
        slots: number,
        tile: ChestTileEntity,
        specType?: Block.SpecialType | string,
    ) {
        Block.createBlockWithRotation(unique, [
            {name, texture: textures, inCreative}
        ], specType);
        this.createModel(BlockID[unique]);

        if (tile.init) {
            summonException("init is reserved by ChestManager");
        }

        tile.useNetworkItemContainer = true;
        tile.init = function () {
            (this.container as ItemContainer).setGlobalAddTransferPolicy((name, slotName, id, count, data) => {
                return this.isValid(id, data) ? count : 0;
            });
        };

        const elements: UI.ElementSet = {};
        for (let i = 0; i < slots; i++) {
            elements[i] = {
                type: "slot",
                x: 350 + i % 10 * 61,
                y: 40 + Math.floor(i / 10) * 61,
                isValid: tile.isValid,
            };
        }

        const gui = new UI.StandartWindow({
            standard: {
                header: {
                    text: {
                        text: name
                    }
                },
                inventory: {
                    standard: true
                },
                background: {
                    standard: true
                },
                minHeight: 110 + slots / 10 * 61,
            },
            drawing: [],
            elements,
        });
        MachineRegistry.addUiTitleTranslation(gui);

        tile.getGuiScreen = () => gui;
        TileEntity.registerPrototype(BlockID[unique], tile);

        const slotList: Record<string, SlotData> = {};
        for (let i = 0; i < slots; i++) {
            slotList[i] = {
                input: true,
                output: true,

                isValid(item) {
                    return tile.isValid(item.id, item.data);
                },
            };
        }
        StorageInterface.createInterface(BlockID[unique], {slots: slotList});
    }

    private static createModel(blockID: number) {
        for (let i = 0; i < 4; i++) {
            const render = new ICRender.Model();
            const model = BlockRenderer.createModel();
            model.addBox(0.07, 0, 0.07, 0.93, 0.87, 0.93, blockID, i);
            BlockRenderer.setStaticICRender(blockID, i, render);

            switch (i) {
                case 0:
                    model.addBox(0.43, 0.45, 0.93, 0.55, 0.7, 1, 42, 0);
                    break;
                case 1:
                    model.addBox(0.44, 0.45, 0, 0.57, 0.7, 0.07, 42, 0);
                    break;
                case 2:
                    model.addBox(0.93, 0.45, 0.45, 1, 0.7, 0.55, 42, 0);
                    break;
                case 3:
                    model.addBox(0, 0.45, 0.44, 0.07, 0.7, 0.55, 42, 0);
                    break;
            }

            render.addEntry(model);
        }

        Block.setBlockShape(blockID, {x: 0.07, y: 0, z: 0.07}, {x: 0.93, y: 0.87, z: 0.93});
    }
}