const config = require("config")

if (process.argv[2] === "1") { // master
    console.log("Starting master")
    const masterConfig = config.util.loadFileConfigs("./config/master")
    if (masterConfig === undefined) {
        console.error("Failed to load master config file")
    }
    // Add the master config to config
    config.util.extendDeep(config, masterConfig)
    require("./src/master/Main")
} else if (process.argv[2] === "0") { // worker
    console.log("Starting worker")
    const workerConfig = config.util.loadFileConfigs("./config/worker")
    if (workerConfig === undefined) {
        console.error("Failed to load worker config file")
    }
    // Add the worker config to config
    config.util.extendDeep(config, workerConfig)
    require("./src/worker/Main")
} else {
    console.error("Invalid argument. Use npm run start-worker to start the worker or npm run start-master to start the master")
    process.exit(1)
}