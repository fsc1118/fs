class MasterTimeoutException extends Error {
    /**
     * @param {string} operation - The operation that timed out
     * @returns {void}
     * */
    constructor(
        operation
    ) {
        super("Master timeout for server during " + operation + " operation.")
        this.name = "MasterTimeoutException"
    }
}