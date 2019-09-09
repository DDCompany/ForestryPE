setLoadingTip("Storage Module Loading...");

const BackpackManager = {
        regexGroups: {},

        addRegex: function (groupName, regexId, regexData) {
            let regexGroup = this.regexGroups[groupName];

            if (!regexGroup) {
                regexGroup = this.regexGroups[groupName] = [];
            }

            regexGroup.push({regexId: regexId, regexData: regexData || "0"});
        },

        addItem: function (groupName, id, data) {
            data = data || 0;

            this.addRegex(groupName, "^" + id + "$", data < 0 ? ".*" : "^" + data + "$");
        }
        ,

        isValidItem: function (groupName, id, data) {
            let group = this.regexGroups[groupName];

            if (group) {
                id = IDRegistry.getNameByID(id) || id + "";
                data = data + "";

                for (let index in group) {
                    let groupItem = group[index];

                    if (id.match(groupItem.regexId) && data.match(groupItem.regexData))
                        return true;
                }
            }

            return false;
        }
        ,

        loadFrom: function (path) {
            let content = FileTools.ReadText(path);

            if (content) {
                let parsed = JSON.parse(content);

                for (let groupName in parsed) {
                    let group = parsed[groupName];

                    for (let index in group) {
                        let item = group[index];
                        let type = typeof item;

                        switch (type) {
                            case "string":
                                this.addRegex(groupName, item);
                                break;
                            case "object":
                                let id = item.id;
                                if (id)
                                    this.addItem(groupName, id, item.data);
                                break;
                            default:
                                this.addItem(groupName, item);
                        }
                    }
                }

                return;
            }

            log("Error loading file " + path, "ERROR");
        }
    }
;

BackpackManager.loadFrom(__dir__ + "json/backpacks_groups.json");