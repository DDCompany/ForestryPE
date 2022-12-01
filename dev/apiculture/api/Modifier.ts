type BeeModifier = {
    getProductionModifier?(house: BeeHouse): number;

    getMutationModifier?(house: BeeHouse): number;

    isSealed?(house: BeeHouse): boolean;

    isSelfLighted?(house: BeeHouse): boolean;

    getGeneticDecay?(house: BeeHouse): number;

    getLifespanModifier?(house: BeeHouse): number;
}

class ModifierList {
    static EMPTY = new ModifierList([]);

    constructor(public modifiers: BeeModifier[]) {
    }

    getProductionModifier(house: BeeHouse): number {
        return this.modifiers.reduce((prev, modifier) => {
            return modifier.getProductionModifier ? prev * modifier.getProductionModifier(house) : prev;
        }, 1);
    }

    getMutationModifier(house: BeeHouse): number {
        return this.modifiers.reduce((prev, modifier) => {
            return modifier.getMutationModifier ? prev * modifier.getMutationModifier(house) : prev;
        }, 1);
    }

    //Игнорировать ли дождь
    isSealed(house: BeeHouse): boolean {
        return this.modifiers.some(modifier => modifier.isSealed && modifier.isSealed(house));
    }

    //Игнорировать ли отсутствие неба
    isSelfLighted(house: BeeHouse): boolean {
        return this.modifiers.some(modifier => modifier.isSelfLighted && modifier.isSelfLighted(house));
    }

    //Модификатор шанса смерти Ignoble пчелы
    getGeneticDecay(house: BeeHouse): number {
        return this.modifiers.reduce((prev, modifier) => {
            return modifier.getGeneticDecay ? prev * modifier.getGeneticDecay(house) : prev;
        }, 1);
    }

    getLifespanModifier(house: BeeHouse): number {
        return this.modifiers.reduce((prev, modifier) => {
            return modifier.getLifespanModifier ? prev * modifier.getLifespanModifier(house) : prev;
        }, 1);
    }
}