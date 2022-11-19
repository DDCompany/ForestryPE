interface RainSubstrate {
    /**
     * Item that can be used as a substrate for the rainmaker.
     */
    id: number;

    /**
     * Returns true if the substrate stops rain instead of creating rain
     */
    isReverse: boolean;

    /**
     * Between 0 and 1.
     */
    speed: number;
}

class RainSubstrateRecipes {
    private static readonly substrates: RainSubstrate[] = [];

    static addSubstrate(substrate: RainSubstrate): void {
        if (substrate.id <= 0) {
            summonException("Invalid substrate id");
        }

        if (substrate.speed < 0 || substrate.speed > 1) {
            summonException("Invalid substrate speed");
        }

        this.substrates.push(substrate);
    }

    static findById(id: number): RainSubstrate | undefined {
        return this.substrates.find(recipe => recipe.id === id);
    }
}