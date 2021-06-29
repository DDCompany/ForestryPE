class AlleleBeeSpecies extends AlleleSpecies {
    private readonly _products: IChancedItem[];
    private readonly _binomial: string;

    constructor(uid: string, dominant: boolean, products: IChancedItem[], binomial: string, branch: BeeBranch,
                template: IBeeTemplate) {
        super(`bee.${uid}`, dominant, branch, template);
        this._products = products;
        this._binomial = binomial;
    }

    get products(): IChancedItem[] {
        return this._products;
    }

    get binomial(): string {
        return this._binomial;
    }
}