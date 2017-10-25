function ModifierList(modifiers) {

    this.modifiers = modifiers;

    //Модификатор шанса продукции
    this.getProductionModifier = function (house) {
        var value = 1;
        for (var key in this.modifiers) {
            if (this.modifiers[key].getProductionModifier) value *= this.modifiers[key].getProductionModifier(house);
        }
        return value;
    };

    //Модификатор шанса мутации
    this.getMutationModifier = function (house) {
        var value = 1;
        for (var key in this.modifiers) {
            if (this.modifiers[key].getMutationModifier) value *= this.modifiers[key].getMutationModifier(house);
        }
        return value;
    };

    //Игнорировать ли дождь
    this.isSealed = function (house) {
        for (var key in this.modifiers) {
            if (this.modifiers[key].isSealed && this.modifiers[key].isSealed(house)) {
                return true;
            }
        }
        return false;
    };

    //Игнорировать ли отсутствие неба
    this.isSelfLighted = function (house) {
        for (var key in this.modifiers) {
            if (this.modifiers[key].isSelfLighted && this.modifiers[key].isSelfLighted(house)) {
                return true;
            }
        }
        return false;
    };

    //Модификатор шанса смерти Ignoble пчелы
    this.getGeneticDecay = function (house) {
        var value = 1;
        for (var key in this.modifiers) {
            if (this.modifiers[key].getGeneticDecay) value *= this.modifiers[key].getGeneticDecay(house);
        }
        return value;
    };

    //Модификатор времени цикла
    this.getLifespanModifier = function (house) {
        var value = 1;
        for (var key in this.modifiers) {
            if (this.modifiers[key].getLifespanModifier) value *= this.modifiers[key].getLifespanModifier(house);
        }
        return value;
    };
}