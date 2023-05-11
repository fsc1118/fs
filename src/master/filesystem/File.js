const Location = require('../Location')
const BLOCK_SIZE = require('../../constant').BLOCK_SIZE
/**
 * 
 * @param {string} payload 
 * @returns {Location[]}
 */
const divideIntoBlocks = (payload) => {
    const blocks = []
    const numberOfBlocks = Math.ceil(payload.length / BLOCK_SIZE)
    for (let i = 0; i < numberOfBlocks; i++) {
        const block = payload.slice(i * BLOCK_SIZE, (i + 1) * BLOCK_SIZE)
    }
}

class File {
    /**
     * 
     * @param {boolean} isDirectory 
     * @param {string} fileName 
     * @param {string} payload 
     */
    constructor(
        isDirectory,
        fileName,
        payload
    ) {
        this.isDirectory = isDirectory
        this.fileName = fileName
        // Divide payload into blocks and store Location of each block
        this.blocks = []
    }
}