const client = require("../client");

async function getAllEntries(userId) {
  try {
    const { rows } = await client.query(`
        SELECT * FROM entries
        WHERE "userId" = $1
        `, [userId]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

async function getEntryById(id) {
  try {
    const {
      rows: [entry],
    } = await client.query(
      `
        SELECT * FROM entries
        WHERE id = $1
        `,
      [id]
    );
    return entry;
  } catch (error) {
    console.log(error);
  }
}

async function addEntry(createDate, eventDate, title, content, userId) {
  try {
    const {
      rows: [entry],
    } = await client.query(
      `
        INSERT INTO entries("createDate", "eventDate", title, content, "userId")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING*;
            `,
      [createDate, eventDate, title, content, userId]
    );
    return entry;
  } catch (error) {
    console.log(error);
  }
}

async function updateEntry({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 2}`)
    .join(", ");
  try {
    const {
      rows: [entry],
    } = await client.query(
      `
        UPDATE entries
        SET ${setString}
        WHERE id=$1
        RETURNING*;
        `,
      [id, ...Object.values(fields)]
    );
    return entry;
  } catch (error) {
    console.log(error);
  }
}

async function deleteEntry(id) {
  try {
    const {
      rows: [entry],
    } = await client.query(
      `
        DELETE FROM entries
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );
    return entry;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllEntries,
  addEntry,
  getEntryById,
  updateEntry,
  deleteEntry,
};
