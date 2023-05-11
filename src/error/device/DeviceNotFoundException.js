class DeviceNotFoundException extends Error {
    /**
     * @param {string} devicePath
     * @returns {void}
     */
    constructor(devicePath) {
        super(`Device ${devicePath} does not exist`)
        this.name = "DeviceNotFoundException"
    }
}

module.exports = DeviceNotFoundException