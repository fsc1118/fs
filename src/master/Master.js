const MasterChunkCacheMissException = require("../error/master/MasterChunkCacheMissException")
const MasterChunkNotFoundException = require("../error/master/MasterChunkNotFoundException")
const WorkerRejectConnectionException = require("../error/worker/WorkerRejectConnectionException")
const WorkerInsufficientException = require("../error/worker/WorkerInsufficientException")
const MasterTimeoutException = require("../error/master/MasterTimeoutException")
const MasterCacheMissException = require("../error/master/MasterCacheMissException")
const Worker = require("./Worker")
const logger = require("./Logger")
const { REPLICATION_FACTOR } = require("config").get("REPLICATION_FACTOR")
const { MAX_CACHE_SIZE } = require("config").get("MAX_CACHE_SIZE")

class Master {
    constructor() {
        /**
         *
         * @type {Array<Worker>}
         *
         * Worker pool
         */
        this.workers = []

        /**
         *
         * @type {LRUCache<string, Location>}
         *
         * Cache of the location of the blocks on the workers
         */
        this.blockCache = require("lru-cache")({
            max: MAX_CACHE_SIZE
        })
    }

    /**
     *
     * @param {string} workerAddress
     */
    addWorker(workerAddress) {
        this.workers.push(new Worker(workerAddress))
    }

    /**
     *
     * @param {string} chunkData
     * @throws {WorkerInsufficientException} - If there are not enough workers to save the chunk
     * @returns {Array<Location>}
     */
    saveChunkData(chunkData) {
        const locations = []
        const usedWorkers = new Set()
        let rejectedWorkers = 0
        for (let i = 0; i < REPLICATION_FACTOR;) {
            if (rejectedWorkers > this.workers.length - REPLICATION_FACTOR) {
                logger.error("Not enough workers to save chunk. Consider increasing the number of workers or decreasing the replication factor")
                throw new WorkerInsufficientException()
            }
            const selectedWorker = this.selectWorker()
            if (usedWorkers.has(selectedWorker)) { /* Reselect if the worker is already used */
                continue
            }
            try {
                const location = selectedWorker.attemptToSaveChunk(chunkData)
                locations.push(location)
                usedWorkers.add(selectedWorker)
                i++
            } catch (error) {
                if (error instanceof WorkerRejectConnectionException) {
                    logger.info(error.message)
                } else if (error instanceof MasterTimeoutException) {
                    logger.info(error.message)
                } else {
                    logger.error(error)
                }
                rejectedWorkers++
            }
        }
        return locations
    }

    /**
     *
     * @param {string} chunkID                  - The ID of the chunk
     * @return {Location} savedLocation         - The location of the chunk
     * @throws {MasterChunkNotFoundException}   - If the chunk is not found
     */
    getChunkLocation(chunkID) {
        try {
            return this.getChunkLocationFromCache(chunkID)
        } catch (error) {
            if (error instanceof MasterCacheMissException) {
                logger.info(`Cache miss for chunk ${chunkID}`)
                location = this.getChunkLocationFromPersistentStorage(chunkID)
                this.blockCache.set(chunkID, location)
                return location
            }
            logger.error(error)
            throw error
        }
    }

    /**
     *
     * @param {string} chunkID                  - The ID of the chunk
     * @return {Location}                       - The location of the chunk as stored in the cache
     * @throws {MasterChunkCacheMissException}  - If the chunk is not found in the cache
     *
     * Get the location of a chunk from the cache
     */
    getChunkLocationFromCache(chunkID) {
        if (this.blockCache.has(chunkID)) {
            return this.blockCache.get(chunkID)
        }
        throw new MasterChunkCacheMissException(chunkID)
    }

    /**
     *
     * @param {string} chunkID
     * @return {Location} - The location of the chunk in the persistent storage
     * @throws {MasterChunkNotFoundException} - If the chunk is not found in the persistent storage
     *
     * Get the location of a chunk from the persistent storage. This is a fallback if the chunk is not in the cache
     */
    getChunkLocationFromPersistentStorage(chunkID) {
        const allLocations = require("./db/DB").getAllChunkLocationsFromPersistentStorage(chunkID)
        if (allLocations.length === 0) {
            throw new MasterChunkNotFoundException(chunkID)
        }
        return this.selectLocation(allLocations)
    }

    /**
     *
     * @param {Array<Location>} locations
     * @return {Location}
     *
     * Select a location from a list of locations. Default implementation is random selection
     */
    selectLocation(locations) {
        return locations[Math.floor(Math.random() * locations.length)]
    }

    /**
     *
     * @returns {Worker} - A worker being selected. Default implementation is random selection
     */
    selectWorker() {
        return this.workers[Math.floor(Math.random() * this.workers.length)]
    }
}

module.exports = new Master()