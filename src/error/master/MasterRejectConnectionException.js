class MasterRejectConnectionException extends Error {
    /**
     * @param {string} operation
     * @param {string} reason
     * @returns {void}
     */
    constructor(operation, reason) {
        super(`Master refuses connection during ${operation} operation due to ${reason}`)
        this.name = "MasterRejectConnectionException"
    }
}