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
    version: 3,
    shared: true,
    api: "CoreEngine",
});

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
     */
    nextUnique: 1,
    /**
     * Контейнеры для рюкзаков. Ключём для объекта является 'dИдентификатор'. Например, 'd1'
     */
    containers: {},
    /**
     * Объекты описывающие параметры, передаваемые вторый аргументом в метод register. Ключом является айди рюкзака
     */
    prototypes: {},
    /**
     * Объект, который содержит стандартные интерфейсы. Ключом является количество слотов
     */
    guis: {},
    /**
     * Метод регистрации рюкзака
     * @param id айди предмета, при клике которым будет открыт интерфейс
     * @param obj объект описывающий параметры
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

        let slots = obj.slots || 10;
        let gui = obj.gui;
        let isValidFunc = obj.isValidItem || function (id, count, data) {
            return !BackpackRegistry.isBackpack(id) &&
                (obj.items ? BackpackRegistry.isValidFor(id, data, obj.items) : true);
        };

        if (!gui && !this.guis[slots]) {
            if (slots <= 0) {
                Logger.Log("slots amount is not valid", "ERROR");
                return;
            }

            let gui = new UI.StandartWindow({
                standart: {
                    header: {
                        text: {
                            text: obj.title || "Backpack"
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

            BackpackRegistry.addSlotsToGui(gui, slots, isValidFunc, obj.inRow, true);
            this.guis[slots] = gui;
        }

        Item.registerUseFunctionForID(id, function (coords, item) {
            BackpackRegistry.openGuiFor(item.id, item.data);
        });

        Item.registerNoTargetUseFunction(id, function (item) {
            BackpackRegistry.openGuiFor(item.id, item.data);
        });

        this.prototypes[id] = obj;
    },

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
     * @param id айди рюкзака
     * @param data дата рюкзака
     * @param notUpdateData если значение false и для переданной даты не создан контейнер, в руку игрока будет установлен
     * новый предмет
     * @returns {*} дата. Может возвратить отличное от переданной значение
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

            container.openAs(prototype.gui || this.guis[prototype.slots]);
            return data;
        }

        Logger.Log("item is not a backpack", "ERROR");
        return null;
    },

    /**
     *
     * @param id айди предмета
     * @returns {boolean} является ли предмет с переданным айди рбкзаком
     */
    isBackpack: function (id) {
        return this.prototypes[id];
    },

    /**
     * Добавляет слоты в интерфейс
     * @param gui интерфейс
     * @param slots кол-во слотов
     * @param isValidFunc функция валидации предмета для перемещения предмета в слот
     * @param inRow кол-во слотов в ряду
     * @param center центрировать ли слоты
     * @param x начальная координа x. Игнорируется, если center - истина
     * @param y начальная координата y
     * @returns {*} интерфейс
     */
    addSlotsToGui: function (gui, slots, isValidFunc, inRow, center, x, y) {
        let content = gui.getContent();

        x = center ? 300 + (700 - inRow * 61) / 2 : x || 345;
        inRow = inRow || 10;

        let xp = x;
        let yp = y || 70;

        for (let i = 1; i <= slots; i++) {
            content.elements["slot" + i] = {type: "slot", x: xp, y: yp, isValid: isValidFunc};

            xp += 61;
            if (i % inRow === 0) {
                xp = x;
                yp += 61;
            }
        }

        return gui;
    }
};

EXPORT("BackpackRegistry", BackpackRegistry);

