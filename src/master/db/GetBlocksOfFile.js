const Location = require('../Chunk')
const sqlite3 = require('sqlite')
const databaseName = "../data/metadata.db"
const deasync = require('deasync')
const db = deasync(sqlite3.open(databaseName))

/**
 * 
 * @param {string} filename 
 * @returns {Location[]}
 */
module.exports = (filename) => {
    const locations = []
    const query = `SELECT * FROM blocks WHERE filename = '${filename}'`
    db.all(query, (err, rows) => {
        if (err) {
            logger.error(err)
            return
        }
        rows.forEach(row => {
            const location = new Location(row.address, parseInt(row.block), parseInt(row.offset))
            locations.push(location)
        })
    })
    while (locations.length == 0) {
        deasync.sleep(100)
    }
    return locations
}

module.exports("s")