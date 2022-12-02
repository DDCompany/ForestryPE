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
}

const t = I18n.t;
I18n.loadFrom(`${__dir__}langs/`);