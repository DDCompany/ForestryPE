/*TileEntity.registerPrototype(BlockID.alveary_misc, {

    defaultValues: {},

    tick: function () {

    },

    getGuiScreen: function () {
        return null;
    },

    click: function(){
        var tile = World.getTileEntity(this.data.center.x, this.data.center.y, this.data.center.z);
        if(!ApiaryRegistry.saves.apiarys[tile.structureID]){

        }
        new Container().openAs(alvearyGUI);
    }

});*/