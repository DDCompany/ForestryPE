class Branch {
    private readonly _uid: string;
    private readonly _scientific: string;
    private readonly _template: Record<string, Allele<any>>;

    constructor(uid: string, scientific: string, template: Record<string, Allele<any>> = {}) {
        this._uid = uid;
        this._scientific = scientific;
        this._template = template;
    }


    get template(): Record<string, Allele<any>> {
        return this._template;
    }
}