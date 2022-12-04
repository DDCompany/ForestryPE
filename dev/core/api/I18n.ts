class I18n {
    static loadFrom(path: string) {
        const file = new java.io.File(path);
        if (!file.isDirectory()) {
            throw new Error(`Path ${path} is not a directory`);
        }

        // {stringKey: {langCode: translatedString}
        const translations: Record<string, Record<string, string>> = {};
        const langFiles = FileTools.GetListOfFiles(path, "properties");
        for (const file of langFiles) {
            const baseName = file.getName().slice(0, file.getName().lastIndexOf("."));
            //Prefix before "_" is used as a module separator and also for Resource Bundle Editor plugin in Idea.
            const lang = baseName.slice(baseName.lastIndexOf("_") + 1);
            const pairs = FileTools.ReadKeyValueFile(file.getAbsolutePath(), "=");
            for (const key in pairs) {
                if (!pairs[key]) { //skip empty strings
                    continue;
                }

                if (!translations[key]) {
                    translations[key] = {};
                }

                translations[key][lang] = pairs[key];
            }
        }

        for (const key in translations) {
            Translation.addTranslation(key, translations[key]);
        }
    }

    static t(key: string, ...args: any[]): string {
        return args.length
            ? Translation.translate(key).replace(/{(\d+)}/g, (match, number) => args[number] || match)
            : Translation.translate(key);
    }

    static formatLiquidAmount(amount: number): string {
        const units = ["forestry.gui.unit.liquid.mb", "forestry.gui.unit.liquid.b"];
        return this.format(amount * 1000, units, 1000);
    }

    static formatEnergy(energy: number): string {
        const units = ["forestry.gui.unit.energy.rf", "forestry.gui.unit.energy.krf", "forestry.gui.unit.energy.mrf"];
        return this.format(energy, units, 1000);
    }

    static formatTicks(ticks: number): string {
        if (ticks <= 0) {
            return "0";
        }

        const units = {
            "forestry.gui.unit.time.minutes": 1200,
            "forestry.gui.unit.time.seconds": 20,
            "forestry.gui.unit.time.ticks": 1,
        };

        let time = "";
        let leftTicks = ticks;
        for (const unit in units) {
            const value = units[unit as keyof typeof units];
            const count = Math.floor(leftTicks / value);
            if (count > 0) {
                time += `${t(unit, count)} `;
                leftTicks -= count * value;
            }

            if (leftTicks === 0) {
                break;
            }
        }

        return time;
    }

    private static format(value: number, units: string[], unitValue: number): string {
        const unitIndex = Math.floor(Math.log(value) / Math.log(unitValue));
        return t(units[unitIndex], value / Math.pow(unitValue, unitIndex));
    }
}

const t = I18n.t;
I18n.loadFrom(`${__dir__}langs/`);