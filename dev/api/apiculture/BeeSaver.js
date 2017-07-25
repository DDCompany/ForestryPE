var BeeSaver = {
    uniqueID: 0,
    bees: {}
};

Saver.addSavesScope("BeeSaverScope",
    function read(scope) {
        for (key in scope) {
            BeeSaver.bees[key] = new Bee(null).readSaveScope(scope[key]);
        }
    },

    function save() {
        var scope = {};
        for (var key in BeeSaver.bees) scope[key] = BeeSaver.bees[key].getSaveScope();
        return scope;
    }
);