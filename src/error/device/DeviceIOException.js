/**
 *
 */
class DeviceIOException extends Error {
    /**
     * @param {string} message
     * @returns {void}
     *
     */
    constructor(message) {
        super(
            `IO error: ${message}`
        )
        this.name = "DeviceIOException"
    }
}