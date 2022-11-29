var BeeSaver = {
    uniqueID: 0,
    bees: {}
};

Saver.addSavesScope("BeeSaverScope",
    scope => {
        BeeSaver.uniqueID = scope.uniqueID;
        for (var key in scope["bees"]) {
            BeeSaver.bees[key] = BeeRegistry.getBeeFromScope(scope["bees"][key]);
        }
    },

    () => {
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