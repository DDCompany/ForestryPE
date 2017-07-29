var ModelHelper = {

    createFactoryModel: function (blockID, textures) {

        Block.setPrototype("miscTile" + blockID, {

            getVariations: function () {
                return [
                    {
                        name: "misc_tile",
                        texture: [[textures[0][0], 1], [textures[0][0], 1], [textures[5][0], 0], [textures[5][0], 0], [textures[3][0], 0], [textures[3][0], 0]]
                    }
                ]
            }
        });

        Block.setBlockShape(blockID, {x: 0.1, y: 0, z: 0}, {x: 0.95, y: 0.95, z: 0.95});

        for (var i = 0; i < 2; i++) {
            var render = new TileRenderModel(blockID, i);
            render.addBoxF(0, 0, 0, 1, 1, 0.23, {id: blockID, data: 0});
            render.addBoxF(0.1, 0.1, 0.23, 0.9, 0.9, 0.77, {id: blockID, data: 0});
            render.addBoxF(0, 0, 0.77, 1, 1, 1, {id: blockID, data: 0});
        }

        for (var i = 2; i < 4; i++) {
            var render = new TileRenderModel(blockID, i);
            render.addBoxF(0, 0, 0, 0.23, 1, 1, {id: BlockID["miscTile" + blockID], data: 0});
            render.addBoxF(0.23, 0.1, 0.1, 0.77, 0.9, 0.9, {id: BlockID["miscTile" + blockID], data: 0});
            render.addBoxF(0.77, 0, 0, 1, 1, 1, {id: BlockID["miscTile" + blockID], data: 0});
        }

    },

    createChestModel: function (blockID) {

        Block.setBlockShape(blockID, {x: 0, y: 0, z: 0}, {x: 0.95, y: 0.95, z: 0.95});

        var render = new TileRenderModel(blockID, 0);
        render.addBoxF(0.07, 0, 0.07, 0.93, 0.87, 0.93, {id: blockID, data: 0});
        render.addBoxF(0.43, 0.45, 0.93, 0.55, 0.7, 1, {id: 42, data: 0});

        var render = new TileRenderModel(blockID, 1);
        render.addBoxF(0.07, 0, 0.07, 0.93, 0.87, 0.93, {id: blockID, data: 1});
        render.addBoxF(0.44, 0.45, 0, 0.57, 0.7, 0.07, {id: 42, data: 0});

        var render = new TileRenderModel(blockID, 2);
        render.addBoxF(0.07, 0, 0.07, 0.93, 0.87, 0.93, {id: blockID, data: 2});
        render.addBoxF(0.93, 0.45, 0.45, 1, 0.7, 0.55, {id: 42, data: 0});

        var render = new TileRenderModel(blockID, 3);
        render.addBoxF(0.07, 0, 0.07, 0.93, 0.87, 0.93, {id: blockID, data: 3});
        render.addBoxF(0, 0.45, 0.44, 0.07, 0.7, 0.55, {id: 42, data: 0});

    }

};