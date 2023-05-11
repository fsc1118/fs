class WorkerInsufficientException extends Error {
    /**
     * 
     * @param {number} currentWorkerCount
     * @param {number} minimumWorkerNeeded
     **/
    constructor(minimumWorkers) {
        super(`Insufficient workers, minimum workers count ${minimumWorkerNeeded} is needed but only ${currentWorkerCount} workers are available`)
        this.name = "WorkerInsufficientException"
    }
}