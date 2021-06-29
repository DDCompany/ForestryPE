class Chromosome {
    private readonly _primary: Allele<any>;
    private readonly _secondary: Allele<any>;

    constructor(primary: Allele<any>, secondary: Allele<any>) {
        this._primary = primary;
        this._secondary = secondary;
    }

    get active() {
        if (this._primary.isDominant) {
            return this._primary;
        }

        if (this._secondary.isDominant) {
            return this._secondary;
        }

        return this._primary;
    }

    get inactive() {
        if (this._primary.isDominant) {
            return this._secondary;
        }

        if (this._secondary.isDominant) {
            return this._primary;
        }

        return this._secondary;
    }

    get primary() {
        return this._primary;
    }

    get secondary() {
        return this._secondary;
    }

    serialize() {
        return [this._primary.uid, this._secondary.uid];
    }

    toString() {
        return `{${this._primary}, ${this._secondary}`;
    }
}