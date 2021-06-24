class I18N {
    static translationsDir = `${__dir__}langs/`;

    static init() {
        const translations = {};
        const files = FileTools.GetListOfFiles(this.translationsDir, "properties");
        for (const file of files) {
            const lang = file.getName().slice(0, file.getName().indexOf("."));
            const values = FileTools.ReadKeyValueFile(file.getAbsolutePath(), "=");
            for (const key in values) {
                let translation = translations[key];
                if (!translation) {
                    translation = translations[key] = {};
                }

                translation[lang] = values[key];
            }
        }

        for (const lang in translations) {
            Translation.addTranslation(lang, translations[lang]);
        }
    }

    static format(str: string, ...args: any[]): string {
        return str.replace(/[{](\d)[}]/g, ((substring, index) => args[index]));
    }
}

function t(key: string, ...args: any[] | undefined): string {
    return args ? I18N.format(Translation.translate(key), args) : Translation.translate(key);
}

I18N.init();