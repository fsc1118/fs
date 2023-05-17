class MasterChunkCacheMissException extends Error {
    constructor(chunkID) {
        super(`Chunk ${chunkID} not found in cache`)
        this.name = "MasterChunkCacheMissException"
    }
}
module.exports = MasterChunkCacheMissException