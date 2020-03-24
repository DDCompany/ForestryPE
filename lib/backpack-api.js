/*
  ____             _                     _              _____ _____
 |  _ \           | |                   | |       /\   |  __ \_   _|
 | |_) | __ _  ___| | ___ __   __ _  ___| | __   /  \  | |__) || |
 |  _ < / _` |/ __| |/ / '_ \ / _` |/ __| |/ /  / /\ \ |  ___/ | |
 | |_) | (_| | (__|   <| |_) | (_| | (__|   <  / ____ \| |    _| |_
 |____/ \__,_|\___|_|\_\ .__/ \__,_|\___|_|\_\/_/    \_\_|   |_____|
                       | |
                       |_|

    BackpackAPI library

    Внимание! Запрещено:
    1.Распространение библиотеки на сторонних источниках без указание ссылки на официальное сообщество
	2.Изменение кода
    3.Явное копирование кода

    Используя библиотеку вы автоматически соглашаетесь с этими правилами.

    ©DDCompany (https://vk.com/forestry_pe)
 */
LIBRARY({
    name: "BackpackAPI",
    version: 5,
    shared: true,
    api: "CoreEngine",
});

Translation.addTranslation("Backpack", {ru: "Рюкзак"});

Saver.addSavesScope("BackpacksScope",
    function read(scope) {
        BackpackRegistry.nextUnique = scope.nextUnique || 1;
        BackpackRegistry.containers = scope.containers || {};
    },

    function save() {
        return {
            nextUnique: BackpackRegistry.nextUnique,
            containers: BackpackRegistry.containers
        };
    }
);

var BackpackRegistry = {
    /**
     * Следующий уникальный идентификтор
     * @type {int}
     */
    nextUnique: 1,
    /**
     * Контейнеры для рюкзаков. Ключём для объекта является 'dИдентификатор'. Например, 'd1'
     * @type {object}
     */
    containers: {},
    /**
     * Объекты описывающие параметры, передаваемые вторый аргументом в метод register. Ключом является айди рюкзака
     * @type {Object.<int, (T_BackpackPrototype|undefined)>}
     */
    prototypes: {},
    /**
     * Метод регистрации рюкзака
     * @param {int} id - Айди предмета, при клике которым будет открыт интерфейс
     * @param {T_BackpackPrototype} obj - Объект описывающий параметры
     */
    register: function (id, obj) {
        if (id <= 0) {
            Logger.Log("id for backpack register function is not valid", "ERROR");
            return;
        }

        if (!obj) {
            Logger.Log("object for backpack register function is not valid", "ERROR");
            return;
        }

        obj.items = obj.items || [];
        let slots = obj.slots || 10;
        obj.inRow = obj.inRow || obj.slots;
        let isValidFunc = obj.isValidItem || function (id, count, data) {
            return !BackpackRegistry.isBackpack(id) &&
                (obj.items ? BackpackRegistry.isValidFor(id, data, obj.items) : true);
        };

        if (!obj.gui) {
            if (slots <= 0) {
                Logger.Log("slots amount is not valid", "ERROR");
                return;
            }

            obj.gui = new UI.StandartWindow({
                standart: {
                    header: {
                        text: {
                            text: ""
                        }
                    },
                    inventory: {
                        standart: true
                    },
                    background: {
                        standart: true
                    },
                    minHeight: 90 + (slots / 10 * 61) + 70
                },
                drawing: [],
                elements: {}
            });

            BackpackRegistry.addSlotsToGui(obj.gui, slots, isValidFunc, obj.inRow, obj.slotsCenter !== false);
        }

        Item.registerUseFunctionForID(id, function (coords, item) {
            BackpackRegistry.openGuiFor(item.id, item.data);
        });

        Item.registerNoTargetUseFunction(id, function (item) {
            BackpackRegistry.openGuiFor(item.id, item.data);
        });

        this.prototypes[id] = obj;
    },

    /**
     * @param {int} id
     * @param {int} data
     * @param {T_BackpackItems} items
     * @returns {boolean}
     */
    isValidFor: function (id, data, items) {
        data = data || 0;

        for (let i in items) {
            let item = items[i];

            switch (typeof item) {
                case "number":
                    if (id === item) {
                        return true;
                    }
                    break;
                case "object":
                    let rId = item.id;
                    let rData = item.data || 0;
                    let isOk = true;

                    switch (typeof rId) {
                        case "string":
                            let nameId = IDRegistry.getNameByID(id);
                            isOk = nameId !== null ? nameId.match(rId) : false;
                            break;
                        case "number":
                            isOk = rId == id;
                    }

                    if (isOk == true) {
                        switch (typeof rData) {
                            case "string":
                                if ((data + "").match(rData)) {
                                    return true;
                                }
                                break;
                            case "number":
                                if (rData == -1 || rData == data) {
                                    return true;
                                }
                        }
                    }
                    break;
                case "string":
                    let namedId = IDRegistry.getNameByID(id);
                    if (namedId !== null && namedId.match(item)) {
                        return true;
                    }
                    break;
            }
        }

        return false;
    },

    /**
     * Открытие интерфейса рюкзака
     * @param {int} id - Айди рюкзака
     * @param {int} data - Дата рюкзака
     * @param {boolean} notUpdateData - Если значение false и для переданной даты не создан контейнер, в руку игрока будет установлен
     * новый предмет
     * @returns {(int|null)} - Дата. Может возвратить отличное от переданной значение
     */
    openGuiFor: function (id, data, notUpdateData) {
        let prototype = this.prototypes[id];

        if (prototype) {
            let container = this.containers["d" + data];

            if (!container) {
                data = BackpackRegistry.nextUnique++;
                container = this.containers["d" + data] = new UI.Container();

                if (!notUpdateData)
                    Player.setCarriedItem(id, 1, data);
            }

            let gui = prototype.gui;
            let header = gui.getWindow("header");
            header.contentProvider.drawing[1].text = Translation.translate(prototype.title || "Backpack");
            container.openAs(gui);
            return data;
        }

        Logger.Log("item is not a backpack", "ERROR");
        return null;
    },

    /**
     * @param {int} id - Айди предмета
     * @returns {boolean} - Является ли предмет с переданным айди рюкзаком
     */
    isBackpack: function (id) {
        return this.prototypes[id];
    },

    /**
     * Добавляет слоты в интерфейс
     * @param {object} gui - Интерфейс
     * @param {int} slots - Кол-во слотов
     * @param {T_ValidItemFunc} isValidFunc - Функция валидации предмета для перемещения предмета в слот
     * @param {int} inRow - Кол-во слотов в ряду
     * @param {boolean} center - Центрировать ли слоты
     * @param {int} [x=345] - Начальная координа x. Игнорируется, если center - истина
     * @param {int} [y=70] - Начальная координата y
     * @returns {object} - Интерфейс
     */
    addSlotsToGui: function (gui, slots, isValidFunc, inRow, center, x, y) {
        let content = gui.getContent();

        y = y || 70;
        x = center ? 300 + (700 - inRow * 61) / 2 : x || 345;

        for (let i = 0; i < slots; i++) {
            content.elements["slot" + (i + 1)] = {
                type: "slot",
                x: x + i % inRow * 61,
                y: y + Math.floor(i / inRow) * 61,
                isValid: isValidFunc
            };
        }

        return gui;
    }
};

EXPORT("BackpackRegistry", BackpackRegistry);

/**
 * @typedef {object} T_BackpackObjectItem
 * @property {(int|string)} id
 * @property {(int|string)} data
 */

/**
 * @typedef {(int|string|T_BackpackObjectItem)[]} T_BackpackItems
 */

/**
 * @typedef {function(id: int, count: int, data: int): boolean} T_ValidItemFunc
 */

/**
 * @typedef {object} T_BackpackPrototype
 * @property {string|undefined} [title] - Загаловок рюкзака
 * @property {int} [slots=10] - Кол-во слотов в рюкзаке. Должно быть больше 0
 * @property {boolean} [slotsCenter] - Центрировать ли слоты
 * @property {int} [inRow] - Количество слотов в одном ряду
 * @property {T_BackpackItems} [items=[]] - Задаёт предметы, которые можно положить в данный рюкзак
 * @property {T_ValidItemFunc} [isValidItem] - Функция для проверки, может ли предмет быть положен в рюкзак. Если задана, `items` игнорируется
 * @property {object} [gui] - Интерфейс рюкзака
 */