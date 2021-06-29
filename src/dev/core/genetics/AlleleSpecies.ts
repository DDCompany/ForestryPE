class AlleleSpecies extends Allele<string> {
    private readonly _defaultTemplate: IBeeTemplate;

    constructor(uid: string, dominant: boolean, branch: Branch, template: IBeeTemplate) {
        super(`species.${uid}`, uid, dominant);
        this._defaultTemplate = Object.assign({}, branch.template, template);
    }

    get defaultTemplate() {
        return this._defaultTemplate;
    }
}