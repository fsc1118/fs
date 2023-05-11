class MasterFullPoolException extends Error {
    constructor(maximumPoolSize) {
        super(`Master pool is full, maximum pool size is ${maximumPoolSize}`)
        this.name = "MasterFullPoolException"
    }
}