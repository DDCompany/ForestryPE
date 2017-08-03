var Dictionary = {
    dictionary: {},

    add: function (name, item) {
        if (!this.dictionary[name]) {
            this.dictionary[name] = [];
        }
        this.dictionary[name].push(item);
    },

    get: function (name) {
        return this.dictionary[name];
    }

};