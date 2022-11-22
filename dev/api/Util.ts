class Util {
    static objectUnion(...objects: object[]): object {
        const obj = {};
        for (let key in objects) {
            const n = objects[key];
            if (typeof n !== "object" && !this.isArray(n)) {
                continue;
            }
            for (let key2 in n) {
                // @ts-ignore
                if (typeof n[key2] === "object" && !this.isArray(n[key2])) {
                    // @ts-ignore
                    obj[key2] = this.objectUnion(obj, n[key2]);
                    continue;
                }
                // @ts-ignore
                obj[key2] = n[key2];
            }
        }
        return obj;
    }

    static isArray(arr: any): boolean {
        return "length" in arr;
    }

    static getBlocksInRange(
        coords: { x: number, y: number, z: number },
        range: { x: number, y: number, z: number },
        block: { id: number, data: number },
        skip: boolean,
    ) {
        return this.getBlocksInRange2(coords, range, [block], skip);
    }

    static getBlocksInRange2(
        coords: { x: number, y: number, z: number },
        range: { x: number, y: number, z: number },
        blockList: { id: number, data: number }[],
        skip: boolean,
    ) {
        const arr = [];

        for (let xx = coords.x - range.x; xx < coords.x + range.x; xx++) {
            for (let yy = coords.y - range.y; yy < coords.y + range.y; yy++) {
                for (let zz = coords.z - range.z; zz < coords.z + range.z; zz++) {
                    const b = World.getBlock(xx, yy, zz);
                    if (!blockList || this.existsBlockInList(b, blockList)) {
                        const o = {
                            x: xx,
                            y: yy,
                            z: zz,
                            block: b
                        };
                        arr.push(o);
                        if (skip) return o;
                    }
                }
            }
        }

        return arr;
    }

    static existsBlockInList(block: { id: number, data: number }, list: { id: number, data: number }[]): boolean {
        for (let key in list) {
            const k = list[key];
            if (k.id == block.id && (k.data == block.data || k.data == -1)) {
                return true;
            }
        }

        return false;
    }

    static random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}