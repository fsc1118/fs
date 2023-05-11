module.exports = {
    /**
     * 
     * @param {string} address
     * @returns {string}
     */
    extractFormattedAddress(address) {
        if (require("net").isIPv4(address)) {
            return address
        }
        if (require("net").isIPv6(address)) {
            return `[${address}]`
        }
        // Extract IPv4 address from ::ffff:ipv4
        if (address.startsWith("::ffff:")) {
            return address.replace("::ffff:", "")
        }
    },
}