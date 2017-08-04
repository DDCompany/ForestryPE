ToolAPI.addBlockMaterial("beehive", 1.5);
Block.setPrototype("beehive", {
    type: Block.TYPE_BASE,

    getVariations: function () {
        return [
            {
                name: "Forest hive",
                texture: [["beehiveForest", 0], ["beehiveForest", 0], ["beehiveForest", 1]],
                inCreative: true
            },
            {
                name: "Meadows hive",
                texture: [["beehiveMeadows", 0], ["beehiveMeadows", 0], ["beehiveMeadows", 1]],
                inCreative: true
            },
            {
                name: "Modest hive",
                texture: [["beehiveModest", 0], ["beehiveModest", 0], ["beehiveModest", 1]],
                inCreative: true
            },
            {
                name: "Tropical hive",
                texture: [["beehiveTropical", 0], ["beehiveTropical", 0], ["beehiveTropical", 1]],
                inCreative: true
            },
            {
                name: "Wintry hive",
                texture: [["beehiveWintry", 0], ["beehiveWintry", 0], ["beehiveWintry", 1]],
                inCreative: true
            },
            {
                name: "Marshy hive",
                texture: [["beehiveMarshy", 0], ["beehiveMarshy", 0], ["beehiveMarshy", 1]],
                inCreative: true
            },
            {
                name: "Ender hive",
                texture: [["beehiveEnder", 0], ["beehiveEnder", 0], ["beehiveEnder", 1]],
                inCreative: true
            }
        ];
    },

    getDrop: function (a, b, data, g, h) {
        if (g) {
            var drop = [];
            var rand = Math.random();
            if (rand < 0.2) {
                drop.push([ItemID.princessValiant, 1, 0]);
            } else {
                switch (parseInt(data)) {
                    case 0:
                        if (Math.random() < 0.05) {
                            var bee = new Bee("Forest", BeeRegistry.BEETYPE_PRINCESS, true);
                            bee.active_chromosomes_list["NEVER_SLEEPS"] = true;
                            bee.inactive_chromosomes_list["NEVER_SLEEPS"] = true;
                            drop.push([bee.item.id, 1, bee.item.data]);
                        } else {
                            drop.push([ItemID.princessForest, 1, 0]);
                        }
                        if (Math.random() < 0.82) {
                            drop.push([ItemID.combHoney, 1, 0]);
                        }
                        break;
                    case 1:
                        drop.push([ItemID.princessMeadows, 1, 0]);
                        if (Math.random() < 0.80) {
                            drop.push([ItemID.combHoney, 1, 0]);
                        }
                        break;
                    case 2:
                        drop.push([ItemID.princessModest, 1, 0]);
                        if (Math.random() < 0.80) {
                            drop.push([ItemID.combParched, 1, 0]);
                        }
                        break;
                    case 3:
                        drop.push([ItemID.princessTropical, 1, 0]);
                        if (Math.random() < 0.80) {
                            drop.push([ItemID.combSilky, 1, 0]);
                        }
                        break;
                    case 4:
                        drop.push([ItemID.princessWintry, 1, 0]);
                        if (Math.random() < 0.80) {
                            drop.push([ItemID.combFrozen, 1, 0]);
                        }
                        break;
                    case 5:
                        drop.push([ItemID.princessMarshy, 1, 0]);
                        if (Math.random() < 0.80) {
                            drop.push([ItemID.combMossy, 1, 0]);
                        }
                        break;
                    case 6:
                        drop.push([ItemID.princessEnder, 1, 0]);
                        if (Math.random() < 0.90) {
                            drop.push([ItemID.combMysterious, 1, 0]);
                        }
                        break;
                }
            }

            if (rand < 0.022) {
                drop.push([ItemID.droneValiant, 1, 0]);
            } else if (rand < 0.8) {
                var droneCount = Math.floor(1 + Math.random() * 2);
                switch (parseInt(data)) {
                    case 0:
                        if (Math.random() < 0.05) {
                            var bee = new Bee("Forest", BeeRegistry.BEETYPE_DRONE, true);
                            bee.active_chromosomes_list["NEVER_SLEEPS"] = true;
                            bee.inactive_chromosomes_list["NEVER_SLEEPS"] = true;
                            drop.push([bee.item.id, 1, bee.item.data]);
                        } else {
                            drop.push([ItemID.droneForest, droneCount, 0]);
                            break;
                        }
                    case 1:
                        drop.push([ItemID.droneMeadows, droneCount, 0]);
                        break;
                    case 2:
                        drop.push([ItemID.droneModest, droneCount, 0]);
                        break;
                    case 3:
                        drop.push([ItemID.droneTropical, droneCount, 0]);
                        break;
                    case 4:
                        drop.push([ItemID.droneWintry, droneCount, 0]);
                        break;
                    case 5:
                        drop.push([ItemID.droneMarshy, droneCount, 0]);
                        break;
                    case 6:
                        drop.push([ItemID.droneEnder, droneCount, 0]);
                        break;
                }
            }

            return drop;
        }
        return [];
    },
    getMaterial: function (a) {
        return "beehive"
    },
});

function generateBeehive(data, coords) {
    GenerationUtils.lockInBlock(BlockID.beehive, data);
    if (World.getBlock(coords.x, coords.y + 1, coords.y).id !== 8 &&
        World.getBlock(coords.x, coords.y + 1, coords.y).id !== 9) {
        GenerationUtils.setLockedBlock(coords.x, coords.y + 1, coords.z);
    }
}

Callback.addCallback("PostLoaded", function () {
    Callback.addCallback("GenerateChunk", function (chunkX, chunkZ) {
        if (Config.genBeehives) {

            var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 64, 128);
            coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

            if (Config.genMeadows && World.getBiome(coords.x, coords.z) === 1) {
                if (Math.random() <= Config.genMeadowsChance) {
                    generateBeehive(1, coords);

                }

            } else if (Config.genForest &&
                (World.getBiome(coords.x, coords.z) === 4 ||
                    World.getBiome(coords.x, coords.z) === 132 ||
                    World.getBiome(coords.x, coords.z) === 27 ||
                    World.getBiome(coords.x, coords.z) === 155 ||
                    World.getBiome(coords.x, coords.z) === 29 ||
                    World.getBiome(coords.x, coords.z) === 157)) {

                if (Math.random() <= Config.genForestChance) {
                    generateBeehive(0, coords);

                }

            } else if (Config.genModest && World.getBiome(coords.x, coords.z) === 2) {
                if (Math.random() <= Config.genModestChance) {
                    generateBeehive(2, coords);
                }

            } else if (Config.genMarshy &&
                (World.getBiome(coords.x, coords.z) === 6 ||
                    World.getBiome(coords.x, coords.z) === 134)) {
                if (Math.random() <= Config.genMarshyChance) {
                    generateBeehive(5, coords);
                }

            } else if (Config.genTropical &&
                (World.getBiome(coords.x, coords.z) === 21 ||
                    World.getBiome(coords.x, coords.z) === 149)) {
                if (Math.random() <= Config.genTropicalChance) {
                    generateBeehive(3, coords);
                }

            } else if (Config.genWintry &&
                (World.getBiome(coords.x, coords.z) === 12 ||
                    World.getBiome(coords.x, coords.z) === 140 ||
                    World.getBiome(coords.x, coords.z) === 30 ||
                    World.getBiome(coords.x, coords.z) === 26)) {
                if (Math.random() <= Config.genWintryChance) {
                    generateBeehive(4, coords);
                }

            }
        }

    });

    Callback.addCallback("GenerateEndChunk", function (chunkX, chunkZ) {

        var coords = GenerationUtils.randomCoords(chunkX, chunkZ);
        coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);

        if (Config.genEnder && Math.random() <= Config.genEnderChance) {
            generateBeehive(6, coords);
        }

    });

});

