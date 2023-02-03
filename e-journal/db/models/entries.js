const client = require("../client");

async function addEntry ({createDate, eventDate, title, description, content}) {
    try {
        const { rows: [entry] } = await client.query(
            `
                INSERT INTO entries("createDate", "eventDate", title, description, content)
                VALUES (${createDate}, ${eventDate}, ${title}, ${description}, ${content})
                RETURNING*;
            `, [createDate, eventDate, title, description, content])
            return entry;
    } catch (error) {
        console.log('could not create entry');
    }
}



module.exports = {
    addEntry
}