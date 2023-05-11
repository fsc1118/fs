class WorkerTimeoutException extends Error {
    /**
     * 
     * @param {string} workerID
     */
    constructor(workerID) {
        super(`Worker ${workerID} timed out`)
        this.name = "WorkerTimeoutException"
    }
}

module.exports = WorkerTimeoutException