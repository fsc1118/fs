const express = require("express")
const logger = require("./Logger")
logger.info("Master logger initialized")

const app = express()
const port = 3000

app.listen(port, () => {
    logger.info(`Master listening on port ${port}`)
})