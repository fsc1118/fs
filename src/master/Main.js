const express = require("express")
const logger = require("./Logger")

const app = express()
const port = 3000

app.listen(port, () => {
    logger.info(`Master listening on port ${port}`)
})

app.post("/write", (req, res) => {

})

app.get("/read", (req, res) => {
    console.log(req.ip)
    console.log(req.connection.remotePort)
    const filename = req.query.filename
    if (!filename) {
        res.status(400).send("No filename provided")
        logger.error(req.ip + " /read Invalid request: no filename provided")
        return
    }
})

app.get("/register", (req, res) => {
    const address = req.query.address
    if (!address) {
        res.status(400).send("No address provided")
        logger.error(req.ip + " /register Invalid request: no address provided")
        return
    }
    res.status(200).send("OK")
})

