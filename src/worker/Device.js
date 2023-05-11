const fs = require('fs')
const DeviceNotFoundException = require('../error/device/DeviceNotFoundException')
const PermissionDeniedException = require('../error/device/DevicePermissionDeniedException')
const DeviceIOException = require('../error/device/DeviceIOException')
const logger = require('./Logger')
class Device {
    /**
     * @param {string} device_path
     * @returns {void}
     * @throws {DeviceNotFoundException}
     * @throws {PermissionDeniedException}
     * 
     * Constructor of a storage device
     */
    constructor(device_path) {
        const readWritePermissionsFlag = fs.constants.O_RDWR
        try {
            this.device = fs.openSync(device_path, readWritePermissionsFlag)
        } catch (error) {
            // Device does not exist
            if (error.code === 'ENOENT') {
                logger.error(`Device ${device_path} does not exist`)
                throw new DeviceNotFoundException(device_path)
            }
            // Permission denied
            if (error.code === 'EACCES') {
                logger.error(`Permission denied for device ${device_path}`)
                throw new PermissionDeniedException(device_path)
            }
            logger.error('Unknown error while opening device')
            throw error
        }
    }

    /**
     * @param {number} block_number - The block number to read
     * @param {number} offset - The offset in bytes from the beginning of the device
     * @param {number} length - The number of bytes to read
     * @throws {DeviceIOException}
     * @returns {Buffer} - The bytes read from the block
     * 
     * Read bytes from a block
     * */
    read(block_number, offset, length) {
        const buffer = Buffer.alloc(length)
        let bytesRead
        try {
            bytesRead = fs.readSync(this.device, buffer, 0, length,
                block_number * this.BLOCK_SIZE + offset)
        } catch (error) {
            throw new DeviceIOException(error)
        }
        if (bytesRead !== length) {
            logger.error(`Failed to read ${length} bytes from block ${block_number} at offset ${offset}`)
            // TODO
        }
        return buffer
    }

    /**
     * @param {number} block_number - The block number to write to
     * @param {number} offset - The offset in bytes from the beginning of the device
     * @param {Buffer} buffer - The bytes to write to the block
     * 
     * @returns {void}
     * 
     * Write bytes to a block
     * */
    write(block_number, offset, buffer) {
        let bytesWritten
        try {
            bytesWritten = fs.writeSync(this.device, buffer, 0, buffer.length,
                block_number * this.BLOCK_SIZE + offset)
        } catch (error) {
            throw new DeviceIOException(error)
        }
        if (bytesWritten !== buffer.length) {
            logger.error(`Failed to write ${buffer.length} bytes to block ${block_number} at offset ${offset}`)
            // TODO
        }
    }
}

module.exports = Device