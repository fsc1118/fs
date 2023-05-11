class MasterChunkNotFoundException extends Error {
    constructor(chunkID) {
        super(`Chunk ${chunkID} not found`)
        this.name = 'MasterChunkNotFoundException'
    }
}
module.exports = MasterChunkNotFoundException