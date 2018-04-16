const ModelHelper = {

    createChestModel: function (blockID) {

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

    },

    createEngineModel: function (blockID) {
        Block.setBlockShape(blockID, {x: 0, y: 0, z: 0}, {x: 1, y: 0.374, z: 1});

        let render = new ICRender.Model();
        BlockRenderer.setStaticICRender(blockID, 0, render);

        let model = BlockRenderer.createModel();
        model.addBox(0, 0, 0, 1, 0.374, 1, blockID, 0);
        model.addBox(0.125, 0.374, 0.125, 0.875, 0.624, 0.875, blockID, 0);
        model.addBox(0.25, 0.624, 0.25, 0.75, 0.999, 0.75, blockID, 0);

        render.addEntry(model);
    }

};