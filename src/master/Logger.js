const Logger = require("../Logger")
const config = require("config")
module.exports = new Logger(config.get("LOG_DIR") + "/master.log")
