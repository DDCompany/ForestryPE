var BiomeHelper = {

    HUMIDITY_DAMP_BIOMES: [149, 6, 134, 21],
    HUMIDITY_ARID_BIOMES: [8, 2, 130],

    HUMIDITY_DAMP: 3,
    HUMIDITY_NORMAL: 2,
    HUMIDITY_ARID: 1,

    CLIMATE_ICY_BIOMES: [12],
    CLIMATE_COLD_BIOMES: [30, 158, 5, 133, 32, 160],
    CLIMATE_WARM_BIOMES: [21, 149],
    CLIMATE_HOT_BIOMES: [2, 130],
    CLIMATE_HELLISH_BIOMES: [8],

    CLIMATE_HELLISH: 6,
    CLIMATE_HOT: 5,
    CLIMATE_WARM: 4,
    CLIMATE_NORMAL: 3,
    CLIMATE_COLD: 2,
    CLIMATE_ICY: 1,

    getBiomeHumidity: function (id) {
        return this.HUMIDITY_DAMP_BIOMES.indexOf(id) != -1 ? this.HUMIDITY_DAMP :
            (this.HUMIDITY_ARID_BIOMES.indexOf(id) != -1 ? this.HUMIDITY_DAMP : this.HUMIDITY_NORMAL);
    },

    getBiomeClimate: function (id) {
        return this.CLIMATE_ICY_BIOMES.indexOf(id) != -1 ? this.CLIMATE_ICY :
            (this.CLIMATE_COLD_BIOMES.indexOf(id) != -1 ? this.CLIMATE_COLD :
                (this.CLIMATE_WARM_BIOMES.indexOf(id) != -1 ? this.CLIMATE_WARM :
                    (this.CLIMATE_HOT_BIOMES.indexOf(id) != -1 ? this.CLIMATE_HOT :
                        (this.CLIMATE_HELLISH_BIOMES.indexOf(id) != -1 ? this.CLIMATE_HELLISH : this.CLIMATE_NORMAL))));
    }

};