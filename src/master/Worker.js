const Crypto = require("../util/Crypto")
class Worker {
    constructor(address) {
        this.address = address
        this.id = Crypto.sha1(address)
        this.lastSeen = new Date().getTime()
    }
}

module.exports = Worker