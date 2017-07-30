var Modifier = {
    getFromObject: function (obj) {
        var obj2 = {};

        for (var key in obj) {
            obj2[key] = obj[key];
        }

        obj2.getProductionModifier || (obj2.getProductionModifier = function (house, currect) {
            return 1
        });
        obj2.getLifespanModifier || (obj2.getLifespanModifier = function (house, currect) {
            return 1
        });
        obj2.getMutationModifier || (obj2.getMutationModifier = function (house, currect) {
            return 1
        });
        obj2.isSealed || (obj2.isSealed = function (house, currect) {
            return 1
        });
        obj2.isSelfLighted || (obj2.isSelfLighted = function (house, currect) {
            return 1
        });
        obj2.isSunlightSimulated || (obj2.isSunlightSimulated = function (house, currect) {
            return 1
        });

        return obj2;
    },

    emptyList: function () {
        return new ModifierList([Modifier.getFromObject({})]);
    }
};

function ModifierList(modifiers) {

    this.modifiers = modifiers;

    this.getLifespanModifier = function (house, currect) {
        var value = currect;
        for (var key in this.modifiers) {
            value *= this.modifiers[key].getLifespanModifier(house, value);
        }
        return value;
    };

    //Модификатор шанса продукции
    this.getProductionModifier = function (house, currect) {
        var value = currect;
        for (var key in this.modifiers) {
            value *= this.modifiers[key].getProductionModifier(house, value);
        }
        return value;
    };

    //Модификатор шанса мутации
    this.getMutationModifier = function (house, currect) {
        var value = currect;
        for (var key in this.modifiers) {
            value *= this.modifiers[key].getMutationModifier(house, value);
        }
        return value;
    };

    //Игнорировать ли дождь
    this.isSealed = function (house, currect) {
        for (var key in this.modifiers) {
            if (this.modifiers[key].isSealed(house, currect)) {
                return true;
            }
        }
        return false;
    };

    //Игнорировать ли отсутствие неба
    this.isSelfLighted = function (house, currect) {
        for (var key in this.modifiers) {
            if (this.modifiers[key].isSelfLighted(house, currect)) {
                return true;
            }
        }
        return false;
    };

};