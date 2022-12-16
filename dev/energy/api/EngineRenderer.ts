class Direction {
    static readonly DOWN = new Direction("Down [-Y]", 0, -1, 0);
    static readonly NORTH = new Direction("North [-Z]", 0, 0, -1);
    static readonly SOUTH = new Direction("South [+Z]", 0, 0, 1);
    static readonly WEST = new Direction("West [-X]", -1, 0, 0);
    static readonly EAST = new Direction("East [+X]", 1, 0, 0);
    static readonly UP = new Direction("Up [+Y]", 0, 1, 0);

    private constructor(
        readonly name: string,
        readonly relativeX: number,
        readonly relativeY: number,
        readonly relativeZ: number,
    ) {
    }

    static from(name: string): Direction | null {
        switch (name) {
            case this.DOWN.name:
                return this.DOWN;
            case this.NORTH.name:
                return this.NORTH;
            case this.SOUTH.name:
                return this.SOUTH;
            case this.WEST.name:
                return this.WEST;
            case this.EAST.name:
                return this.EAST;
            case this.UP.name:
                return this.UP;
        }

        return null;
    }

    static next(direction: Direction): Direction {
        switch (direction) {
            case Direction.DOWN:
                return Direction.NORTH;
            case Direction.NORTH:
                return Direction.SOUTH;
            case Direction.SOUTH:
                return Direction.WEST;
            case Direction.WEST:
                return Direction.EAST;
            case Direction.EAST:
                return Direction.UP;
            case Direction.UP:
                return Direction.DOWN;
        }

        return Direction.DOWN;
    }

    toString(): string {
        return this.name;
    }
}

enum EngineTemperature {
    COOL,
    WARMED_UP,
    OPERATING_TEMPERATURE,
    RUNNING_HOT,
    OVERHEATING,
}

class EngineRenderer {
    private static readonly cache: Record<string, Render> = {};

    static createBase(texture: string, dir: Direction, progress: number): Render {
        const key = `base:${progress}:${texture}:${dir.toString()}`;
        if (this.cache[key]) {
            return this.cache[key];
        }

        const pistonPosition = progress < 0.5 ? -11.5 * progress : -11.5 * (1 - progress);
        const parts: Render.PartElement[] = [
            //Base
            {
                coords: {
                    x: 0,
                    y: 5,
                    z: 0,
                },
                size: {
                    x: 16,
                    y: 6,
                    z: 16,
                },
                uv: {x: 0, y: 0}
            },
            //Piston
            {
                coords: {
                    x: 0,
                    y: pistonPosition,
                    z: 0,
                },
                size: {
                    x: 12,
                    y: 4,
                    z: 12,
                },
                uv: {x: 0, y: 22}
            },
        ];

        for (let i = 0; i < Math.abs(pistonPosition / 2); i++) {
            parts.push({
                coords: {
                    x: 0,
                    y: i * -2 + 1,
                    z: 0,
                },
                size: {
                    x: 10,
                    y: 2,
                    z: 10,
                },
                uv: {x: 0, y: 38}
            });
        }


        const render = new Render({skin: texture});
        render.setPart("head", parts, this.getPartParams(dir, 64, 50));

        this.cache[key] = render;
        return render;
    }

    static createTrunk(dir: Direction, temperature: EngineTemperature): Render {
        const key = `trunk:${temperature}:${dir.toString()}`;
        if (this.cache[key]) {
            return this.cache[key];
        }

        const render = new Render({skin: "model/forestry_engine_trunk.png"});
        render.setPart("head", [
            {
                coords: {
                    x: 0,
                    y: -2,
                    z: 0,
                },
                size: {
                    x: 8,
                    y: 12,
                    z: 8,
                },
                uv: {x: 0, y: temperature * 20}
            },
        ], this.getPartParams(dir, 32, 100));

        this.cache[key] = render;
        return render;
    }

    private static getPartParams(dir: Direction, width: number, height: number): Render.PartParameters {
        const degreeToRad = Math.PI / 180;
        return {
            width,
            height,
            pos: {
                //Move origin to the center of the block
                x: 8,
                y: -8,
                z: -8,
            },
            rotation: {
                x: dir === Direction.DOWN ? 180 * degreeToRad : dir === Direction.UP ? 0 : 90 * degreeToRad,
                y: dir === Direction.NORTH ? 180 * degreeToRad : dir === Direction.SOUTH ? 0
                    : dir === Direction.EAST ? 90 * degreeToRad : -90 * degreeToRad,
                z: 0,
            },
        }
    }
}

class EngineModel {
    private readonly baseAnimation: Animation.Base;
    private readonly trunkAnimation: Animation.Base;

    private isLoaded = false;

    constructor(
        private readonly x: number,
        private readonly y: number,
        private readonly z: number,
        private readonly texture: string,
    ) {
        this.baseAnimation = new Animation.Base(this.x, this.y, this.z);
        this.baseAnimation.setInterpolationEnabled(true);

        this.trunkAnimation = new Animation.Base(this.x, this.y, this.z);
        this.trunkAnimation.setInterpolationEnabled(true);
    }

    update(dir: Direction, temperature: EngineTemperature, progress: number) {
        const baseRender = EngineRenderer.createBase(this.texture, dir, progress);
        this.baseAnimation.describe({render: baseRender.getId()});

        const trunkRender = EngineRenderer.createTrunk(dir, temperature);
        this.trunkAnimation.describe({render: trunkRender.getId()});

        if (this.isLoaded) {
            this.baseAnimation.refresh();
            this.trunkAnimation.refresh();
        } else {
            this.isLoaded = true;
            this.baseAnimation.load();
            this.trunkAnimation.load();
        }
    }

    destroy() {
        this.baseAnimation.destroy();
        this.trunkAnimation.destroy();
    }
}

