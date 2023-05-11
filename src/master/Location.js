class Location {
    /**
     * 
     * @param {string} address
     * @param {number} block
     * @param {number} offset
     */
    constructor(address, block, offset) {
        this.address = address
        this.block = block
        this.offset = offset
    }
}

module.exports = Location