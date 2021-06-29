class Allele<T> {
    private readonly _value: T;
    private readonly _dominant: boolean;
    private readonly _uid: string;

    constructor(uid: string, value: T, dominant: boolean = false) {
        this._value = value;
        this._dominant = dominant;
        this._uid = uid;
    }

    get value() {
        return this._value;
    }

    get isDominant() {
        return this._dominant;
    }

    get name() {
        return t(`forestry.allele.${this._uid}`);
    }

    get uid() {
        return this._uid;
    }

    toString() {
        return `{${this._uid}, ${this._value}, ${this._dominant}`;
    }
}