module.exports = {
    /**
     *
     * @param {string} data
     * @returns {string} sha1 hash
     */
    sha1: function (data) {
        require("crypto").createHash("sha1").update(data).digest("hex")
    }
}