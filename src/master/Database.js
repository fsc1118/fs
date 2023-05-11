const sqlite3 = require('sqlite3').verbose()
const databaseName = "/db/data.db"
const db = new sqlite3.Database(databaseName)
const logger = require("./Logger")