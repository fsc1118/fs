class MasterChunkSavingException extends Error {
    constructor() {
        super(`Chunk failed to save`)
        this.name = "MasterChunkSavingException"
    }
}