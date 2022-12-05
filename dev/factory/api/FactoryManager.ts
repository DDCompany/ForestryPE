class FactoryManager {
    static register(
        unique: string,
        name: string,
        textures: [string, number][],
        inCreative: boolean,
        specType?: Block.SpecialType | string,
    ) {
        Block.createBlockWithRotation(unique, [
            {name, texture: textures, inCreative}
        ], specType);

        this.createModel(BlockID[unique], textures);
        Item.addCreativeGroup("forestryMachine", t("forestry.creative_group.machines"), [
            BlockID[unique],
        ]);
    }

    private static createModel(blockId: number, textures: [string, number][]) {
        const texturesFlipped: [string, number][] = [
            [textures[0][0], 1], [textures[0][0], 1], [textures[5][0], 0],
            [textures[5][0], 0], [textures[3][0], 0], [textures[3][0], 0],
        ];
        for (let i = 0; i < 4; i++) {
            const render = new ICRender.Model();
            const model = BlockRenderer.createModel();
            switch (i) {
                case 0:
                case 1:
                    model.addBox(0, 0, 0, 1, 1, 0.23, blockId, 0);
                    model.addBox(0.14, 0.125, 0.23, 0.88, 0.88, 0.77, blockId, 0);
                    model.addBox(0, 0, 0.77, 1, 1, 1, blockId, 0);
                    break;
                case 2:
                case 3:
                    model.addBox(0, 0, 0, 0.23, 1, 1, texturesFlipped);
                    model.addBox(0.23, 0.1, 0.1, 0.77, 0.9, 0.9, texturesFlipped);
                    model.addBox(0.77, 0, 0, 1, 1, 1, texturesFlipped);
                    break;
            }

            render.addEntry(model);
            BlockRenderer.setStaticICRender(blockId, i, render);
        }

        Block.setBlockShape(blockId, {x: .0625, y: .0625, z: .0625}, {x: .9375, y: .9375, z: .9375});
    }
}