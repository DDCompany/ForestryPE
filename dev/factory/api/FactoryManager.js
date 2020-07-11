const FactoryManager = {
    register: function (unique, name, textures, inCreative, specType) {
        Block.createBlockWithRotation(unique, [
            {name: name, texture: textures, inCreative: inCreative}
        ], specType);

        this.createModel(BlockID[unique], textures);
        Item.addCreativeGroup(GROUP_MACHINES, GROUP_MACHINES_NAME, [BlockID[unique]]);
    },

    createModel: function (blockId, textures) {
        Block.setBlockShape(blockId, {x: .0625, y: .0625, z: .0625}, {x: .9375, y: .9375, z: .9375});

        let texture2 = [[textures[0][0], 1], [textures[0][0], 1], [textures[5][0], 0], [textures[5][0], 0], [textures[3][0], 0], [textures[3][0], 0]];

        for (let i = 0; i < 4; i++) {
            let render = new ICRender.Model();
            BlockRenderer.setStaticICRender(blockId, i, render);

            let model = BlockRenderer.createModel();

            switch (i) {
                case 0:
                case 1:
                    model.addBox(0, 0, 0, 1, 1, 0.23, blockId, 0);
                    model.addBox(0.14, 0.125, 0.23, 0.88, 0.88, 0.77, blockId, 0);
                    model.addBox(0, 0, 0.77, 1, 1, 1, blockId, 0);
                    break;
                case 2:
                case 3:
                    model.addBox(0, 0, 0, 0.23, 1, 1, texture2);
                    model.addBox(0.23, 0.1, 0.1, 0.77, 0.9, 0.9, texture2);
                    model.addBox(0.77, 0, 0, 1, 1, 1, texture2);
                    break;
            }

            render.addEntry(model);
        }
    }
};