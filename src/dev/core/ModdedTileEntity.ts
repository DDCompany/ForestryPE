function Tile(id: number) {
    return function (constructor: { new() }) {
        TileEntity.registerPrototype(id, new constructor());
    };
}

abstract class ModdedTileEntity<T extends Record<string, any>> implements TileEntity.TileEntityPrototype {
    readonly abstract defaultValues: T;
    data: T;
    x: number;
    y: number;
    z: number;
    blockSource: BlockSource;
}