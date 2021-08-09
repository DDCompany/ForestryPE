enum Temperature {
    ICY,
    COLD,
    NORMAL,
    WARM,
    HOT,
    HELLISH
}

enum Humidity {
    ARID = 6, //for ClimateUtil.toDisplay
    NORMAL,
    DAMP
}

class ClimateUtil {
    static readonly hellishBiomes: Record<number, boolean> = {};

    static getTemperatureAt(blockSource: BlockSource, x: number, y: number, z: number): Temperature {
        if (this.isHellishBiome(blockSource.getBiome(x, z))) {
            return Temperature.HELLISH;
        }

        const temperature = blockSource.getBiomeTemperatureAt(x, y, z);
        if (temperature > 1) {
            return Temperature.HOT;
        } else if (temperature > .85) {
            return Temperature.WARM;
        } else if (temperature > .35) {
            return Temperature.NORMAL;
        } else if (temperature > 0) {
            return Temperature.COLD;
        }

        return Temperature.ICY;
    }

    static getHumidityAt(blockSource: BlockSource, x: number, y: number, z: number) {
        const downfall = blockSource.getBiomeDownfallAt(x, y, z);
        if (downfall > .85) {
            return Humidity.DAMP;
        } else if (downfall >= .3) {
            return Humidity.NORMAL;
        }

        return Humidity.ARID;
    }

    static addHellishBiomes(...biomesId: number[]) {
        for (const id of biomesId) {
            this.hellishBiomes[id] = true;
        }
    }

    static isHellishBiome(biomeId: number): boolean {
        return this.hellishBiomes[biomeId] ?? false;
    }

    static toDisplay(value: Humidity | Temperature) {
        if (value >= Humidity.ARID) {
            return t(`forestry.gui.humidity.${value}`);
        }

        return t(`forestry.gui.temperature.${value}`);
    }
}

ClimateUtil.addHellishBiomes(8, 178, 179, 180, 181);