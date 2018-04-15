const FermenterManager = {
    bioItems: [],

    addBioItem: function (arg) {
        this.bioItems[arg.id] = arg;
    },

    getBioItem: function (id) {
        return this.bioItems[id];
    }

};