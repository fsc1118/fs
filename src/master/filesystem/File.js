const Chunk = require('../Chunk')
const BLOCK_SIZE = require('../../constant').BLOCK_SIZE
/**
 * 
 * @param {string} payload 
 * @returns {Chunk[]}
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
     */
    constructor(
        fileName,
        payload
    ) {
        this.fileName = fileName
        // Divide payload into blocks and store Location of each block
        this.chunks = divideIntoChunkAndSave(payload)
    }

    /**
     * 
     * @param {string} newPayload
     * @returns {void}
     */
    append(newPayload) {

    }
}

module.exports = File