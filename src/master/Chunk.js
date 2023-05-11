const Master = require('./Master')
const Crypto = require('../util/Crypto')
class Chunk {
    /**
     * 
     * @param {string} data
     */
    constructor(data) {
        this.hash = Crypto.sha1(data)
        this.size = data.length
        this.locationList = Master.saveChunk(data)
        this.id = Crypto.sha1(
            this.locationList.map(location => location.address + " " + location.blockIndex + " " + location.offset).join("\n")
        )
    }

    /**
     * 
     * @return {number}
     */
    get size() {
        return this.size
    }

    get data() {
        return Master.getChunk(this)
    }
}

module.exports = Chunk