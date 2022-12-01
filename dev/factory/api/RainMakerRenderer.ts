class RainMakerRenderer {
    private static readonly pool: Record<string, ICRender.Model> = {};

    static setStaticRender(blockId: number) {
        const render = this.bakeRender(0, 0);
        BlockRenderer.setStaticICRender(blockId, 0, render);
        BlockRenderer.enableCoordMapping(blockId, 0, render);
    }

    static mapAtCoords(x: number, y: number, z: number, progress: number, charge: number) {
        const render = this.bakeRender(progress, charge);
        BlockRenderer.mapAtCoords(x, y, z, render);
    }

    static bakeRender(progress: number, charge: number): ICRender.Model {
        const key = progress + ":" + charge;
        if (this.pool[key]) {
            return this.pool[key];
        }

        const render = new ICRender.Model();
        const model = BlockRenderer.createModel();
        render.addEntry(model);
        this.pool[key] = render;

        //region Model Parts
        //Pedestal
        model.addBox(
            0, 0, 0,
            1, 1 / 16, 1,
            [
                ["rainmaker_pedestal", 1], ["rainmaker_pedestal", 0], ["rainmaker_pedestal", 2], ["rainmaker_pedestal", 2],
                ["rainmaker_pedestal", 3],
            ],
        );

        //Column
        const columnIndex = 2 + charge;
        model.addBox(
            6 / 16, 1 / 16, 6 / 16,
            10 / 16, 1, 10 / 16,
            [
                ["rainmaker_column", 0], ["rainmaker_column", 0], ["rainmaker_column", columnIndex], ["rainmaker_column", columnIndex],
                ["rainmaker_column", 1],
            ],
        );

        //Extension
        model.addBox(
            1 / 16, 7 / 16, 7 / 16,
            15 / 16, 9 / 16, 9 / 16,
            [
                ["rainmaker_extension", 0], ["rainmaker_extension", 0], ["rainmaker_extension", 1], ["rainmaker_extension", 1],
                ["rainmaker_extension", 0],
            ],
        );

        let bladeOffset;
        if (progress < .5) {
            bladeOffset = progress * 8 / 16;
        } else {
            bladeOffset = (1 - progress) * 8 / 16;
        }

        //Left Blade
        model.addBox(
            5 / 16 - bladeOffset, 2 / 16, 4 / 16,
            6 / 16 - bladeOffset, 14 / 16, 12 / 16,
            [
                ["rainmaker_blade", 0], ["rainmaker_blade", 0], ["rainmaker_blade", 0], ["rainmaker_blade", 0],
                ["rainmaker_blade", 1], ["rainmaker_blade", 2],
            ],
        );

        //Right Blade
        model.addBox(
            10 / 16 + bladeOffset, 2 / 16, 4 / 16,
            11 / 16 + bladeOffset, 14 / 16, 12 / 16,
            [
                ["rainmaker_blade", 0], ["rainmaker_blade", 0], ["rainmaker_blade", 0], ["rainmaker_blade", 0],
                ["rainmaker_blade", 2], ["rainmaker_blade", 1],
            ],
        );
        //endregion

        return render;
    }
}