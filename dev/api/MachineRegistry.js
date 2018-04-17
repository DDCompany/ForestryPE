const MachineRegistry = {
    machines: {},

    register: function (id, prototype, isEU) {
        this.machines[id] = prototype;

        if (prototype.defaultValues) {
            prototype.defaultValues.energy = 0;
        } else {
            prototype.defaultValues = {
                energy: 0
            };
        }

        if (!prototype.getEnergyStorage) {
            prototype.getEnergyStorage = function () {
                return 0;
            }
        }

        if (!prototype.energyTick) {
            prototype.energyTick = function (type, src) {
                this.data.energy += src.get(this.getEnergyStorage() - this.data.energy);
            };
        }


        ToolAPI.registerBlockMaterial(id, "stone");
        TileEntity.registerPrototype(id, prototype);
        if (isEU) {
            EnergyTileRegistry.addEnergyTypeForId(id, EU);
            ICRender.getGroup("ic-wire").add(id, -1);
        } else {
            EnergyTileRegistry.addEnergyTypeForId(id, RF);
            ICRender.getGroup("rf-wire").add(id, -1);
        }
    }

};