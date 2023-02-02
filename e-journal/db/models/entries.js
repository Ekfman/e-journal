const client = require("../client");

async function addEntry ({createDate, eventDate, title, description, content}) {
    try {
        const { rows: [entry] } = await client.query(
            `
                INSERT INTO entries("createDate", "eventDate", title, description, content)
                VALUES (${createDate}, ${eventDate}, ${title}, ${description}, ${content})
                RETURNING*;
            `, [createDate, eventDate, title, description, content])
            console.log('entry :>> ', entry);
            return entry;
    } catch (error) {
        console.log('could not create entry');
    }
}

console.log(addEntry("2023-02-01", "2022-12-14", "Christmas", "family drama in the house", "This month is always hectic because..."));


module.exports = {
    addEntry
}