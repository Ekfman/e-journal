const { client } = require("./");

async function buildTables() {
    try{
        client.connect();
        await client.query(`
            DROP TABLE IF EXISTS entries;
            DROP TABLE IF EXISTS users;
        `)
        await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `)
        await client.query(`
            CREATE TABLE entries(
                id SERIAL PRIMARY KEY,
                "createDate" DATE NOT NULL,
                "eventDate" DATE NOT NULL,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                "userId" REFERENCES users.(id)
            );
        `)
    } catch (error) {
        throw error;
    }
}

buildTables()
  .catch(console.error)
  .finally(() => client.end());