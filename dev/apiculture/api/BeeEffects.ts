interface BeeEffect {
    name: string;
    delay: number;
    requireWorking?: boolean;
    isDominant?: boolean;

    doEffect(
        blockSource: BlockSource,
        coords: { x: number, y: number, z: number },
        range: { x: number, y: number, z: number },
        house: BeeHouse,
    ): void;
}

class BeeEffects {
    static readonly effects: Record<string, BeeEffect> = {};

    static registerEffect(unique: string, effect: BeeEffect) {
        this.effects[unique] = effect;
    }

    static getApiaristArmorWearValue(entity: number) {
        let count = 0;
        if (Entity.getArmorSlot(entity, 0).id === ItemID.helmetApiarist) count++;
        if (Entity.getArmorSlot(entity, 1).id === ItemID.chestApiarist) count++;
        if (Entity.getArmorSlot(entity, 2).id === ItemID.leggingsApiarist) count++;
        if (Entity.getArmorSlot(entity, 3).id === ItemID.bootsApiarist) count++;

        return count;
    }

    static doEffect(
        unique: string,
        beeHouse: BeeHouse,
        blockSource: BlockSource,
        coords: { x: number, y: number, z: number },
        range: { x: number, y: number, z: number }
    ) {
        const effect = this.effects[unique];
        if (!effect) {
            return;
        }

        const requireWorking = effect.requireWorking ?? true;
        const isWorking = !beeHouse.error && beeHouse.queen;
        if (requireWorking && !isWorking) {
            return;
        }

        if (isWorking) {
            const data = beeHouse.tile.data;
            const delay = data.delay || 0;
            if (delay >= effect.delay) {
                effect.doEffect(blockSource, coords, range, beeHouse);
                data.delay = 0;
            } else data.delay = delay + 1;
        }
    }

    static getLocalizedName(unique: string): string {
        const effect = this.effects[unique];
        return Translation.translate(effect?.name || "forestry.alleles.effect.none");
    }

    static isDominant(unique: string): boolean {
        const effect = this.effects[unique];
        return effect?.isDominant || false;
    }
}