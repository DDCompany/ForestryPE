interface IChancedItem {
    /**
     * Id of the item
     */
    id: number,

    /**
     * Data of the item
     */
    data?: number,

    /**
     * Chance to get the item. Must be between 0 and 1.
     */
    chance: number
}