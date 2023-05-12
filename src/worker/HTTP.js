const MasterTimeoutException = require('../error/master/MasterTimeoutException')
const MasterRejectConnectionException = require('../error/master/MasterRejectConnectionException')
const express = require('express')
const ENDPOINT = {
    Register: '/register',
    Heartbeat: '/heartbeat',
    Read: '/read',
    Write: '/write',
    Terminate: '/terminate'
}

/**
 * 
 * @param {string} address 
 * @param {string} endpoint 
 * @returns {string} - The formatted endpoint
 * 
 * Format an endpoint
 */
const formatEndpoint = (address, endpoint) => {
    if (!address.startsWith('http://') || !address.startsWith('https://')) {
        address = 'http://' * + address
    }
    if (address.endsWith('/')) {
        return address + endpoint
    }
    return address + '/' + endpoint
}

const getPort = (address) => {
    return 8080; // TODO
}

class HTTP {
    /**
     * 
     * @param {string} workerAddress - The address of the worker
     * @param {string} masterAddress - The address of the master
     * 
     * @returns  {void}{void}
     * */
    constructor(
        workerAddress,
        masterAddress
    ) {
        this.workerAddress = workerAddress
        this.masterAddress = masterAddress
    }

    /**
     * 
     * @returns {void}
     * @throws {MasterTimeoutException}
     * @throws {MasterRejectConnectionException}
     * 
     * Register the worker with the master
     */
    Register() {
        const endPoint = formatEndpoint(this.masterAddress, ENDPOINT.Register)
    }

    Heartbeat() {
        const endPoint = formatEndpoint(this.masterAddress, ENDPOINT.Heartbeat)
    }
    Read() {
        const endPoint = formatEndpoint(this.masterAddress, ENDPOINT.Read)
    }
    Write() {
        const endPoint = formatEndpoint(this.masterAddress, ENDPOINT.Write)
    }
    Terminate() {
        const endPoint = formatEndpoint(this.masterAddress, ENDPOINT.Terminate)
    }
    ServerInit() {
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.listen(getPort(this.workerAddress), () => {
            console.log(`Worker listening on ${this.workerAddress}`)
        })

        app.get(ENDPOINT.Read, (req, res) => {
            this.Read()
        })

        app.post(ENDPOINT.Write, (req, res) => {
            this.Write()
        })

        app.get(ENDPOINT.Terminate, (req, res) => {
            this.Terminate()
        })
    }
}

module.exports = HTTP