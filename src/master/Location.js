class Location {
    /**
     * 
     * @param {string} address
     * @param {number} blockIndex
     * @param {number} offset
     */
    constructor(address, blockIndex, offset) {
        this.address = address
        this.blockIndex = blockIndex
        this.offset = offset
    }
}

module.exports = Location