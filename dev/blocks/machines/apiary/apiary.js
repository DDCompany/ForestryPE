Block.setPrototype("apiary", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [{
            name: "Apiary",
            texture: [["apiary", 0], ["apiary", 0], ["apiary", 1], ["apiary", 1], ["apiary", 1], ["apiary", 1]],
            inCreative: true
        }];
    }

});