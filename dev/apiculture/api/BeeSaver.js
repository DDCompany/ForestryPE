var BeeSaver = {
    uniqueID: 0,
    bees: {}
};

Saver.addSavesScope("BeeSaverScope",
    function read(scope) {
        BeeSaver.uniqueID = scope.uniqueID;
        for (var key in scope["bees"]) {
            BeeSaver.bees[key] = BeeRegistry.getBeeFromScope(scope["bees"][key]);
        }
    },

    function save() {
        var scope = {
            uniqueID: BeeSaver.uniqueID,
            bees: {}
        };
        for (var key in BeeSaver.bees) {
            scope["bees"][key] = BeeSaver.bees[key].getSaveScope();
        }
        return scope;
    }
);