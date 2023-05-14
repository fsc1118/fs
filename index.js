const config = require("config")

const WORKER_ESSENTIAL_CONFIGURATION_DEFAULT = {
    "DEVICE_PATH": "/dev/nvme0n1p3"
}

const MASTER_ESSENTIAL_CONFIGURATION_DEFAULT = {
    "MAX_CACHE_SIZE": 1000,
    "REPLICATION_FACTOR": 3
}

const SYSTEM_CONFIGURATION_DEFAULT =
{
    "BLOCK_SIZE": 4096,
    "TIMEOUT": 100000,
    "MAX_RETRIES": 5,
    "RETRY_DELAY": 1000,
    "LOG_DIR": "logs",
    "IS_DEVELOPMENT": true
}

for (const [key, value] of Object.entries(SYSTEM_CONFIGURATION_DEFAULT)) {
    if (!config.has(key)) {
        config.set(key, value)
        console.info(`[INFO] Essential system variable ${key} not set, using default value [${value}`)
    }
}

if (process.argv[2] === "1") { // master
    console.log("Starting master")
    const masterConfig = config.util.loadFileConfigs("./config/master")
    if (masterConfig === undefined) {
        console.error("Failed to load master config file")
    }
    // Add the master config to config
    config.util.extendDeep(config, masterConfig)
    for (const [key, value] of Object.entries(MASTER_ESSENTIAL_CONFIGURATION_DEFAULT)) {
        if (!config.has(key)) {
            config.set(key, value)
            console.info(`[INFO] Essential master variable ${key} not set, using default value [${value}]`)
        }
    }
    require("./src/master/Main")
} else if (process.argv[2] === "0") { // worker
    console.log("Starting worker")
    const workerConfig = config.util.loadFileConfigs("./config/worker")
    if (workerConfig === undefined) {
        console.error("Failed to load worker config file")
    }
    // Add the worker config to config
    config.util.extendDeep(config, workerConfig)
    for (const [key, value] of Object.entries(WORKER_ESSENTIAL_CONFIGURATION_DEFAULT)) {
        if (!config.has(key)) {
            config.set(key, value)
            console.info(`[INFO] Essential worker variable ${key} not set, using default value [${value}]`)
        }
    }
    require("./src/worker/Main")
} else {
    console.error("Invalid argument. Use npm run start-worker to start the worker or npm run start-master to start the master")
    process.exit(1)
}