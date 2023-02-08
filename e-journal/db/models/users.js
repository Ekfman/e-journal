const client = require("../client");
const bcrypt = require("bcrypt");

async function createUser (email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const {rows: [user]} = await client.query(`
            INSERT INTO users(email, password)
            VALUES ($1, $2)
            RETURNING*;
        `, [email, hashedPassword])
        delete user.password;
        return user;
    } catch (error) {
        console.log(error);
    }
}

async function getUserByEmail (email) {
    try {
        const {rows: [user]} = await client.query(`
        SELECT * FROM users
        WHERE email = $1
        `, [email])
        return user;
    } catch (error) {
       console.log(error); 
    }
}

module.exports = {
    createUser,
    getUserByEmail
}