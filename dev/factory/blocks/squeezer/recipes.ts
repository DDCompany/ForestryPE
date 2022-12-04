SqueezerManager.registerRecipe({
    input: [{id: VanillaItemID.apple}],
    special: {
        id: ItemID.mulch,
        chance: 0.4
    },
    liquid: "appleJuice",
    liquidAmount: 0.2
});

SqueezerManager.registerRecipe({
    input: [{id: VanillaItemID.carrot}],
    special: {
        id: ItemID.mulch,
        chance: 0.4
    },
    liquid: "appleJuice",
    liquidAmount: 0.2
});

SqueezerManager.registerRecipe({
    input: [{id: VanillaItemID.wheat_seeds}],
    liquid: "seedOil",
    liquidAmount: 0.01
});

SqueezerManager.registerRecipe({
    input: [{id: VanillaItemID.pumpkin_seeds}],
    liquid: "seedOil",
    liquidAmount: 0.01
});

SqueezerManager.registerRecipe({
    input: [{id: VanillaItemID.melon_seeds}],
    liquid: "seedOil",
    liquidAmount: 0.01
});

SqueezerManager.registerRecipe({
    input: [{id: VanillaItemID.beetroot_seeds}],
    liquid: "seedOil",
    liquidAmount: 0.01
});

SqueezerManager.registerRecipe({
    input: [{id: VanillaBlockID.cactus}],
    liquid: "water",
    liquidAmount: 0.5
});

SqueezerManager.registerRecipe({
    input: [
        {id: ItemID.phosphor, count: 2},
        {id: VanillaBlockID.cobblestone}
    ],
    liquid: "lava",
    liquidAmount: 1.6
});

SqueezerManager.registerRecipe({
    input: [{id: ItemID.honeyDrop}],
    special: {
        id: ItemID.propolis,
        chance: 0.05
    },
    liquid: "honey",
    liquidAmount: 0.1
});

SqueezerManager.registerRecipe({
    input: [{id: ItemID.honeydew}],
    liquid: "honey",
    liquidAmount: 0.1
});