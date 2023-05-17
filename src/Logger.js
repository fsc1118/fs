const fs = require("fs")
const config = require("config")

class Logger {
    /**
     * @param {string} logFilePath - The path to the log file
     * @returns {void}
     */
    constructor(
        logFilePath
    ) {
        this.path = logFilePath
        this.isDevelopment = config.get("IS_DEVELOPMENT") === true
    }
    /**
     * @param {string} message
     * @returns {void}
     */
    info(message) {
        const timestamp = new Date().toISOString()
        fs.appendFileSync(this.path, `[INFO] ${message} ${timestamp}\n`)
        if (this.isDevelopment) {
            console.info(`[INFO] ${message} ${timestamp}`)
        }
    }
    /**
     * @param {string} message
     * @returns {void}
     */
    error(message) {
        const timestamp = new Date().toISOString()
        fs.appendFileSync(this.path, `[ERROR] ${message} ${timestamp}\n`)
        if (this.isDevelopment) {
            console.error(`[ERROR] ${message} ${timestamp}`)
        }
    }
}
module.exports = Logger
