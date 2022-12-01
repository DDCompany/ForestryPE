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
        if (blockSource.getDimension() === EDimension.NETHER) {
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
        //The humidity of the swamp is different in Bedrock Edition and Java Edition (0.5 and 0.9 respectively).
        //Damp is required for swamp hives to spawn and marshy bees to work.
        //Differences in other biomes are insignificant.
        const biome = blockSource.getBiome(x, z);
        if (biome === 6) {
            return Humidity.DAMP;
        }

        const downfall = blockSource.getBiomeDownfallAt(x, y, z);
        if (downfall > .85) {
            return Humidity.DAMP;
        } else if (downfall >= .3) {
            return Humidity.NORMAL;
        }

        return Humidity.ARID;
    }

    static isWithinLimit(current: Temperature | Humidity, base: Temperature | Humidity, tolerance: number) {
        let up = 0;
        let down = 0;

        const side = BeeRegistry.getTolerance(tolerance);
        const value = BeeRegistry.getToleranceValue(tolerance);
        if (side === BeeRegistry.TOLERANCE_BOTH) {
            up = value;
            down = value;
        } else if (side === BeeRegistry.TOLERANCE_UP) {
            up = value;
        } else if (side === BeeRegistry.TOLERANCE_DOWN) {
            down = value;
        }

        return current <= base + up && current >= base - down;
    }

    static localizeTemperature(value: Temperature) {
        return Translation.translate(`forestry.gui.temperature.${value}`);
    }

    static localizeHumidity(value: Humidity) {
        return Translation.translate(`forestry.gui.humidity.${value}`);
    }
}