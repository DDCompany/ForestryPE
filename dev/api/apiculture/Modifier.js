function ModifierList(modifiers) {

    this.modifiers = modifiers;

    this.getLifespanModifier = function (house, currect) {
        var value = currect;
        for (var key in this.modifiers) {
            if (this.modifiers[key].getLifespanModifier) value *= this.modifiers[key].getLifespanModifier(house, value);
        }
        return value;
    };

    //Модификатор шанса продукции
    this.getProductionModifier = function (house, currect) {
        var value = currect;
        for (var key in this.modifiers) {
            if (this.modifiers[key].getProductionModifier) value *= this.modifiers[key].getProductionModifier(house, value);
        }
        return value;
    };

    //Модификатор шанса мутации
    this.getMutationModifier = function (house, currect) {
        var value = currect;
        for (var key in this.modifiers) {
            if (this.modifiers[key].getMutationModifier) value *= this.modifiers[key].getMutationModifier(house, value);
        }
        return value;
    };

    //Игнорировать ли дождь
    this.isSealed = function (house, currect) {
        for (var key in this.modifiers) {
            if (this.modifiers[key].isSealed && this.modifiers[key].isSealed(house, currect)) {
                return true;
            }
        }
        return false;
    };

    //Игнорировать ли отсутствие неба
    this.isSelfLighted = function (house, currect) {
        for (var key in this.modifiers) {
            if (this.modifiers[key].isSelfLighted && this.modifiers[key].isSelfLighted(house, currect)) {
                return true;
            }
        }
        return false;
    };

};