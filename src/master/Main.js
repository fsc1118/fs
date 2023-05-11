const express = require('express')

const app = express()
const port = 3000

app.post('/write', (req, res) => {

})

app.get('/read', (req, res) => {
    const filename = req.query.filename
    if (!filename) {
        res.status(400).send('No filename provided')
        return
    }
})

