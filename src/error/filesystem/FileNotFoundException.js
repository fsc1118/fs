class FileNotFoundException extends Error {
    /**
     * 
     * @param {string} path
     * @returns {void}
     */
    constructor(path) {
        super(path + " does not exist")
        this.name = "FileNotFoundException"
    }
}
module.exports = FileNotFoundException