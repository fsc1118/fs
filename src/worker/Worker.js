const fs = require("fs")
const Device = require("./Device")
const DeviceNotFoundException = require("../error/device/DeviceNotFoundException")
const PermissionDeniedException = require("../error/device/DevicePermissionDeniedException")
const MasterTimeoutException = require("../error/master/MasterTimeoutException")
/**
 * @returns {string} - The path to the device
 * 
 * Read the path to the device from the environment variable DEVICE or from stdin
*/
const readDevicePath = () => {
    // Read environment variable
    if (process.env.DEVICE) {
        return process.env.DEVICE
    }
    // Read from stdin
    return require("readline-sync").question("Enter device path: ")
}

/**
 * @returns {string} - The address of the worker
 * 
 * Read the worker"s address from the environment variable DEVICE or from stdin. The address can be a hostname or an IP address+port
*/
const readWorkerAddress = () => {
    // Read environment variable
    if (process.env.WORKER_ADDRESS) {
        return process.env.WORKER_ADDRESS
    }
    // Read from stdin
    return require("readline-sync").question("Enter worker address: ")
}

/**
 * @returns {string} - The address of the master
 * 
 * Read the master"s address from the environment variable DEVICE or from stdin. The address can be a hostname or an IP address+port
 * */
const readMasterAddress = () => {
    // Read environment variable
    if (process.env.MASTER_ADDRESS) {
        return process.env.MASTER_ADDRESS
    }
    // Read from stdin
    return require("readline-sync").question("Enter master address: ")
}

class Worker {
    BLOCK_SIZE = 4096
    constructor() {
        const devicePath = readDevicePath()
        try {
            this.device = new Device(devicePath)
        } catch (error) {
            if (error instanceof DeviceNotFoundException) {
                process.exit(1) // read
            }
            if (error instanceof PermissionDeniedException) {
                process.exit(2)
            }
            throw error
        }
        this.http = new HTTP(
            readWorkerAddress(),
            readMasterAddress()
        )
    }

    /**
     * 
     * @param {string} masterAddress - The address of the master. Can be a hostname or an IP address+port 
     * @throws {MasterTimeoutException} - If the master does not respond within 5 seconds
     * @returns {void}
     * 
     * Register the worker to the master
     */
    register(
        masterAddress
    ) {

    }

    /**
     * 
     * @param {number} blockIndex - The index of the block to read
     * @param {number} offset - The offset in the block to start reading from
     * @param {number} length - The number of bytes to read
     * 
     * @returns {Buffer} - The bytes read from the block
     * 
     * Read bytes from a block
     * */
    read(blockIndex, offset, length) {

    }

    /**
     * 
     * @param {number} blockIndex - The index of the block to write to
     * @param {number} offset - The offset in the block to start writing to
     * @param {Buffer} buffer - The bytes to write to the block
     * 
     * @returns {void}
     * 
     * Write bytes to a block
     * */
    write(blockIndex, offset, buffer) {
    }

    /**
     * 
     * Send a heartbeat to the master
     * */
    heartbeat() {

    }

    /**
     * 
     * Terminate the worker
     */
    terminate() {

    }
}

module.exports = Worker