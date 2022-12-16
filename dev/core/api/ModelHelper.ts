class ModelHelper {
    static createEngineModel(blockID: number) {
        const render = new ICRender.Model();
        BlockRenderer.setStaticICRender(blockID, -1, render);

        //TODO

        Block.setBlockShape(blockID, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1});
        //
        // const render = new ICRender.Model();
        // BlockRenderer.setStaticICRender(blockID, 0, render);
        //
        // const model = BlockRenderer.createModel();
        // model.addBox(0, 0, 0, 1, 0.374, 1, blockID, 0);
        // model.addBox(0.125, 0.374, 0.125, 0.875, 0.624, 0.875, blockID, 0);
        // model.addBox(0.25, 0.624, 0.25, 0.75, 0.999, 0.75, blockID, 0);
        //
        // render.addEntry(model);
    }
}