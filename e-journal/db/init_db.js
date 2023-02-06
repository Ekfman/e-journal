const { client } = require("./");

async function buildTables() {
    try{
        client.connect();
        await client.query(`
            DROP TABLES IF EXISTS entries;
        `)
        await client.query(`
            CREATE TABLE entries(
                id SERIAL PRIMARY KEY,
                "createDate" DATE NOT NULL,
                "eventDate" DATE NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL
            );
        `)
    } catch (error) {
        throw error;
    }
}

buildTables()
  .catch(console.error)
  .finally(() => client.end());