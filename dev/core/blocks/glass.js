if (ForestryConfig.glassEnabled) {
    Block.setPrototype("forestryGlass", {
        type: Block.TYPE_BASE,

        getVariations: function () {
            return [
                {
                    name: "Black Glass",
                    texture: [["black", 0], ["black", 0], ["black", 0], ["black", 0], ["black", 0], ["black", 0]],
                    inCreative: true
                },
                {
                    name: "Red Glass",
                    texture: [["red", 0], ["red", 0], ["red", 0], ["red", 0], ["red", 0], ["red", 0]],
                    inCreative: true
                },
                {
                    name: "Green Glass",
                    texture: [["green", 0], ["green", 0], ["green", 0], ["green", 0], ["green", 0], ["green", 0]],
                    inCreative: true
                },
                {
                    name: "Brown Glass",
                    texture: [["brown", 0], ["brown", 0], ["brown", 0], ["brown", 0], ["brown", 0], ["brown", 0]],
                    inCreative: true
                },
                {
                    name: "Blue Glass",
                    texture: [["blue", 0], ["blue", 0], ["blue", 0], ["blue", 0], ["blue", 0], ["blue", 0]],
                    inCreative: true
                },
                {
                    name: "Purple Glass",
                    texture: [["purple", 0], ["purple", 0], ["purple", 0], ["purple", 0], ["purple", 0], ["purple", 0]],
                    inCreative: true
                },
                {
                    name: "Cyan Glass",
                    texture: [["cyan", 0], ["cyan", 0], ["cyan", 0], ["cyan", 0], ["cyan", 0], ["cyan", 0]],
                    inCreative: true
                },
                {
                    name: "Light Gray glass",
                    texture: [["lightgray", 0], ["lightgray", 0], ["lightgray", 0], ["lightgray", 0], ["lightgray", 0], ["lightgray", 0]],
                    inCreative: true
                },
                {
                    name: "Gray Glass",
                    texture: [["gray", 0], ["gray", 0], ["gray", 0], ["gray", 0], ["gray", 0], ["gray", 0]],
                    inCreative: true
                },
                {
                    name: "Pink Glass",
                    texture: [["pink", 0], ["pink", 0], ["pink", 0], ["pink", 0], ["pink", 0], ["pink", 0]],
                    inCreative: true
                },
                {
                    name: "Lime Glass",
                    texture: [["lime", 0], ["lime", 0], ["lime", 0], ["lime", 0], ["lime", 0], ["lime", 0]],
                    inCreative: true
                },
                {
                    name: "Yellow Glass",
                    texture: [["yellow", 0], ["yellow", 0], ["yellow", 0], ["yellow", 0], ["yellow", 0], ["yellow", 0]],
                    inCreative: true
                },
                {
                    name: "Light Blue Glass",
                    texture: [["lightblue", 0], ["lightblue", 0], ["lightblue", 0], ["lightblue", 0], ["lightblue", 0], ["lightblue", 0]],
                    inCreative: true
                },
                {
                    name: "Magenta Glass",
                    texture: [["magenta", 0], ["magenta", 0], ["magenta", 0], ["magenta", 0], ["magenta", 0], ["magenta", 0]],
                    inCreative: true
                },
                {
                    name: "Orange Glass",
                    texture: [["orange", 0], ["orange", 0], ["orange", 0], ["orange", 0], ["orange", 0], ["orange", 0]],
                    inCreative: true
                },
                {
                    name: "White Glass",
                    texture: [["white", 0], ["white", 0], ["white", 0], ["white", 0], ["white", 0], ["white", 0]],
                    inCreative: true
                }
            ];
        },

        getDrop: function () {
            return [];
        }
    });
}