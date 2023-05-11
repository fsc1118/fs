const uuid = require('uuid')
const MasterFullPoolException = require("../error/master/MasterFullPoolException")
const Worker = require("./Worker")
const Location = require("./Location")
class Master {
    MAX_WORKERS = 10
    MAX_CACHE_SIZE = 1000
    constructor() {
        /**
         * 
         * @type {Array<[Worker]>}
         * 
         * Status of the workers
         */
        this.workers = []

        /**
         * 
         * @type {Map<string, Location>}
         * 
         * Cache of the location of the blocks on the workers
         */
        this.blockCache = new Map()
    }

    /**
     * 
     * @param {string} workerAddress
     * 
     * @returns {void}
     * 
     * Add a worker to the worker pool
     */
    addWorker(workerAddress) {
        if (this.workers.length < this.MAX_WORKERS) {
            this.workers.push([workerAddress, uuid.v4(), new Date().getTime()])
        } else {
            throw new MasterFullPoolException(this.MAX_WORKERS)
        }
    }
}