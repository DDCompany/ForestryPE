if (ForestryConfig.glassEnabled) {
    Block.setPrototype("forestryGlass", {
        type: Block.TYPE_BASE,

        getVariations: function () {
            return [
                {
                    name: "Black glass",
                    texture: [["black", 0], ["black", 0], ["black", 0], ["black", 0], ["black", 0], ["black", 0]],
                    inCreative: true
                },
                {
                    name: "Red glass",
                    texture: [["red", 0], ["red", 0], ["red", 0], ["red", 0], ["red", 0], ["red", 0]],
                    inCreative: true
                },
                {
                    name: "Green glass",
                    texture: [["green", 0], ["green", 0], ["green", 0], ["green", 0], ["green", 0], ["green", 0]],
                    inCreative: true
                },
                {
                    name: "Brown glass",
                    texture: [["brown", 0], ["brown", 0], ["brown", 0], ["brown", 0], ["brown", 0], ["brown", 0]],
                    inCreative: true
                },
                {
                    name: "Blue glass",
                    texture: [["blue", 0], ["blue", 0], ["blue", 0], ["blue", 0], ["blue", 0], ["blue", 0]],
                    inCreative: true
                },
                {
                    name: "Purple glass",
                    texture: [["purple", 0], ["purple", 0], ["purple", 0], ["purple", 0], ["purple", 0], ["purple", 0]],
                    inCreative: true
                },
                {
                    name: "Cyan glass",
                    texture: [["cyan", 0], ["cyan", 0], ["cyan", 0], ["cyan", 0], ["cyan", 0], ["cyan", 0]],
                    inCreative: true
                },
                {
                    name: "Light gray glass",
                    texture: [["lightgray", 0], ["lightgray", 0], ["lightgray", 0], ["lightgray", 0], ["lightgray", 0], ["lightgray", 0]],
                    inCreative: true
                },
                {
                    name: "Gray glass",
                    texture: [["gray", 0], ["gray", 0], ["gray", 0], ["gray", 0], ["gray", 0], ["gray", 0]],
                    inCreative: true
                },
                {
                    name: "Pink glass",
                    texture: [["pink", 0], ["pink", 0], ["pink", 0], ["pink", 0], ["pink", 0], ["pink", 0]],
                    inCreative: true
                },
                {
                    name: "Lime glass",
                    texture: [["lime", 0], ["lime", 0], ["lime", 0], ["lime", 0], ["lime", 0], ["lime", 0]],
                    inCreative: true
                },
                {
                    name: "Yellow glass",
                    texture: [["yellow", 0], ["yellow", 0], ["yellow", 0], ["yellow", 0], ["yellow", 0], ["yellow", 0]],
                    inCreative: true
                },
                {
                    name: "Light blue glass",
                    texture: [["lightblue", 0], ["lightblue", 0], ["lightblue", 0], ["lightblue", 0], ["lightblue", 0], ["lightblue", 0]],
                    inCreative: true
                },
                {
                    name: "Magenta glass",
                    texture: [["magenta", 0], ["magenta", 0], ["magenta", 0], ["magenta", 0], ["magenta", 0], ["magenta", 0]],
                    inCreative: true
                },
                {
                    name: "Orange glass",
                    texture: [["orange", 0], ["orange", 0], ["orange", 0], ["orange", 0], ["orange", 0], ["orange", 0]],
                    inCreative: true
                },
                {
                    name: "White glass",
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