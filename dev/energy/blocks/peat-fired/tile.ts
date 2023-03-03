abstract class TileEngineForestry extends TilePowered {
    model: EngineModel | null = null;
    direction = Direction.UP;
    isRedstoneActivated = false;

    constructor(
        private readonly texture: string,
        private readonly maxHeat: number,
    ) {
        super();
    }

    getDefaultValues() {
        return {
            ...super.getDefaultValues(),
            progress: 0,
            heat: 0,
            direction: Direction.UP.toString(),
            forceCooling: false,
            energy: 0,
        }
    }

    clientLoad() {
        this.model = new EngineModel(this.x, this.y, this.z, this.texture);
    }

    clientUnload() {
        this.model?.destroy();
    }

    onTick() {
        const temperature = this.getTemperatureState();
        if (temperature === EngineTemperature.MELTING && this.data.heat > 0) {
            this.data.forceCooling = true;
        } else if (this.data.forceCooling && this.data.heat <= 0) {
            this.data.forceCooling = false;
        }

        if (this.data.progress > 0) {
            const pistonSpeed = this.getPistonSpeed();
            this.data.progress += pistonSpeed;
            if (this.data.progress >= 1) {
                this.data.progress = 0;
            }
        } else if (this.isRedstoneActivated && this.data.energy > 0 && this.canSendEnergy(this.direction)) {
            const pistonSpeed = this.getPistonSpeed();
            this.data.progress += pistonSpeed;
        }

        this.dissipateHeat();
        this.generateHeat();

        if (this.mayBurn()) {
            this.burn();
        } else {
            this.drainEnergy(20);
        }

        this.sendPacket("updateRender", {
            dir: this.data.direction,
            progress: this.data.progress,
            temperature: temperature,
        });
        this.container.sendChanges();
    }

    onClick(id: number, count: number, data: number, coords: Callback.ItemUseCoordinates, player: number) {
        const actor = new PlayerActor(player);
        const carriedItem = actor.getInventorySlot(actor.getSelectedSlot());
        if (carriedItem.id === VanillaItemID.diamond && Entity.getSneaking(player)) { //TODO
            this.rotateNext();
            return true;
        }

        return false;
    }

    onRedstoneUpdate(signal: number) {
        this.isRedstoneActivated = signal > 0;
    }

    protected abstract dissipateHeat(): void;

    protected abstract generateHeat(): void;

    protected abstract burn(): void;

    protected mayBurn() {
        return !this.data.forceCooling;
    }

    protected addHeat(amount: number) {
        Debug.message("add heat " + amount);
        this.data.heat += amount;
        if (this.data.heat > this.maxHeat) {
            this.data.heat = this.maxHeat;
        }
    }

    protected coolDown(amount: number) {
        Debug.message("cool down " + amount);
        this.data.heat -= amount;
        if (this.data.heat < 0) {
            this.data.heat = 0;
        }
    }

    protected getTemperatureState(): EngineTemperature {
        const scaledHeat = this.data.heat / this.maxHeat;

        if (scaledHeat < 0.20) {
            return EngineTemperature.COOL;
        } else if (scaledHeat < 0.45) {
            return EngineTemperature.WARMED_UP;
        } else if (scaledHeat < 0.65) {
            return EngineTemperature.OPERATING_TEMPERATURE;
        } else if (scaledHeat < 0.85) {
            return EngineTemperature.RUNNING_HOT;
        } else if (scaledHeat < 1.0) {
            return EngineTemperature.OVERHEATING;
        } else {
            return EngineTemperature.MELTING;
        }
    }

    private canSendEnergy(direction: Direction): boolean {
        const tile = World.getTileEntity(
            this.x + direction.relativeX,
            this.y + direction.relativeY,
            this.z + direction.relativeZ,
            this.blockSource,
        );
        return !!(tile && tile.isEnergyTile && tile.energyTypes[RF.name]);
    }

    private rotateNext() {
        const startDirection = this.direction;
        let currentDirection = startDirection;
        do {
            currentDirection = Direction.next(currentDirection);
            if (this.canSendEnergy(currentDirection)) {
                this.setDirection(currentDirection);
                break;
            }
        } while (currentDirection !== startDirection);
    }

    private setDirection(direction: Direction) {
        this.direction = direction;
        this.data.direction = direction.toString();
    }

    private getPistonSpeed(): number {
        switch (this.getTemperatureState()) {
            case EngineTemperature.COOL:
                return 0.03;
            case EngineTemperature.WARMED_UP:
                return 0.04;
            case EngineTemperature.OPERATING_TEMPERATURE:
                return 0.05;
            case EngineTemperature.RUNNING_HOT:
                return 0.06;
            case EngineTemperature.OVERHEATING:
                return 0.07;
            case EngineTemperature.MELTING:
                return 0.08;
        }

        return 0;
    }

    @BlockEngine.Decorators.NetworkEvent(Side.Client)
    private updateRender(payload: { dir: string, progress: number, temperature: EngineTemperature }) {
        const direction = Direction.from(payload.dir);
        if (direction) {
            this.model?.update(direction, payload.temperature, payload.progress);
        }
    }
}

class TileEnginePeat extends TileEngineForestry {
    constructor() {
        super("model/forestry_engine_copper.png", 500);
        this.setEnergyStorage(200000);
    }

    getDefaultValues() {
        return {
            ...super.getDefaultValues(),
            burnTime: 0,
            totalBurnTime: 0,
            energyOut: 0,
        };
    }

    isBurning(): boolean {
        return super.mayBurn() && this.data.burnTime > 0;
    }

    getScreenByName() {
        return guiPeatFiredEngine;
    }

    protected dissipateHeat() {
        let loss = 0;

        if (!this.isBurning()) {
            loss++;
        }

        const temperature = this.getTemperatureState();
        if (temperature === EngineTemperature.OVERHEATING || temperature === EngineTemperature.OPERATING_TEMPERATURE) {
            loss += 1;
        }

        if (loss > 0) {
            this.coolDown(loss);
        }
    }

    protected generateHeat() {
        if (this.isBurning()) {
            this.addHeat(1);
            if (this.data.energy / this.getEnergyStorage() > 0.5) {
                this.addHeat(1);
            }
        }
    }

    protected burn() {
        if (this.data.burnTime > 0) {
            this.data.burnTime++;

            if (this.isRedstoneActivated) {
                this.addEnergy(this.data.energyOut);
            }

            if (this.data.burnTime >= this.data.totalBurnTime) {
                this.data.burnTime = 0;
                this.data.totalBurnTime = 0;
                this.data.energyOut = 0;
            }
        } else if (this.isRedstoneActivated) {
            const slotFuel = this.container.getSlot("slotFuel");
            const fuel = PeatFiredManager.getFuel(slotFuel.id);
            if (fuel) {
                this.data.energyOut = fuel.energy;
                this.data.totalBurnTime = fuel.burnTime;
                this.data.burnTime = 1;
                this.container.setSlot("slotFuel", slotFuel.id, slotFuel.count - 1, slotFuel.data);
                this.container.validateSlot("slotFuel");
            }
        }

        this.container.setScale("burnScale", (1 - this.data.burnTime / this.data.totalBurnTime) || 0);
        this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
    }
}

TileEntity.registerPrototype(BlockID.enginePeat, new TileEnginePeat());

//region T3
// class EngineClientTile extends ClientTileEntity {
//     model: EngineModel | null;
//
//     constructor(private readonly texture: string) {
//         super();
//     }
//
//     load() {
//         this.model = new EngineModel(this.x, this.y, this.z, this.texture);
//     }
//
//     unload() {
//         this.model?.destroy();
//     }
//
//     @TileEvent()
//     updateRender(payload: { progress: number, temperature: EngineTemperature, dir: string }) {
//         const direction = Direction.from(payload.dir);
//         if (direction) {
//             this.model?.update(direction, payload.temperature, payload.progress);
//         }
//     }
// }
//
// abstract class EngineServerTile extends TilePowered {
//     client = new EngineClientTile("model/forestry_engine_copper.png");
//     direction = Direction.UP;
//     isRedstoneActivated = false;
//
//     protected constructor(private readonly maxHeat: number) {
//         super();
//     }
//
//     created() {
//         this.rotateNext();
//     }
//
//     getDefaultValues() {
//         return {
//             ...super.getDefaultValues(),
//             progress: 0,
//             heat: 0,
//             direction: Direction.UP.toString(),
//             forceCooling: false,
//         };
//     }
//
//     tick() {
//         const temperature = this.getTemperatureState();
//         if (temperature === EngineTemperature.MELTING && this.data.heat > 0) {
//             this.data.forceCooling = true;
//         } else if (this.data.forceCooling && this.data.heat <= 0) {
//             this.data.forceCooling = false;
//         }
//
//         if (this.data.progress > 0) {
//             const pistonSpeed = this.getPistonSpeed();
//             this.data.progress += pistonSpeed;
//             if (this.data.progress >= 1) {
//                 this.data.progress = 0;
//             }
//         } else if (this.isRedstoneActivated && this.data.energy > 0 && this.canSendEnergy(this.direction)) {
//             const pistonSpeed = this.getPistonSpeed();
//             this.data.progress += pistonSpeed;
//         }
//
//         this.dissipateHeat();
//         this.generateHeat();
//
//         Debug.message(this.data.heat + "/" + this.maxHeat + " " + temperature + " " + this.data.progress);
//
//         if (this.mayBurn()) {
//             this.burn();
//         } else {
//             this.drainEnergy(20);
//         }
//
//         this.sendPacket("updateRender", {
//             dir: this.data.direction,
//             progress: this.data.progress,
//             temperature: temperature,
//         });
//         this.container.sendChanges();
//     }
//
//     click(id: number, count: number, data: number, coords: Callback.ItemUseCoordinates, player: number) {
//         const actor = new PlayerActor(player);
//         const carriedItem = actor.getInventorySlot(actor.getSelectedSlot());
//         if (carriedItem.id === VanillaItemID.diamond && Entity.getSneaking(player)) { //TODO
//             this.rotateNext();
//             return true;
//         }
//
//         return false;
//     }
//
//     redstone({power}: { power: number; signal: number; onLoad: boolean }) {
//         this.isRedstoneActivated = power > 0;
//     }
//
//     protected abstract dissipateHeat(): void;
//
//     protected abstract generateHeat(): void;
//
//     protected abstract burn(): void;
//
//     protected mayBurn() {
//         return !this.data.forceCooling;
//     }
//
//     protected addHeat(amount: number) {
//         Debug.message("add heat " + amount);
//         this.data.heat += amount;
//         if (this.data.heat > this.maxHeat) {
//             this.data.heat = this.maxHeat;
//         }
//     }
//
//     protected coolDown(amount: number) {
//         Debug.message("cool down " + amount);
//         this.data.heat -= amount;
//         if (this.data.heat < 0) {
//             this.data.heat = 0;
//         }
//     }
//
//     protected getTemperatureState(): EngineTemperature {
//         const scaledHeat = this.data.heat / this.maxHeat;
//
//         if (scaledHeat < 0.20) {
//             return EngineTemperature.COOL;
//         } else if (scaledHeat < 0.45) {
//             return EngineTemperature.WARMED_UP;
//         } else if (scaledHeat < 0.65) {
//             return EngineTemperature.OPERATING_TEMPERATURE;
//         } else if (scaledHeat < 0.85) {
//             return EngineTemperature.RUNNING_HOT;
//         } else if (scaledHeat < 1.0) {
//             return EngineTemperature.OVERHEATING;
//         } else {
//             return EngineTemperature.MELTING;
//         }
//     }
//
//     private canSendEnergy(direction: Direction): boolean {
//         const tile = World.getTileEntity(
//             this.x + direction.relativeX,
//             this.y + direction.relativeY,
//             this.z + direction.relativeZ,
//             this.blockSource,
//         );
//         return !!(tile && tile.isEnergyTile && tile.energyTypes[RF.name]);
//     }
//
//     private rotateNext() {
//         const startDirection = this.direction;
//         let currentDirection = startDirection;
//         do {
//             currentDirection = Direction.next(currentDirection);
//             if (this.canSendEnergy(currentDirection)) {
//                 this.setDirection(currentDirection);
//                 break;
//             }
//         } while (currentDirection !== startDirection);
//     }
//
//     private setDirection(direction: Direction) {
//         this.direction = direction;
//         this.data.direction = direction.toString();
//     }
//
//     private getPistonSpeed(): number {
//         switch (this.getTemperatureState()) {
//             case EngineTemperature.COOL:
//                 return 0.03;
//             case EngineTemperature.WARMED_UP:
//                 return 0.04;
//             case EngineTemperature.OPERATING_TEMPERATURE:
//                 return 0.05;
//             case EngineTemperature.RUNNING_HOT:
//                 return 0.06;
//             case EngineTemperature.OVERHEATING:
//                 return 0.07;
//             case EngineTemperature.MELTING:
//                 return 0.08;
//         }
//
//         return 0;
//     }
// }
//
// @Tile(BlockID.enginePeat)
// class PeatEngineServerTile extends EngineServerTile {
//     constructor() {
//         super(500);
//         this.setEnergyStorage(200000);
//     }
//
//     isBurning(): boolean {
//         return super.mayBurn() && this.data.burnTime > 0;
//     }
//
//     getDefaultValues() {
//         return {
//             ...super.getDefaultValues(),
//             burnTime: 0,
//             totalBurnTime: 0,
//             energyOut: 0,
//         };
//     }
//
//     getScreenByName() {
//         return guiPeatFiredEngine;
//     }
//
//     protected dissipateHeat() {
//         let loss = 0;
//
//         Debug.message("" + !this.isBurning());
//         if (!this.isBurning()) {
//             loss++;
//         }
//
//         const temperature = this.getTemperatureState();
//         if (temperature === EngineTemperature.OVERHEATING || temperature === EngineTemperature.OPERATING_TEMPERATURE) {
//             loss += 1;
//         }
//
//         if (loss > 0) {
//             this.coolDown(loss);
//         }
//     }
//
//     protected generateHeat() {
//         if (this.isBurning()) {
//             this.addHeat(1);
//             if (this.data.energy / this.getEnergyStorage() > 0.5) {
//                 this.addHeat(1);
//             }
//         }
//     }
//
//     protected burn() {
//         if (this.data.burnTime > 0) {
//             this.data.burnTime++;
//
//             if (this.isRedstoneActivated) {
//                 this.addEnergy(this.data.energyOut);
//             }
//
//             if (this.data.burnTime >= this.data.totalBurnTime) {
//                 this.data.burnTime = 0;
//                 this.data.totalBurnTime = 0;
//                 this.data.energyOut = 0;
//             }
//         } else if (this.isRedstoneActivated) {
//             const slotFuel = this.container.getSlot("slotFuel");
//             const fuel = PeatFiredManager.getFuel(slotFuel.id);
//             if (fuel) {
//                 this.data.energyOut = fuel.energy;
//                 this.data.totalBurnTime = fuel.burnTime;
//                 this.data.burnTime = 1;
//                 this.container.setSlot("slotFuel", slotFuel.id, slotFuel.count - 1, slotFuel.data);
//                 this.container.validateSlot("slotFuel");
//             }
//         }
//
//         this.container.setScale("burnScale", (1 - this.data.burnTime / this.data.totalBurnTime) || 0);
//         this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
//     }
// }
//endregion

//region T1
// class PeatEngineTile extends ServerTileEntity {
//     direction: Direction = Engine.DEFAULT_DIRECTION;
//
//     defaultValues = {
//         heat: 0,
//         progress: 0,
//         direction: Engine.DEFAULT_DIRECTION.toString(),
//     };
//
//     client = new EngineClientTile();
//
//     constructor(private readonly maxHeat: number) {
//         super();
//     }
//
//     tick() {
//         this.addHeat(1);
//         this.data.progress += this.getPistonSpeed();
//         if (this.data.progress >= 1) {
//             this.data.progress = 0;
//         }
//
//         this.sendPacket("updateRender", {
//             progress: this.data.progress,
//             temperature: this.getTemperatureState(),
//             dir: this.data.direction,
//         });
//     }
//
//     click() {
//         this.setDirection(Direction.next(this.direction));
//     }
//
//     protected addHeat(amount: number) {
//         this.data.heat += amount;
//         if (this.data.heat > this.maxHeat) {
//             this.data.heat = this.maxHeat;
//         }
//     }
//
//     private setDirection(dir: Direction) {
//         this.data.direction = dir.toString();
//         this.direction = dir;
//     }
//
//     private getPistonSpeed(): number {
//         switch (this.getTemperatureState()) {
//             case EngineTemperature.COOL:
//                 return 0.03;
//             case EngineTemperature.WARMED_UP:
//                 return 0.04;
//             case EngineTemperature.OPERATING_TEMPERATURE:
//                 return 0.05;
//             case EngineTemperature.RUNNING_HOT:
//                 return 0.06;
//             case EngineTemperature.OVERHEATING:
//                 return 0.07;
//             case EngineTemperature.MELTING:
//                 return 0.08;
//         }
//
//         return 0;
//     }
//
//     private getTemperatureState(): EngineTemperature {
//         const scaledHeat = this.data.heat / this.maxHeat;
//
//         if (scaledHeat < 0.20) {
//             return EngineTemperature.COOL;
//         } else if (scaledHeat < 0.45) {
//             return EngineTemperature.WARMED_UP;
//         } else if (scaledHeat < 0.65) {
//             return EngineTemperature.OPERATING_TEMPERATURE;
//         } else if (scaledHeat < 0.85) {
//             return EngineTemperature.RUNNING_HOT;
//         } else if (scaledHeat < 1.0) {
//             return EngineTemperature.OVERHEATING;
//         } else {
//             return EngineTemperature.MELTING;
//         }
//     }
// }
//
//endregion


//region T2
// MachineRegistry.registerGenerator(BlockID.enginePeat, {
//     useNetworkItemContainer: true,
//
//     defaultValues: {
//         burn: 0,
//         burnMax: 0,
//         ashValue: 0,
//         energyOut: 0,
//     },
//
//     init() {
//         this.dir = Direction.UP;
//     },
//
//     updateRender() {
//         let temperature;
//         if (this.data.burn < 0.25) {
//             temperature = EngineTemperature.COOL;
//         } else if (this.data.burn < 0.5) {
//             temperature = EngineTemperature.WARMED_UP;
//         } else if (this.data.burn < 0.75) {
//             temperature = EngineTemperature.OPERATING_TEMPERATURE;
//         } else if (this.data.burn < 0.9) {
//             temperature = EngineTemperature.RUNNING_HOT;
//         } else {
//             temperature = EngineTemperature.OVERHEATING;
//         }
//
//         this.sendPacket("updateRender", {progress: this.data.burn, temperature, dir: this.dir.toString()});
//     },
//
//     click() {
//         this.dir = Direction.next(this.dir);
//         Debug.message("Direction: " + this.dir.toString());
//     },
//
//     addAsh() {
//         for (let i = 0; i < 4; i++) {
//             const slotName = `slotAsh${i}`;
//             let slot = this.container.getSlot(slotName);
//             if (slot.id === 0) {
//                 this.container.setSlot(slotName, ItemID.ash, 1, 0)
//                 return true;
//             } else if (slot.id === ItemID.ash && slot.data === 0 && slot.count < 64) {
//                 this.container.setSlot(slotName, ItemID.ash, slot.count + 1, 0)
//                 return true;
//             }
//         }
//
//         return false;
//     },
//
//     tick() {
//         this.data.burn += 0.03;
//
//         if (this.data.burn >= 1) {
//             this.data.burn = 0;
//         }
//         this.updateRender();
//
//         // let slotFuel = this.container.getSlot("slotFuel");
//         //
//         // if (this.data.burn) {
//         //     if (this.data.burn >= this.data.burnMax) {
//         //         this.data.burnMax = 0;
//         //         this.data.burn = 0;
//         //         this.data.energyOut = 0;
//         //     } else {
//         //         if (this.data.energy + this.data.energyOut <= this.getEnergyStorage()) {
//         //             this.data.energy += this.data.energyOut;
//         //         }
//         //
//         //         if (this.data.ashValue >= 7500) {
//         //             this.addAsh();
//         //             this.data.ashValue = 0;
//         //         } else this.data.ashValue++;
//         //
//         //         this.data.burn++;
//         //
//         //     }
//         // } else if (this.data.energy < this.getEnergyStorage()) {
//         //     let fuel = PeatFiredManager.getFuel(slotFuel.id);
//         //     if (fuel) {
//         //         this.data.energyOut = fuel.energy;
//         //         this.data.burnMax = fuel.burnTime;
//         //         this.data.burn++;
//         //         this.container.setSlot("slotFuel", slotFuel.id, slotFuel.count - 1, slotFuel.data);
//         //         this.container.validateAll();
//         //     }
//         // }
//         //
//         // this.container.setScale("burnScale", ((this.data.burnMax - this.data.burn) / this.data.burnMax) || 0);
//         // this.container.setScale("progressEnergyScale", this.data.energy / this.getEnergyStorage());
//         this.container.sendChanges();
//     },
//
//     getEnergyStorage() {
//         return 200000;
//     },
//
//     //TODO
//     // getScreenByName() {
//     //     return guiPeatFiredEngine;
//     // },
//
//     client: {
//         load() {
//             this.model = new EngineModel(this.x, this.y, this.z, "model/forestry_engine_copper.png");
//         },
//
//         unload() {
//             this.model?.destroy();
//         },
//
//         events: {
//             updateRender(payload: { dir: string, progress: number, temperature: EngineTemperature }) {
//                 const _dir = Direction.from(payload.dir);
//                 if (_dir) {
//                     this.model?.update(_dir, payload.temperature, payload.progress);
//                 }
//             }
//         }
//     }
// });
//
// StorageInterface.createInterface(BlockID.enginePeat, {
//     slots: {
//         "slotFuel": {
//             input: true
//         },
//         "slotAsh0": {
//             output: true
//         },
//         "slotAsh1": {
//             output: true
//         },
//         "slotAsh2": {
//             output: true
//         },
//         "slotAsh3": {
//             output: true
//         },
//     }
// });
//endregion