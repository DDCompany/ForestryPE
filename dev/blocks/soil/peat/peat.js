Block.setPrototype("bog", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [
            {name: "Bog Earth", texture: [["bog", 0]], inCreative: true},
        ];
    },

    getMaterial: function (a) {
        return "dirt";
    },

    getDrop: function () {
        return [[3, 1, 0]];
    }
});

Block.setPrototype("blockPeat", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [
            {name: "Peat", texture: [["blockPeat", 0]], inCreative: true},
        ];
    },

    getMaterial: function (a) {
        return "dirt";
    },

    getDrop: function () {
        return [[ItemID.peat, 1, 0]];
    }
});

IDRegistry.genItemID("peat");
Item.createItem("peat", "Peat", {name: "peat", meta: 0}, {});

IDRegistry.genItemID("bituminousPeat");
Item.createItem("bituminousPeat", "Bituminous peat", {name: "bituminousPeat", meta: 0}, {});

Callback.addCallback("PostLoaded", function () {

    Recipes.addFurnace(ItemID.peat, ItemID.ash, 0);

    Recipes.addShaped({id: ItemID.bituminousPeat, count: 1, data: 0}, [
        " a ",
        "pgp",
        " a "
    ], ['a', ItemID.ash, 0, 'g', ItemID.propolis, 0, 'p', ItemID.peat, 0]);

    for (key in LiquidRegistry.FullByEmpty) {
        if (key.split(":")[2] == "water") {
            var obj = LiquidRegistry.FullByEmpty[key];
            Recipes.addShaped({id: BlockID.bog, count: 8, data: 0}, [
                "dsd",
                "scs",
                "dsd"
            ], ['d', 3, 0, 's', 12, 0, 'c', obj.id, obj.data]);
        }
    }
});
