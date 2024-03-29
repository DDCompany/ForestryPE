class Util {
    static objectUnion(...objects: object[]): object {
        const obj = {};
        for (let key in objects) {
            const n = objects[key];
            if (typeof n !== "object" && !Array.isArray(n)) {
                continue;
            }
            for (let key2 in n) {
                // @ts-ignore
                if (typeof n[key2] === "object" && !Array.isArray(n[key2])) {
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

    static random(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}