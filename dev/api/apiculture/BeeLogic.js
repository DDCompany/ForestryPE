var BeeLogic = {
    mate: function (princess, drone) {
        var queen = new Bee(princess.type, BeeRegistry.BEETYPE_QUEEN);
        queen.active_chromosomes_list = princess.active_chromosomes_list;
        queen.inactive_chromosomes_list = princess.inactive_chromosomes_list;
        queen.mate = drone;

        return queen;
    }
};