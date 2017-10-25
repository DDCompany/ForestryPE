var ModelHelper = {

    createFactoryModel: function (blockID, textures) {
        Block.setBlockShape(blockID, {x: 0.1, y: 0, z: 0}, {x: 0.95, y: 0.95, z: 0.95});

        BlockRenderer.addRenderCallback(blockID, function (api, coords, block) {
            var texture2 = [[textures[0][0], 1], [textures[0][0], 1], [textures[5][0], 0], [textures[5][0], 0], [textures[3][0], 0], [textures[3][0], 0]];
            switch (block.data) {
                case 0:
                case 1:
                    api.renderBoxId(coords.x, coords.y, coords.z, 0, 0, 0, 1, 1, 0.23, blockID, 0);
                    api.renderBoxId(coords.x, coords.y, coords.z, 0.14, 0.125, 0.23, 0.88, 0.88, 0.77, blockID, 0);
                    api.renderBoxId(coords.x, coords.y, coords.z, 0, 0, 0.77, 1, 1, 1, blockID, 0);
                    break;
                case 2:
                case 3:
                    api.renderModel(coords.x, coords.y, coords.z, BlockRenderer.createTexturedBox(0, 0, 0, 0.23, 1, 1, texture2));
                    api.renderModel(coords.x, coords.y, coords.z, BlockRenderer.createTexturedBox(0.23, 0.1, 0.1, 0.77, 0.9, 0.9, texture2));
                    api.renderModel(coords.x, coords.y, coords.z, BlockRenderer.createTexturedBox(0.77, 0, 0, 1, 1, 1, texture2));
                    break;
            }
        });
        BlockRenderer.enableCustomRender(blockID);
    },

    createChestModel: function (blockID) {

        Block.setBlockShape(blockID, {x: 0, y: 0, z: 0}, {x: 0.95, y: 0.95, z: 0.95});

        BlockRenderer.addRenderCallback(blockID, function (api, coords, block) {
            api.renderBoxId(coords.x, coords.y, coords.z, 0.07, 0, 0.07, 0.93, 0.87, 0.93, blockID, 0);

            switch (block.data) {
                case 0:
                    api.renderBoxId(coords.x, coords.y, coords.z, 0.43, 0.45, 0.93, 0.55, 0.7, 1, 42, 0);
                    break;
                case 1:
                    api.renderBoxId(coords.x, coords.y, coords.z, 0.44, 0.45, 0, 0.57, 0.7, 0.07, 42, 0);
                    break;
                case 2:
                    api.renderBoxId(coords.x, coords.y, coords.z, 0.93, 0.45, 0.45, 1, 0.7, 0.55, 42, 0);
                    break;
                case 3:
                    api.renderBoxId(coords.x, coords.y, coords.z, 0, 0.45, 0.44, 0.07, 0.7, 0.55, 42, 0);
                    break;
            }
        });
        BlockRenderer.enableCustomRender(blockID);

    },

    createEngineModel: function (blockID) {
        Block.setBlockShape(blockID, {x: 0, y: 0, z: 0}, {x: 1, y: 0.374, z: 1});

        BlockRenderer.addRenderCallback(blockID, function (api, coords) {
            api.renderBoxId(coords.x, coords.y, coords.z, 0, 0, 0, 1, 0.374, 1, blockID, 0);
            api.renderBoxId(coords.x, coords.y, coords.z, 0.125, 0.374, 0.125, 0.875, 0.624, 0.875, blockID, 0);
            api.renderBoxId(coords.x, coords.y, coords.z, 0.25, 0.624, 0.25, 0.75, 0.999, 0.75, blockID, 0);
        });

        BlockRenderer.enableCustomRender(blockID);
    }

};