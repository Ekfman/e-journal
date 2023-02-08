const client = require("../client");

async function createUser (email, password) {
    try {
        const {rows: [user]} = await client.query(`
            INSERT INTO users(email, password)
            VALUES ($1, $2)
            RETURNING*;
        `, [email, password])
        return user;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createUser
}