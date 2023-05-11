class DevicePermissionDeniedException extends Error {
    /**
     * @param {string} devicePath
     * @returns {void}
     */
    constructor(devicePath) {
        super(
            `Permission denied for device ${devicePath}. `
        )
        this.name = "DevicePermissionDeniedException"
    }
}

module.exports = DevicePermissionDeniedException