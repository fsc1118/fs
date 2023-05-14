const Master = require('./Master')
const Crypto = require('../util/Crypto')
const WorkerInsufficientException = require('../error/worker/WorkerInsufficientException')
class Chunk {
    /**
     * 
     * @param {string} data                     - payload of the chunk
     * @throws {MasterChunkSavingException}     - If the chunk fails to save
     * 
     * construct a chunk and save it to the workers using given data
     */
    constructor(data) {
        this.hash = Crypto.sha1(data)
        this.size = data.length
        try {
            this.locationList = Master.saveChunk(data)
        } catch (error) {
            if (error instanceof WorkerInsufficientException) {
                throw MasterChunkSavingException()
            }
            throw error
        }
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
        // TODO
    }
}

module.exports = Chunk