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
    static readonly humidityByBiome: Record<number, Humidity> = {}; //TODO: remove after adding getBiomeHumidityAt

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
        } else {
            return Temperature.ICY;
        }
    }

    static getHumidityAt(blockSource: BlockSource, x: number, y: number, z: number) {
        const biomeId = blockSource.getBiome(x, z);
        return this.humidityByBiome[biomeId] ?? Humidity.NORMAL;
    }

    static setBiomesHumidity(value: Humidity, ...biomesId: number[]) {
        for (const id of biomesId) {
            this.humidityByBiome[id] = value;
        }
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
ClimateUtil.setBiomesHumidity(Humidity.DAMP, 149, 6, 134, 21);
ClimateUtil.setBiomesHumidity(Humidity.ARID, 2, 8, 130);