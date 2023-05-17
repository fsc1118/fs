class WorkerInsufficientException extends Error {
    constructor() {
        super("Insufficient workers.")
        this.name = "WorkerInsufficientException"
    }
}

module.exports = WorkerInsufficientException