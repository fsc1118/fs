const fs = require('fs')
class Logger {
    /**
     * @param {string} logFilePath - The path to the log file
     * @returns {void}
     * */
    constructor(
        logFilePath
    ) {
        this.path = logFilePath
    }
    /**
     * @param {string} message - The message to log
     * @returns {void}
     * */
    info(message) {
        const timestamp = new Date().toISOString()
        fs.appendFileSync(this.path, `[INFO] ${message} ${timestamp}\n`)
    }
    /**
     * @param {string} message - The message to log
     * @returns {void}
     * */
    error(message) {
        const timestamp = new Date().toISOString()
        fs.appendFileSync(this.path, `[ERROR] ${message} ${timestamp}\n`)
    }
}
module.exports = new Logger("../../logs/master.log")
