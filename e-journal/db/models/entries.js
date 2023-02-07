const client = require("../client");

async function getAllEntries () {
    try {
        const { rows } = await client.query(`
            SELECT * FROM entries
        `)
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getEntryById (id) {
    try {
        const { rows: [entry] } = await client.query(`
        SELECT * FROM entries
        WHERE id = $1
        `, [id])
        return entry;
    } catch (error) {
        console.log(error);
    }
}

async function addEntry (createDate, eventDate, title, content) {
    try {
        const { rows: [entry] } = await client.query(
            `
                INSERT INTO entries("createDate", "eventDate", title, content)
                VALUES ($1, $2, $3, $4)
                RETURNING*;
            `, [createDate, eventDate, title, content])
            console.log('entry :>> ', entry);
            return entry;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getAllEntries,
    addEntry,
    getEntryById
}