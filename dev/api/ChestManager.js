const ChestManager = {
    register: function (unique, name, textures, inCreative, slots, tile, specType) {
        Block.createBlockWithRotation(unique, [
            {name: name, texture: textures, inCreative: inCreative}
        ], specType);

        this.createModel(BlockID[unique]);

        let guiObj = {
            standart: {
                header: {
                    text: {
                        text: name
                    }
                },
                inventory: {
                    standart: true
                },
                background: {
                    standart: true
                }
            },
            drawing: [],
            elements: {}
        };

        let x = 350; //TODO: refactor
        let y = 40;
        for (let i = 0; i < slots; i++) {
            guiObj.elements[i] = {type: "slot", x: x, y: y, isValid: tile.isValid};
            x += 61;
            if (x >= 930) {
                y += 61;
                x = 350;
            }
        }
        guiObj.standart.minHeight = y + 70;

        let gui = new UI.StandartWindow(guiObj);

        tile.getGuiScreen = function () {
            return gui;
        };

        TileEntity.registerPrototype(BlockID[unique], tile);

        let slotList = {};

        for (let i = 0; i < slots; i++) {
            slotList[i] = {
                input: true,
                output: true,

                isValid: function (item) {
                    return BeeRegistry.isBee(item.id);
                },
            };
        }

        StorageInterface.createInterface(BlockID[unique], {
            slots: slotList
        });
    },

    createModel: function (blockID) {
        Block.setBlockShape(blockID, {x: 0.07, y: 0, z: 0.07}, {x: 0.93, y: 0.87, z: 0.93});

        for (let i = 0; i < 4; i++) {
            let render = new ICRender.Model();
            BlockRenderer.setStaticICRender(blockID, i, render);

            let model = BlockRenderer.createModel();
            model.addBox(0.07, 0, 0.07, 0.93, 0.87, 0.93, blockID, i);

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

    }
};