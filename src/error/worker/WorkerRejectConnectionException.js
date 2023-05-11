class WorkerRejectConnectionException extends Error {
    /**
     * 
     * @param {string} workerID
     * @param {string} reason
     */
    constructor(workerID, reason) {
        super(`${workerID} refuses connection due to ${reason}`)
        this.name = "WorkerRejectConnectionException"
    }
}

module.exports = WorkerRejectConnectionException