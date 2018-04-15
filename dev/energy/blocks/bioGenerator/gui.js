const biogeneratorGUI = new UI.StandartWindow({
        standart: {
            header: {
                text: {
                    text: Translation.translate("Bio Generator")
                }
            },
            inventory: {
                standart: true
            },
            background: {
                standart: true
            }
        },
        drawing: [
            {type: "bitmap", x: 456, y: 110, bitmap: "biogenerator_background", scale: 3.2},
        ],
        elements: {
            "progressEnergyScale": {type: "scale", x: 647, y: 180.4, bitmap: "biogenerator_energy_scale", scale: 3.2},
            "liquidScale": {type: "scale", x: 459, y: 114, direction: 1, bitmap: "liqued_background_2", scale: 3.2},

            "slotContainer": {type: "slot", x: 385, y: 180, bitmap: "slot_liquid"},
        }
    });