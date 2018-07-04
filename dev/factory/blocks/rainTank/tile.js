TileEntity.registerPrototype(BlockID.rainTank, {
    defaultValues: {},

    getTransportSlots: function () {
        return {input: ["slotContainer"], output: ["slotFullContainer"]};
    },

    init: function () {
        this.liquidStorage.setLimit(null, 15);
    },

    tick: function () {
        this.liquidStorage.updateUiScale("liquidScale", "water");

        ContainerHelper.fillContainer("water", this, "slotContainer", "slotFullContainer");

        if (!(World.getThreadTime() % 20) && GenerationUtils.canSeeSky(this.x, this.y + 1, this.z) && World.getWeather().rain) {
            this.liquidStorage.addLiquid("water", 0.01);
        }
    },

    getGuiScreen: function () {
        return raintankGUI;
    }

});