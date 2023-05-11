class MasterFullPoolException extends Error {
    /**
     * 
     * @param {number} maximumPoolSize
     * @returns {void}
     */
    constructor(maximumPoolSize) {
        super(`Master pool is full, maximum pool size is ${maximumPoolSize}`)
        this.name = "MasterFullPoolException"
    }
}