const Crypto = require("../util/Crypto")
const Chunk = require("./Chunk")
const WorkerRejectConnectionException = require("../error/worker/WorkerRejectConnectionException")
const WorkerTimeoutException = require("../error/worker/WorkerTimeoutException")
const Location = require("./Location")

class Worker {
    constructor(address) {
        this.address = address
        this.id = Crypto.sha1(address)
        this.lastSeen = new Date().getTime()
    }

    /**
     * 
     * @param {Chunk} chunk                         - chunk to be saved
     * @throws {WorkerRejectConnectionException}    - If the worker rejects saving the chunk
     * @throws {WorkerTimeoutException}             - If the worker does not respond
     * @returns {Location}                          - The location of the chunk on the worker
     */

    attemptToSaveChunk(chunk) {
        // TODO
    }
}


module.exports = Worker