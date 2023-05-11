const { v4: uuidv4 } = require('uuid')
class Worker {
    constructor(address) {
        this.address = address
        this.id = uuidv4()
        this.lastSeen = new Date().getTime()
    }
}

module.exports = Worker