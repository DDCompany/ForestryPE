TileEntity.registerPrototype(BlockID.swarmer, {

    defaultValues: {
        tickCount: 0
    },

    haha: false,

    alvearyTick: function (tile) {
        if (!this.haha && tile.container.getSlot("slot0").id > 0) {
            var x = this.x + Util.random(5, 40 * 2) - 40;
            var z = this.z + Util.random(5, 40 * 2) - 40;
            var y = GenerationUtils.findSurface(x, this.y, z).y + 1;
            World.setBlock(x, y, z, BlockID.beehive, 7);
            World.addTileEntity(x, y, z);
            var parent = BeeRegistry.getBeeFromItem(tile.container.getSlot("slot0").id, tile.container.getSlot("slot0").data);
            var bee = new Bee(parent.active_chromosomes_list["SPECIES"], BeeRegistry.BEETYPE_PRINCESS, true, parent.inactive_chromosomes_list["SPECIES"]);
            World.getTileEntity(x, y, z).data.bee = bee;
            Debug.message(x + " " + y + " " + z);

            this.haha = true;
        }
    },

    getGuiScreen: function () {
        return swarmerGUI;
    },

});