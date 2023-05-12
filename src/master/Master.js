const uuid = require('uuid')
const MasterFullPoolException = require("../error/master/MasterFullPoolException")
const MasterChunkCacheMissException = require("../error/master/MasterChunkCacheMissException")
const MasterChunkNotFoundException = require("../error/master/MasterChunkNotFoundException")
const WorkerRejectConnectionException = require("../error/worker/WorkerRejectConnectionException")
const WorkerInsufficientException = require("../error/worker/WorkerInsufficientException")
const MasterTimeoutException = require("../error/master/MasterTimeoutException")
const Worker = require("./Worker")
const Chunk = require("./Chunk")
const Location = require("./Location")
const logger = require("./Logger")
const { REPLICATION_FACTOR } = require('../constant')
class Master {
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
         * @type {LRUCache<string, Chunk>}
         * 
         * Cache of the location of the blocks on the workers
         */
        this.blockCache = require("lru-cache")({
            max: this.MAX_CACHE_SIZE
        })
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
            this.workers.push(new Worker(workerAddress))
        } else {
            throw new MasterFullPoolException(this.MAX_WORKERS)
        } this.id = Crypto.sha1(data)
    }

    /**
     * 
     * @param {string} chunkData 
     * @param {Worker} worker
     * @throws {WorkerRejectConnectionException} - If the worker rejects saving the chunk
     * @throws {MasterTimeoutException}
     * @returns {Location}
     * 
     * Attempt to save a chunk to a worker
     */
    attemptToSaveChunk(chunkData) {

    }

    /**
     * 
     * @param {string} chunkData
     * @throws {WorkerInsufficientException} - If there are not enough workers to save the chunk
     * @returns {Array<Location>}
     */
    saveChunk(chunk) {
        if (REPLICATION_FACTOR > this.workers.length) {
            logger.error(`Not enough workers to save chunk. Required: ${REPLICATION_FACTOR}, Available: ${this.workers.length}`)
            throw new WorkerInsufficientException(this.workers.length, REPLICATION_FACTOR)
        }
        const locations = []
        const usedWorkers = new Set()
        for (let i = 0; i < REPLICATION_FACTOR;) {
            const randomWorker = this.selectWorker()
            if (usedWorkers.has(randomWorker)) { /* Reselect if the worker is already used */
                continue
            }
            try {
                const location = randomWorker.attemptToSaveChunk(chunk)
                locations.push(location)
                usedWorkers.add(randomWorker)
                i++
            } catch (error) {
                if (error instanceof WorkerRejectConnectionException) {
                    logger.info(error.message)
                } else if (error instanceof MasterTimeoutException) {
                    logger.info(error.message)
                } else {
                    logger.error(error)
                }
            }
        }
        return locations
    }

    /**
     * 
     * @param {string} ChunkID
     * @return {Chunk}
     * 
     * Get the one location of the blocks of a chunk
     */
    getChunkLocation(chunkID) {
        try {
            return this.getChunkLocationFromCache(chunkID)
        } catch (error) {
            if (error instanceof MasterCacheMissException) {
                logger.info(`Cache miss for chunk ${chunkID}`)
                location = this.getCacheLocationFromPersistentStorage(chunkID)
                this.blockCache.set(chunkID, location)
                return location
            }
            logger.error(error)
            throw error
        }
    }

    /**
     * 
     * @param {String} ChunkID
     * @return {Chunk}
     * @throws {MasterChunkCacheMissException} - If the chunk is not in the cache
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
     * @param {String} ChunkID
     * @return {Chunk}
     * @throws {MasterChunkNotFoundException} - If the chunk is not found in the persistent storage
     * 
     * Get the location of a chunk from the persistent storage. This is a fallback if the chunk is not in the cache
     **/
    getCacheLocationFromPersistentStorage(chunkID) {
        allLocations = this.getAllLocationsFromPersistentStorage(chunkID)
        if (allLocations.length === 0) {
            throw new MasterChunkNotFoundException(chunkID)
        }
        return this.selectLocation(allLocations)
    }

    /**
     * 
     * @param {String} ChunkID
     * @return {Array<Chunk>}
     * 
     * Get the locations of all the blocks of a chunk from the persistent storage
     **/
    getAllLocationsFromPersistentStorage(chunkID) {
        // TODO: Database Operation
    }

    /**
     * 
     * @param {Array<Chunk>} locations
     * @return {Chunk}
     * 
     * Select a location from a list of locations. Default implementation is random selection
     */
    selectLocation(locations) {
        return locations[Math.floor(Math.random() * locations.length)]
    }

    /**
     * 
     * @return {Worker}
     * 
     * Select a worker from the worker pool. Default implementation is random selection
     */
    selectWorker() {
        return this.workers[Math.floor(Math.random() * this.workers.length)]
    }
}

module.exports = new Master()