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

async function addEntry (createDate, eventDate, title, description, content) {
    try {
        const { rows: [entry] } = await client.query(
            `
                INSERT INTO entries("createDate", "eventDate", title, description, content)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING*;
            `, [createDate, eventDate, title, description, content])
            console.log('entry :>> ', entry);
            return entry;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getAllEntries,
    addEntry,
}