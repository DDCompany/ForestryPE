const ModelHelper = {
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