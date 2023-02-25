const client = require("../client");
const bcrypt = require("bcrypt");

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(email, password)
            VALUES ($1, $2)
            RETURNING*;
        `,
      [email, hashedPassword]
    );
    delete user.password;
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function validateAndGetUser({ email, password }) {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Incorrect email or password");
  }
  const hashedPassword = user.password;
  const isValid = bcrypt.compare(
    await bcrypt.hash(password, 10),
    hashedPassword
  );
  if (isValid) {
    delete user.password;
    return user;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE email = $1
        `,
      [email]
    );
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(id){
  try {
    const { rows: [user],} = await client.query(`
      SELECT * FROM users
      WHERE id = $1
    `, [id]);
    return user
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  validateAndGetUser,
  getUserById
};
