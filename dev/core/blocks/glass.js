if (ForestryConfig.glassEnabled) {
    Block.setPrototype("forestryGlass", {
        type: Block.TYPE_BASE,

        getVariations: function () {
            return [
                {
                    name: "Black Glass",
                    texture: [["glass_black", 0], ["glass_black", 0], ["glass_black", 0], ["glass_black", 0], ["glass_black", 0], ["glass_black", 0]],
                    inCreative: true
                },
                {
                    name: "Red Glass",
                    texture: [["glass_red", 0], ["glass_red", 0], ["glass_red", 0], ["glass_red", 0], ["glass_red", 0], ["glass_red", 0]],
                    inCreative: true
                },
                {
                    name: "Green Glass",
                    texture: [["glass_green", 0], ["glass_green", 0], ["glass_green", 0], ["glass_green", 0], ["glass_green", 0], ["glass_green", 0]],
                    inCreative: true
                },
                {
                    name: "Brown Glass",
                    texture: [["glass_brown", 0], ["glass_brown", 0], ["glass_brown", 0], ["glass_brown", 0], ["glass_brown", 0], ["glass_brown", 0]],
                    inCreative: true
                },
                {
                    name: "Blue Glass",
                    texture: [["glass_blue", 0], ["glass_blue", 0], ["glass_blue", 0], ["glass_blue", 0], ["glass_blue", 0], ["glass_blue", 0]],
                    inCreative: true
                },
                {
                    name: "Purple Glass",
                    texture: [["glass_purple", 0], ["glass_purple", 0], ["glass_purple", 0], ["glass_purple", 0], ["glass_purple", 0], ["glass_purple", 0]],
                    inCreative: true
                },
                {
                    name: "Cyan Glass",
                    texture: [["glass_cyan", 0], ["glass_cyan", 0], ["glass_cyan", 0], ["glass_cyan", 0], ["glass_cyan", 0], ["glass_cyan", 0]],
                    inCreative: true
                },
                {
                    name: "Light Gray glass",
                    texture: [["glass_lightgray", 0], ["glass_lightgray", 0], ["glass_lightgray", 0], ["glass_lightgray", 0], ["glass_lightgray", 0], ["glass_lightgray", 0]],
                    inCreative: true
                },
                {
                    name: "Gray Glass",
                    texture: [["glass_gray", 0], ["glass_gray", 0], ["glass_gray", 0], ["glass_gray", 0], ["glass_gray", 0], ["glass_gray", 0]],
                    inCreative: true
                },
                {
                    name: "Pink Glass",
                    texture: [["glass_pink", 0], ["glass_pink", 0], ["glass_pink", 0], ["glass_pink", 0], ["glass_pink", 0], ["glass_pink", 0]],
                    inCreative: true
                },
                {
                    name: "Lime Glass",
                    texture: [["glass_lime", 0], ["glass_lime", 0], ["glass_lime", 0], ["glass_lime", 0], ["glass_lime", 0], ["glass_lime", 0]],
                    inCreative: true
                },
                {
                    name: "Yellow Glass",
                    texture: [["glass_yellow", 0], ["glass_yellow", 0], ["glass_yellow", 0], ["glass_yellow", 0], ["glass_yellow", 0], ["glass_yellow", 0]],
                    inCreative: true
                },
                {
                    name: "Light Blue Glass",
                    texture: [["glass_lightblue", 0], ["glass_lightblue", 0], ["glass_lightblue", 0], ["glass_lightblue", 0], ["glass_lightblue", 0], ["glass_lightblue", 0]],
                    inCreative: true
                },
                {
                    name: "Magenta Glass",
                    texture: [["glass_magenta", 0], ["glass_magenta", 0], ["glass_magenta", 0], ["glass_magenta", 0], ["glass_magenta", 0], ["glass_magenta", 0]],
                    inCreative: true
                },
                {
                    name: "Orange Glass",
                    texture: [["glass_orange", 0], ["glass_orange", 0], ["glass_orange", 0], ["glass_orange", 0], ["glass_orange", 0], ["glass_orange", 0]],
                    inCreative: true
                },
                {
                    name: "White Glass",
                    texture: [["glass_white", 0], ["glass_white", 0], ["glass_white", 0], ["glass_white", 0], ["glass_white", 0], ["glass_white", 0]],
                    inCreative: true
                }
            ];
        },

        getDrop: function () {
            return [];
        }
    });

    ModAPI.addAPICallback("FancyGlass", function (api) {
       let fancyGlass = api.bakeModel;

        fancyGlass(BlockID.forestryGlass, 0, "glass_black");
        fancyGlass(BlockID.forestryGlass, 1, "glass_red");
        fancyGlass(BlockID.forestryGlass, 2, "glass_green");
        fancyGlass(BlockID.forestryGlass, 3, "glass_brown");
        fancyGlass(BlockID.forestryGlass, 4, "glass_blue");
        fancyGlass(BlockID.forestryGlass, 5, "glass_purple");
        fancyGlass(BlockID.forestryGlass, 6, "glass_cyan");
        fancyGlass(BlockID.forestryGlass, 7, "glass_lightgray");
        fancyGlass(BlockID.forestryGlass, 8, "glass_gray");
        fancyGlass(BlockID.forestryGlass, 9, "glass_pink");
        fancyGlass(BlockID.forestryGlass, 10, "glass_lime");
        fancyGlass(BlockID.forestryGlass, 11, "glass_yellow");
        fancyGlass(BlockID.forestryGlass, 12, "glass_lightblue");
        fancyGlass(BlockID.forestryGlass, 13, "glass_magenta");
        fancyGlass(BlockID.forestryGlass, 14, "glass_orange");
        fancyGlass(BlockID.forestryGlass, 15, "glass_white");
    });
}