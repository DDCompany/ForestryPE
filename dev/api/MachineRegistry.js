const MachineRegistry = {
    machines: {},

    registerConsumer: function (id, prototype, energyType) {
        energyType = energyType || RF;

        if (!prototype.energyTick) {
            prototype.energyTick = function () {

            };
        }

        if (!prototype.energyReceive) {
            prototype.energyReceive = function (type, amount) {
                let add = Math.min(this.getMaxTransfer(), amount, this.getEnergyStorage() - this.data.energy);
                this.data.energy += add;
                return add;
            };
        }

        this.register(id, prototype, energyType);
    },

    registerGenerator: function (id, prototype, energyType) {
        energyType = energyType || RF;

        if (!prototype.energyTick) {
            prototype.energyTick = function (type, src) {
                let out = Math.min(32, this.data.energy);
                this.data.energy -= out;
                this.data.energy += src.add(out);
            };
        }

        prototype.canReceiveEnergy = function () {
            return false;
        };

        prototype.isEnergySource = function () {
            return true;
        };

        this.register(id, prototype, energyType);
    },

    register: function (id, prototype, energyType) {
        energyType = energyType || RF;
        this.machines[id] = prototype;

        if (prototype.defaultValues) {
            prototype.defaultValues.energy = 0;
        } else {
            prototype.defaultValues = {
                energy: 0
            };
        }

        if (!prototype.getMaxTransfer)
            prototype.getMaxTransfer = function () {
                return 1100;
            };

        if (!prototype.getEnergyStorage) {
            prototype.getEnergyStorage = function () {
                return 0;
            }
        }

        this.setupWireConnection(id, energyType);
        ToolAPI.registerBlockMaterial(id, "stone", 1, true);
        Block.setDestroyTime(BlockID.oreCopper, 1.5);
        TileEntity.registerPrototype(id, prototype);
        EnergyTileRegistry.addEnergyTypeForId(id, energyType);
    },

    setupWireConnection: function (id, energyType) {
        switch (energyType.name) {
            case EU.name:
                ICRender.getGroup("ic-wire").add(id, -1);
                return;
            case RF.name:
                ICRender.getGroup("rf-wire").add(id, -1);
                return;
            default:
                summonException("Energy type not supported");
        }
    }
};