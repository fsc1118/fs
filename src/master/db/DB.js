const db = require("better-sqlite3")("../data/foobar.db")
const Chunk = require("./Chunk")
const File = require("./File")
const FileNotFoundException = require("../../error/filesystem/FileNotFoundException")
const SQLITE_TYPE = {
    INTEGER: "INTEGER",
    TEXT: "TEXT"
    /* Suffice not to include other types */
}

/**
 * 
 * @param {string} tableName                - table name 
 * @param {Array<string>} nonPrimaryKeyName - field names except for the primary key
 * @param {Array<string>} nonPrimaryKeyType - field types except for the primary key
 * @param {string} primaryKey               - primary key name
 * @param {string} primaryKeyType           - primary key type
 * 
 * Initialize a table if it does not exist with the given field names and type names
 */

const initalize_table_if_not_existed = (tableName, nonPrimaryKeyName, nonPrimaryKeyType, primaryKey, primaryKeyType) => {
    const table = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`).get(tableName)
    if (table === undefined) {
        // Create table
        const field_type = nonPrimaryKeyName.map((name, index) => `${name} ${nonPrimaryKeyType[index]}`).join(", ")
        db.prepare(`CREATE TABLE ${tableName} 
            ${primaryKey} ${primaryKeyType} PRIMARY KEY,
        (${field_type})`).run()
    }
}

module.exports = {
    /**
     * 
     * Initalize the database. Create necessary tables if they do not exist
     */
    initalize: () => {
        initalize_table_if_not_existed(
            "chunk",
            // TODO
        )
    },

    /**
     * 
     * @param {Chunk} chunk
     */
    saveChunk: (chunk) => {
        // TODO
    },

    /**
     * 
     * @param {string} chunkId
     * @returns {Chunk} chunk
     * @throws {ChunkNotFoundException}
     * 
     */

    getChunk: (chunkId) => {
        // TODO
    },

    /**
     * 
     * @param {File} file - file to be saved
     */
    saveFile: (file) => {
        // TODO
    },

    /**
     * 
     * @param {string} fileName
     * @returns {File} file
     * @throws {FileNotFoundException}
     *
     */
    getFile: (fileName) => {
        // TODO
    }
}

initalize_table_if_not_existed("chunk", ["id", "hash", "size"], [SQLITE_TYPE.TEXT, SQLITE_TYPE.TEXT, SQLITE_TYPE.INTEGER])
// Add {"id": "1", "hash": "123", "size": "123"}
db.prepare("INSERT INTO chunk VALUES (?, ?, ?)").run("1", "123", "123")
// QUery    
console.log(db.prepare("SELECT * FROM chunk").all())