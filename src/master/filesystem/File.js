const Chunk = require("../Chunk")
const BLOCK_SIZE = require("config").get("BLOCK_SIZE")
const MasterChunkSavingException = require("../../error/master/MasterChunkSavingException")
/**
 *
 * @param {string} payload
 * @returns {Chunk[]}
 * @throws {MasterChunkSavingException}
 */
const divideIntoChunkAndSave = (payload) => {
    const chunk = []
    const numberOfBlocks = Math.ceil(payload.length / BLOCK_SIZE)
    for (let i = 0; i < numberOfBlocks; i++) {
        const chunkData = payload.slice(i * BLOCK_SIZE, (i + 1) * BLOCK_SIZE)
        chunk.push(new Chunk(chunkData))
    }
}

class File {
    /**
     *
     * @param {string} fileName
     * @param {string} payload
     * @throws {MasterChunkSavingException}
     */
    constructor(
        fileName,
        payload
    ) {
        this.fileName = fileName
        // Divide payload into blocks and store Location of each block
        this.chunks = []
        this.append(payload)
    }

    /**
     *
     * @param {string} newPayload
     * @returns {void}
     * @throws {MasterChunkSavingException}
     */
    append(newPayload) {
        this.chunks = this.chunks.concat(divideIntoChunkAndSave(newPayload))
    }
}

module.exports = File