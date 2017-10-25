TileEntity.registerPrototype(BlockID.raintank, {
    defaultValues: {},

    getTransportSlots: function () {
        return {input: ["slotContainer"], output: ["slotFullContainer"]};
    },

    init: function () {
        this.liquidStorage.setLimit(null, 15);
    },

    tick: function () {
        this.liquidStorage.updateUiScale("liquidScale", "water");

        ContainerHelper.fluidContainerFilling("water", this, {empty: "slotContainer", full: "slotFullContainer"});

        if (!(World.getThreadTime() % 20) && GenerationUtils.canSeeSky(this.x, this.y + 1, this.z) && World.getWeather().rain) {
            this.liquidStorage.addLiquid("water", 0.01);
        }
    },

    getGuiScreen: function () {
        return raintankGUI;
    }

});