//TODO

// function Tile(id: number) {
//     return function (constructor: { new(): ServerTileEntity }) {
//         TileEntity.registerPrototype(id, new constructor());
//     };
// }
//
// function TileEvent() {
//     return function (target: any, key: string, descriptor: PropertyDescriptor) {
//         if (descriptor.value instanceof Function) {
//             if (!target["events"]) target["events"] = {};
//             Object.defineProperty(target["events"], key, descriptor);
//         } else {
//             throw new Error("TileEvent decorator can be applied only to methods");
//         }
//     };
// }
//
// type GetEventsOf<T extends ClientTileEntity> = {
//     [K in keyof T]: T[K] extends (payload: object) => any ? T[K] : never;
// }
//
// class ClientTileEntity {
//     declare readonly x: number;
//     declare readonly y: number;
//     declare readonly z: number;
//     declare readonly dimension: number;
//     declare readonly remove: boolean;
//     declare readonly networkData: SyncedNetworkData;
//     declare readonly networkEntity: NetworkEntity;
//
//     //Forbidden to override reserved methods
//     declare readonly events: never;
//     declare readonly containerEvents: never;
//
//     load?(): void;
//
//     unload?(): void;
//
//     tick?(): void;
// }
//
// abstract class ServerTileEntity {
//     declare data: ReturnType<this["getDefaultValues"]>;
//     client: ClientTileEntity;
//
//     declare readonly x: number;
//     declare readonly y: number;
//     declare readonly z: number;
//     declare readonly dimension: number;
//     declare readonly container: ItemContainer;
//     declare readonly blockSource: BlockSource;
//     declare readonly sendPacket: <T extends keyof GetEventsOf<this["client"]>>(name: T, payload: Parameters<GetEventsOf<this["client"]>[T]>[0]) => void;
//
//     protected constructor() {
//         const self = this as TileEntity.TileEntityPrototype;
//         self.useNetworkItemContainer = true;
//         self.defaultValues = this.getDefaultValues();
//     }
//
//     getScreenName() {
//         return "default";
//     }
//
//     abstract getDefaultValues(): object;
//
//     click?(id: number, count: number, data: number, coords: Callback.ItemUseCoordinates, player: number, extra: ItemExtraData): boolean | void;
//
//     redstone?(params: { power: number, signal: number, onLoad: boolean }): void;
//
//     getScreenByName?(screenName?: string): com.zhekasmirnov.innercore.api.mod.ui.window.IWindow;
// }
//
// abstract class TilePowered extends ServerTileEntity {
//     private maxEnergy: number;
//
//     setEnergyStorage(value: number) {
//         this.maxEnergy = value;
//     }
//
//     getDefaultValues() {
//         return {
//             energy: 0,
//         };
//     }
//
//     addEnergy(energy: number) {
//         this.data.energy = Math.min(this.data.energy + energy, this.getEnergyStorage());
//     }
//
//     drainEnergy(energy: number) {
//         this.data.energy = Math.max(this.data.energy - energy, 0);
//     }
//
//     getEnergyStorage() {
//         return this.maxEnergy;
//     }
// }

abstract class TileForestry extends TileEntityBase {
    data: ReturnType<this["getDefaultValues"]>;

    constructor() {
        super();
        this.defaultValues = this.getDefaultValues();
    }

    abstract getDefaultValues(): object;
}

abstract class TilePowered extends TileForestry {
    private maxEnergy: number;

    getDefaultValues() {
        return {
            energy: 0,
        };
    }

    setEnergyStorage(capacity: number) {
        this.maxEnergy = capacity;
    }

    addEnergy(energy: number) {
        this.data.energy = Math.min(this.data.energy + energy, this.getEnergyStorage());
    }

    drainEnergy(energy: number) {
        this.data.energy = Math.max(this.data.energy - energy, 0);
    }

    getEnergyStorage() {
        return this.maxEnergy;
    }
}