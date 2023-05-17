const FileNotFoundException = require("../../error/filesystem/FileNotFoundException")
const File = require("./File")
class FileSystem {

    /**
     *
     * @param {string} path
     * @returns {Array<Location>}
     *
     * Cache of location of chunks of a file
     */
    fileChunkCache = require("lru-cache")({
        max: 100
    })

    touch(path) {

    }

    /**
     *
     * @param {string} path
     * @returns {File} file
     * @throws {FileNotFoundException}
     */
    read(path) {

    }

    /**
     * 
     * @param {string} path
     * @param {string} data
     * @returns {void}
     */
    write(path, data) {

    }
}

module.exports = new FileSystem()