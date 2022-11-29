enum Temperature {
    ICY = 1,
    COLD,
    NORMAL,
    WARM,
    HOT,
    HELLISH
}

enum Humidity {
    ARID = 1,
    NORMAL,
    DAMP
}

class Habitat {
    static getTemperatureAt(blockSource: BlockSource, x: number, y: number, z: number): Temperature {
        const temperature = blockSource.getBiomeTemperatureAt(x, y, z);
        if (temperature > 1.5) {
            return Temperature.HELLISH;
        } else if (temperature > 1) {
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

    static localizeTemperature(value: Temperature) {
        return Translation.translate(`forestry.gui.temperature.${value}`);
    }

    static localizeHumidity(value: Humidity) {
        return Translation.translate(`forestry.gui.humidity.${value}`);
    }
}