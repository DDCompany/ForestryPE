class BiomeHelper {
    static HUMIDITY_DAMP_BIOMES: number[] = [149, 6, 134, 21];
    static HUMIDITY_ARID_BIOMES: number[] = [8, 2, 130];

    static readonly HUMIDITY_DAMP = 3;
    static readonly HUMIDITY_NORMAL = 2;
    static readonly HUMIDITY_ARID = 1;

    static CLIMATE_ICY_BIOMES: number[] = [12];
    static CLIMATE_COLD_BIOMES: number[] = [30, 158, 5, 133, 32, 160];
    static CLIMATE_WARM_BIOMES: number[] = [21, 149];
    static CLIMATE_HOT_BIOMES: number[] = [2, 130];
    static CLIMATE_HELLISH_BIOMES: number[] = [8];

    static readonly CLIMATE_HELLISH = 6;
    static readonly CLIMATE_HOT = 5;
    static readonly CLIMATE_WARM = 4;
    static readonly CLIMATE_NORMAL = 3;
    static readonly CLIMATE_COLD = 2;
    static readonly CLIMATE_ICY = 1;

    static getBiomeHumidity(id: number): number {
        return this.HUMIDITY_DAMP_BIOMES.indexOf(id) != -1 ? this.HUMIDITY_DAMP :
            (this.HUMIDITY_ARID_BIOMES.indexOf(id) != -1 ? this.HUMIDITY_DAMP : this.HUMIDITY_NORMAL);
    }

    static getBiomeClimate(id: number): number {
        return this.CLIMATE_ICY_BIOMES.indexOf(id) != -1 ? this.CLIMATE_ICY :
            (this.CLIMATE_COLD_BIOMES.indexOf(id) != -1 ? this.CLIMATE_COLD :
                (this.CLIMATE_WARM_BIOMES.indexOf(id) != -1 ? this.CLIMATE_WARM :
                    (this.CLIMATE_HOT_BIOMES.indexOf(id) != -1 ? this.CLIMATE_HOT :
                        (this.CLIMATE_HELLISH_BIOMES.indexOf(id) != -1 ? this.CLIMATE_HELLISH : this.CLIMATE_NORMAL))));
    }
}